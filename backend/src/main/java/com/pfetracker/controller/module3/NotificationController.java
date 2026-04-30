package com.pfetracker.controller.module3;

import com.pfetracker.dto.module3.ApiResponse;
import com.pfetracker.dto.module3.MarkReadRequest;
import com.pfetracker.dto.module3.NotificationDTO;
import com.pfetracker.dto.module3.PageResponse;
import com.pfetracker.security.module3.SecurityUtils;
import com.pfetracker.service.module3.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Gestion des notifications temps rÃ©el et par email")
@SecurityRequirement(name = "bearerAuth")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Notifications de l'utilisateur", description = "RÃ©cupÃ¨re les notifications avec pagination")
    public ResponseEntity<ApiResponse<PageResponse<NotificationDTO>>> getNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Long userId = SecurityUtils.getCurrentUserId();
        PageResponse<NotificationDTO> notifications = notificationService.getUserNotifications(userId, page, size);
        return ResponseEntity.ok(ApiResponse.success(notifications, "Notifications rÃ©cupÃ©rÃ©es"));
    }

    @GetMapping("/unread")
    @Operation(summary = "Notifications non lues")
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getUnreadNotifications() {
        Long userId = SecurityUtils.getCurrentUserId();
        List<NotificationDTO> notifications = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(ApiResponse.success(notifications, "Notifications non lues rÃ©cupÃ©rÃ©es"));
    }

    @GetMapping("/unread/count")
    @Operation(summary = "Compteur de notifications non lues")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount() {
        Long userId = SecurityUtils.getCurrentUserId();
        Long count = notificationService.getUnreadCount(userId);
        return ResponseEntity.ok(ApiResponse.success(count, "Compteur rÃ©cupÃ©rÃ©"));
    }

    @PutMapping("/read")
    @Operation(summary = "Marquer comme lues", description = "Marque une liste de notifications comme lues")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@Valid @RequestBody MarkReadRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        notificationService.markAsRead(request.getNotificationIds(), userId);
        return ResponseEntity.ok(ApiResponse.success(null, "Notifications marquÃ©es comme lues"));
    }

    @PutMapping("/read/all")
    @Operation(summary = "Tout marquer comme lu")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead() {
        Long userId = SecurityUtils.getCurrentUserId();
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok(ApiResponse.success(null, "Toutes les notifications marquÃ©es comme lues"));
    }
}

