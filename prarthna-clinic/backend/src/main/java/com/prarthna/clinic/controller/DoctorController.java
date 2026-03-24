package com.prarthna.clinic.controller;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.service.DoctorService;
import com.prarthna.clinic.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;
    private final ReviewService reviewService;

    // ─── Public endpoints ─────────────────────────────────

    @GetMapping
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.ok("Doctors fetched",
                doctorService.getAllApprovedDoctors(specialization, search)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Doctor fetched", doctorService.getDoctorById(id)));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getDoctorReviews(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Reviews fetched", reviewService.getDoctorReviews(id)));
    }

    // ─── Doctor-only endpoints ─────────────────────────────

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateDoctor(
            @PathVariable Long id,
            @RequestBody DoctorUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Doctor updated", doctorService.updateDoctor(id, request)));
    }

    // ─── Authenticated user endpoints ─────────────────────

    @PostMapping("/{id}/reviews")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Review submitted",
                reviewService.createReview(id, request, userDetails.getUsername())));
    }

    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal UserDetails userDetails) {
        reviewService.deleteReview(reviewId, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Review deleted", null));
    }
}
