package com.EduManage.Admin.repository;

import com.EduManage.Admin.domain.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BatchRepository extends JpaRepository<Batch ,Integer> {

        Optional<Batch> findByBatchId(String batchId);
}
