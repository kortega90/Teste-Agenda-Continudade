package com.backendagenda.AgendaApplication.dto;

import com.backendagenda.AgendaApplication.entities.User;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotBlank;

public class UserMinDTO {
    private Long id;

    @NotBlank(message = "Campo 'name' é obrigatório")
    private String name;

    @NotBlank(message = "Campo 'email' é obrigatório")
    private String email;

    public UserMinDTO() {
    }

     public UserMinDTO(UserDTO entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
    }

    public UserMinDTO(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
