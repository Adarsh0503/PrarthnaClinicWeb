package com.prarthna.clinic.service;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.TimeSlot;
import com.prarthna.clinic.exception.ResourceNotFoundException;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.ReviewRepository;
import com.prarthna.clinic.repository.TimeSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository   doctorRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ReviewRepository   reviewRepository;

    @Transactional(readOnly = true)
    public List<DoctorResponse> getAllApprovedDoctors(String specialization, String search) {
        List<Doctor> doctors;
        if (specialization != null || search != null) {
            doctors = doctorRepository.searchDoctors(specialization, search);
        } else {
            doctors = doctorRepository.findByIsApproved(Doctor.ApprovalStatus.approved);
        }
        return doctors.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
        return toResponseWithReviews(doctor);
    }

    @Transactional
    public DoctorResponse updateDoctor(Long id, DoctorUpdateRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (request.getName() != null)           doctor.setName(request.getName());
        if (request.getPhone() != null)          doctor.setPhone(request.getPhone());
        if (request.getSpecialization() != null) doctor.setSpecialization(request.getSpecialization());
        if (request.getQualification() != null)  doctor.setQualification(request.getQualification());
        if (request.getHospital() != null)       doctor.setHospital(request.getHospital());
        if (request.getBio() != null)            doctor.setBio(request.getBio());
        if (request.getAbout() != null)          doctor.setAbout(request.getAbout());
        if (request.getExperience() != null)     doctor.setExperience(request.getExperience());
        if (request.getTicketPrice() != null)    doctor.setTicketPrice(request.getTicketPrice());

        if (request.getTimeSlots() != null) {
            timeSlotRepository.deleteAll(timeSlotRepository.findByDoctorId(id));
            List<TimeSlot> slots = request.getTimeSlots().stream().map(dto -> TimeSlot.builder()
                    .doctor(doctor)
                    .day(dto.getDay())
                    .startTime(dto.getStartTime())
                    .endTime(dto.getEndTime())
                    .isAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true)
                    .build()
            ).collect(Collectors.toList());
            timeSlotRepository.saveAll(slots);
        }

        return toResponse(doctorRepository.save(doctor));
    }

    @Transactional(readOnly = true)
    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public DoctorResponse updateApprovalStatus(Long id, String status) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        doctor.setIsApproved(Doctor.ApprovalStatus.valueOf(status));
        return toResponse(doctorRepository.save(doctor));
    }

    @Transactional
    public void updateAverageRating(Long doctorId) {
        Double avg = reviewRepository.findAverageRatingByDoctorId(doctorId);
        doctorRepository.findById(doctorId).ifPresent(d -> {
            d.setAverageRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);
            d.setTotalRating(reviewRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId).size());
            doctorRepository.save(d);
        });
    }

    @Transactional(readOnly = true)
    public DoctorResponse toResponse(Doctor d) {
        List<TimeSlotDto> slots = List.of();
        try {
            if (d.getTimeSlots() != null) {
                slots = d.getTimeSlots().stream().map(ts -> new TimeSlotDto(
                        ts.getId(), ts.getDay(), ts.getStartTime(),
                        ts.getEndTime(), ts.getIsAvailable()
                )).collect(Collectors.toList());
            }
        } catch (Exception ignored) {}

        return DoctorResponse.builder()
                .id(d.getId()).name(d.getName()).email(d.getEmail())
                .phone(d.getPhone()).photo(d.getPhoto())
                .specialization(d.getSpecialization()).qualification(d.getQualification())
                .hospital(d.getHospital()).bio(d.getBio()).about(d.getAbout())
                .experience(d.getExperience()).ticketPrice(d.getTicketPrice())
                .averageRating(d.getAverageRating()).totalRating(d.getTotalRating())
                .totalPatients(d.getTotalPatients()).isApproved(d.getIsApproved())
                .timeSlots(slots)
                .reviews(List.of())
                .build();
    }

    @Transactional(readOnly = true)
    public DoctorResponse toResponseWithReviews(Doctor d) {
        DoctorResponse resp = toResponse(d);
        try {
            if (d.getReviews() != null) {
                resp.setReviews(d.getReviews().stream().map(r -> ReviewResponse.builder()
                        .id(r.getId()).rating(r.getRating()).reviewText(r.getReviewText())
                        .userName(r.getUser().getName()).userPhoto(r.getUser().getPhoto())
                        .createdAt(r.getCreatedAt())
                        .build()
                ).collect(Collectors.toList()));
            }
        } catch (Exception ignored) {}
        return resp;
    }
}