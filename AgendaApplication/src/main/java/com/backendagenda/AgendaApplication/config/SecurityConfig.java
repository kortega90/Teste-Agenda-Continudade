package com.backendagenda.AgendaApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(auth -> {
                            auth
                                    .requestMatchers("/h2-console/**").permitAll() // Permite acesso ao console H2
                                    .anyRequest().permitAll();
                        } // Permite acesso total para todas as outras URLs
                )
                .headers(headers ->
                        headers
                                .frameOptions().disable() // Desabilita o frame options para o console H2
                )
                .csrf().disable(); // Desabilita o CSRF (útil para desenvolvimento)

        return http.build();
    }

}