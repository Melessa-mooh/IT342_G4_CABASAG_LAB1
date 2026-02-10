# Database → Backend → Frontend Connectivity Setup Guide

## Prerequisites
- XAMPP installed with MySQL/MariaDB running
- phpMyAdmin accessible at `http://localhost/phpmyadmin`
- Java 11 or higher installed
- Node.js and npm installed

## Step 1: Database Setup (phpMyAdmin)

### 1.1 Start MySQL Server
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** modules
3. Verify MySQL is running on port **3306**

### 1.2 Create Database
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click on **SQL** tab
3. Copy and paste the contents of `docs/setup-database.sql`
4. Click **Go** to execute

**OR manually create:**
- Database name: `it342g4_cabasag_db`
- Collation: `utf8mb4_unicode_ci`
- Then create the `users` table using the SQL script

### 1.3 Verify Database
- Check that database `it342g4_cabasag_db` exists
- Check that table `users` has these columns:
  - id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
  - firstname (VARCHAR 255)
  - lastname (VARCHAR 255)
  - email (VARCHAR 255, UNIQUE, NOT NULL)
  - username (VARCHAR 255)
  - password_hash (VARCHAR 255, NOT NULL)
  - roles (VARCHAR 50, DEFAULT 'USER')
  - is_active (TINYINT 1, DEFAULT 1)

## Step 2: Backend Configuration

### 2.1 Database Connection Settings
The backend is already configured in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/it342g4_cabasag_db
spring.datasource.username=root
spring.datasource.password=
```

**If your MySQL has a password:**
- Edit `backend/backend/src/main/resources/application.properties`
- Update `spring.datasource.password=YOUR_PASSWORD`

**If using different port:**
- Update the port in the URL: `jdbc:mysql://127.0.0.1:YOUR_PORT/it342g4_cabasag_db`

### 2.2 Install Dependencies
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd clean install
```

### 2.3 Start Backend Server
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd spring-boot:run
```

**Backend should start on:** `http://localhost:8080`

### 2.4 Verify Backend Connection
Check the console output for:
- ✅ `HikariPool-1 - Start completed` (Database connection successful)
- ✅ `Tomcat started on port(s): 8080` (Server running)
- ❌ If you see connection errors, check:
  - MySQL is running in XAMPP
  - Database name is correct
  - Username/password are correct
  - Port 3306 is not blocked

## Step 3: Frontend Setup

### 3.1 Install Dependencies
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
npm install
```

### 3.2 Start Frontend
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
npm start
```

**Frontend should open at:** `http://localhost:3000`

## Step 4: Test the Complete Flow

### 4.1 Test Registration
1. Open `http://localhost:3000` in browser
2. Click **Register** tab
3. Fill in the form:
   - Firstname: Test
   - Lastname: User
   - Username: testuser
   - Email: test@example.com
   - Password: Test123!
   - Confirm Password: Test123!
4. Click **Register**
5. Should see success message and redirect to dashboard

### 4.2 Verify in Database
1. Go to phpMyAdmin
2. Select `it342g4_cabasag_db` database
3. Click on `users` table
4. Click **Browse** - you should see the new user

### 4.3 Test Login
1. Click **Logout**
2. Click **Login** tab
3. Enter:
   - Username: testuser
   - Password: Test123!
4. Click **Login**
5. Should see dashboard with user info

## Troubleshooting

### Backend won't start
**Error: "Access denied for user 'root'@'localhost'"**
- Solution: Update password in `application.properties`

**Error: "Unknown database 'it342g4_cabasag_db'"**
- Solution: Create database using SQL script in phpMyAdmin

**Error: "Communications link failure"**
- Solution: Start MySQL in XAMPP Control Panel

### Frontend can't connect to backend
**Error: "Network error" in browser console**
- Check backend is running on port 8080
- Check CORS is enabled (already configured in `WebCorsConfig.java`)
- Verify API URL in `App.js` is `http://localhost:8080/api`

### Database connection issues
**Check MySQL is running:**
```cmd
netstat -an | findstr :3306
```
Should show: `TCP    0.0.0.0:3306    0.0.0.0:0    LISTENING`

## Connection Flow Summary

```
Frontend (React - Port 3000)
    ↓ HTTP POST
    ↓ http://localhost:8080/api/register
    ↓ http://localhost:8080/api/login
    ↓
Backend (Spring Boot - Port 8080)
    ↓ JDBC
    ↓ jdbc:mysql://127.0.0.1:3306/it342g4_cabasag_db
    ↓
Database (MySQL - Port 3306)
    └─ it342g4_cabasag_db
       └─ users table
```

## Quick Start Commands

**Terminal 1 - Backend:**
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd spring-boot:run
```

**Terminal 2 - Frontend:**
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
npm start
```

**Don't forget to start MySQL in XAMPP first!**
