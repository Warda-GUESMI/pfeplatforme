package com.pfetracker.module3.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pfes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PFE {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "supervisor_id")
    private Long supervisorId;

    @Column(length = 200)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PFEStatus status = PFEStatus.INITIALIZED;

    @Column(name = "global_progress", nullable = false)
    @Builder.Default
    private Double globalProgress = 0.0;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public enum PFEStatus {
        INITIALIZED, IN_PROGRESS, DELAYED, SUSPENDED, COMPLETED, DEFENDED
    }
}
