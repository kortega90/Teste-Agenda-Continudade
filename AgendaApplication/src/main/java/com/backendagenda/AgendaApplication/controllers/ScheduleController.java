package com.backendagenda.AgendaApplication.controllers;

import com.backendagenda.AgendaApplication.dto.ScheduleDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleMinDTO;
import com.backendagenda.AgendaApplication.dto.ValidationError;
import com.backendagenda.AgendaApplication.services.EmailService;
import com.backendagenda.AgendaApplication.services.ScheduleService;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping(value = "/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;
    @Autowired
    private EmailService emailService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/all")
    public ResponseEntity<Page<ScheduleDTO>> getAllSchedules(
            @RequestParam(name = "name", defaultValue = "") String name, Pageable pageable) {
        return ResponseEntity.ok(scheduleService.getAllSchedules(name, pageable));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @Transactional
    @GetMapping("/user/{userId}")
    public ResponseEntity<Set<ScheduleDTO>> getSchedulesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(scheduleService.getSchedulesByUserId(userId));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @Transactional
    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleDTO> getScheduleById(@PathVariable Long scheduleId) {
        ScheduleDTO scheduleDTO = scheduleService.getScheduleById(scheduleId);
        return ResponseEntity.ok(scheduleDTO);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @Transactional
    @PostMapping("/add")
    public ResponseEntity<ScheduleDTO> addSchedule(@Valid @RequestBody ScheduleDTO dto) {
        dto = scheduleService.addSchedule(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);

    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/delete/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/update/{scheduleId}")
    public ResponseEntity<ScheduleDTO> updateSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ScheduleDTO scheduleDetails) {
        return ResponseEntity.ok(scheduleService.updateSchedule(scheduleId, scheduleDetails));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/contacts/{scheduleId}")
    @Transactional
    public ResponseEntity<?> updateContactToSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ScheduleMinDTO dto) {
        // Validação do ScheduleMinDTO
        ValidationError error = dto.validate();
        if (error != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        scheduleService.sendEmailsForSchedule(scheduleId); // Envie e-mails para os usuários associados ao agendamento
        return ResponseEntity.ok(scheduleService.updateContactToSchedule(scheduleId, dto));
    }

}
