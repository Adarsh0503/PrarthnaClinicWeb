package com.prarthna.clinic.repository;

import com.prarthna.clinic.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByDoctorIdAndIsAvailable(Long doctorId, Boolean isAvailable);
    List<TimeSlot> findByDoctorId(Long doctorId);
}
