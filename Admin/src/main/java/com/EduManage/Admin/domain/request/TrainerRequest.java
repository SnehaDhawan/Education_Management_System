package com.EduManage.Admin.domain.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TrainerRequest {

    @JsonProperty("trainerId")
    private String trainerId;

    @JsonProperty("trainerName")
    private String trainerName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("mobileNo")
    private Long mobileNo;

    @JsonProperty("specialization")
    private String specialization;
}
