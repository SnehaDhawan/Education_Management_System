package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.repository.TaskAssignRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskAssignService {

        @Autowired
        private TaskAssignRepository taskAssignRepository;

        // ✅ Save or update a task assignment
        public TaskAssign saveTask(TaskAssign taskAssign) {
            return taskAssignRepository.save(taskAssign);
        }

        // ✅ Get all tasks
        public List<TaskAssign> getAllTasks() {
            return taskAssignRepository.findAll();
        }

        // ✅ Get task by ID
        public Optional<TaskAssign> getTaskById(int id) {
            return taskAssignRepository.findById(id);
        }

        // ✅ Get tasks by trainer ID
        public List<TaskAssign> getTasksByTrainerId(String trainerId) {
            return taskAssignRepository.findByTrainerId(trainerId);
        }

        // ✅ Get tasks by student ID
        public List<TaskAssign> getTasksByStudentId(String studentId) {
            return taskAssignRepository.findByStudentId(studentId);
        }

        // ✅ Delete task by ID
        public void deleteTask(int id) {
            taskAssignRepository.deleteById(id);
        }
    }




