package com.EduManage.Authentication.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
    @Table(name = "students")
    public class Student {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name="student_id", nullable=false)
        private String studentId;

        @Column(name="student_name", nullable=false)
        private String studentName;

        @Column(nullable=false, unique=true)
        private String email;

        @Column(nullable=false)
        private String password;

        @Column(name="mobile_no", nullable=false, unique=true)
        private Long mobileNo;

        @Column(name="class", nullable=false)
        private String studentClass;
}
