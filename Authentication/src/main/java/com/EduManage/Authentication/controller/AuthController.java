package com.EduManage.Authentication.controller;


import com.EduManage.Authentication.dto.LoginRequest;
import com.EduManage.Authentication.dto.LoginResponse;
import com.EduManage.Authentication.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
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
