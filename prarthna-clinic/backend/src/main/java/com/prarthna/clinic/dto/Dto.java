package com.prarthna.clinic.dto;

import com.prarthna.clinic.entity.Booking;
import com.prarthna.clinic.entity.Doctor;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class Dto {

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank @Size(min = 6)
        private String password;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class RegisterRequest {
        @NotBlank @Size(min = 2)
        private String name;
        @NotBlank @Email
        private String email;
        @NotBlank @Size(min = 6)
        private String password;
        private String phone;
        @NotNull
        private String role;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class AuthResponse {
        private String token;
        private String role;
        private Long id;
        private String name;
        private String email;
        private String message;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String photo;
        private String gender;
        private String bloodType;
        private String role;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class DoctorResponse {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String photo;
        private String specialization;
        private String qualification;
        private String hospital;
        private String bio;
        private String about;
        private Integer experience;
        private Double ticketPrice;
        private Double averageRating;
        private Integer totalRating;
        private Integer totalPatients;
        private Doctor.ApprovalStatus isApproved;
        private List<TimeSlotDto> timeSlots;
        private List<ReviewResponse> reviews;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class DoctorUpdateRequest {
        private String name;
        private String phone;
        private String specialization;
        private String qualification;
        private String hospital;
        private String bio;
        private String about;
        private Integer experience;
        private Double ticketPrice;
        private List<TimeSlotDto> timeSlots;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class TimeSlotDto {
        private Long id;
        @NotBlank private String day;
        @NotBlank private String startTime;
        @NotBlank private String endTime;
        private Boolean isAvailable;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class BookingRequest {
        @NotNull  private Long doctorId;
        @NotNull  private LocalDate appointmentDate;
        @NotBlank private String timeSlot;
        private String reason;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class BookingResponse {
        private Long id;
        private DoctorResponse doctor;
        private UserResponse user;
        private LocalDate appointmentDate;
        private String timeSlot;
        private String reason;
        private Double ticketPrice;
        private Booking.BookingStatus status;
        private Boolean isPaid;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ReviewRequest {
        @NotNull @Min(1) @Max(5)
        private Integer rating;
        @NotBlank
        private String reviewText;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ReviewResponse {
        private Long id;
        private Integer rating;
        private String reviewText;
        private String userName;
        private String userPhoto;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        public static <T> ApiResponse<T> ok(String message, T data) {
            return new ApiResponse<>(true, message, data);
        }

        public static <T> ApiResponse<T> error(String message) {
            return new ApiResponse<>(false, message, null);
        }
    }
}
