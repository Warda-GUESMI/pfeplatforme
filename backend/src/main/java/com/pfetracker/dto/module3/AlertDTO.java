package com.pfetracker.dto.module3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertDTO {
    private Long id;
    private String type;
    private String severity;
    private String message;
    private Long relatedId;
    private String relatedType;
    private String actionUrl;
}

