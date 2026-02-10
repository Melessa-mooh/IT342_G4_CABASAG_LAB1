package com.miniapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.miniapp.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);
}
