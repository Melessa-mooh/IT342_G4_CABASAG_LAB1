# Database Schema & Connectivity

## Database Configuration
- **Database name:** `it342g4_cabasag_db`
- **Port:** 3306 (default MySQL/MariaDB)
- **Host:** 127.0.0.1 (localhost)
- **Default username:** root
- **Default password:** (empty)

## Users Table Schema
```sql
CREATE TABLE users (
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
);
```

### Column Details:
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `firstname` - VARCHAR(255) - User's first name
- `lastname` - VARCHAR(255) - User's last name
- `email` - VARCHAR(255) UNIQUE NOT NULL - User's email (must be unique)
- `username` - VARCHAR(255) - User's username
- `password_hash` - VARCHAR(255) NOT NULL - BCrypt hashed password
- `roles` - VARCHAR(50) NOT NULL DEFAULT 'USER' - User role (USER, ADMIN, etc.)
- `is_active` - TINYINT(1) NOT NULL DEFAULT 1 - Account active status

## JDBC Connection
The backend uses this JDBC URL (configured in `application.properties`):
```
jdbc:mysql://127.0.0.1:3306/it342g4_cabasag_db?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC&useSSL=false
```

### Environment Variables (Optional)
You can override defaults using environment variables:
- `DB_HOST` - Database host (default: 127.0.0.1)
- `DB_PORT` - Database port (default: 3306)
- `DB_NAME` - Database name (default: it342g4_cabasag_db)
- `DB_USERNAME` - Database username (default: root)
- `DB_PASSWORD` - Database password (default: empty)

## JPA/Hibernate Configuration
- **DDL Mode:** `spring.jpa.hibernate.ddl-auto=update`
  - Automatically updates schema to match entities
  - For production, use Flyway or Liquibase for migrations
- **Dialect:** `org.hibernate.dialect.MySQL8Dialect`
- **Show SQL:** Enabled for debugging
- **Timezone:** UTC

## Setup Instructions
See `docs/CONNECTIVITY_SETUP.md` for complete setup guide including:
- phpMyAdmin database creation
- Backend configuration
- Frontend connection
- Testing the complete flow

## Quick Setup
1. Execute `docs/setup-database.sql` in phpMyAdmin
2. Start backend: `mvnw.cmd spring-boot:run`
3. Start frontend: `npm start`

## Troubleshooting

### Access Denied Error
- Ensure MySQL is running in XAMPP
- Check username/password in `application.properties`
- Verify user has privileges on the database

### Database Not Found
- Create database using `setup-database.sql`
- Verify database name matches configuration

### Connection Timeout
- Check MySQL is listening on port 3306
- Verify firewall isn't blocking the connection
- Ensure XAMPP MySQL service is started

### JDBC Driver Missing
- The MySQL connector is now included in `pom.xml`
- Run `mvnw.cmd clean install` to download dependencies

