package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.TaskAssign;
import com.EduManage.Admin.domain.request.AttendanceRequest;
import com.EduManage.Admin.service.TaskAssignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/admin/tasks")
public class TaskAssignController {

    @Autowired
    private TaskAssignService taskAssignService;

    // ✅ Save or update a task
    @PostMapping("/save")
    public ResponseEntity<TaskAssign> saveTask(@RequestBody TaskAssign taskAssign) {
        TaskAssign savedTask = taskAssignService.saveTask(taskAssign);
        return ResponseEntity.ok(savedTask);
    }

    // ✅ Get all tasks
    @GetMapping("/all")
    public ResponseEntity<List<TaskAssign>> getAllTasks() {
        List<TaskAssign> tasks = taskAssignService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // ✅ Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<TaskAssign>> getTaskById(@PathVariable int id) {
        Optional<TaskAssign> task = taskAssignService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    // ✅ Get tasks by Trainer ID
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<TaskAssign>> getTasksByTrainer(@PathVariable String trainerId) {
        List<TaskAssign> tasks = taskAssignService.getTasksByTrainerId(trainerId);
        return ResponseEntity.ok(tasks);
    }

    // ✅ Get tasks by Student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<TaskAssign>> getTasksByStudent(@PathVariable String studentId) {
        List<TaskAssign> tasks = taskAssignService.getTasksByStudentId(studentId);
        return ResponseEntity.ok(tasks);
    }

    // ✅ Delete task by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable int id) {
        taskAssignService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully with ID: " + id);
    }
}
