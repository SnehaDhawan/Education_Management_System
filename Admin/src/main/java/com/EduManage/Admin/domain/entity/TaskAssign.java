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
@Table(name = "task_assign")
public class TaskAssign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "trainer_id", nullable = false)
    private String trainerId;

    @Column(name = "batch_id", nullable = false)
    private String batchId;

    @Column(name = "student_id", nullable = false)
    private String studentId;

    @Column(name = "task_title", nullable = false)
    private String taskTitle;

    @Column(name = "task_description", columnDefinition = "TEXT")
    private String taskDescription;

    @Column(name = "assigned_date", nullable = false)
    private LocalDate assignedDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "status", nullable = false)
    private String status; // e.g. "Assigned", "Submitted", "Completed"
}
