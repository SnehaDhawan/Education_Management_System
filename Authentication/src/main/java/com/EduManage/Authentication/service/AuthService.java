package com.EduManage.Authentication.service;

import com.EduManage.Authentication.dto.LoginRequest;
import com.EduManage.Authentication.dto.LoginResponse;
import com.EduManage.Authentication.entity.Admin;
import com.EduManage.Authentication.entity.Student;
import com.EduManage.Authentication.entity.Trainer;
import com.EduManage.Authentication.repository.AdminRepository;
import com.EduManage.Authentication.repository.StudentRepository;
import com.EduManage.Authentication.repository.TrainerRepository;
import com.EduManage.Authentication.security.JwtUtil;
import com.EduManage.Authentication.security.OtpGenerator;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

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

    @Autowired
    private OtpGenerator otpGenerator;

    @Autowired
    private JavaMailSender mailSender;

//    public LoginResponse login(LoginRequest request) {
//        String role = request.getRole().toUpperCase();
//        String email = request.getEmail();
//        String password = request.getPassword();
//
//        switch (role) {
//            case "ADMIN":
//                Admin admin = adminRepo.findByEmailId(email)
//                        .orElseThrow(() -> new RuntimeException("Admin not found"));
//
//                if (admin.getPassword().equals(password)) {
//                    String token = jwtUtil.generateToken(email, role);
//                    return new LoginResponse(token, role);
//                } else {
//                    throw new RuntimeException("Invalid Admin credentials");
//                }
//
//                case "STUDENT":
//                Student student = studentRepo.findByEmail(email)
//                        .orElseThrow(() -> new RuntimeException("Student not found"));
//                if (student.getPassword().equals(password)) {
//                    String token = jwtUtil.generateToken(email, role);
//                    return new LoginResponse(token, role);
//                } else {
//                    throw new RuntimeException("Invalid Student credentials");
//                }
//
//            case "TRAINER":
//                Trainer trainer = trainerRepo.findByEmail(email)
//                        .orElseThrow(() -> new RuntimeException("Trainer not found"));
//                if (trainer.getPassword().equals(password)) {
//                    String token = jwtUtil.generateToken(email, role);
//                    return new LoginResponse(token, role);
//                } else {
//                    throw new RuntimeException("Invalid Trainer credentials");
//                }
//            default:
//                throw new RuntimeException("Invalid role");
//        }
//    }


    public LoginResponse login(LoginRequest request) {
        String role = request.getRole().toUpperCase();
        String email = request.getEmail();
        String password = request.getPassword();

        switch (role) {
            case "ADMIN":
                Admin admin = adminRepo.findByEmailId(email)
                        .orElseThrow(() -> new RuntimeException("Admin not found"));

                if (admin.getPassword().equals(password)) {
                    String token = jwtUtil.generateToken(email, role);
                    return new LoginResponse(token, role, admin.getAdminId(), admin.getUsername());
                } else {
                    throw new RuntimeException("Invalid Admin credentials");
                }

            case "STUDENT":
                Student student = studentRepo.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Student not found"));

                if (student.getPassword().equals(password)) {
                    String token = jwtUtil.generateToken(email, role);
                    return new LoginResponse(token, role, student.getStudentId(), student.getStudentName());
                } else {
                    throw new RuntimeException("Invalid Student credentials");
                }

            case "TRAINER":
                Trainer trainer = trainerRepo.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Trainer not found"));

                if (trainer.getPassword().equals(password)) {
                    String token = jwtUtil.generateToken(email, role);
                    return new LoginResponse(token, role, trainer.getTrainerId(), trainer.getTrainerName());
                } else {
                    throw new RuntimeException("Invalid Trainer credentials");
                }

            default:
                throw new RuntimeException("Invalid role");
        }
    }


    public boolean updatePassword(String email, String role, String newPassword) {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return adminRepo.findByEmailId(email)
                        .map(admin -> {
                            admin.setPassword(newPassword);   // ideally hash it with BCrypt
                            adminRepo.save(admin);
                            return true;
                        })
                        .orElse(false);

            case "TRAINER":
                return trainerRepo.findByEmail(email)
                        .map(trainer -> {
                            trainer.setPassword(newPassword);
                            trainerRepo.save(trainer);
                            return true;
                        })
                        .orElse(false);

            case "STUDENT":
                return studentRepo.findByEmail(email)
                        .map(student -> {
                            student.setPassword(newPassword);
                            studentRepo.save(student);
                            return true;
                        })
                        .orElse(false);

            default:
                return false;
        }
    }



    private Map<String, String> otpCache = new HashMap<>();
    public boolean sendOtpToEmail(String email) {
        String otp = otpGenerator.generateOtp();
        otpCache.put(email, otp); // store OTP

        try {
            var message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("OTP for Password Reset");
            helper.setText("Your OTP for password reset is: " + otp);
            mailSender.send(message);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean verifyOtp(String email, String otp) {
        String cachedOtp = otpCache.get(email);
        return cachedOtp != null && cachedOtp.equals(otp);
    }

    public void clearOtp(String email) {
        otpCache.remove(email);
    }


    public boolean verifyUserByEmailAndRole(String email, String role) {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return adminRepo.findByEmailId(email).isPresent();

            case "TRAINER":
                return trainerRepo.findByEmail(email).isPresent();

            case "STUDENT":
                return studentRepo.findByEmail(email).isPresent();

            default:
                return false;
        }
    }



}
