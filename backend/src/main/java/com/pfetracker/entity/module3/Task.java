package com.pfetracker.entity.module3;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pfe_id", nullable = false)
    private Long pfeId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TaskStatus status = TaskStatus.NOT_STARTED;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "assigned_to", nullable = false)
    private Long assignedTo;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "completion_percentage", nullable = false)
    @Builder.Default
    private Integer completionPercentage = 0;

    public enum TaskStatus {
        NOT_STARTED, IN_PROGRESS, SUBMITTED, VALIDATED, TO_CORRECT, CANCELLED
    }
}

