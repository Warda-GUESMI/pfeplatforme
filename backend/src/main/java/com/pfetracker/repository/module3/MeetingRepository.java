package com.pfetracker.repository.module3;

import com.pfetracker.entity.module3.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    @Query("SELECT m FROM Meeting m WHERE m.pfeId = :pfeId ORDER BY m.meetingDate DESC")
    Page<Meeting> findByPfeId(@Param("pfeId") Long pfeId, Pageable pageable);

    @Query("SELECT m FROM Meeting m WHERE m.createdBy = :userId OR m.participantId = :userId ORDER BY m.meetingDate DESC")
    List<Meeting> findByParticipant(@Param("userId") Long userId);

    @Query("SELECT m FROM Meeting m WHERE (m.createdBy = :userId OR m.participantId = :userId) " +
           "AND m.meetingDate >= :now AND m.status IN ('PENDING', 'ACCEPTED') " +
           "ORDER BY m.meetingDate ASC")
    List<Meeting> findUpcomingByParticipant(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT m FROM Meeting m WHERE m.meetingDate BETWEEN :start AND :end " +
           "AND m.status IN ('PENDING', 'ACCEPTED') " +
           "AND m.reminderSent24h = false")
    List<Meeting> findMeetingsFor24hReminder(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT m FROM Meeting m WHERE m.meetingDate BETWEEN :start AND :end " +
           "AND m.status = 'ACCEPTED' " +
           "AND m.reminderSent15min = false")
    List<Meeting> findMeetingsFor15minReminder(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT m FROM Meeting m WHERE m.id = :id AND (m.createdBy = :userId OR m.participantId = :userId)")
    Optional<Meeting> findByIdAndParticipant(@Param("id") Long id, @Param("userId") Long userId);

    @Query("SELECT COUNT(m) FROM Meeting m WHERE m.pfeId = :pfeId AND m.status = 'COMPLETED'")
    Long countCompletedByPfeId(@Param("pfeId") Long pfeId);

    @Query("SELECT m FROM Meeting m WHERE m.pfeId IN :pfeIds AND m.meetingDate >= :now " +
           "AND m.status IN ('PENDING', 'ACCEPTED') ORDER BY m.meetingDate ASC")
    List<Meeting> findUpcomingByPfeIds(@Param("pfeIds") List<Long> pfeIds, @Param("now") LocalDateTime now);
}

