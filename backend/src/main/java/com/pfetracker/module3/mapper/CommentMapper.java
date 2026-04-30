package com.pfetracker.module3.mapper;

import com.pfetracker.module3.dto.CommentDTO;
import com.pfetracker.module3.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mappings({
        @Mapping(target = "userName", ignore = true),
        @Mapping(target = "userAvatar", ignore = true),
        @Mapping(target = "mentionedUserNames", ignore = true)
    })
    CommentDTO toDTO(Comment comment);

    List<CommentDTO> toDTOList(List<Comment> comments);

    Comment toEntity(CommentDTO dto);
}
