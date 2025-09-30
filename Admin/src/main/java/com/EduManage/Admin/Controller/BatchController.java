package com.EduManage.Admin.Controller;

import com.EduManage.Admin.domain.entity.Batch;
import com.EduManage.Admin.domain.request.BatchRequest;
import com.EduManage.Admin.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/batch")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createBatch(@RequestBody BatchRequest batchRequest) {
        String generatedId = batchService.saveBatch(batchRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Batch created successfully");
        response.put("batchId", generatedId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batchList = batchService.getAllBatches();
        return new ResponseEntity<>(batchList, HttpStatus.OK);
    }

    @PutMapping("/update/{batchId}")
    public ResponseEntity<Batch> updateBatch(@PathVariable String batchId, @RequestBody Batch batch) {
        Batch updatedBatch = batchService.updateBatch(batchId, batch);
        return ResponseEntity.ok(updatedBatch);
    }

    @DeleteMapping("/delete/{batchId}")
    public ResponseEntity<Void> deleteBatch(@PathVariable String batchId) {
        batchService.deleteBatch(batchId);
        return ResponseEntity.noContent().build();
    }

}
