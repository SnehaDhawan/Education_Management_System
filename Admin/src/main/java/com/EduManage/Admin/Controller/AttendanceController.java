package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.Attendance;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;



    // Bulk save
    @PostMapping("/save")
    public ResponseEntity<?> saveBulk(@RequestBody  List<AttendanceRequest> requests) {
        List<Attendance> saved = attendanceService.saveAll(requests);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/student/{studentId}")
    public List<Object> getAttendanceByStudentId(@PathVariable String studentId) {
        List<Attendance> records = attendanceService.getAttendanceByStudentId(studentId);
        return records.stream()
                .map(record -> new Object() {
                    public String date = record.getDate().toString();
                    public String status = record.getStatus();
                })
                .collect(Collectors.toList());
    }


}
