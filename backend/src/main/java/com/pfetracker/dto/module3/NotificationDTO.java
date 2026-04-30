package com.pfetracker.dto.module3;

import com.pfetracker.entity.module3.Notification;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private Notification.NotificationType type;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private Long relatedId;
    private String relatedType;
    private String actionUrl;
    private Boolean sentByEmail;
}

