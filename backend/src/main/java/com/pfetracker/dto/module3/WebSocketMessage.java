package com.pfetracker.dto.module3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketMessage {
    private String type;
    private Object payload;
    private Long senderId;
    private Long receiverId;
    private Long timestamp;
}

