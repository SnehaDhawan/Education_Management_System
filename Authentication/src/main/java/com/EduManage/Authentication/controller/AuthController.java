package com.EduManage.Authentication.controller;


import com.EduManage.Authentication.dto.LoginRequest;
import com.EduManage.Authentication.dto.LoginResponse;
import com.EduManage.Authentication.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        System.out.println(">>> /auth/login endpoint HIT");
        return authService.login(request);
    }
}
