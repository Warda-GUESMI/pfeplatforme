package com.pfetracker.dto.module3;

import com.pfetracker.entity.module3.Meeting;
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

