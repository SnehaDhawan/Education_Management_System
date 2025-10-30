package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.domain.entity.TaskDetails;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.domain.request.TaskAssignRequest;
import com.EduManage.Admin.domain.request.TaskDetailsRequest;
import com.EduManage.Admin.domain.response.StudentTaskStatusDTO;
import com.EduManage.Admin.repository.StudentRepository;
import com.EduManage.Admin.repository.TaskAssignRepository;
import com.EduManage.Admin.repository.TaskDetailsRepository;
import com.EduManage.Admin.utility.CodeGenerate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskAssignService {
    @Autowired
    private CodeGenerate codeGenerate;


    @Autowired
    private TaskAssignRepository taskAssignRepository;

    @Autowired
    private TaskDetailsRepository taskDetailsRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public TaskAssign saveTaskAssign(TaskAssignRequest request) {
        TaskAssign taskAssign = new TaskAssign();

        // Generate Task ID using common method
        String generatedTaskId = codeGenerate.generateCode("taskassignhd", "task_id", "TASK");
        taskAssign.setTaskId(generatedTaskId);

        taskAssign.setTrainerId(request.getTrainerId());
        taskAssign.setBatchId(request.getBatchId());
        taskAssign.setTaskTitle(request.getTaskTitle());
        taskAssign.setTaskDescription(request.getTaskDescription());
        taskAssign.setAssignedDate(request.getAssignedDate());
        taskAssign.setDueDate(request.getDueDate());
        taskAssign.setStatus(request.getStatus());

        if (request.getTaskDetails() != null) {
            taskAssign.setTaskDetails(
                    request.getTaskDetails().stream().map(tdReq -> {
                        TaskDetails td = new TaskDetails();
                        td.setStudentId(tdReq.getStudentId());
                        td.setTaskSubmitDate(request.getAssignedDate()); // initially null
                        td.setTaskSubmitStatus(tdReq.getTaskSubmitStatus());
                        td.setBatchId(tdReq.getBatchId());
                        td.setTaskAssign(taskAssign); // link to parent
                        return td;
                    }).collect(Collectors.toList())
            );
        }

        return taskAssignRepository.save(taskAssign);
    }


    public List<TaskDetails> getTasksByStudentId(String studentId) {
        return taskDetailsRepository.findByStudentIdWithTask(studentId);
    }




    public TaskDetails updateSolution(TaskDetailsRequest request) {
        // 1️⃣ Fetch the existing TaskDetails by studentId and taskId
        TaskDetails existingTaskDetails = taskDetailsRepository
                .findByStudentIdAndTaskAssign_TaskId(request.getStudentId(), request.getTaskId())
                .orElseThrow(() -> new RuntimeException(
                        "No existing record found for studentId: " + request.getStudentId() +
                                " and taskId: " + request.getTaskId()));

        // 2️⃣ Update fields
        existingTaskDetails.setTaskSolution(request.getTaskSolution());
        existingTaskDetails.setTaskSubmitStatus("Submitted");
        existingTaskDetails.setTaskSubmitDate(LocalDate.now());

        return taskDetailsRepository.save(existingTaskDetails);
    }


//    public List<StudentTaskStatusDTO> getTaskStatusByBatch(String batchId) {
//        List<TaskDetails> taskDetailsList = taskDetailsRepository.findByBatchIdWithTasks(batchId);
//
//        // Map<studentId, StudentTaskStatusDTO>
//        Map<String, StudentTaskStatusDTO> resultMap = new LinkedHashMap<>();
//
//        for (TaskDetails td : taskDetailsList) {
//            String studentId = td.getStudentId();
//
//            StudentTaskStatusDTO dto = resultMap.getOrDefault(studentId, new StudentTaskStatusDTO());
//            dto.setStudentId(studentId);
//
//            // Fetch student name from student table if not already set
//            if (dto.getStudentName() == null) {
//                String studentName = studentRepository.findNameByStudentId(studentId);
//                dto.setStudentName(studentName);
//            }
//
//            if (dto.getStatuses() == null) {
//                dto.setStatuses(new LinkedHashMap<>());
//            }
//
//            // Map each task title → status
//            dto.getStatuses().put(td.getTaskAssign().getTaskTitle(), td.getTaskSubmitStatus());
//
//            resultMap.put(studentId, dto);
//        }
//
//        return new ArrayList<>(resultMap.values());
//    }

    public List<StudentTaskStatusDTO> getTaskStatusByBatch(String batchId) {
        List<TaskDetails> taskDetailsList = taskDetailsRepository.findByBatchIdWithTasks(batchId);

        Map<String, StudentTaskStatusDTO> studentMap = new LinkedHashMap<>();

        for (TaskDetails td : taskDetailsList) {
            String studentId = td.getStudentId();
            String taskTitle = td.getTaskAssign().getTaskTitle();
            String status = td.getTaskSubmitStatus();
            String solution = td.getTaskSolution();

            // Fetch student name
            String studentName = studentRepository.findNameByStudentId(studentId);

            // Create or update entry
            StudentTaskStatusDTO dto = studentMap.computeIfAbsent(studentId, id -> {
                StudentTaskStatusDTO newDto = new StudentTaskStatusDTO();
                newDto.setStudentId(studentId);
                newDto.setStudentName(studentName);
                newDto.setStatuses(new LinkedHashMap<>());
                return newDto;
            });

            // Store both status and solution in map
            dto.getStatuses().put(taskTitle, status + "|" + (solution != null ? solution : ""));
        }

        return new ArrayList<>(studentMap.values());
    }


}




