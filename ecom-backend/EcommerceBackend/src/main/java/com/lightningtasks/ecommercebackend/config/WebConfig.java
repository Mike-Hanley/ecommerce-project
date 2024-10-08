package com.lightningtasks.ecommercebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.lightningtasks.ecommercebackend.converters.StringToRoleConverter;

import io.micrometer.common.lang.NonNull;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    private final StringToRoleConverter stringToRoleConverter; 

    public WebConfig(StringToRoleConverter stringToRoleConverter) {
        this.stringToRoleConverter = stringToRoleConverter;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(stringToRoleConverter);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://217.15.170.145")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowCredentials(true);
}
}
