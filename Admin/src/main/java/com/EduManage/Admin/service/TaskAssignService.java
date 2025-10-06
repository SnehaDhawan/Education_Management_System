package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.repository.TaskAssignRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskAssignService {

    private final TaskAssignRepository repository;

    public TaskAssignService(TaskAssignRepository repository) {
        this.repository = repository;
    }

    public TaskAssign saveTask(TaskAssign taskAssign) {
        return repository.save(taskAssign);
    }

    public List<TaskAssign> getAllTasks() {
        return repository.findAll();
    }
}

