package com.pfetracker.module3.dto;

import com.pfetracker.module3.entity.Message;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {
    private Long id;
    private Long pfeId;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private String content;
    private Message.MessageStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private String attachmentUrl;
    private String attachmentName;
}
