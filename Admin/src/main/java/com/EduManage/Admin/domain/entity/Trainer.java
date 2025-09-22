package com.EduManage.Admin.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "trainers")
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "trainer_id", nullable = false, unique = true)
    private String trainerId;

    @Column(name = "trainer_name", nullable = false)
    private String trainerName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "mobile_no", nullable = false, unique = true)
    private Long mobileNo;

    @Column(name = "subject_specialization", nullable = false)
    private String specialization;
}
