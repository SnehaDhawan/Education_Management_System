package com.EduManage.Admin.service;
import com.EduManage.Admin.domain.request.StudentRequest;

import com.EduManage.Admin.domain.entity.Student;
import com.EduManage.Admin.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService
{

    @Autowired
    private StudentRepository studentRepository;

    public void saveStudent(StudentRequest studentRequest) {
        Student student = new Student();
        student.setStudentId(studentRequest.getStudentId());
        student.setStudentName(studentRequest.getStudentName());
        student.setEmail(studentRequest.getEmail());
        student.setPassword(studentRequest.getPassword()); // Add encryption later
        student.setMobileNo(studentRequest.getMobileNo());
        student.setStudentClass(studentRequest.getStudentClass());
        studentRepository.save(student);
    }
}
