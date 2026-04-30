package com.pfetracker.dto.module3;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskSummaryDTO {
    private Long id;
    private String title;
    private String status;
    private LocalDateTime deadline;
    private Boolean isOverdue;
    private Integer completionPercentage;
    private Long pfeId;
    private String pfeTitle;
    private Long studentId;
    private String studentName;
}

