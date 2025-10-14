package com.EduManage.Admin.repository;
import com.EduManage.Admin.domain.entity.TaskAssign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskAssignRepository extends JpaRepository<TaskAssign, Integer> {

    List<TaskAssign> findByTrainerId(String trainerId);

    List<TaskAssign> findByStudentId(String studentId);
}


