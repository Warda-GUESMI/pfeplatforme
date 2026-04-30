package com.pfetracker.entity.module3;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_id", nullable = false)
    private Long taskId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false, length = 2000)
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "parent_id")
    private Long parentId;

    @ElementCollection
    @CollectionTable(name = "comment_mentions", joinColumns = @JoinColumn(name = "comment_id"))
    @Column(name = "mentioned_user_id")
    @Builder.Default
    private List<Long> mentionedUserIds = new ArrayList<>();

    @Column(name = "attachment_url")
    private String attachmentUrl;

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

