package com.pfetracker.mapper.module3;

import com.pfetracker.dto.module3.MessageDTO;
import com.pfetracker.entity.module3.Message;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-30T22:14:47+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public MessageDTO toDTO(Message message) {
        if ( message == null ) {
            return null;
        }

        MessageDTO.MessageDTOBuilder messageDTO = MessageDTO.builder();

        messageDTO.id( message.getId() );
        messageDTO.pfeId( message.getPfeId() );
        messageDTO.senderId( message.getSenderId() );
        messageDTO.receiverId( message.getReceiverId() );
        messageDTO.content( message.getContent() );
        messageDTO.status( message.getStatus() );
        messageDTO.createdAt( message.getCreatedAt() );
        messageDTO.readAt( message.getReadAt() );
        messageDTO.attachmentUrl( message.getAttachmentUrl() );
        messageDTO.attachmentName( message.getAttachmentName() );

        return messageDTO.build();
    }

    @Override
    public List<MessageDTO> toDTOList(List<Message> messages) {
        if ( messages == null ) {
            return null;
        }

        List<MessageDTO> list = new ArrayList<MessageDTO>( messages.size() );
        for ( Message message : messages ) {
            list.add( toDTO( message ) );
        }

        return list;
    }

    @Override
    public Message toEntity(MessageDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Message.MessageBuilder message = Message.builder();

        message.id( dto.getId() );
        message.pfeId( dto.getPfeId() );
        message.senderId( dto.getSenderId() );
        message.receiverId( dto.getReceiverId() );
        message.content( dto.getContent() );
        message.status( dto.getStatus() );
        message.createdAt( dto.getCreatedAt() );
        message.readAt( dto.getReadAt() );
        message.attachmentUrl( dto.getAttachmentUrl() );
        message.attachmentName( dto.getAttachmentName() );

        return message.build();
    }
}
