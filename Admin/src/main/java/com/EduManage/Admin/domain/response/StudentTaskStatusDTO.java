package com.EduManage.Admin.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentTaskStatusDTO
{
    private String studentId;
    private String studentName;
    private Map<String, String> statuses; // taskTitle -> status


}
