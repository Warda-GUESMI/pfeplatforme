package com.pfetracker.module3.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSupervisorDTO {
    private Long supervisorId;
    private Integer totalStudents;
    private Integer activePFEs;
    private Double averageProgress;
    private List<StudentSummaryDTO> students;
    private List<TaskSummaryDTO> pendingValidations;
    private List<MeetingDTO> upcomingMeetings;
    private List<AlertDTO> priorityAlerts;
    private List<NotificationDTO> recentNotifications;
}
