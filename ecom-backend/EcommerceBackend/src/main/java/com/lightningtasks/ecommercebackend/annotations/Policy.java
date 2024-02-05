package com.lightningtasks.ecommercebackend.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.lightningtasks.ecommercebackend.authorization.PolicyEnum;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Policy {
    PolicyEnum value() default PolicyEnum.OPEN;
}
