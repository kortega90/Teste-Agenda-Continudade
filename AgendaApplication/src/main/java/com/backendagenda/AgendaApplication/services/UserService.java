package com.backendagenda.AgendaApplication.services;

import com.backendagenda.AgendaApplication.dto.UserDTO;
import com.backendagenda.AgendaApplication.entities.User;
import com.backendagenda.AgendaApplication.repositories.UserRepository;
import com.backendagenda.AgendaApplication.services.exceptions.ResourNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    public Page<UserDTO> getAllUsers(String name, Pageable pageable) {
        Page<User> users = repository.searchByName(name, pageable);
        return users.map(UserDTO::new);
    }

    public UserDTO getUserById(Long id) {
        Optional<User> userOptional = repository.findById(id);
        return userOptional.map(UserDTO::new).orElse(null);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = new User();

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        User savedUser = repository.save(user);
        return new UserDTO(savedUser);
    }

    public void deleteUserById(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourNotFoundException("Recurso não encontrado");
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Não é possível excluir o usuário com o ID: " + id + ". Há uma violação de integridade referencial.");
        }
    }

    public UserDTO updateUser(Long id, UserDTO dto) {

        Optional<User> optionalUser = repository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(dto.getName());
            existingUser.setEmail(dto.getEmail());
            existingUser.setPassword(dto.getPassword());
            User updatedUser = repository.save(existingUser);
            return new UserDTO(updatedUser);
        } else {
            throw new ResourNotFoundException("Usuário não encontrado com o ID: " + id);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = repository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Email not found");
        }
        return user;
    }

    protected User authenticated() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return repository.findByEmail(username);
        } catch (Exception e) {
            throw new UsernameNotFoundException("Invalid user");
        }

    }

    @Transactional(readOnly = true)
    public UserDTO getMe() {
        User entity = authenticated();
        return new UserDTO(entity);
    }
}
