package com.EduManage.Admin.domain.request;


import lombok.Data;

import java.util.List;

@Data
    public class BatchRequest {
    private String batchName;
    private String trainerId;
    private List<String> studentIds;
    private String startDate;
    private String endDate;
    private String course;
    private String schedule;
    }

