package com.pfetracker.module3.repository;

import com.pfetracker.module3.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId ORDER BY n.createdAt DESC")
    Page<Notification> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId AND n.isRead = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.userId = :userId AND n.isRead = false")
    Long countUnreadByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true, n.readAt = :now WHERE n.id IN :ids AND n.userId = :userId")
    void markAsRead(@Param("ids") List<Long> ids, @Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true, n.readAt = :now WHERE n.userId = :userId AND n.isRead = false")
    void markAllAsRead(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId AND n.type = :type ORDER BY n.createdAt DESC")
    List<Notification> findByUserIdAndType(@Param("userId") Long userId, @Param("type") Notification.NotificationType type);

    @Query("SELECT n FROM Notification n WHERE n.sentByEmail = false AND n.createdAt < :before ORDER BY n.createdAt ASC")
    List<Notification> findUnsentEmails(@Param("before") LocalDateTime before);
}
