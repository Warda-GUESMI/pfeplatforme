package com.pfetracker.dto.module3;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateMeetingRequest {
    @Size(max = 200, message = "Le titre ne doit pas dÃ©passer 200 caractÃ¨res")
    private String title;

    @Size(max = 2000, message = "La description ne doit pas dÃ©passer 2000 caractÃ¨res")
    private String description;

    @Future(message = "La date doit Ãªtre dans le futur")
    private LocalDateTime meetingDate;

    @Min(value = 15, message = "La durÃ©e minimum est de 15 minutes")
    @Max(value = 240, message = "La durÃ©e maximum est de 4 heures")
    private Integer duration;

    private String meetingLink;
    private String meetProvider;
    private Boolean isOnline;
    private String location;
}

