package com.EduManage.Admin.service;
import com.EduManage.Admin.domain.request.StudentRequest;

import com.EduManage.Admin.domain.entity.Student;
import com.EduManage.Admin.repository.StudentRepository;
import com.EduManage.Admin.utility.CodeGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService
{

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CodeGenerate codeGenerate;

    public String saveStudent(StudentRequest studentRequest) {
        Student student = new Student();
        student.setStudentName(studentRequest.getStudentName());
        student.setEmail(studentRequest.getEmail());
        student.setPassword(studentRequest.getPassword()); // TODO: encrypt later
        student.setMobileNo(studentRequest.getMobileNo());
        student.setStudentClass(studentRequest.getStudentClass());
        String generatedCode = codeGenerate.generateCode("students", "student_id","STU");
        student.setStudentId(generatedCode);
        studentRepository.save(student);
        return generatedCode;
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
