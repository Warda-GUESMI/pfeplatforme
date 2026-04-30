package com.pfetracker.module3.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupervisorDashboardDTO {
    private List<StudentSummaryDTO> etudiants;
    private Integer totalEtudiants;
    private Integer etudiantsEnRetard;
    private Integer etudiantsInactifs;
    private List<TaskSummaryDTO> tachesAValider;
    private List<MeetingDTO> reunionsAVenir;
    private List<AlertDTO> alertesPrioritaires;
    private Double tauxMoyenProgression;
    private Double tempsMoyenReponse;
}
