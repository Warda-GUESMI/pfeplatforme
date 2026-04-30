package com.pfetracker.dto.module3;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMeetingRequest {
    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 200, message = "Le titre ne doit pas dÃ©passer 200 caractÃ¨res")
    private String title;

    @Size(max = 2000, message = "La description ne doit pas dÃ©passer 2000 caractÃ¨res")
    private String description;

    @NotNull(message = "La date de rÃ©union est obligatoire")
    @Future(message = "La date doit Ãªtre dans le futur")
    private LocalDateTime meetingDate;

    @NotNull(message = "La durÃ©e est obligatoire")
    @Min(value = 15, message = "La durÃ©e minimum est de 15 minutes")
    @Max(value = 240, message = "La durÃ©e maximum est de 4 heures")
    private Integer duration;

    @NotNull(message = "L'ID du participant est obligatoire")
    private Long participantId;

    @NotNull(message = "L'ID du PFE est obligatoire")
    private Long pfeId;

    private String meetingLink;
    private String meetProvider;
    private Boolean isOnline;
    private String location;
}

