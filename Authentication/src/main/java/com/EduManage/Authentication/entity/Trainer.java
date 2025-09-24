package com.EduManage.Authentication.entity;


import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
    @Table(name = "trainers")
    public class Trainer {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name="trainer_id", nullable=false)
        private String trainerId;

        @Column(name="trainer_name", nullable=false)
        private String trainerName;

        @Column(nullable=false, unique=true)
        private String email;

        @Column(nullable=false)
        private String password;

        @Column(name="mobile_no", nullable=false, unique=true)
        private Long mobileNo;

        @Column(name="subject_specialization", nullable=false)
        private String subjectSpecialization;



}
