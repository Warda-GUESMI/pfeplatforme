package com.pfetracker.dto.module3;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCommentRequest {
    @NotNull(message = "L'ID de la tÃ¢che est obligatoire")
    private Long taskId;

    @NotBlank(message = "Le contenu est obligatoire")
    @Size(max = 2000, message = "Le contenu ne doit pas dÃ©passer 2000 caractÃ¨res")
    private String content;

    private List<Long> mentionedUserIds;
    private Long parentId;
    private String attachmentUrl;
}

