# Mini Application

Full-stack authentication application with Spring Boot backend and React frontend.

- ✅ **Frontend:** React app in `web/minimap-frontend` - Registration, login, dashboard with Gold & Maroon theme
- ✅ **Backend:** Spring Boot in `backend/backend` - Registration and login APIs with JWT authentication
- ✅ **Database:** MySQL (`it342g4_cabasag_db`) - Fully configured and tested
- ✅ **Connectivity:** Database ↔ Backend ↔ Frontend - All working!


## 🎯 Quick Setup (3 Steps)

### 1. Database (phpMyAdmin)
```
Start XAMPP → MySQL
Open http://localhost/phpmyadmin
Run docs/setup-database.sql
```

### 2. Backend
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

### 3. Frontend
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
npm install
npm start
```

**Open:** http://localhost:3000

## 🔧 What Was Fixed

1. ✅ Added MySQL connector dependency to `pom.xml`
2. ✅ Fixed database column mapping in User entity (`password_hash`, `is_active`)
3. ✅ Created comprehensive setup and troubleshooting documentation
4. ✅ Added SQL script for database creation

## 📊 Architecture

```
Browser (localhost:3000) → React Frontend
    ↓ HTTP
Backend API (localhost:8080) → Spring Boot
    ↓ JDBC
MySQL Database (localhost:3306) → it342g4_cabasag_db
```

## 🎮 API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login and receive JWT
- `GET /actuator/health` - Backend health check

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Spring Boot 2.7.13, Java 11
- **Database:** MySQL 8.0
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security, BCrypt password hashing

## 📋 Prerequisites

- Java 11 or higher
- Maven (included via `mvnw` wrapper)
- MySQL (via XAMPP)
- Node.js and npm
- phpMyAdmin (included with XAMPP)

## 🔗 Ports

- Frontend: **3000**
- Backend: **8080**
- Database: **3306**
- 
---

**Project by:** Ma. Melessa Cabasag  
**Course:** IT342 G4
