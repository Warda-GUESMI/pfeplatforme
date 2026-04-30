package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.MessageDTO;
import com.pfetracker.entity.module3.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mappings({
        @Mapping(target = "senderName", ignore = true),
        @Mapping(target = "receiverName", ignore = true)
    })
    MessageDTO toDTO(Message message);

    List<MessageDTO> toDTOList(List<Message> messages);

    Message toEntity(MessageDTO dto);
}

