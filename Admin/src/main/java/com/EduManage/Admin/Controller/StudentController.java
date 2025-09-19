package com.EduManage.Admin.Controller;

import com.EduManage.Admin.domain.request.StudentRequest;
import com.EduManage.Admin.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<String> createStudent(@RequestBody StudentRequest studentRequest) {
        studentService.saveStudent(studentRequest);
        return new ResponseEntity<>("Student created successfully", HttpStatus.CREATED);
    }
}
