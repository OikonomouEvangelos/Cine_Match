package com.cinematch.user.service;

import com.cinematch.user.dto.AuthRequest;
import com.cinematch.user.dto.AuthResponse;
import com.cinematch.user.model.User;
import com.cinematch.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ΕΓΓΡΑΦΗ
    public AuthResponse register(AuthRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        String hash = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                hash
        );

        userRepository.save(user);

        return new AuthResponse("User registered successfully");
    }

    // LOGIN
    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        );

        if (!matches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return new AuthResponse("Login successful");
    }
}
