# Database Schema & Connectivity

## Database
- Database name used in defaults: `it342g4_cabasag_db`.
- Users table (columns inferred from phpMyAdmin screenshot):
  - `id` BIGINT AUTO_INCREMENT PRIMARY KEY
  - `email` VARCHAR(255) UNIQUE NOT NULL
  - `username` VARCHAR(255) NULL
  - `password_hash` VARCHAR(255) NOT NULL
  - `roles` VARCHAR(50) NOT NULL DEFAULT 'USER'
  - `is_active` TINYINT(1) NOT NULL DEFAULT 1

## Connection
- JDBC URL used in `application.properties` (defaults):
```
jdbc:mysql://${DB_HOST:127.0.0.1}:${DB_PORT:3306}/${DB_NAME:it342g4_cabasag_db}?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC&useSSL=false
```
- Set environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, and `DB_PASSWORD` before starting backend, or edit `application.properties` directly.

## JPA/Hibernate
- Current Hibernate DDL setting: `spring.jpa.hibernate.ddl-auto=update` — will update schema to match entities.
- For production, use controlled migrations (Flyway or Liquibase).

## Troubleshooting
- If you get `Access denied` from MySQL, ensure the configured user has privileges on the database and `localhost` is the right host.
- If JDBC driver missing, ensure Maven downloads `mysql-connector-java` (runtime dependency present in `pom.xml`).

