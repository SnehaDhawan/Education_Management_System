package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.Trainer;
import com.EduManage.Admin.domain.request.TrainerRequest;
import com.EduManage.Admin.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;
    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createTrainer(@RequestBody TrainerRequest trainerRequest) {
        String generatedId = trainerService.saveTrainer(trainerRequest); // return code from service
        Map<String, String> response = new HashMap<>();
        response.put("message", "Trainer created successfully");
        response.put("trainerId", generatedId);  // return generated code
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Trainer>> getTrainerList(){
        List<Trainer> trainerList = trainerService.getAllTrainers();
        return new ResponseEntity<>(trainerList, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable String id, @RequestBody Trainer trainer) {
        Trainer updatedTrainer = trainerService.updateTrainer(id, trainer);
        return ResponseEntity.ok(updatedTrainer);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable("id") String trainerId) {
        trainerService.deleteTrainer(trainerId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/getBy/{trainerId}")
    public ResponseEntity<?> getTrainerByTrainerId(@PathVariable String trainerId) {
        return trainerService.getTrainerByTrainerId(trainerId)
                .<ResponseEntity<?>>map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK))
                .orElseGet(() -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Trainer not found with ID: " + trainerId);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                });
    }


}
