package com.backendagenda.AgendaApplication.dto;

import com.backendagenda.AgendaApplication.entities.Contact;
import com.backendagenda.AgendaApplication.entities.Schedule;
import com.backendagenda.AgendaApplication.entities.User;
import org.springframework.http.HttpStatus;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ScheduleMinDTO {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime expirationDate;
    private LocalDateTime updatedAt;

    private List<UserToScheduleDTO> users = new ArrayList<UserToScheduleDTO>();
    private List<ContactDTO> contacts = new ArrayList<ContactDTO>();

    // Construtor

    public ScheduleMinDTO(Schedule entity) {
        this.id = entity.getId();
        this.createdAt = entity.getCreatedAt();
        this.expirationDate = entity.getExpirationDate().atStartOfDay();
        this.updatedAt = entity.getUpdatedAt();
        for (User user : entity.getUsers()) {
            users.add(new UserToScheduleDTO(user));
        }
        for (Contact contact : entity.getContacts()) {
            contacts.add(new ContactDTO(contact));
        }
    }

    public ScheduleMinDTO(Long id, LocalDateTime createdAt, LocalDateTime expirationDate, LocalDateTime updatedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.expirationDate = expirationDate;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<UserToScheduleDTO> getUsers() {
        return users;
    }

    public List<ContactDTO> getContacts() {
        return contacts;
    }

    public ValidationError validate() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Lista para armazenar os erros de validação
        List<FieldMessage> fieldMessages = new ArrayList<>();

        // Validar o ScheduleMinDTO
        Set<ConstraintViolation<ScheduleMinDTO>> scheduleMinDTOViolations = validator.validate(this);
        for (ConstraintViolation<ScheduleMinDTO> violation : scheduleMinDTOViolations) {
            fieldMessages.add(new FieldMessage(violation.getPropertyPath().toString(), violation.getMessage()));
        }

        // Validar cada ContactDTO
        for (ContactDTO contactDTO : contacts) {
            Set<ConstraintViolation<ContactDTO>> contactDTOViolations = validator.validate(contactDTO);
            for (ConstraintViolation<ContactDTO> violation : contactDTOViolations) {
                fieldMessages.add(new FieldMessage(violation.getPropertyPath().toString(), violation.getMessage()));
            }
        }

        // Se houver erros, criar e retornar um objeto ValidationError
        if (!fieldMessages.isEmpty()) {
            Instant timestamp = Instant.now(); // Obtém o carimbo de data/hora atual
            Integer status = HttpStatus.UNPROCESSABLE_ENTITY.value(); // Código de status HTTP 422 para dados inválidos
            String error = "Erro de validação"; // Descrição do erro
            String path = "/api/schedule"; // Caminho do endpoint onde ocorreu o erro
            LocalDateTime localDateTime = LocalDateTime.now(); // Data/hora local atual
            LocalDate localDate = LocalDate.now(); // Data local atual

            ValidationError validationError = new ValidationError(timestamp, status, error, path, localDateTime, localDate);
            fieldMessages.forEach(message -> validationError.addError(message.getFieldName(), message.getMessage()));
            return validationError;
        }

        // Se não houver erros, retornar null
        return null;
    }
}
