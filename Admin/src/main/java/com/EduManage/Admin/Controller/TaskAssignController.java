package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.domain.entity.TaskDetails;
import com.EduManage.Admin.domain.request.TaskAssignRequest;
import com.EduManage.Admin.service.TaskAssignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/tasks")
public class TaskAssignController {

    @Autowired
    private TaskAssignService taskAssignService;

//    @PostMapping("/save")
//    public ResponseEntity<TaskAssign> saveTaskAssign(@RequestBody TaskAssignRequest request) {
//        TaskAssign savedTask = taskAssignService.saveTaskAssign(request);
//        return ResponseEntity.ok(savedTask);
//    }



    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveTaskAssign(@RequestBody TaskAssignRequest request) {
        TaskAssign savedTask = taskAssignService.saveTaskAssign(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "✅ Task assigned successfully");
        response.put("taskId", savedTask.getTaskId());
        response.put("batchId", savedTask.getBatchId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/student/{studentId}")
    public List<TaskDetails> getTasksByStudentId(@PathVariable String studentId) {
        return taskAssignService.getTasksByStudentId(studentId);
    }

}
