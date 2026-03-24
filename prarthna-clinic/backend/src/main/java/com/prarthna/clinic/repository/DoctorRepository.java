package com.prarthna.clinic.repository;

import com.prarthna.clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByEmail(String email);
    Boolean existsByEmail(String email);

    List<Doctor> findByIsApproved(Doctor.ApprovalStatus status);

    @Query("SELECT d FROM Doctor d WHERE " +
           "(:specialization IS NULL OR LOWER(d.specialization) LIKE LOWER(CONCAT('%', :specialization, '%'))) AND " +
           "(:search IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.specialization) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "d.isApproved = 'approved'")
    List<Doctor> searchDoctors(@Param("specialization") String specialization,
                               @Param("search") String search);
}
