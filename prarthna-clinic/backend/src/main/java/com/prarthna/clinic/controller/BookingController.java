package com.prarthna.clinic.controller;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody BookingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Appointment booked",
                bookingService.createBooking(request, userDetails.getUsername())));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Bookings fetched",
                bookingService.getMyBookings(userDetails.getUsername())));
    }

    @GetMapping("/doctor")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getDoctorBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Doctor bookings fetched",
                bookingService.getDoctorBookings(userDetails.getUsername())));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<BookingResponse>> approveBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Booking approved",
                bookingService.updateStatus(id, "approved", userDetails.getUsername())));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok("Booking cancelled",
                bookingService.updateStatus(id, "cancelled", userDetails.getUsername())));
    }
}