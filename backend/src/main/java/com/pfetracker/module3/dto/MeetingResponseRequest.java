package com.pfetracker.module3.dto;

import com.pfetracker.module3.entity.Meeting;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeetingResponseRequest {
    @NotNull(message = "Le statut est obligatoire")
    private Meeting.MeetingStatus status;

    private String rejectionReason;
}
