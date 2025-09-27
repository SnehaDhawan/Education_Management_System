package com.EduManage.Authentication.security;


import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class OtpGenerator {

    private final SecureRandom random = new SecureRandom();
    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000); // generates 6-digit OTP
        return String.valueOf(otp);
    }

}
