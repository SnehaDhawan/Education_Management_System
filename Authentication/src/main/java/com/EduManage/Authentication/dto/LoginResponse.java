package com.EduManage.Authentication.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse
{
    private String token;
    private String role;
    private String id;
    private String name;

    public LoginResponse(String token, String role, String id, String name) {
        this.token = token;
        this.role = role;
        this.id = id;
        this.name = name;
    }
}
