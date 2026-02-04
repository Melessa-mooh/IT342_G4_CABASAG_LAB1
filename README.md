# MiniApp

Full-stack mini authentication project (Spring Boot backend + simple static frontend).

## Status
- Frontend (vanilla HTML/CSS/JS) in `web/minimap-app/public` — registration, login, dashboard implemented with Gold & Maroon theme.
- Backend (Spring Boot) in `backend/backend` — registration and login APIs; JWT issued at login/registration.
- Database: MySQL expected (`it342g4_cabasag_db` used in screenshots); DB connectivity needs verification.

## Quickstart

Prerequisites:
- Java 11
- Maven (or use the included `mvnw` wrapper)
- MySQL server
- Node / Python (for serving static frontend)

1. Configure database credentials (preferred via environment variables):

PowerShell example:
```powershell
$env:DB_HOST='127.0.0.1'
$env:DB_PORT='3306'
$env:DB_NAME='it342g4_cabasag_db'
$env:DB_USERNAME='root'
$env:DB_PASSWORD='your_password'
```

2. Start backend (from repository root):
```powershell
cd backend/backend
./mvnw spring-boot:run
```
The backend runs on `http://localhost:8080` by default.

3. Serve frontend (static):
```bash
cd web/minimap-app/public
python -m http.server 8000
# or: npx http-server . -p 8000
```
Open `http://localhost:8000` in your browser.

## API Endpoints
- `POST /api/register` — register new user
- `POST /api/login` — login and receive JWT
- `POST /api/logout` — logout (client-side token removal)

## Notes & Next Steps
- Database tasks remain: verify schema and connectivity, then set `TASKLIST.md` to done.
- Consider adding Docker Compose for reproducible DB+backend setup.
- For production: move secrets to environment variables or a vault, disable `spring.jpa.hibernate.ddl-auto=update`, and add proper logging and monitoring.

## Docs
See `docs/` for Authentication, Database, and Deployment documentation.
