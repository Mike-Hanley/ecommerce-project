package com.lightningtasks.ecommercebackend.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lightningtasks.ecommercebackend.authorization.UserAlreadyExistsException;
import com.lightningtasks.ecommercebackend.model.Role;
import com.lightningtasks.ecommercebackend.model.User;
import com.lightningtasks.ecommercebackend.repository.RoleRepository;
import com.lightningtasks.ecommercebackend.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository; // Add RoleRepository
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository; // Inject RoleRepository
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    // Add a method to register a new user
    public User registerUser(String username, String password, Set<String> roleNames) {
        // Check if the username is already taken
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("Username already taken.");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password);

        // Create a new user
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(encodedPassword);

        // Fetch roles from the database by their names and assign them to the new user
        Set<Role> roles = roleNames.stream()
                .map(roleName -> roleRepository.findByName(roleName)
                        .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName)))
                .collect(Collectors.toSet());
        newUser.setRoles(roles);

        // Save the new user to the database
        return userRepository.save(newUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

}
