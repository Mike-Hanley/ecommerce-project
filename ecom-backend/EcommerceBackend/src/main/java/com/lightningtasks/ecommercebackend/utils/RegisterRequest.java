package com.lightningtasks.ecommercebackend.utils;

import java.util.Set;

public class RegisterRequest {
    private String username;
    private String password;
    private Set<String> roleNames;

    public RegisterRequest(String username, String password, Set<String> roleNames) {
        this.username = username;
        this.password = password;
        this.roleNames = roleNames;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roleNames;
    }

    public void setRoles(Set<String> roleNames) {
        this.roleNames = roleNames;
    }
}

