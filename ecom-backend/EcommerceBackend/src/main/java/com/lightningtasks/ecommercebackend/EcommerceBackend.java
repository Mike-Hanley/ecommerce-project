package com.lightningtasks.ecommercebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
@EnableJpaRepositories("com.lightningtasks.ecommercebackend.*")
@ComponentScan(basePackages = { "com.lightningtasks.ecommercebackend.*" })
@EntityScan("com.lightningtasks.ecommercebackend.*")
public class EcommerceBackend {
    public EcommerceBackend() {
        super();
        //TODO Auto-generated constructor stub
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    public static void main(String[] args) {
        SpringApplication.run(EcommerceBackend.class, args);

        // Add the bean inside the main class

    }

}
