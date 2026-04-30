package com.pfetracker.controller.module3;

import com.pfetracker.dto.module3.ApiResponse;
import com.pfetracker.dto.module3.CreateMeetingRequest;
import com.pfetracker.dto.module3.MeetingDTO;
import com.pfetracker.dto.module3.MeetingResponseRequest;
import com.pfetracker.dto.module3.PageResponse;
import com.pfetracker.dto.module3.UpdateMeetingRequest;
import com.pfetracker.security.module3.SecurityUtils;
import com.pfetracker.service.module3.MeetingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3/meetings")
@RequiredArgsConstructor
@Tag(name = "RÃ©unions", description = "Planification et gestion des rÃ©unions synchrones")
@SecurityRequirement(name = "bearerAuth")
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping
    @Operation(summary = "CrÃ©er une rÃ©union", description = "CrÃ©e une nouvelle rÃ©union avec gÃ©nÃ©ration automatique de lien Meet")
    public ResponseEntity<ApiResponse<MeetingDTO>> createMeeting(@Valid @RequestBody CreateMeetingRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        MeetingDTO meeting = meetingService.createMeeting(userId, request);
        return ResponseEntity.ok(ApiResponse.success(meeting, "RÃ©union crÃ©Ã©e avec succÃ¨s"));
    }

    @PutMapping("/{meetingId}/respond")
    @Operation(summary = "RÃ©pondre Ã  une invitation", description = "Accepter ou refuser une invitation Ã  une rÃ©union")
    public ResponseEntity<ApiResponse<MeetingDTO>> respondToMeeting(
            @PathVariable Long meetingId,
            @Valid @RequestBody MeetingResponseRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        MeetingDTO meeting = meetingService.respondToMeeting(meetingId, userId, request);
        String msg = request.getStatus().toString().equals("ACCEPTED") ? "RÃ©union acceptÃ©e" : "RÃ©union refusÃ©e";
        return ResponseEntity.ok(ApiResponse.success(meeting, msg));
    }

    @PutMapping("/{meetingId}")
    @Operation(summary = "Modifier une rÃ©union")
    public ResponseEntity<ApiResponse<MeetingDTO>> updateMeeting(
            @PathVariable Long meetingId,
            @Valid @RequestBody UpdateMeetingRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        MeetingDTO meeting = meetingService.updateMeeting(meetingId, userId, request);
        return ResponseEntity.ok(ApiResponse.success(meeting, "RÃ©union modifiÃ©e avec succÃ¨s"));
    }

    @DeleteMapping("/{meetingId}")
    @Operation(summary = "Annuler une rÃ©union")
    public ResponseEntity<ApiResponse<Void>> deleteMeeting(@PathVariable Long meetingId) {
        Long userId = SecurityUtils.getCurrentUserId();
        meetingService.deleteMeeting(meetingId, userId);
        return ResponseEntity.ok(ApiResponse.success(null, "RÃ©union annulÃ©e avec succÃ¨s"));
    }

    @GetMapping("/{meetingId}")
    @Operation(summary = "DÃ©tails d'une rÃ©union")
    public ResponseEntity<ApiResponse<MeetingDTO>> getMeetingById(@PathVariable Long meetingId) {
        Long userId = SecurityUtils.getCurrentUserId();
        MeetingDTO meeting = meetingService.getMeetingById(meetingId, userId);
        return ResponseEntity.ok(ApiResponse.success(meeting, "RÃ©union rÃ©cupÃ©rÃ©e"));
    }

    @GetMapping("/pfe/{pfeId}")
    @Operation(summary = "RÃ©unions par PFE")
    public ResponseEntity<ApiResponse<PageResponse<MeetingDTO>>> getMeetingsByPfe(
            @PathVariable Long pfeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Long userId = SecurityUtils.getCurrentUserId();
        PageResponse<MeetingDTO> meetings = meetingService.getMeetingsByPfe(pfeId, userId, page, size);
        return ResponseEntity.ok(ApiResponse.success(meetings, "RÃ©unions rÃ©cupÃ©rÃ©es"));
    }

    @GetMapping("/upcoming")
    @Operation(summary = "RÃ©unions Ã  venir", description = "RÃ©cupÃ¨re toutes les rÃ©unions Ã  venir de l'utilisateur")
    public ResponseEntity<ApiResponse<List<MeetingDTO>>> getUpcomingMeetings() {
        Long userId = SecurityUtils.getCurrentUserId();
        List<MeetingDTO> meetings = meetingService.getUpcomingMeetings(userId);
        return ResponseEntity.ok(ApiResponse.success(meetings, "RÃ©unions Ã  venir rÃ©cupÃ©rÃ©es"));
    }

    @PostMapping("/{meetingId}/report")
    @Operation(summary = "Ajouter un compte-rendu")
    public ResponseEntity<ApiResponse<MeetingDTO>> addReport(
            @PathVariable Long meetingId,
            @RequestBody String report) {
        Long userId = SecurityUtils.getCurrentUserId();
        MeetingDTO meeting = meetingService.addReport(meetingId, userId, report);
        return ResponseEntity.ok(ApiResponse.success(meeting, "Compte-rendu ajoutÃ©"));
    }
}

