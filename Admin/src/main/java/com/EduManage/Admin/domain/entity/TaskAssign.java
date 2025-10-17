package com.EduManage.Admin.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "taskassignhd")
public class TaskAssign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id; // Primary Key - Auto Increment

    @Column(name = "task_id", nullable = false, unique = true)
    private String taskId; // Unique business identifier (not auto increment

    @Column(name = "trainer_id", nullable = false)
    private String trainerId;

    @Column(name = "batch_id", nullable = false)
    private String batchId;

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

    @OneToMany(mappedBy = "taskAssign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskDetails> taskDetails;
}
