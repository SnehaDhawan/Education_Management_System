package com.EduManage.Admin.domain.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignRequest {

    @JsonProperty("taskId")
    private String taskId;

    @JsonProperty("trainerId")
    private String trainerId;

    @JsonProperty("batchId")
    private String batchId;

    @JsonProperty("taskTitle")
    private String taskTitle;

    @JsonProperty("taskDescription")
    private String taskDescription;

    @JsonProperty("assignedDate")
    private LocalDate assignedDate;

    @JsonProperty("dueDate")
    private LocalDate dueDate;

    @JsonProperty("status")
    private String status;

    @JsonProperty("taskDetails")
    private List<TaskDetailsRequest> taskDetails;

}
