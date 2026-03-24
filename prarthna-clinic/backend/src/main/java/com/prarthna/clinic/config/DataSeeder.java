package com.prarthna.clinic.config;

import com.prarthna.clinic.entity.Doctor;
import com.prarthna.clinic.entity.TimeSlot;
import com.prarthna.clinic.entity.User;
import com.prarthna.clinic.repository.DoctorRepository;
import com.prarthna.clinic.repository.TimeSlotRepository;
import com.prarthna.clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository    userRepository;
    private final DoctorRepository  doctorRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final PasswordEncoder   passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedDoctors();
        log.info("✅ Prarthna Clinic — data seeding complete");
    }

    private void seedAdmin() {
        if (userRepository.existsByEmail("admin@prartnaclinic.in")) return;

        User admin = User.builder()
                .name("Admin")
                .email("admin@prartnaclinic.in")
                .password(passwordEncoder.encode("Admin@123"))
                .role(User.Role.admin)
                .phone("+91-129-400-0000")
                .build();
        userRepository.save(admin);
        log.info("👤 Admin seeded — admin@prartnaclinic.in / Admin@123");
    }

    private void seedDoctors() {
        if (doctorRepository.existsByEmail("paritosh@prartnaclinic.in")) return;

        // Dr. Paritosh Mishra
        Doctor dr1 = Doctor.builder()
                .name("Dr. Paritosh Mishra")
                .email("paritosh@prartnaclinic.in")
                .password(passwordEncoder.encode("Doctor@123"))
                .phone("+91-98765-00001")
                .specialization("General Physician")
                .qualification("MBBS")
                .hospital("Sun Rise Hospital, Faridabad")
                .bio("Senior Physician & Founder of Prarthna Clinic")
                .about("Dr. Paritosh Mishra is a senior physician with over 20 years of experience treating patients across Delhi NCR. Founder of Prarthna Clinic, he specialises in general medicine, diabetes management, and hypertension.")
                .experience(20)
                .ticketPrice(500.0)
                .averageRating(4.9)
                .totalRating(872)
                .totalPatients(2000)
                .isApproved(Doctor.ApprovalStatus.approved)
                .build();
        Doctor saved1 = doctorRepository.save(dr1);

        timeSlotRepository.saveAll(List.of(
                TimeSlot.builder().doctor(saved1).day("Monday").startTime("11:00").endTime("14:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Monday").startTime("15:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Tuesday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Wednesday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Thursday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Friday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Saturday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved1).day("Sunday").startTime("11:00").endTime("14:00").isAvailable(true).build()
        ));

        // Dr. Rajni Mishra
        Doctor dr2 = Doctor.builder()
                .name("Dr. Rajni Mishra")
                .email("rajni@prartnaclinic.in")
                .password(passwordEncoder.encode("Doctor@123"))
                .phone("+91-98765-00002")
                .specialization("Dentist")
                .qualification("BDS")
                .hospital("Prarthna Clinic, Tigri Colony, Delhi")
                .bio("Dental Specialist with 15+ years experience")
                .about("Dr. Rajni Mishra is a BDS-qualified dental specialist with expertise in cosmetic dentistry, orthodontics, root canal treatment, and paediatric dentistry. Known for her gentle approach with patients of all ages.")
                .experience(15)
                .ticketPrice(400.0)
                .averageRating(4.8)
                .totalRating(272)
                .totalPatients(1500)
                .isApproved(Doctor.ApprovalStatus.approved)
                .build();
        Doctor saved2 = doctorRepository.save(dr2);

        timeSlotRepository.saveAll(List.of(
                TimeSlot.builder().doctor(saved2).day("Monday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Tuesday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Wednesday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Thursday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Friday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Saturday").startTime("11:00").endTime("19:00").isAvailable(true).build(),
                TimeSlot.builder().doctor(saved2).day("Sunday").startTime("11:00").endTime("14:00").isAvailable(true).build()
        ));

        log.info("👨‍⚕️ Doctors seeded — paritosh@prartnaclinic.in & rajni@prartnaclinic.in / Doctor@123");
    }
}
