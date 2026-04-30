package com.pfetracker.module3.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkReadRequest {
    @NotEmpty(message = "La liste des IDs est obligatoire")
    private List<Long> notificationIds;
}
