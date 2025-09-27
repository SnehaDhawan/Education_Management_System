package com.EduManage.Authentication.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PasswordUpdateRequest {
    private String email;
    private String role;
    private String newPassword;


}
