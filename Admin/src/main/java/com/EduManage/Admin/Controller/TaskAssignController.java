package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.service.TaskAssignService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tasks")
public class TaskAssignController {


    private final TaskAssignService service;

    public TaskAssignController(TaskAssignService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public TaskAssign saveTask(@RequestBody TaskAssign taskAssign) {
        return service.saveTask(taskAssign);
    }

    @GetMapping("/all")
    public List<TaskAssign> getAllTasks() {
        return service.getAllTasks();
    }

}
