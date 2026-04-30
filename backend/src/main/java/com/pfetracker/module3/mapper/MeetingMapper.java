package com.pfetracker.module3.mapper;

import com.pfetracker.module3.dto.MeetingDTO;
import com.pfetracker.module3.entity.Meeting;
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