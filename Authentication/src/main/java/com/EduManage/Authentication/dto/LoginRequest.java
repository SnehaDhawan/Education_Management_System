package com.EduManage.Authentication.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequest {

    private String email;
    private String password;
    private String role;
}
