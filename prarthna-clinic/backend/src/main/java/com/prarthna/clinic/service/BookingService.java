package com.prarthna.clinic.service;

import com.prarthna.clinic.dto.Dto.*;
import com.prarthna.clinic.entity.Booking;
import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.exception.BadRequestException;
import com.prarthna.clinic.exception.ResourceNotFoundException;
import com.prarthna.clinic.repository.BookingRepository;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DoctorRepository  doctorRepository;
    private final UserRepository    userRepository;
    private final DoctorService     doctorService;

    @Transactional
    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getIsApproved() != Doctor.ApprovalStatus.approved) {
            throw new BadRequestException("Doctor is not available for appointments");
        }

        Booking booking = Booking.builder()
                .doctor(doctor)
                .user(user)
                .appointmentDate(request.getAppointmentDate())
                .timeSlot(request.getTimeSlot())
                .reason(request.getReason())
                .ticketPrice(doctor.getTicketPrice())
                .status(Booking.BookingStatus.pending)
                .isPaid(false)
                .build();

        // Increment total patients
        doctor.setTotalPatients(doctor.getTotalPatients() == null ? 1 : doctor.getTotalPatients() + 1);
        doctorRepository.save(doctor);

        return toResponse(bookingRepository.save(booking));
    }

    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserIdOrderByAppointmentDateDesc(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<BookingResponse> getDoctorBookings(String doctorEmail) {
        Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        return bookingRepository.findByDoctorIdOrderByAppointmentDateDesc(doctor.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public BookingResponse updateStatus(Long id, String status, String email) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.valueOf(status));
        return toResponse(bookingRepository.save(booking));
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ─── Mapper ─────────────────────────────────────────────

    private BookingResponse toResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .doctor(doctorService.toResponse(b.getDoctor()))
                .user(UserResponse.builder()
                        .id(b.getUser().getId()).name(b.getUser().getName())
                        .email(b.getUser().getEmail()).phone(b.getUser().getPhone())
                        .photo(b.getUser().getPhoto()).role(b.getUser().getRole().name())
                        .build())
                .appointmentDate(b.getAppointmentDate())
                .timeSlot(b.getTimeSlot())
                .reason(b.getReason())
                .ticketPrice(b.getTicketPrice())
                .status(b.getStatus())
                .isPaid(b.getIsPaid())
                .createdAt(b.getCreatedAt())
                .build();
    }
}
