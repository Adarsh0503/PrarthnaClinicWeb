package com.prarthna.clinic.repository;

import com.prarthna.clinic.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByDoctorId(Long doctorId);
    List<Booking> findByDoctorIdOrderByAppointmentDateDesc(Long doctorId);
    List<Booking> findByUserIdOrderByAppointmentDateDesc(Long userId);
}
