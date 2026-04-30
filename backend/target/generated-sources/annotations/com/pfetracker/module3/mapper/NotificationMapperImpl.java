package com.pfetracker.module3.mapper;

import com.pfetracker.module3.dto.NotificationDTO;
import com.pfetracker.module3.entity.Notification;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-30T19:15:40+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationDTO toDTO(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationDTO.NotificationDTOBuilder notificationDTO = NotificationDTO.builder();

        notificationDTO.id( notification.getId() );
        notificationDTO.userId( notification.getUserId() );
        notificationDTO.message( notification.getMessage() );
        notificationDTO.type( notification.getType() );
        notificationDTO.isRead( notification.getIsRead() );
        notificationDTO.createdAt( notification.getCreatedAt() );
        notificationDTO.readAt( notification.getReadAt() );
        notificationDTO.relatedId( notification.getRelatedId() );
        notificationDTO.relatedType( notification.getRelatedType() );
        notificationDTO.actionUrl( notification.getActionUrl() );
        notificationDTO.sentByEmail( notification.getSentByEmail() );

        return notificationDTO.build();
    }

    @Override
    public List<NotificationDTO> toDTOList(List<Notification> notifications) {
        if ( notifications == null ) {
            return null;
        }

        List<NotificationDTO> list = new ArrayList<NotificationDTO>( notifications.size() );
        for ( Notification notification : notifications ) {
            list.add( toDTO( notification ) );
        }

        return list;
    }

    @Override
    public Notification toEntity(NotificationDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Notification.NotificationBuilder notification = Notification.builder();

        notification.id( dto.getId() );
        notification.userId( dto.getUserId() );
        notification.message( dto.getMessage() );
        notification.type( dto.getType() );
        notification.isRead( dto.getIsRead() );
        notification.createdAt( dto.getCreatedAt() );
        notification.readAt( dto.getReadAt() );
        notification.relatedId( dto.getRelatedId() );
        notification.relatedType( dto.getRelatedType() );
        notification.actionUrl( dto.getActionUrl() );
        notification.sentByEmail( dto.getSentByEmail() );

        return notification.build();
    }
}
