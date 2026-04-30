package com.pfetracker.websocket.module3;

import com.pfetracker.dto.module3.NotificationDTO;
import com.pfetracker.dto.module3.WebSocketMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class NotificationWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotification(Long userId, NotificationDTO notification) {
        try {
            WebSocketMessage wsMessage = WebSocketMessage.builder()
                    .type("NEW_NOTIFICATION")
                    .payload(notification)
                    .receiverId(userId)
                    .timestamp(System.currentTimeMillis())
                    .build();

            messagingTemplate.convertAndSendToUser(
                    userId.toString(),
                    "/queue/notifications",
                    wsMessage
            );

            messagingTemplate.convertAndSend("/topic/notifications/" + userId, wsMessage);

            log.info("Notification sent to user {}", userId);
        } catch (Exception e) {
            log.error("Error sending notification via WebSocket", e);
        }
    }

    public void sendMeetingReminder(Long userId, Long meetingId, String title, int minutesBefore) {
        try {
            WebSocketMessage wsMessage = WebSocketMessage.builder()
                    .type("MEETING_REMINDER")
                    .payload(new MeetingReminderPayload(meetingId, title, minutesBefore))
                    .receiverId(userId)
                    .timestamp(System.currentTimeMillis())
                    .build();

            messagingTemplate.convertAndSendToUser(
                    userId.toString(),
                    "/queue/meetings",
                    wsMessage
            );

            log.info("Meeting reminder sent to user {} for meeting {}", userId, meetingId);
        } catch (Exception e) {
            log.error("Error sending meeting reminder", e);
        }
    }

    public void broadcastAlert(String alertType, Object payload) {
        try {
            WebSocketMessage wsMessage = WebSocketMessage.builder()
                    .type("ALERT_" + alertType)
                    .payload(payload)
                    .timestamp(System.currentTimeMillis())
                    .build();

            messagingTemplate.convertAndSend("/topic/alerts", wsMessage);
        } catch (Exception e) {
            log.error("Error broadcasting alert", e);
        }
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class MeetingReminderPayload {
        private Long meetingId;
        private String title;
        private int minutesBefore;
    }
}

