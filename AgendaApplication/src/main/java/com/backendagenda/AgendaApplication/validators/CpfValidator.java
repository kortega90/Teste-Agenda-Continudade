package com.backendagenda.AgendaApplication.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CpfValidator implements ConstraintValidator<Cpf, String> {

    @Override
    public void initialize(Cpf constraintAnnotation) {
    }

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext context) {
        // Se o CPF for nulo, retorna verdadeiro (Pos validação de integridade CPF CNPJ)
        if (cpf == null) {
            return true;
        }

        cpf = cpf.trim();

        // Remove os números que funcionam como validação para CPF
        if (cpf.equals("00000000000") || cpf.equals("11111111111") || cpf.equals("22222222222") ||
                cpf.equals("33333333333") || cpf.equals("44444444444") || cpf.equals("55555555555") ||
                cpf.equals("66666666666") || cpf.equals("77777777777") || cpf.equals("88888888888") ||
                cpf.equals("99999999999") || cpf.equals("12345678909")) {
            return false;
        }

        // Verifica se possui apenas 11 caracteres
        if (cpf.length() != 11) {
            return false;
        }

        // Cálculo do primeiro dígito
        int digito1 = 0;
        for (int i = 0; i < 9; i++) {
            digito1 += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        digito1 = 11 - (digito1 % 11);
        if (digito1 > 9) {
            digito1 = 0;
        }

        // Verifica se o primeiro dígito calculado é igual ao CPF fornecido
        if (Character.getNumericValue(cpf.charAt(9)) != digito1) {
            return false;
        }

        // Cálculo do segundo dígito
        int digito2 = 0;
        for (int i = 0; i < 10; i++) {
            digito2 += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        digito2 = 11 - (digito2 % 11);
        if (digito2 > 9) {
            digito2 = 0;
        }

        // Verifica se o segundo dígito calculado é igual ao CPF fornecido
        return Character.getNumericValue(cpf.charAt(10)) == digito2;
    }
}
