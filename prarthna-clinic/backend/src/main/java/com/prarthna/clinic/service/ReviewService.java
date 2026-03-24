package com.prarthna.clinic.service;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.Review;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.exception.BadRequestException;
import com.prarthna.clinic.exception.ResourceNotFoundException;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.ReviewRepository;
import com.prarthna.clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository   userRepository;
    private final DoctorService    doctorService;

    @Transactional
    public ReviewResponse createReview(Long doctorId, ReviewRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (reviewRepository.existsByDoctorIdAndUserId(doctorId, user.getId())) {
            throw new BadRequestException("You have already reviewed this doctor");
        }

        Review review = Review.builder()
                .doctor(doctor).user(user)
                .rating(request.getRating())
                .reviewText(request.getReviewText())
                .build();

        reviewRepository.save(review);
        doctorService.updateAverageRating(doctorId);

        return toResponse(review);
    }

    public List<ReviewResponse> getDoctorReviews(Long doctorId) {
        return reviewRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public void deleteReview(Long reviewId, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getUser().getEmail().equals(userEmail)) {
            throw new BadRequestException("Not authorized to delete this review");
        }

        Long doctorId = review.getDoctor().getId();
        reviewRepository.delete(review);
        doctorService.updateAverageRating(doctorId);
    }

    private ReviewResponse toResponse(Review r) {
        return ReviewResponse.builder()
                .id(r.getId()).rating(r.getRating())
                .reviewText(r.getReviewText())
                .userName(r.getUser().getName())
                .userPhoto(r.getUser().getPhoto())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
