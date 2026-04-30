package com.pfetracker.module3.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStudentDTO {
    private Long pfeId;
    private String pfeTitle;
    private Double globalProgress;
    private String currentMilestone;
    private String nextMilestone;
    private List<TaskSummaryDTO> ongoingTasks;
    private List<TaskSummaryDTO> upcomingDeadlines;
    private MeetingDTO nextMeeting;
    private List<NotificationDTO> recentNotifications;
    private List<ActivityLogDTO> recentActivity;
    private List<AlertDTO> activeAlerts;
}
