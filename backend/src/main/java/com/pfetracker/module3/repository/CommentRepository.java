package com.pfetracker.module3.repository;

import com.pfetracker.module3.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.taskId = :taskId ORDER BY c.createdAt DESC")
    Page<Comment> findByTaskId(@Param("taskId") Long taskId, Pageable pageable);

    @Query("SELECT c FROM Comment c WHERE c.taskId = :taskId AND c.parentId IS NULL ORDER BY c.createdAt DESC")
    List<Comment> findRootCommentsByTaskId(@Param("taskId") Long taskId);

    @Query("SELECT c FROM Comment c WHERE c.parentId = :parentId ORDER BY c.createdAt ASC")
    List<Comment> findRepliesByParentId(@Param("parentId") Long parentId);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.taskId = :taskId")
    Long countByTaskId(@Param("taskId") Long taskId);

    @Query("SELECT c FROM Comment c WHERE :userId MEMBER OF c.mentionedUserIds ORDER BY c.createdAt DESC")
    List<Comment> findByMentionedUser(@Param("userId") Long userId);
}
