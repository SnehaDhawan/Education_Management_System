package com.EduManage.Admin.Controller;

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
import java.util.Optional;

@RestController
@RequestMapping("/admin/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createStudent(@RequestBody StudentRequest studentRequest) {
        String generatedId = studentService.saveStudent(studentRequest); // return code from service
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student created successfully");
        response.put("studentId", generatedId);  // also return the generated code if needed
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getStudentList(){
        List<Student> studentList = studentService.funGetStudentList();
        System.out.println(studentList);
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }

    @GetMapping("/getBy/{studentId}")
    public ResponseEntity<?> getStudentByStudentId(@PathVariable String studentId) {
        Optional<Student> student = studentService.getStudentByStudentId(studentId);

        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Student not found with ID: " + studentId);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

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
