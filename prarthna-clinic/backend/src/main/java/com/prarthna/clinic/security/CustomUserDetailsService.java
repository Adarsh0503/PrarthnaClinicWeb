package com.prarthna.clinic.security;

import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try User table first
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name().toUpperCase()))
            );
        }

        // Try Doctor table
        var docOpt = doctorRepository.findByEmail(email);
        if (docOpt.isPresent()) {
            Doctor doctor = docOpt.get();
            return new org.springframework.security.core.userdetails.User(
                    doctor.getEmail(),
                    doctor.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_DOCTOR"))
            );
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
