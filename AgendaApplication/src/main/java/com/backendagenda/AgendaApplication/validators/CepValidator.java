package com.backendagenda.AgendaApplication.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CepValidator implements ConstraintValidator<Cep, String> {

    @Override
    public void initialize(Cep constraintAnnotation) {
    }

    @Override
    public boolean isValid(String cep, ConstraintValidatorContext context) {
        // Remove espaços em branco
        cep = cep.trim();

        // Verifica se possui 8 caracteres
        if (cep.length() != 8) {
            return false;
        }

        // Verifica se o número informado possui apenas números
        for (int i = 0; i < cep.length(); i++) {
            char chr = cep.charAt(i);
            if (!Character.isDigit(chr)) {
                return false;
            }
        }

        return true;
    }
}

