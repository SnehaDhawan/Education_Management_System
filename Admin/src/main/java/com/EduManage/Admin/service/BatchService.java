package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.Batch;
import com.EduManage.Admin.domain.request.BatchRequest;
import com.EduManage.Admin.repository.BatchRepository;
import com.EduManage.Admin.utility.CodeGenerate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private CodeGenerate codeGenerate;

    @Transactional
    public String saveBatch(BatchRequest batchRequest) {
        Batch batch = new Batch();
        String generatedCode = codeGenerate.generateCode("batch", "batch_id", "BATCH");
        batch.setBatchId(generatedCode);
        batch.setBatchName(batchRequest.getBatchName());
        batch.setTrainerId(batchRequest.getTrainerId());
        batch.setStudentIds(String.join(",", batchRequest.getStudentIds()));
        batch.setStartDate(batchRequest.getStartDate());
        batch.setEndDate(batchRequest.getEndDate());
        batch.setCourse(batchRequest.getCourse());
        batch.setSchedule(batchRequest.getSchedule());

        batchRepository.save(batch);
        return generatedCode;
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch updateBatch(String batchId, Batch batchDetails) {
        Batch existingBatch = batchRepository.findByBatchId(batchId.trim())
                .orElseThrow(() -> new RuntimeException("Batch not found with id " + batchId));

        existingBatch.setBatchName(batchDetails.getBatchName());
        existingBatch.setTrainerId(batchDetails.getTrainerId());
        existingBatch.setStudentIds(batchDetails.getStudentIds());
        existingBatch.setStartDate(batchDetails.getStartDate());
        existingBatch.setEndDate(batchDetails.getEndDate());
        existingBatch.setCourse(batchDetails.getCourse());
        existingBatch.setSchedule(batchDetails.getSchedule());

        return batchRepository.save(existingBatch);
    }

    public void deleteBatch(String batchId) {
        Batch batch = batchRepository.findByBatchId(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found with id " + batchId));
        batchRepository.delete(batch);
    }
}

