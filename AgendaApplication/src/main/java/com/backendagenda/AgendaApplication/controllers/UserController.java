package com.backendagenda.AgendaApplication.controllers;

import com.backendagenda.AgendaApplication.dto.UserDTO;
import com.backendagenda.AgendaApplication.dto.UserMinDTO;
import com.backendagenda.AgendaApplication.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @RequestParam(name = "name", defaultValue = "") String name, Pageable pageable) {
        Page<UserDTO> users = userService.getAllUsers(name, pageable);
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<UserMinDTO> createUser(@Valid @RequestBody UserDTO dto) {
        dto = userService.createUser(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(new UserMinDTO(dto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<UserMinDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {
        dto = userService.updateUser(id, dto);

        if (dto != null) {
            return ResponseEntity.ok(new UserMinDTO(dto));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(value = "/me")
    public ResponseEntity<UserDTO> getMe() {
        UserDTO dto = userService.getMe();
        return ResponseEntity.ok(dto);
    }
}
