package com.backendagenda.AgendaApplication.controllers;

import com.backendagenda.AgendaApplication.dto.ContactDTO;
import com.backendagenda.AgendaApplication.services.ContactService;
import com.backendagenda.AgendaApplication.services.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;


@RestController
@RequestMapping(value = "/contact")
public class ContactController {

    private final ContactService contactService;
    private final ScheduleService scheduleService;

    public ContactController(ContactService contactService, ScheduleService scheduleService) {
        this.contactService = contactService;
        this.scheduleService = scheduleService;
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<Void> deleteContactFromSchedule( @PathVariable Long contactId) {
        contactService.deleteById(contactId);
        return ResponseEntity.noContent().build();
    }

    //    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("add/{scheduleId}")
    @Transactional
        public ResponseEntity<?> createContactToSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ContactDTO dto) {
        scheduleService.sendEmailsForSchedule(scheduleId); // Envie e-mails para os usuários associados ao agendamento
        return ResponseEntity.ok(contactService.addContactToSchedule(scheduleId, dto));
    }

    @PutMapping("update/{scheduleId}")
    @Transactional
    public ResponseEntity<?> updateContactInSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ContactDTO dto) {
        scheduleService.sendEmailsForSchedule(scheduleId);
        return ResponseEntity.ok(contactService.updateContactToSchedule(scheduleId, dto));
    }
}