package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.CommentDTO;
import com.pfetracker.entity.module3.Comment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-30T22:14:49+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public CommentDTO toDTO(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDTO.CommentDTOBuilder commentDTO = CommentDTO.builder();

        commentDTO.id( comment.getId() );
        commentDTO.taskId( comment.getTaskId() );
        commentDTO.userId( comment.getUserId() );
        commentDTO.content( comment.getContent() );
        commentDTO.createdAt( comment.getCreatedAt() );
        commentDTO.updatedAt( comment.getUpdatedAt() );
        commentDTO.parentId( comment.getParentId() );
        List<Long> list = comment.getMentionedUserIds();
        if ( list != null ) {
            commentDTO.mentionedUserIds( new ArrayList<Long>( list ) );
        }
        commentDTO.attachmentUrl( comment.getAttachmentUrl() );

        return commentDTO.build();
    }

    @Override
    public List<CommentDTO> toDTOList(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentDTO> list = new ArrayList<CommentDTO>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( toDTO( comment ) );
        }

        return list;
    }

    @Override
    public Comment toEntity(CommentDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Comment.CommentBuilder comment = Comment.builder();

        comment.id( dto.getId() );
        comment.taskId( dto.getTaskId() );
        comment.userId( dto.getUserId() );
        comment.content( dto.getContent() );
        comment.createdAt( dto.getCreatedAt() );
        comment.updatedAt( dto.getUpdatedAt() );
        comment.parentId( dto.getParentId() );
        List<Long> list = dto.getMentionedUserIds();
        if ( list != null ) {
            comment.mentionedUserIds( new ArrayList<Long>( list ) );
        }
        comment.attachmentUrl( dto.getAttachmentUrl() );

        return comment.build();
    }
}
