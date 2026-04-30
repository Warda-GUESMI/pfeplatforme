package com.pfetracker.module3.controller;

import com.pfetracker.module3.dto.ApiResponse;
import com.pfetracker.module3.dto.DashboardStudentDTO;
import com.pfetracker.module3.dto.DashboardSupervisorDTO;
import com.pfetracker.module3.security.SecurityUtils;
import com.pfetracker.module3.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v3/dashboard")
@RequiredArgsConstructor
@Tag(name = "Tableaux de bord", description = "APIs pour les tableaux de bord étudiant et encadrant")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Tableau de bord étudiant", description = "Récupère les données du tableau de bord pour un étudiant")
    public ResponseEntity<ApiResponse<DashboardStudentDTO>> getStudentDashboard() {
        Long studentId = SecurityUtils.getCurrentUserId();
        DashboardStudentDTO dashboard = dashboardService.getStudentDashboard(studentId);
        return ResponseEntity.ok(ApiResponse.success(dashboard, "Tableau de bord étudiant récupéré"));
    }

    @GetMapping("/supervisor")
    @PreAuthorize("hasRole('SUPERVISOR')")
    @Operation(summary = "Tableau de bord encadrant", description = "Récupère les données du tableau de bord pour un encadrant")
    public ResponseEntity<ApiResponse<DashboardSupervisorDTO>> getSupervisorDashboard() {
        Long supervisorId = SecurityUtils.getCurrentUserId();
        DashboardSupervisorDTO dashboard = dashboardService.getSupervisorDashboard(supervisorId);
        return ResponseEntity.ok(ApiResponse.success(dashboard, "Tableau de bord encadrant récupéré"));
    }
}
