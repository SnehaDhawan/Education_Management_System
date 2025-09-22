package com.EduManage.Admin.Controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.EduManage.Admin.domain.entity.Student;
import com.EduManage.Admin.domain.request.StudentRequest;
import com.EduManage.Admin.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createStudent(@RequestBody StudentRequest studentRequest) {
        studentService.saveStudent(studentRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student created successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getStudentList(){
        List<Student> studentList = studentService.funGetStudentList();
        System.out.println(studentList);
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }


    // Update a student
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable String  id, @RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(id, student);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") String studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }


}
