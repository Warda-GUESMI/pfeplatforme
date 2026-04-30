package com.pfetracker.websocket.module3;

import com.pfetracker.dto.module3.MessageDTO;
import com.pfetracker.dto.module3.SendMessageRequest;
import com.pfetracker.dto.module3.WebSocketMessage;
import com.pfetracker.entity.module3.TypingIndicator;
import com.pfetracker.security.module3.SecurityUtils;
import com.pfetracker.service.module3.MessageService;
import com.pfetracker.service.module3.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final NotificationService notificationService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload SendMessageRequest request) {
        try {
            Long senderId = SecurityUtils.getCurrentUserId();
            if (senderId == null) {
                log.error("No authenticated user found for WebSocket message");
                return;
            }

            MessageDTO savedMessage = messageService.sendMessage(senderId, request);

            WebSocketMessage wsMessage = WebSocketMessage.builder()
                    .type("NEW_MESSAGE")
                    .payload(savedMessage)
                    .senderId(senderId)
                    .receiverId(request.getReceiverId())
                    .timestamp(System.currentTimeMillis())
                    .build();

            messagingTemplate.convertAndSend("/topic/messages/" + request.getPfeId(), wsMessage);
            messagingTemplate.convertAndSendToUser(
                    request.getReceiverId().toString(),
                    "/queue/messages",
                    wsMessage
            );

            notificationService.createMessageNotification(request.getReceiverId(), savedMessage);

            log.info("Message sent from {} to {} for PFE {}", senderId, request.getReceiverId(), request.getPfeId());
        } catch (Exception e) {
            log.error("Error sending message via WebSocket", e);
        }
    }

    @MessageMapping("/chat.typing")
    public void typingIndicator(@Payload TypingIndicator indicator) {
        Long senderId = SecurityUtils.getCurrentUserId();
        if (senderId == null) return;

        indicator.setSenderId(senderId);
        indicator.setTimestamp(System.currentTimeMillis());

        WebSocketMessage wsMessage = WebSocketMessage.builder()
                .type("TYPING")
                .payload(indicator)
                .senderId(senderId)
                .receiverId(indicator.getReceiverId())
                .timestamp(System.currentTimeMillis())
                .build();

        messagingTemplate.convertAndSendToUser(
                indicator.getReceiverId().toString(),
                "/queue/typing",
                wsMessage
        );

        log.debug("Typing indicator from {} to {}", senderId, indicator.getReceiverId());
    }

    @MessageMapping("/chat.read")
    public void markAsRead(@Payload Long messageId) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) return;

        messageService.markAsRead(messageId, userId);

        WebSocketMessage wsMessage = WebSocketMessage.builder()
                .type("MESSAGE_READ")
                .payload(messageId)
                .senderId(userId)
                .timestamp(System.currentTimeMillis())
                .build();

        messagingTemplate.convertAndSend("/topic/messages/read", wsMessage);
    }
}

