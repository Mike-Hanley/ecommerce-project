package com.lightningtasks.microtasksapp.converters;
import com.lightningtasks.microtasksapp.model.Role;
import com.lightningtasks.microtasksapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StringToRoleConverter implements Converter<String, Role> {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role convert(String roleName) {
        Optional<Role> role = roleRepository.findByName(roleName);
        return role.orElse(null);
    }
}

