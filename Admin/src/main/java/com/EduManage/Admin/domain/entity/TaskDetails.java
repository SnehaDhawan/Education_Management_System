package com.EduManage.Admin.domain.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "taskassigndtl")
public class TaskDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "student_id", nullable = false)
    private String studentId;

    @Column(name = "task_submit_date")
    private LocalDate taskSubmitDate;

    @Column(name = "task_submit_status")
    private String taskSubmitStatus; // e.g., Submitted, Pending, Completed

    @Column(name = "batch_id", nullable = false)
    private String batchId;

    // New column to store student code
    @Column(name = "task_solution", columnDefinition = "TEXT")
    private String taskSolution;

    // Many TaskDetails belong to one TaskAssignHd
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", referencedColumnName = "task_id")
    private TaskAssign taskAssign;
}
