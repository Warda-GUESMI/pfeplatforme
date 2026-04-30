package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.MeetingDTO;
import com.pfetracker.entity.module3.Meeting;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MeetingMapper {

    @Mappings({
        @Mapping(target = "createdByName", ignore = true),
        @Mapping(target = "participantName", ignore = true)
    })
    MeetingDTO toDTO(Meeting meeting);

    List<MeetingDTO> toDTOList(List<Meeting> meetings);

    Meeting toEntity(MeetingDTO dto);
}
