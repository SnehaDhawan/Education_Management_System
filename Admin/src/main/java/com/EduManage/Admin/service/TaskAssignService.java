package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.domain.entity.TaskDetails;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.domain.request.TaskAssignRequest;
import com.EduManage.Admin.repository.TaskAssignRepository;
import com.EduManage.Admin.repository.TaskDetailsRepository;
import com.EduManage.Admin.utility.CodeGenerate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskAssignService {
    @Autowired
    private CodeGenerate codeGenerate;


        @Autowired
        private TaskAssignRepository taskAssignRepository;

        @Autowired
        private TaskDetailsRepository taskDetailsRepository;

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


    }




