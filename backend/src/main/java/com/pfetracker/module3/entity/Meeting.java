package com.pfetracker.module3.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(name = "meeting_date", nullable = false)
    private LocalDateTime meetingDate;

    @Column(nullable = false)
    private Integer duration;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "participant_id", nullable = false)
    private Long participantId;

    @Column(name = "pfe_id", nullable = false)
    private Long pfeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MeetingStatus status = MeetingStatus.PENDING;

    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Column(name = "meet_provider", length = 20)
    private String meetProvider;

    @Column(name = "is_online", nullable = false)
    @Builder.Default
    private Boolean isOnline = true;

    @Column(name = "location", length = 200)
    private String location;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "reminder_sent_24h", nullable = false)
    @Builder.Default
    private Boolean reminderSent24h = false;

    @Column(name = "reminder_sent_15min", nullable = false)
    @Builder.Default
    private Boolean reminderSent15min = false;

    @Column(name = "report", length = 4000)
    private String report;

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

    public enum MeetingStatus {
        PENDING, ACCEPTED, REFUSED, CANCELLED, COMPLETED
    }
}
