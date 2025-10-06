package com.EduManage.Admin.repository;
import com.EduManage.Admin.domain.entity.TaskAssign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskAssignRepository extends JpaRepository<TaskAssign, Integer> {

//    // Find tasks assigned to a specific student
//    List<TaskAssign> findByStudent_StudentId(Long studentId);
//
//    // Find tasks assigned by a specific trainer
//    List<TaskAssign> findByTrainer_TrainerId(Long trainerId);
}

