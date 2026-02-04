# Deployment Notes

## Local development (recommended)
- Start MySQL locally and ensure the `it342g4_cabasag_db` database exists.
- Start backend:
```bash
cd backend/backend
./mvnw spring-boot:run
```
- Serve frontend static files:
```bash
cd web/minimap-app/public
python -m http.server 8000
```

## Docker Compose (suggested)
Create a `docker-compose.yml` to run MySQL and backend together for repeatable environments. Example (not created automatically):
```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: it342g4_cabasag_db
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    ports:
      - '3306:3306'
    volumes:
      - db-data:/var/lib/mysql

  backend:
    build: ./backend/backend
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_NAME: it342g4_cabasag_db
      DB_USERNAME: appuser
      DB_PASSWORD: apppass
    depends_on:
      - db
    ports:
      - '8080:8080'

volumes:
  db-data:
```

## Production considerations
- Replace `spring.jpa.hibernate.ddl-auto=update` with managed migrations.
- Use secrets management (Vault, environment variables set in CI/CD, or cloud provider secret store).
- Use HTTPS/TLS termination (load balancer or reverse proxy).
- Monitor dependencies for CVEs and update regularly.

