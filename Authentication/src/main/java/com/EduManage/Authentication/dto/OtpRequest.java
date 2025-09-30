package com.EduManage.Authentication.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpRequest {

    private String email;
    private String otp;
    private  String role;
}
