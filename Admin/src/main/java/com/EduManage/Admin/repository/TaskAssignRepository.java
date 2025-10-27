package com.EduManage.Admin.repository;
import com.EduManage.Admin.domain.entity.TaskAssign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskAssignRepository extends JpaRepository<TaskAssign, Integer> {

    List<TaskAssign> findByTrainerId(String trainerId);

    @Query("SELECT t FROM TaskAssign t WHERE t.taskId = :taskId")
    Optional<TaskAssign> findByTaskId(@org.springframework.data.repository.query.Param("taskId") String taskId);


}


