package com.lightningtasks.microtasksapp.annotations;

import com.lightningtasks.microtasksapp.authorization.PolicyEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Policy {
    PolicyEnum value() default PolicyEnum.OPEN;
}
