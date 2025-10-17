package com.EduManage.Admin.domain.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDetailsRequest {

    @JsonProperty("studentId")
    private String studentId;

    @JsonProperty("taskSubmitStatus")
    private String taskSubmitStatus;

    @JsonProperty("batchId")
    private String batchId;
}
