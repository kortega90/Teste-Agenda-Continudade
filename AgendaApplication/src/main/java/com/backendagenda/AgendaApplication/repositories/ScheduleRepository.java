package com.backendagenda.AgendaApplication.repositories;
import com.backendagenda.AgendaApplication.dto.ScheduleDTO;
import com.backendagenda.AgendaApplication.entities.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
//    @Query(" SELECT obj FROM com.backendagenda.AgendaApplication.entities.Schedule obj " +
//            "WHERE UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%'))")
//
//    Page<Schedule> searchByName(String name, Pageable pageable);
@Query("SELECT new com.backendagenda.AgendaApplication.dto.ScheduleDTO(s) FROM Schedule s WHERE UPPER(s.name) LIKE UPPER(CONCAT('%', :name, '%'))")
Page<ScheduleDTO> searchByName( String name, Pageable pageable);

}

