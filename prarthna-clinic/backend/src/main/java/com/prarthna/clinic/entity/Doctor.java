package com.prarthna.clinic.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "doctors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String phone;
    private String photo;
    private String specialization;
    private String qualification;
    private String hospital;

    @Column(length = 100)
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String about;

    private Integer experience;
    private Double ticketPrice;

    @Column(name = "average_rating")
    private Double averageRating = 0.0;

    @Column(name = "total_rating")
    private Integer totalRating = 0;

    @Column(name = "total_patients")
    private Integer totalPatients = 0;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus isApproved = ApprovalStatus.pending;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimeSlot> timeSlots;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    public enum ApprovalStatus { pending, approved, cancelled }
}
