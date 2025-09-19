package com.EduManage.Admin.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;  // Primary key

    @Column(name = "student_id", nullable = false, unique = true)
    private Integer studentId;  // Business identifier, unique

    @Column(name = "student_name", nullable = false, length = 255)
    private String studentName;

    @Column(name = "email", nullable = false, length = 255, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "mobile_no", nullable = false, unique = true)
    private Long mobileNo;

    @Column(name = "`class`", nullable = false, length = 255)  // Escaped class keyword
    private String studentClass;
}
