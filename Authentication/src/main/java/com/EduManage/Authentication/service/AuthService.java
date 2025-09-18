package com.EduManage.Authentication.service;

import com.EduManage.Authentication.dto.LoginRequest;
import com.EduManage.Authentication.dto.LoginResponse;
import com.EduManage.Authentication.entity.Admin;
import com.EduManage.Authentication.repository.AdminRepository;
import com.EduManage.Authentication.repository.StudentRepository;
import com.EduManage.Authentication.repository.TrainerRepository;
import com.EduManage.Authentication.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepo;
    private final StudentRepository studentRepo;
    private final TrainerRepository trainerRepo;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(AdminRepository adminRepo, StudentRepository studentRepo,
                       TrainerRepository trainerRepo, JwtUtil jwtUtil) {
        this.adminRepo = adminRepo;
        this.studentRepo = studentRepo;
        this.trainerRepo = trainerRepo;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {
        String role = request.getRole().toUpperCase();
        String email = request.getEmail();
        String password = request.getPassword();

        switch (role) {
//            case "ADMIN":
//                return adminRepo.findByEmailId(email)
//                        .filter(a -> passwordEncoder.matches(password, a.getPassword()))
//                        .map(a -> new LoginResponse(jwtUtil.generateToken(email, role), role))
//                        .orElseThrow(() -> new RuntimeException("Invalid Admin credentials"));

            case "ADMIN":
                Admin admin = adminRepo.findByEmailId(email)
                        .orElseThrow(() -> new RuntimeException("Admin not found"));

                if (admin.getPassword().equals(password)) {
                    String token = jwtUtil.generateToken(email, role);
                    return new LoginResponse(token, role);
                } else {
                    throw new RuntimeException("Invalid Admin credentials");
                }



            case "STUDENT":
                return studentRepo.findByEmail(email)
                        .filter(s -> passwordEncoder.matches(password, s.getPassword()))
                        .map(s -> new LoginResponse(jwtUtil.generateToken(email, role), role))
                        .orElseThrow(() -> new RuntimeException("Invalid Student credentials"));

            case "TRAINER":
                return trainerRepo.findByEmail(email)
                        .filter(t -> passwordEncoder.matches(password, t.getPassword()))
                        .map(t -> new LoginResponse(jwtUtil.generateToken(email, role), role))
                        .orElseThrow(() -> new RuntimeException("Invalid Trainer credentials"));

            default:
                throw new RuntimeException("Invalid role");
        }
    }
}
