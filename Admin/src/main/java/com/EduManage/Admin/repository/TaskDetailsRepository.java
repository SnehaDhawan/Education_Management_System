package com.EduManage.Admin.repository;

import com.EduManage.Admin.domain.entity.TaskDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskDetailsRepository extends JpaRepository<TaskDetails ,Integer> {

    // Fetch all task details with header info based on studentId
    @Query("SELECT td FROM TaskDetails td JOIN FETCH td.taskAssign ta WHERE td.studentId = :studentId")
    List<TaskDetails> findByStudentIdWithTask(@org.springframework.data.repository.query.Param("studentId") String studentId);

}
