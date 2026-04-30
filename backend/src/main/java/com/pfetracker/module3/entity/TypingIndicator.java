package com.pfetracker.module3.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypingIndicator {
    private Long senderId;
    private Long receiverId;
    private Long pfeId;
    private boolean isTyping;
    private long timestamp;
}
