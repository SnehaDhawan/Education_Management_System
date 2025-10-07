package com.EduManage.Admin.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "task_assign")
public class TaskAssign {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "task_id", nullable = false)
    private  String task;

    @Column(name = "task_Name", nullable = false)
    private  String taskName;
    
    @Column(name = "assignedDate")
    private LocalDate assignedDate;

    @Column(name = "dueDate")
    private LocalDate dueDate;

    @Column(name = "trainer_id", nullable = false)
    private String trainer;

    @Column(name = "batch_id", nullable = false)
    private String batch;

}

