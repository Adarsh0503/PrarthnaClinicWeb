package com.prarthna.clinic.controller;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.exception.ResourceNotFoundException;
import com.prarthna.clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .photo(user.getPhoto())
                .gender(user.getGender())
                .bloodType(user.getBloodType())
                .role(user.getRole().name())
                .build();

        return ResponseEntity.ok(ApiResponse.ok("Profile fetched", response));
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @RequestBody UserResponse request,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getName()      != null) user.setName(request.getName());
        if (request.getPhone()     != null) user.setPhone(request.getPhone());
        if (request.getGender()    != null) user.setGender(request.getGender());
        if (request.getBloodType() != null) user.setBloodType(request.getBloodType());

        userRepository.save(user);

        UserResponse response = UserResponse.builder()
                .id(user.getId()).name(user.getName()).email(user.getEmail())
                .phone(user.getPhone()).photo(user.getPhoto())
                .gender(user.getGender()).bloodType(user.getBloodType())
                .role(user.getRole().name())
                .build();

        return ResponseEntity.ok(ApiResponse.ok("Profile updated", response));
    }
}
