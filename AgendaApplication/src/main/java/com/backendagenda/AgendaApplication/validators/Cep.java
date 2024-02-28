package com.backendagenda.AgendaApplication.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = CepValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Cep {
    String message() default "CEP inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
