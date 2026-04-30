package com.pfetracker.module3.mapper;

import com.pfetracker.module3.dto.MeetingDTO;
import com.pfetracker.module3.entity.Meeting;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-30T19:15:41+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class MeetingMapperImpl implements MeetingMapper {

    @Override
    public MeetingDTO toDTO(Meeting meeting) {
        if ( meeting == null ) {
            return null;
        }

        MeetingDTO.MeetingDTOBuilder meetingDTO = MeetingDTO.builder();

        meetingDTO.id( meeting.getId() );
        meetingDTO.title( meeting.getTitle() );
        meetingDTO.description( meeting.getDescription() );
        meetingDTO.meetingDate( meeting.getMeetingDate() );
        meetingDTO.duration( meeting.getDuration() );
        meetingDTO.createdBy( meeting.getCreatedBy() );
        meetingDTO.participantId( meeting.getParticipantId() );
        meetingDTO.pfeId( meeting.getPfeId() );
        meetingDTO.status( meeting.getStatus() );
        meetingDTO.meetingLink( meeting.getMeetingLink() );
        meetingDTO.meetProvider( meeting.getMeetProvider() );
        meetingDTO.isOnline( meeting.getIsOnline() );
        meetingDTO.location( meeting.getLocation() );
        meetingDTO.createdAt( meeting.getCreatedAt() );
        meetingDTO.updatedAt( meeting.getUpdatedAt() );
        meetingDTO.report( meeting.getReport() );
        meetingDTO.rejectionReason( meeting.getRejectionReason() );

        return meetingDTO.build();
    }

    @Override
    public List<MeetingDTO> toDTOList(List<Meeting> meetings) {
        if ( meetings == null ) {
            return null;
        }

        List<MeetingDTO> list = new ArrayList<MeetingDTO>( meetings.size() );
        for ( Meeting meeting : meetings ) {
            list.add( toDTO( meeting ) );
        }

        return list;
    }

    @Override
    public Meeting toEntity(MeetingDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Meeting.MeetingBuilder meeting = Meeting.builder();

        meeting.id( dto.getId() );
        meeting.title( dto.getTitle() );
        meeting.description( dto.getDescription() );
        meeting.meetingDate( dto.getMeetingDate() );
        meeting.duration( dto.getDuration() );
        meeting.createdBy( dto.getCreatedBy() );
        meeting.participantId( dto.getParticipantId() );
        meeting.pfeId( dto.getPfeId() );
        meeting.status( dto.getStatus() );
        meeting.meetingLink( dto.getMeetingLink() );
        meeting.meetProvider( dto.getMeetProvider() );
        meeting.isOnline( dto.getIsOnline() );
        meeting.location( dto.getLocation() );
        meeting.createdAt( dto.getCreatedAt() );
        meeting.updatedAt( dto.getUpdatedAt() );
        meeting.report( dto.getReport() );
        meeting.rejectionReason( dto.getRejectionReason() );

        return meeting.build();
    }
}
