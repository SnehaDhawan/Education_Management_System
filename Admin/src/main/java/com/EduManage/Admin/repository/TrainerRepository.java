package com.EduManage.Admin.repository;

import com.EduManage.Admin.domain.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TrainerRepository extends JpaRepository<Trainer ,Integer> {

    Optional<Trainer> findByTrainerId(String trainerId);

    void deleteByTrainerId(String id);
}
