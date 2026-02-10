-- Database Setup Script for MiniMap Application
-- Execute this in phpMyAdmin SQL tab

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS it342g4_cabasag_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE it342g4_cabasag_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    roles VARCHAR(50) NOT NULL DEFAULT 'USER',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create index on username for faster lookups
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);

-- Grant privileges (adjust username if needed)
-- GRANT ALL PRIVILEGES ON it342g4_cabasag_db.* TO 'root'@'localhost';
-- FLUSH PRIVILEGES;
