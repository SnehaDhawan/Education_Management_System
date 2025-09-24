package com.EduManage.Admin.service;


import com.EduManage.Admin.domain.entity.Trainer;
import com.EduManage.Admin.domain.request.TrainerRequest;
import com.EduManage.Admin.repository.TrainerRepository;
import com.EduManage.Admin.utility.CodeGenerate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private CodeGenerate codeGenerate;


    @Transactional
    public String saveTrainer(TrainerRequest trainerRequest) {
        Trainer trainer = new Trainer();
        trainer.setTrainerName(trainerRequest.getTrainerName());
        trainer.setEmail(trainerRequest.getEmail());
        trainer.setPassword(trainerRequest.getPassword());
        trainer.setMobileNo(trainerRequest.getMobileNo());
        trainer.setSpecialization(trainerRequest.getSpecialization());
        String generatedCode = codeGenerate.generateCode("trainers", "trainer_id", "TRN");
        trainer.setTrainerId(generatedCode);
        trainerRepository.save(trainer);
        return generatedCode;
    }


    // ✅ Get All Trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // ✅ Update Trainer
    public Trainer updateTrainer(String trainerId, Trainer trainerDetails) {
        Trainer existingTrainer = trainerRepository.findByTrainerId(trainerId).orElseThrow(()
                -> new RuntimeException("Trainer not found with id " + trainerId));

        existingTrainer.setTrainerName(trainerDetails.getTrainerName());
        existingTrainer.setEmail(trainerDetails.getEmail());
        existingTrainer.setPassword(trainerDetails.getPassword());
        existingTrainer.setMobileNo(trainerDetails.getMobileNo());
        existingTrainer.setSpecialization(trainerDetails.getSpecialization());

        return trainerRepository.save(existingTrainer);
    }

    // ✅ Delete Trainer
    public void deleteTrainer(String trainerId) {
        Trainer trainer = trainerRepository.findByTrainerId(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id " + trainerId));
        trainerRepository.delete(trainer);
    }
}
