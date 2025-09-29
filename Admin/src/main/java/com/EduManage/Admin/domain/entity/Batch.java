package com.EduManage.Admin.domain.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "batch_id")
    private String batchId;

    @Column(name = "batch_name", nullable = false)
    private String batchName;

    @Column(name = "trainer_id")
    private String trainerId;

    @Column(name = "student_ids", columnDefinition = "TEXT")
    private String studentIds; // Comma separated list of student IDs

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "course")
    private String course;

    @Column(name = "schedule")
    private String schedule;


}
