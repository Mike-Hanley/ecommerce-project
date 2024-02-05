package com.lightningtasks.microtasksapp.authorization;

import com.lightningtasks.microtasksapp.annotations.Policy;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;
import java.util.function.Supplier;

public class CustomAuthorizationManager<T> implements AuthorizationManager<T> {
    private final AuthenticationTrustResolver trustResolver = new AuthenticationTrustResolverImpl();

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, T object) {

        if (hasAuthentication(authentication.get()) && object instanceof MethodInvocation) {

            MethodInvocation methodInvocation = (MethodInvocation) object;
            Policy policyAnnotation = AnnotationUtils.findAnnotation(methodInvocation.getMethod(), Policy.class);

            User user = (User) authentication.get()
                    .getPrincipal();

            // You need to determine how to handle the restricted policy check based on your application requirements
            return new AuthorizationDecision(Optional.ofNullable(policyAnnotation)
                    .map(Policy::value)
                    .filter(policy -> policy == PolicyEnum.OPEN) // || (policy == PolicyEnum.RESTRICTED && ...)
                    .isPresent());

        }

        return new AuthorizationDecision(false);
    }

    private boolean hasAuthentication(Authentication authentication) {
        return authentication != null && isNotAnonymous(authentication) && authentication.isAuthenticated();
    }

    private boolean isNotAnonymous(Authentication authentication) {
        return !this.trustResolver.isAnonymous(authentication);
    }
}