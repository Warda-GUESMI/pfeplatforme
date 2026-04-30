package com.pfetracker.controller.module3;

import com.pfetracker.dto.module3.ApiResponse;
import com.pfetracker.dto.module3.DashboardStudentDTO;
import com.pfetracker.dto.module3.DashboardSupervisorDTO;
import com.pfetracker.security.module3.SecurityUtils;
import com.pfetracker.service.module3.DashboardService;
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
@Tag(name = "Tableaux de bord", description = "APIs pour les tableaux de bord Ã©tudiant et encadrant")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Tableau de bord Ã©tudiant", description = "RÃ©cupÃ¨re les donnÃ©es du tableau de bord pour un Ã©tudiant")
    public ResponseEntity<ApiResponse<DashboardStudentDTO>> getStudentDashboard() {
        Long studentId = SecurityUtils.getCurrentUserId();
        DashboardStudentDTO dashboard = dashboardService.getStudentDashboard(studentId);
        return ResponseEntity.ok(ApiResponse.success(dashboard, "Tableau de bord Ã©tudiant rÃ©cupÃ©rÃ©"));
    }

    @GetMapping("/supervisor")
    @PreAuthorize("hasRole('SUPERVISOR')")
    @Operation(summary = "Tableau de bord encadrant", description = "RÃ©cupÃ¨re les donnÃ©es du tableau de bord pour un encadrant")
    public ResponseEntity<ApiResponse<DashboardSupervisorDTO>> getSupervisorDashboard() {
        Long supervisorId = SecurityUtils.getCurrentUserId();
        DashboardSupervisorDTO dashboard = dashboardService.getSupervisorDashboard(supervisorId);
        return ResponseEntity.ok(ApiResponse.success(dashboard, "Tableau de bord encadrant rÃ©cupÃ©rÃ©"));
    }
}

