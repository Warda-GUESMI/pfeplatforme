package com.pfetracker.controller.module3;

import com.pfetracker.dto.module3.ApiResponse;
import com.pfetracker.dto.module3.MessageDTO;
import com.pfetracker.dto.module3.PageResponse;
import com.pfetracker.dto.module3.SendMessageRequest;
import com.pfetracker.security.module3.SecurityUtils;
import com.pfetracker.service.module3.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3/messages")
@RequiredArgsConstructor
@Tag(name = "Messagerie", description = "Gestion des messages privÃ©s entre Ã©tudiant et encadrant")
@SecurityRequirement(name = "bearerAuth")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    @Operation(summary = "Envoyer un message", description = "Envoie un message dans une conversation PFE")
    public ResponseEntity<ApiResponse<MessageDTO>> sendMessage(@Valid @RequestBody SendMessageRequest request) {
        Long senderId = SecurityUtils.getCurrentUserId();
        MessageDTO message = messageService.sendMessage(senderId, request);
        return ResponseEntity.ok(ApiResponse.success(message, "Message envoyÃ© avec succÃ¨s"));
    }

    @GetMapping("/conversation/{pfeId}/{otherUserId}")
    @Operation(summary = "RÃ©cupÃ©rer une conversation", description = "RÃ©cupÃ¨re les messages entre l'utilisateur courant et un autre utilisateur pour un PFE donnÃ©")
    public ResponseEntity<ApiResponse<PageResponse<MessageDTO>>> getConversation(
            @PathVariable Long pfeId,
            @PathVariable Long otherUserId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Long userId = SecurityUtils.getCurrentUserId();
        PageResponse<MessageDTO> conversation = messageService.getConversation(pfeId, userId, otherUserId, page, size);
        return ResponseEntity.ok(ApiResponse.success(conversation, "Conversation rÃ©cupÃ©rÃ©e"));
    }

    @GetMapping("/unread")
    @Operation(summary = "Messages non lus", description = "RÃ©cupÃ¨re tous les messages non lus de l'utilisateur courant")
    public ResponseEntity<ApiResponse<List<MessageDTO>>> getUnreadMessages() {
        Long userId = SecurityUtils.getCurrentUserId();
        List<MessageDTO> messages = messageService.getUnreadMessages(userId);
        return ResponseEntity.ok(ApiResponse.success(messages, "Messages non lus rÃ©cupÃ©rÃ©s"));
    }

    @GetMapping("/unread/count")
    @Operation(summary = "Compteur de messages non lus")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount() {
        Long userId = SecurityUtils.getCurrentUserId();
        Long count = messageService.getUnreadCount(userId);
        return ResponseEntity.ok(ApiResponse.success(count, "Compteur rÃ©cupÃ©rÃ©"));
    }

    @PutMapping("/read/{messageId}")
    @Operation(summary = "Marquer comme lu", description = "Marque un message spÃ©cifique comme lu")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long messageId) {
        Long userId = SecurityUtils.getCurrentUserId();
        messageService.markAsRead(messageId, userId);
        return ResponseEntity.ok(ApiResponse.success(null, "Message marquÃ© comme lu"));
    }

    @PutMapping("/read/batch")
    @Operation(summary = "Marquer plusieurs messages comme lus")
    public ResponseEntity<ApiResponse<Void>> markMultipleAsRead(@RequestBody List<Long> messageIds) {
        Long userId = SecurityUtils.getCurrentUserId();
        messageService.markMultipleAsRead(messageIds, userId);
        return ResponseEntity.ok(ApiResponse.success(null, "Messages marquÃ©s comme lus"));
    }

    @GetMapping("/pfe/{pfeId}")
    @Operation(summary = "Messages par PFE", description = "RÃ©cupÃ¨re tous les messages d'un PFE")
    public ResponseEntity<ApiResponse<List<MessageDTO>>> getMessagesByPfe(@PathVariable Long pfeId) {
        Long userId = SecurityUtils.getCurrentUserId();
        List<MessageDTO> messages = messageService.getMessagesByPfe(pfeId, userId);
        return ResponseEntity.ok(ApiResponse.success(messages, "Messages rÃ©cupÃ©rÃ©s"));
    }
}

