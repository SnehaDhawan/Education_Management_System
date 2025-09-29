package com.EduManage.Authentication.controller;


import com.EduManage.Authentication.dto.LoginRequest;
import com.EduManage.Authentication.dto.LoginResponse;
import com.EduManage.Authentication.dto.OtpRequest;
import com.EduManage.Authentication.dto.PasswordUpdateRequest;
import com.EduManage.Authentication.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private  AuthService authService;



    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        System.out.println(">>> /auth/login endpoint HIT");
        return authService.login(request);
    }

    @PostMapping("/update-password")
    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody PasswordUpdateRequest request) {
        boolean updated = authService.updatePassword(request.getEmail(), request.getRole(), request.getNewPassword());

        Map<String, String> response = new HashMap<>();
        if (updated) {
            response.put("message", "Password updated successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Email not found for given role");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody OtpRequest request) {
        Map<String, String> response = new HashMap<>();
        boolean sent = authService.sendOtpToEmail(request.getEmail());
        if (sent) {
            response.put("message", "OTP sent successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to send OTP");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody OtpRequest request) {
        Map<String, String> response = new HashMap<>();
        boolean valid = authService.verifyOtp(request.getEmail(), request.getOtp());
        if (valid) {
            response.put("message", "OTP verified successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid OTP");
            return ResponseEntity.status(400).body(response);
        }
    }
}
