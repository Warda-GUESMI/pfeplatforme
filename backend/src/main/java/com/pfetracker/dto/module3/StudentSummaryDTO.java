package com.pfetracker.dto.module3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentSummaryDTO {
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Long pfeId;
    private String pfeTitle;
    private Double pfeProgress;
    private String pfeStatus;
    private Integer pendingTasks;
    private Integer overdueTasks;
    private String lastActivity;
    private Boolean isInactive;
}

