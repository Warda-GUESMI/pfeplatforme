package com.pfetracker.repository.module3;

import com.pfetracker.entity.module3.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.pfeId = :pfeId ORDER BY t.deadline ASC")
    List<Task> findByPfeId(@Param("pfeId") Long pfeId);

    @Query("SELECT t FROM Task t WHERE t.assignedTo = :userId AND t.status NOT IN ('VALIDATED', 'CANCELLED') ORDER BY t.deadline ASC")
    List<Task> findOngoingByUser(@Param("userId") Long userId);

    @Query("SELECT t FROM Task t WHERE t.assignedTo = :userId AND t.deadline < :now AND t.status NOT IN ('VALIDATED', 'CANCELLED')")
    List<Task> findOverdueByUser(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT t FROM Task t WHERE t.pfeId IN :pfeIds AND t.status = 'SUBMITTED' ORDER BY t.deadline ASC")
    List<Task> findPendingValidations(@Param("pfeIds") List<Long> pfeIds);

    @Query("SELECT t FROM Task t WHERE t.pfeId = :pfeId AND t.status NOT IN ('VALIDATED', 'CANCELLED') ORDER BY t.deadline ASC")
    Page<Task> findActiveByPfeId(@Param("pfeId") Long pfeId, Pageable pageable);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.pfeId = :pfeId AND t.status = 'VALIDATED'")
    Long countValidatedByPfeId(@Param("pfeId") Long pfeId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.pfeId = :pfeId")
    Long countByPfeId(@Param("pfeId") Long pfeId);
}

