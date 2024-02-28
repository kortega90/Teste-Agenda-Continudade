package com.backendagenda.AgendaApplication.dto;

import com.backendagenda.AgendaApplication.entities.Schedule;
import com.backendagenda.AgendaApplication.entities.User;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private Long id;
    private String name;
    @Column(unique = true)
    @NotBlank(message = "Campo requerido")
    private String email;
    @NotBlank(message = "Campo requerido")
    private String password;
    private List<String> roles = new ArrayList<>();

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.password = entity.getPassword();
        for (GrantedAuthority role : entity.getAuthorities()) {
            roles.add(role.getAuthority());
        }
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }
}
