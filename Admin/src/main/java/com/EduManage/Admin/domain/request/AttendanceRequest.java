package com.EduManage.Admin.domain.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AttendanceRequest {

    @JsonProperty("trainerId")
    private String trainerId;

    @JsonProperty("batchId")
    private String batchId;

    @JsonProperty("studentId")
    private String studentId;

    @JsonProperty("date")
    private String date;  // use ISO format: yyyy-MM-dd

    @JsonProperty("status")
    private String status;

}
