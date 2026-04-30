package com.pfetracker.service.module3;

import com.pfetracker.dto.module3.CommentDTO;
import com.pfetracker.dto.module3.CreateCommentRequest;
import com.pfetracker.dto.module3.PageResponse;
import com.pfetracker.entity.module3.Comment;
import com.pfetracker.entity.module3.PFE;
import com.pfetracker.entity.module3.Task;
import com.pfetracker.entity.module3.User;
import com.pfetracker.exception.module3.ResourceNotFoundException;
import com.pfetracker.exception.module3.UnauthorizedException;
import com.pfetracker.mapper.module3.CommentMapper;
import com.pfetracker.repository.module3.CommentRepository;
import com.pfetracker.repository.module3.PFERepository;
import com.pfetracker.repository.module3.TaskRepository;
import com.pfetracker.repository.module3.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final TaskRepository taskRepository;
    private final PFERepository pfeRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public CommentDTO addComment(Long userId, CreateCommentRequest request) {
        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("TÃ¢che non trouvÃ©e: " + request.getTaskId()));

        PFE pfe = pfeRepository.findById(task.getPfeId())
                .orElseThrow(() -> new ResourceNotFoundException("PFE non trouvÃ©"));

        if (!isAuthorizedToComment(userId, pfe)) {
            throw new UnauthorizedException("Vous n'Ãªtes pas autorisÃ© Ã  commenter cette tÃ¢che");
        }

        Comment comment = Comment.builder()
                .taskId(request.getTaskId())
                .userId(userId)
                .content(request.getContent())
                .parentId(request.getParentId())
                .mentionedUserIds(request.getMentionedUserIds() != null ? request.getMentionedUserIds() : List.of())
                .attachmentUrl(request.getAttachmentUrl())
                .build();

        Comment saved = commentRepository.save(comment);
        log.info("Comment added: id={}, task={}, user={}", saved.getId(), request.getTaskId(), userId);

        notifyMentionedUsers(saved, pfe);
        notifyTaskParticipants(saved, task, pfe, userId);

        return enrichComment(commentMapper.toDTO(saved));
    }

    @Transactional(readOnly = true)
    public PageResponse<CommentDTO> getCommentsByTask(Long taskId, Long userId, int page, int size) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("TÃ¢che non trouvÃ©e"));

        PFE pfe = pfeRepository.findById(task.getPfeId())
                .orElseThrow(() -> new ResourceNotFoundException("PFE non trouvÃ©"));

        if (!isAuthorizedToComment(userId, pfe)) {
            throw new UnauthorizedException("AccÃ¨s non autorisÃ©");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Comment> comments = commentRepository.findByTaskId(taskId, pageable);

        List<CommentDTO> enriched = comments.getContent().stream()
                .map(c -> enrichComment(commentMapper.toDTO(c)))
                .collect(Collectors.toList());

        return PageResponse.<CommentDTO>builder()
                .content(enriched)
                .pageNumber(comments.getNumber())
                .pageSize(comments.getSize())
                .totalElements(comments.getTotalElements())
                .totalPages(comments.getTotalPages())
                .last(comments.isLast())
                .first(comments.isFirst())
                .build();
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("TÃ¢che non trouvÃ©e"));

        PFE pfe = pfeRepository.findById(task.getPfeId())
                .orElseThrow(() -> new ResourceNotFoundException("PFE non trouvÃ©"));

        if (!isAuthorizedToComment(userId, pfe)) {
            throw new UnauthorizedException("AccÃ¨s non autorisÃ©");
        }

        return commentRepository.findRootCommentsByTaskId(taskId).stream()
                .map(c -> enrichComment(commentMapper.toDTO(c)))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Long getCommentCount(Long taskId) {
        return commentRepository.countByTaskId(taskId);
    }

    private boolean isAuthorizedToComment(Long userId, PFE pfe) {
        return pfe.getStudentId().equals(userId) ||
               (pfe.getSupervisorId() != null && pfe.getSupervisorId().equals(userId));
    }

    private void notifyMentionedUsers(Comment comment, PFE pfe) {
        if (comment.getMentionedUserIds() != null) {
            for (Long mentionedId : comment.getMentionedUserIds()) {
                notificationService.createMentionNotification(mentionedId, comment, pfe);
            }
        }
    }

    private void notifyTaskParticipants(Comment comment, Task task, PFE pfe, Long commenterId) {
        Long notifyUserId = commenterId.equals(task.getAssignedTo()) ? pfe.getSupervisorId() : task.getAssignedTo();
        if (notifyUserId != null && !notifyUserId.equals(commenterId)) {
            notificationService.createCommentNotification(notifyUserId, comment, task);
        }
    }

    private CommentDTO enrichComment(CommentDTO dto) {
        userRepository.findById(dto.getUserId())
                .ifPresent(user -> {
                    dto.setUserName(user.getFullName());
                });

        if (dto.getMentionedUserIds() != null && !dto.getMentionedUserIds().isEmpty()) {
            List<User> mentioned = userRepository.findByIds(dto.getMentionedUserIds());
            dto.setMentionedUserNames(mentioned.stream()
                    .map(User::getFullName)
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}

