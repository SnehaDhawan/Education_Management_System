package com.EduManage.Authentication.repository;

import com.EduManage.Authentication.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository  extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmailId(String emailId);
}
