package com.EduManage.Admin.service;


import com.EduManage.Admin.domain.entity.Attendance;
import com.EduManage.Admin.domain.entity.Student;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.repository.AttendanceRepository;
import com.EduManage.Admin.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

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

    public byte[] generateAttendanceReportExcel() throws IOException {
        List<Attendance> attendances = attendanceRepository.findAll();
        List<Student> students = studentRepository.findAll();

        // --- Collect all distinct dates ---
        List<LocalDate> dates = attendances.stream()
                .map(Attendance::getDate)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Attendance Report");

        // --- Header Style (Bold + Background Color) ---
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // --- Header Row ---
        Row headerRow = sheet.createRow(0);
        Cell cell0 = headerRow.createCell(0);
        cell0.setCellValue("Student ID");
        cell0.setCellStyle(headerStyle);

        Cell cell1 = headerRow.createCell(1);
        cell1.setCellValue("Student Name");
        cell1.setCellStyle(headerStyle);

        int colIndex = 2;
        for (LocalDate date : dates) {
            Cell dateCell = headerRow.createCell(colIndex++);
            dateCell.setCellValue(date.toString());
            dateCell.setCellStyle(headerStyle);
        }

        // --- Add a blank row after header ---
        int rowIndex = 2; // Row index 1 will be blank
        sheet.createRow(1); // creates a blank row

        // --- Fill student rows ---
        for (Student student : students) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(student.getStudentId());
            row.createCell(1).setCellValue(student.getStudentName());

            int dateColumn = 2;
            for (LocalDate date : dates) {
                Optional<Attendance> attendanceOpt = attendances.stream()
                        .filter(a -> a.getStudentId().equals(student.getStudentId()) && a.getDate().equals(date))
                        .findFirst();

                String status = attendanceOpt.map(Attendance::getStatus).orElse("-");
                row.createCell(dateColumn++).setCellValue(status);
            }
        }

        // --- Auto-size columns ---
        for (int i = 0; i < dates.size() + 2; i++) {
            sheet.autoSizeColumn(i);
        }

        // --- Write to byte array ---
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return out.toByteArray();
    }

}
