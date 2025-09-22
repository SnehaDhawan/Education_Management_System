package com.EduManage.Admin.Controller;


import com.EduManage.Admin.domain.entity.Trainer;
import com.EduManage.Admin.domain.request.TrainerRequest;
import com.EduManage.Admin.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/trainer")
@CrossOrigin(origins = "http://localhost:4200")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createTrainer(@RequestBody TrainerRequest trainerRequest) {
        trainerService.saveTrainer(trainerRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Trainer created successfully");
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


}
