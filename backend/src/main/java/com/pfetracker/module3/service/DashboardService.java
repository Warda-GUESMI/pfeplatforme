package com.pfetracker.module3.service;

import com.pfetracker.module3.dto.AlertDTO;
import com.pfetracker.module3.dto.DashboardStudentDTO;
import com.pfetracker.module3.dto.DashboardSupervisorDTO;
import com.pfetracker.module3.dto.MeetingDTO;
import com.pfetracker.module3.dto.StudentSummaryDTO;
import com.pfetracker.module3.dto.TaskSummaryDTO;
import com.pfetracker.module3.entity.Meeting;
import com.pfetracker.module3.entity.Notification;
import com.pfetracker.module3.entity.PFE;
import com.pfetracker.module3.entity.Task;
import com.pfetracker.module3.entity.User;
import com.pfetracker.module3.exception.ResourceNotFoundException;
import com.pfetracker.module3.mapper.MeetingMapper;
import com.pfetracker.module3.mapper.NotificationMapper;
import com.pfetracker.module3.repository.MeetingRepository;
import com.pfetracker.module3.repository.NotificationRepository;
import com.pfetracker.module3.repository.PFERepository;
import com.pfetracker.module3.repository.TaskRepository;
import com.pfetracker.module3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final PFERepository pfeRepository;
    private final TaskRepository taskRepository;
    private final MeetingRepository meetingRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final MeetingMapper meetingMapper;
    private final NotificationMapper notificationMapper;

    public DashboardStudentDTO getStudentDashboard(Long studentId) {
        PFE pfe = pfeRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun PFE trouvé pour cet étudiant"));

        List<Task> allTasks = taskRepository.findByPfeId(pfe.getId());
        List<Task> ongoingTasks = allTasks.stream()
                .filter(t -> !t.getStatus().equals(Task.TaskStatus.VALIDATED) && 
                             !t.getStatus().equals(Task.TaskStatus.CANCELLED))
                .sorted(Comparator.comparing(Task::getDeadline, Comparator.nullsLast(Comparator.naturalOrder())))
                .collect(Collectors.toList());

        List<Task> upcomingDeadlines = ongoingTasks.stream()
                .filter(t -> t.getDeadline() != null && 
                            t.getDeadline().isAfter(LocalDateTime.now()) &&
                            t.getDeadline().isBefore(LocalDateTime.now().plusDays(7)))
                .collect(Collectors.toList());

        List<Meeting> upcomingMeetings = meetingRepository.findUpcomingByParticipant(studentId, LocalDateTime.now());
        MeetingDTO nextMeeting = upcomingMeetings.isEmpty() ? null : 
                meetingMapper.toDTO(upcomingMeetings.get(0));

        List<Notification> recentNotifs = notificationRepository.findByUserId(studentId, 
                org.springframework.data.domain.PageRequest.of(0, 5, org.springframework.data.domain.Sort.by("createdAt").descending()))
                .getContent();

        List<AlertDTO> alerts = generateStudentAlerts(pfe, ongoingTasks);

        return DashboardStudentDTO.builder()
                .pfeId(pfe.getId())
                .pfeTitle(pfe.getTitle())
                .globalProgress(pfe.getGlobalProgress())
                .currentMilestone(getCurrentMilestone(allTasks))
                .nextMilestone(getNextMilestone(allTasks))
                .ongoingTasks(mapTasksToSummary(ongoingTasks))
                .upcomingDeadlines(mapTasksToSummary(upcomingDeadlines))
                .nextMeeting(nextMeeting)
                .recentNotifications(notificationMapper.toDTOList(recentNotifs))
                .activeAlerts(alerts)
                .build();
    }

    public DashboardSupervisorDTO getSupervisorDashboard(Long supervisorId) {
        List<PFE> activePFEs = pfeRepository.findActiveBySupervisorId(supervisorId);
        List<Long> pfeIds = activePFEs.stream().map(PFE::getId).collect(Collectors.toList());
        List<Long> studentIds = activePFEs.stream().map(PFE::getStudentId).collect(Collectors.toList());

        List<User> students = userRepository.findByIds(studentIds);
        List<Task> pendingValidations = taskRepository.findPendingValidations(pfeIds);
        List<Meeting> upcomingMeetings = meetingRepository.findUpcomingByPfeIds(pfeIds, LocalDateTime.now());

        List<StudentSummaryDTO> studentSummaries = activePFEs.stream()
                .map(pfe -> {
                    User student = students.stream()
                            .filter(u -> u.getId().equals(pfe.getStudentId()))
                            .findFirst().orElse(null);
                    List<Task> studentTasks = taskRepository.findByPfeId(pfe.getId());
                    long overdue = studentTasks.stream()
                            .filter(t -> t.getDeadline() != null && 
                                         t.getDeadline().isBefore(LocalDateTime.now()) &&
                                         !t.getStatus().equals(Task.TaskStatus.VALIDATED) &&
                                         !t.getStatus().equals(Task.TaskStatus.CANCELLED))
                            .count();

                    return StudentSummaryDTO.builder()
                            .studentId(pfe.getStudentId())
                            .studentName(student != null ? student.getFullName() : "Inconnu")
                            .studentEmail(student != null ? student.getEmail() : "")
                            .pfeId(pfe.getId())
                            .pfeTitle(pfe.getTitle())
                            .pfeProgress(pfe.getGlobalProgress())
                            .pfeStatus(pfe.getStatus().toString())
                            .pendingTasks((int) studentTasks.stream()
                                    .filter(t -> !t.getStatus().equals(Task.TaskStatus.VALIDATED) &&
                                               !t.getStatus().equals(Task.TaskStatus.CANCELLED))
                                    .count())
                            .overdueTasks((int) overdue)
                            .isInactive(isStudentInactive(pfe.getId()))
                            .build();
                })
                .collect(Collectors.toList());

        double avgProgress = activePFEs.isEmpty() ? 0.0 :
                activePFEs.stream().mapToDouble(PFE::getGlobalProgress).average().orElse(0.0);

        List<AlertDTO> alerts = generateSupervisorAlerts(activePFEs, studentSummaries);

        List<Notification> recentNotifs = notificationRepository.findByUserId(supervisorId,
                org.springframework.data.domain.PageRequest.of(0, 5, org.springframework.data.domain.Sort.by("createdAt").descending()))
                .getContent();

        return DashboardSupervisorDTO.builder()
                .supervisorId(supervisorId)
                .totalStudents(activePFEs.size())
                .activePFEs(activePFEs.size())
                .averageProgress(Math.round(avgProgress * 100.0) / 100.0)
                .students(studentSummaries)
                .pendingValidations(mapTasksToSummary(pendingValidations))
                .upcomingMeetings(upcomingMeetings.stream()
                        .map((Meeting m) -> meetingMapper.toDTO(m))
                        .collect(Collectors.<MeetingDTO>toList()))
                .priorityAlerts(alerts)
                .recentNotifications(notificationMapper.toDTOList(recentNotifs))
                .build();
    }

    private List<AlertDTO> generateStudentAlerts(PFE pfe, List<Task> tasks) {
        List<AlertDTO> alerts = new ArrayList<>();

        long overdueCount = tasks.stream()
                .filter(t -> t.getDeadline() != null && t.getDeadline().isBefore(LocalDateTime.now()) &&
                            !t.getStatus().equals(Task.TaskStatus.VALIDATED))
                .count();

        if (overdueCount > 0) {
            alerts.add(AlertDTO.builder()
                    .type("OVERDUE_TASKS")
                    .severity("HIGH")
                    .message(overdueCount + " tâche(s) en retard")
                    .relatedId(pfe.getId())
                    .relatedType("PFE")
                    .actionUrl("/tasks")
                    .build());
        }

        if (pfe.getGlobalProgress() < 30.0 && pfe.getStatus().equals(PFE.PFEStatus.IN_PROGRESS)) {
            alerts.add(AlertDTO.builder()
                    .type("LOW_PROGRESS")
                    .severity("MEDIUM")
                    .message("Progression faible: " + pfe.getGlobalProgress() + "%")
                    .relatedId(pfe.getId())
                    .relatedType("PFE")
                    .actionUrl("/dashboard")
                    .build());
        }

        return alerts;
    }

    private List<AlertDTO> generateSupervisorAlerts(List<PFE> pfes, List<StudentSummaryDTO> students) {
        List<AlertDTO> alerts = new ArrayList<>();

        long inactiveCount = students.stream().filter(StudentSummaryDTO::getIsInactive).count();
        if (inactiveCount > 0) {
            alerts.add(AlertDTO.builder()
                    .type("INACTIVE_STUDENTS")
                    .severity("HIGH")
                    .message(inactiveCount + " étudiant(s) sans activité depuis 7 jours")
                    .actionUrl("/dashboard")
                    .build());
        }

        long delayedCount = pfes.stream()
                .filter(p -> p.getStatus().equals(PFE.PFEStatus.DELAYED))
                .count();
        if (delayedCount > 0) {
            alerts.add(AlertDTO.builder()
                    .type("DELAYED_PFES")
                    .severity("HIGH")
                    .message(delayedCount + " PFE en retard")
                    .actionUrl("/dashboard")
                    .build());
        }

        return alerts;
    }

    private boolean isStudentInactive(Long pfeId) {
        List<Task> tasks = taskRepository.findByPfeId(pfeId);
        return tasks.stream()
                .allMatch(t -> t.getStatus().equals(Task.TaskStatus.NOT_STARTED) ||
                              (t.getStatus().equals(Task.TaskStatus.VALIDATED)));
    }

    private String getCurrentMilestone(List<Task> tasks) {
        return tasks.stream()
                .filter(t -> !t.getStatus().equals(Task.TaskStatus.VALIDATED) &&
                           !t.getStatus().equals(Task.TaskStatus.CANCELLED))
                .findFirst()
                .map(Task::getTitle)
                .orElse("Aucune tâche en cours");
    }

    private String getNextMilestone(List<Task> tasks) {
        List<Task> pending = tasks.stream()
                .filter(t -> t.getStatus().equals(Task.TaskStatus.NOT_STARTED))
                .collect(Collectors.toList());
        return pending.isEmpty() ? "Toutes les tâches sont terminées" : pending.get(0).getTitle();
    }

    private List<TaskSummaryDTO> mapTasksToSummary(List<Task> tasks) {
        return tasks.stream()
                .map(t -> TaskSummaryDTO.builder()
                        .id(t.getId())
                        .title(t.getTitle())
                        .status(t.getStatus().toString())
                        .deadline(t.getDeadline())
                        .isOverdue(t.getDeadline() != null && t.getDeadline().isBefore(LocalDateTime.now()) &&
                                  !t.getStatus().equals(Task.TaskStatus.VALIDATED))
                        .completionPercentage(t.getCompletionPercentage())
                        .pfeId(t.getPfeId())
                        .build())
                .collect(Collectors.toList());
    }
}
