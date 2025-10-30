package com.EduManage.Admin.repository;

import com.EduManage.Admin.domain.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student , Integer> {
    Optional<Student> findByStudentId(String studentId);

    void deleteByStudentId(String id);

    @Query("SELECT s.studentName FROM Student s WHERE s.studentId = :studentId")
    String findNameByStudentId(@Param("studentId") String studentId);
}
