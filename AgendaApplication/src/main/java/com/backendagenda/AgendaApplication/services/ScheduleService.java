package com.backendagenda.AgendaApplication.services;

import com.backendagenda.AgendaApplication.dto.ContactDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleDTO;
import com.backendagenda.AgendaApplication.dto.ScheduleMinDTO;
import com.backendagenda.AgendaApplication.dto.UserToScheduleDTO;
import com.backendagenda.AgendaApplication.entities.Contact;
import com.backendagenda.AgendaApplication.entities.Schedule;
import com.backendagenda.AgendaApplication.entities.User;
import com.backendagenda.AgendaApplication.repositories.ContactRepository;
import com.backendagenda.AgendaApplication.repositories.ScheduleRepository;
import com.backendagenda.AgendaApplication.repositories.UserRepository;
import com.backendagenda.AgendaApplication.services.exceptions.DatabaseException;

import javax.persistence.EntityNotFoundException;

import com.backendagenda.AgendaApplication.services.exceptions.ResourNotFoundException;
import com.backendagenda.AgendaApplication.validators.Cep;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private ContactRepository contactRepository;
    private final EmailService emailService;

    public ScheduleService(ScheduleRepository scheduleRepository, UserRepository userRepository, ContactRepository contactRepository, EmailService emailService) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    public Page<ScheduleDTO> getAllSchedules(String name, Pageable pageable) {
        try {
            Page<ScheduleDTO> schedule = scheduleRepository.searchByName(name, pageable);
            return schedule;
        } catch (DataAccessException e) {
            throw new ResourNotFoundException("Erro ao buscar agendamentos por nome" + e);
        }
    }

    public Set<ScheduleDTO> getSchedulesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourNotFoundException("Usuario não encontrada com ID : " + userId));


        // Usar um Map para manter os ScheduleDTOs únicos com base no ID do agendamento
        Map<Long, ScheduleDTO> uniqueSchedules = new HashMap<>();

        // Iterar sobre os agendamentos do usuário e adicionar ao Map, garantindo que não haja duplicatas com o mesmo ID de agendamento
        for (Schedule schedule : user.getSchedules()) {
            uniqueSchedules.putIfAbsent(schedule.getId(), new ScheduleDTO(schedule));
        }

        // Retornar os ScheduleDTOs únicos como um Set
        return new HashSet<>(uniqueSchedules.values());
    }

    public ScheduleDTO getScheduleById(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourNotFoundException("Agenda não encontrada com ID: " + scheduleId));
        return new ScheduleDTO(schedule);
    }

    public ScheduleDTO addSchedule(ScheduleDTO dto) {
        try {
            Schedule entity = new Schedule();

            LocalDateTime now = LocalDateTime.now();
            entity.setName(dto.getName());
            entity.setExpirationDate(dto.getExpirationDate().toLocalDate());
            entity.setCreatedAt(now);
            entity.setUpdatedAt(now);

            entity.getUsers().clear();

            for (UserToScheduleDTO userToScheduleDto : dto.getUsers()) {
                User user = new User();
                user.setId(userToScheduleDto.getId());
                entity.getUsers().add(user);
            }
            entity = scheduleRepository.save(entity);
            return new ScheduleDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourNotFoundException("Erro ao salvar no banco de dados" + e);
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void deleteSchedule(Long scheduleId) {
        try {
            scheduleRepository.deleteById(scheduleId);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourNotFoundException("Recurso não encontrado");
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    @Transactional
    public ScheduleDTO updateSchedule(Long id, ScheduleDTO dto) {
        try {
            Schedule entity = scheduleRepository.findById(id)
                    .orElseThrow(() -> new ResourNotFoundException("Agenda não encontrada com ID: " + id));

            entity.setName(dto.getName());
            entity.setExpirationDate(dto.getExpirationDate().toLocalDate());
            entity.setUpdatedAt(LocalDateTime.now());

            entity.getUsers().clear();

            for (UserToScheduleDTO userToScheduleDto : dto.getUsers()) {
                User user = userRepository.findById(userToScheduleDto.getId())
                        .orElseThrow(() -> new ResourNotFoundException("Usuário não encontrado com ID: " + userToScheduleDto.getId()));
                entity.getUsers().add(user);
            }
            return new ScheduleDTO(scheduleRepository.save(entity));
        } catch (EntityNotFoundException e) {
            throw new ResourNotFoundException("Recurso não encontrado" + e);
        }
    }

    @Transactional
    public ScheduleMinDTO updateContactToSchedule(Long scheduleId, ScheduleMinDTO dto) {
        try {
            Schedule entity = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new ResourNotFoundException("Agenda não encontrada com o ID: " + scheduleId));

            entity.getContacts().clear();

            for (ContactDTO contactDto : dto.getContacts()) {
                Contact contact = new Contact();
                contact.setName(contactDto.getName());
                contact.setCep(contactDto.getCep());
                contact.setEmail(contactDto.getEmail());
                contact.setPhone(contactDto.getPhone());
                contact.setCnpj(contactDto.getCnpj());
                contact.setCpf(contactDto.getCpf());
                contact.setSchedule(entity);

                entity.addContact(contact);
            }
            return new ScheduleMinDTO(scheduleRepository.save(entity));
        } catch (ResourNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar contato na agenda", e);
        }
    }

    @Transactional
    public void sendEmailsForSchedule(Long scheduleId) {
        List<String> userEmails = userRepository.findUserEmailsByScheduleId(scheduleId);
        // Envie e-mails para os usuários encontrados
        for (String email : userEmails) {
            emailService.sendEmail(email, "Modificação de contatos nas agendas", "contactos atualizado com sucesso"); // Implemente o serviço de envio de e-mail
        }
    }


}
