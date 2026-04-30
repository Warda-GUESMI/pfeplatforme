package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.NotificationDTO;
import com.pfetracker.entity.module3.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationDTO toDTO(Notification notification);
    List<NotificationDTO> toDTOList(List<Notification> notifications);
    Notification toEntity(NotificationDTO dto);
}

