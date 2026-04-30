package com.pfetracker.dto.module3;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLogDTO {
    private Long id;
    private String type;
    private String description;
    private LocalDateTime timestamp;
    private String actionUrl;
    private Long relatedId;
}

