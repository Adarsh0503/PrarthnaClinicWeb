package com.prarthna.clinic.controller;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.repository.UserRepository;
import com.prarthna.clinic.service.BookingService;
import com.prarthna.clinic.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final DoctorService     doctorService;
    private final BookingService    bookingService;
    private final UserRepository    userRepository;

    @GetMapping("/doctors")
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors() {
        return ResponseEntity.ok(ApiResponse.ok("All doctors fetched", doctorService.getAllDoctors()));
    }

    @PatchMapping("/doctors/{id}/approve")
    public ResponseEntity<ApiResponse<DoctorResponse>> approveDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Doctor approved",
                doctorService.updateApprovalStatus(id, "approved")));
    }

    @PatchMapping("/doctors/{id}/reject")
    public ResponseEntity<ApiResponse<DoctorResponse>> rejectDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Doctor rejected",
                doctorService.updateApprovalStatus(id, "cancelled")));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(u -> UserResponse.builder()
                        .id(u.getId()).name(u.getName()).email(u.getEmail())
                        .phone(u.getPhone()).photo(u.getPhoto()).role(u.getRole().name())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("Users fetched", users));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {
        return ResponseEntity.ok(ApiResponse.ok("All bookings fetched", bookingService.getAllBookings()));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Object>> getStats() {
        long totalUsers    = userRepository.count();
        long totalDoctors  = doctorService.getAllDoctors().size();
        long totalBookings = bookingService.getAllBookings().size();

        var stats = new java.util.HashMap<String, Object>();
        stats.put("totalUsers",    totalUsers);
        stats.put("totalDoctors",  totalDoctors);
        stats.put("totalBookings", totalBookings);

        return ResponseEntity.ok(ApiResponse.ok("Stats fetched", stats));
    }
}
