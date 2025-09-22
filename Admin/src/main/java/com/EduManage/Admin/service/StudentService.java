package com.EduManage.Admin.service;
import com.EduManage.Admin.domain.request.StudentRequest;

import com.EduManage.Admin.domain.entity.Student;
import com.EduManage.Admin.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Student> funGetStudentList() {
    return  studentRepository.findAll();
    }

    public Student updateStudent(String studentId, Student studentDetails) {
        Student existingStudent = studentRepository.findByStudentId(studentId.trim()).orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));
        existingStudent.setStudentName(studentDetails.getStudentName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setPassword(studentDetails.getPassword());
        existingStudent.setMobileNo(studentDetails.getMobileNo());
        existingStudent.setStudentClass(studentDetails.getStudentClass());
        return studentRepository.save(existingStudent);
    }


    public void deleteStudent(String studentId) {
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));
        studentRepository.delete(student);
    }

}
