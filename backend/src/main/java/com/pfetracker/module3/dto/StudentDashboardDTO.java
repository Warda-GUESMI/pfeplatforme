package com.pfetracker.module3.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDashboardDTO {
    private Double progressionGlobale;
    private Integer tachesEnCours;
    private Integer tachesSoumises;
    private Integer tachesValidees;
    private Integer tachesTotal;
    private List<TaskSummaryDTO> tachesRecentes;
    private List<MeetingDTO> prochainesReunions;
    private List<NotificationDTO> notificationsNonLues;
    private String jalonActuel;
    private String prochainJalon;
    private List<ActivityLogDTO> journalActivite;
    private List<AlertDTO> alertesActives;
}
