package com.EduManage.Admin.repository;

import com.EduManage.Admin.domain.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance ,Integer> {
    List<Attendance> findByStudentId(String studentId);
}
