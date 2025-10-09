package com.EduManage.Admin.service;


import com.EduManage.Admin.domain.entity.Attendance;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.repository.AttendanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Transactional
    public List<Attendance> saveAll(List<AttendanceRequest> requests) {
        List<Attendance> toSave = new ArrayList<>();

        for (AttendanceRequest r : requests) {
            Attendance attendance = new Attendance();
            attendance.setTrainerId(r.getTrainerId());
            attendance.setBatchId(r.getBatchId());
            attendance.setStudentId(r.getStudentId());
            attendance.setDate(LocalDate.parse(r.getDate())); // convert String -> LocalDate
            attendance.setStatus(r.getStatus());
            toSave.add(attendance);
        }
        return attendanceRepository.saveAll(toSave);
    }



    public List<Attendance> getAttendanceByStudentId(String studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
}
