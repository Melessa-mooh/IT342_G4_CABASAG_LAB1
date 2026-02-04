package com.miniapp.backend.dto;

public class AuthResponse {

    private String message;
    private String token;
    private UserDto user;
    private String error;

    public AuthResponse() {}

    public AuthResponse(String message, String token, UserDto user) {
        this.message = message;
        this.token = token;
        this.user = user;
        this.error = null;
    }

    public AuthResponse(String error) {
        this.error = error;
        this.message = null;
        this.token = null;
        this.user = null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
