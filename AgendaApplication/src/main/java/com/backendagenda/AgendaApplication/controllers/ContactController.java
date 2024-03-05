package com.backendagenda.AgendaApplication.controllers;

import com.backendagenda.AgendaApplication.dto.ContactDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleDTO;
import com.backendagenda.AgendaApplication.services.ContactService;
import com.backendagenda.AgendaApplication.services.ScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Transactional
    @GetMapping("/{contactId}")
    public ResponseEntity<ContactDTO> getContactById(
            @PathVariable Long contactId) {
        return ResponseEntity.ok(contactService.findContactById(contactId));
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<Void> deleteContactFromSchedule( @PathVariable Long contactId) {
        contactService.deleteById(contactId);
        return ResponseEntity.noContent().build();
    }

    //    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("add/{scheduleId}")
        public ResponseEntity<?> createContactToSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.addContactToSchedule(scheduleId, dto));
    }

    @PutMapping("update/{scheduleId}")
    @Transactional
    public ResponseEntity<?> updateContactInSchedule(@PathVariable Long scheduleId, @Valid @RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.updateContactToSchedule(scheduleId, dto));
    }
}