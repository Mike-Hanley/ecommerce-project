package com.lightningtasks.ecommercebackend.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lightningtasks.ecommercebackend.model.CustomUserDetails;
import com.lightningtasks.ecommercebackend.model.User;
import com.lightningtasks.ecommercebackend.utils.JwtUtils;

import java.io.IOException;
import java.util.HashSet;

public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private JwtUtils jwtUtils;


    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUsernameFromJwtToken(jwt);

                User user = new User();
                user.setUsername(username);
                user.setRoles(new HashSet<>()); // Empty set of roles for now

                UserDetails userDetails = new CustomUserDetails(user);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Log the error or print the exception message
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (headerAuth != null) {
            String[] authParts = headerAuth.split(" ");
            if (authParts.length == 2 && "Bearer".equals(authParts[0])) {
                return authParts[1];
            }
        }

        return null;
    }

}
