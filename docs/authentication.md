# Authentication Design

This document describes the registration, login, and logout flows used by the MiniApp.

## Registration Flow
1. Frontend `POST /api/register` with body `{ email, username?, password, confirmPassword }`.
2. Backend validates input: email format, password strength, passwords match.
3. Backend checks for duplicate email via `UserRepository.findByEmail()`.
4. Password hashed with BCrypt (`PasswordEncoder`), `User` saved to `users` table.
5. Backend returns `201 Created` with a JSON body containing a JWT token and safe `user` object (no `passwordHash`).
6. Frontend stores token in `localStorage` and redirects to `dashboard.html`.

## Login Flow
1. Frontend `POST /api/login` with `{ email, password }`.
2. Backend locates user, verifies hashed password with `PasswordEncoder.matches()`.
3. If successful, backend returns `200 OK` with JWT token and `user` data.
4. Frontend stores token & user info; subsequent requests use `Authorization: Bearer <token>` header.

## Logout
- Client-side: clear `localStorage` (remove token and user info) and redirect to login.
- Optional server-side invalidation: add token blacklist if immediate revocation required.

## Security Notes
- Use HTTPS in production and set cookie flags (`HttpOnly`, `Secure`) if storing tokens in cookies.
- Protect sensitive endpoints; use rate limiting and account lockout after repeated failures.

