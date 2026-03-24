package com.prarthna.clinic.service;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.exception.BadRequestException;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.UserRepository;
import com.prarthna.clinic.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository       userRepository;
    private final DoctorRepository     doctorRepository;
    private final PasswordEncoder      passwordEncoder;
    private final JwtUtils             jwtUtils;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest request) {
        // Check both tables for duplicate email
        if (userRepository.existsByEmail(request.getEmail()) ||
            doctorRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        String encoded = passwordEncoder.encode(request.getPassword());

        if ("doctor".equalsIgnoreCase(request.getRole())) {
            Doctor doctor = Doctor.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(encoded)
                    .phone(request.getPhone())
                    .isApproved(Doctor.ApprovalStatus.pending)
                    .build();
            doctorRepository.save(doctor);

            String token = jwtUtils.generateTokenFromEmail(doctor.getEmail());
            return AuthResponse.builder()
                    .token(token).role("doctor")
                    .id(doctor.getId()).name(doctor.getName())
                    .email(doctor.getEmail())
                    .message("Doctor registered successfully. Awaiting admin approval.")
                    .build();
        } else {
            User.Role role = "admin".equalsIgnoreCase(request.getRole())
                    ? User.Role.admin : User.Role.patient;

            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(encoded)
                    .phone(request.getPhone())
                    .role(role)
                    .build();
            userRepository.save(user);

            String token = jwtUtils.generateTokenFromEmail(user.getEmail());
            return AuthResponse.builder()
                    .token(token).role(role.name())
                    .id(user.getId()).name(user.getName())
                    .email(user.getEmail())
                    .message("User registered successfully")
                    .build();
        }
    }

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtils.generateToken(auth);

        // Determine role and id
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return AuthResponse.builder()
                    .token(token).role(user.getRole().name())
                    .id(user.getId()).name(user.getName())
                    .email(user.getEmail())
                    .message("Login successful")
                    .build();
        }

        var docOpt = doctorRepository.findByEmail(request.getEmail());
        if (docOpt.isPresent()) {
            Doctor doctor = docOpt.get();
            return AuthResponse.builder()
                    .token(token).role("doctor")
                    .id(doctor.getId()).name(doctor.getName())
                    .email(doctor.getEmail())
                    .message("Login successful")
                    .build();
        }

        throw new BadRequestException("Invalid credentials");
    }
}
