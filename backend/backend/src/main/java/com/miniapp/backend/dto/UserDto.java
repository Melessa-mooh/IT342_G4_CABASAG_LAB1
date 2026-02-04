package com.miniapp.backend.dto;

public class UserDto {

    private Long id;
    private String email;
    private String username;
    private String roles;
    private boolean isActive;

    public UserDto() {}

    public UserDto(Long id, String email, String username, String roles, boolean isActive) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
