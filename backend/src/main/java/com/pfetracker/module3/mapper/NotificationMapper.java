package com.pfetracker.module3.mapper;

import com.pfetracker.module3.dto.NotificationDTO;
import com.pfetracker.module3.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationDTO toDTO(Notification notification);
    List<NotificationDTO> toDTOList(List<Notification> notifications);
    Notification toEntity(NotificationDTO dto);
}
