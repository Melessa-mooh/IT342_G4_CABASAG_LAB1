package com.miniapp.backend.service;

import java.util.regex.Pattern;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miniapp.backend.dto.AuthResponse;
import com.miniapp.backend.dto.LoginRequest;
import com.miniapp.backend.dto.RegisterRequest;
import com.miniapp.backend.dto.UserDto;
import com.miniapp.backend.entity.User;
import com.miniapp.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // Email regex pattern for validation
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$");

    // Password policy constraints
    private static final int MIN_PASSWORD_LENGTH = 8;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Register a new user with validation
     */
    public AuthResponse register(RegisterRequest request) {
        String firstname = request.getFirstname() != null ? request.getFirstname().trim() : "";
        String lastname = request.getLastname() != null ? request.getLastname().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String username = request.getUsername() != null ? request.getUsername().trim() : null;
        String password = request.getPassword();
        String confirmPassword = request.getConfirmPassword();

        // Validation
        if (firstname.isEmpty() || lastname.isEmpty()) {
            return new AuthResponse("First name and last name are required");
        }
        if (email.isEmpty()) {
            return new AuthResponse("Email is required");
        }
        if (!isValidEmail(email)) {
            return new AuthResponse("Invalid email format");
        }
        if (userRepository.findByEmail(email) != null) {
            return new AuthResponse("Email already registered");
        }
        if (password == null || password.isEmpty()) {
            return new AuthResponse("Password is required");
        }
        if (!validatePassword(password)) {
            return new AuthResponse(
                    "Password must be at least 8 characters with uppercase, lowercase, and a number");
        }
        if (!password.equals(confirmPassword)) {
            return new AuthResponse("Passwords do not match");
        }

        // Create user
        User user = new User();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        if (username != null && !username.isEmpty()) {
            user.setUsername(username);
        }
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setActive(true);
        user.setRoles("USER");

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());

        UserDto userDto = new UserDto(savedUser.getId(), savedUser.getFirstname(), savedUser.getLastname(),
                savedUser.getEmail(), savedUser.getUsername(), savedUser.getRoles(),
                savedUser.isActive());

        return new AuthResponse("User registered successfully", token, userDto);
    }

    /**
     * Login user with credentials (username or email)
     */
    public AuthResponse login(LoginRequest request) {
        String username = request.getUsername() != null ? request.getUsername().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String password = request.getPassword();

        if (username.isEmpty() && email.isEmpty()) {
            return new AuthResponse("Username/Email and password are required");
        }
        if (password == null || password.isEmpty()) {
            return new AuthResponse("Username/Email and password are required");
        }

        // Try to find user by username first, then by email
        User user = null;
        if (!username.isEmpty()) {
            user = userRepository.findByUsername(username);
        }
        if (user == null && !email.isEmpty()) {
            user = userRepository.findByEmail(email);
        }

        if (user == null) {
            return new AuthResponse("Invalid username/email or password");
        }

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            return new AuthResponse("Invalid username/email or password");
        }

        if (!user.isActive()) {
            return new AuthResponse("Account is inactive");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getEmail());

        UserDto userDto = new UserDto(user.getId(), user.getFirstname(), user.getLastname(),
                user.getEmail(), user.getUsername(), user.getRoles(),
                user.isActive());

        return new AuthResponse("Login successful", token, userDto);
    }

    /**
     * Logout (token-based invalidation handled by client)
     */
    public AuthResponse logout() {
        return new AuthResponse("Logout successful");
    }

    /**
     * Validate email format
     */
    private boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Validate password policy:
     * - At least 8 characters
     * - At least 1 uppercase letter
     * - At least 1 lowercase letter
     * - At least 1 digit
     */
    private boolean validatePassword(String password) {
        if (password.length() < MIN_PASSWORD_LENGTH) {
            return false;
        }
        return password.matches(".*[A-Z].*") && // uppercase
                password.matches(".*[a-z].*") && // lowercase
                password.matches(".*[0-9].*"); // digit
    }
}