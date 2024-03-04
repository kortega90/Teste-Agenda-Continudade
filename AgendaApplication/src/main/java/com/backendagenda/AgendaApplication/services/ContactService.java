package com.backendagenda.AgendaApplication.services;

import com.backendagenda.AgendaApplication.dto.ContactDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleMinDTO;
import com.backendagenda.AgendaApplication.dto.UserDTO;
import com.backendagenda.AgendaApplication.entities.Contact;
import com.backendagenda.AgendaApplication.entities.Schedule;
import com.backendagenda.AgendaApplication.entities.User;
import com.backendagenda.AgendaApplication.repositories.ContactRepository;
import com.backendagenda.AgendaApplication.repositories.ScheduleRepository;
import com.backendagenda.AgendaApplication.repositories.UserRepository;
import com.backendagenda.AgendaApplication.services.exceptions.ResourNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Objects;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private final ScheduleRepository scheduleRepository;


    public ContactService(ContactRepository contactRepository, ScheduleRepository scheduleRepository) {
        this.contactRepository = contactRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public ContactDTO findContactById(Long idContact) {
        Contact contact = contactRepository.findById(idContact)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found with ID: " + idContact));

        return new ContactDTO(contact);
    }

    @Transactional
    public void deleteById(Long contactId) {
        contactRepository.deleteById(contactId);
    }


    @Transactional
    public void deleteContactsByScheduleId(Long scheduleId) {
        contactRepository.deleteByScheduleId(scheduleId);
    }

    @Transactional
    public ScheduleDTO addContactToSchedule(Long scheduleId,ContactDTO dto) {
        try {
            // Verifica se a agenda existe
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new ResourNotFoundException("Agenda não encontrada com o ID: " + scheduleId));
            // Cria um novo contato
            Contact newContact = new Contact();
            newContact.setName(dto.getName());
            newContact.setCep(dto.getCep());
            newContact.setEmail(dto.getEmail());
            newContact.setPhone(dto.getPhone());
            newContact.setCnpj(dto.getCnpj());
            newContact.setCpf(dto.getCpf());
            newContact.setSchedule(schedule);

            // Adiciona o novo contato à lista de contatos da agenda
            schedule.addContact(newContact);

            // Salvando o novo contato e a agenda atualizada
            contactRepository.save(newContact);

            return new ScheduleDTO(schedule);
        } catch (ResourNotFoundException e) {
            throw e;
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao adicionar contato à agenda", e);
        }
    }

    @Transactional
    public ContactDTO updateContactToSchedule(Long scheduleId, ContactDTO dto) {
        try {
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new ResourNotFoundException("Agenda não encontrada com o ID: " + scheduleId));

            // Verifique se o contato que está sendo atualizado existe na agenda
            Contact existingContact = schedule.getContacts().stream()
                    .filter(contact -> Objects.equals(contact.getId(), dto.getId()))
                    .findFirst()
                    .orElseThrow(() -> new ResourNotFoundException("Contato não encontrado na agenda"));

            // Atualize os detalhes do contato com base nos dados do DTO
            existingContact.setName(dto.getName());
            existingContact.setCep(dto.getCep());
            existingContact.setEmail(dto.getEmail());
            existingContact.setPhone(dto.getPhone());
            existingContact.setCnpj(dto.getCnpj());
            existingContact.setCpf(dto.getCpf());

            // Salvando a agenda atualizada com o contato atualizado
            scheduleRepository.save(schedule);

            return new ContactDTO(existingContact);

        } catch (ResourNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar contato na agenda", e);
        }
    }
}
