package com.EduManage.Admin.domain.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StudentRequest {

    @JsonProperty("studentId")
    private String studentId;

    @JsonProperty("studentName")
    private String studentName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("mobileNo")
    private Long mobileNo;

    @JsonProperty("batchId")
    private String batchId;

}
