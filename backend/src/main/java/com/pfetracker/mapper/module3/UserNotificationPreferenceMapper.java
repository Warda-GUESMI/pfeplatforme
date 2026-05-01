package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.UserNotificationPreferenceDTO;
import com.pfetracker.entity.module3.UserNotificationPreference;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserNotificationPreferenceMapper {

    UserNotificationPreferenceDTO toDTO(UserNotificationPreference entity);

    UserNotificationPreference toEntity(UserNotificationPreferenceDTO dto);
}
