# 🔧 Troubleshooting Guide

## Database Connection Issues

### ❌ Error: "Communications link failure"
**Symptoms:** Backend fails to start with MySQL connection error

**Solutions:**
1. ✅ Check MySQL is running in XAMPP Control Panel
2. ✅ Verify port 3306 is not blocked:
   ```cmd
   netstat -an | findstr :3306
   ```
   Should show: `LISTENING`
3. ✅ Check firewall isn't blocking MySQL
4. ✅ Restart MySQL service in XAMPP

### ❌ Error: "Access denied for user 'root'@'localhost'"
**Symptoms:** Backend can't authenticate to database

**Solutions:**
1. ✅ Check if MySQL has a password set
2. ✅ Update `application.properties`:
   ```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
3. ✅ Verify user exists in phpMyAdmin → User accounts

### ❌ Error: "Unknown database 'it342g4_cabasag_db'"
**Symptoms:** Database doesn't exist

**Solutions:**
1. ✅ Open phpMyAdmin: `http://localhost/phpmyadmin`
2. ✅ Run SQL script from `docs/setup-database.sql`
3. ✅ Verify database appears in left sidebar
4. ✅ Check spelling matches exactly: `it342g4_cabasag_db`

### ❌ Error: "Table 'users' doesn't exist"
**Symptoms:** Database exists but table is missing

**Solutions:**
1. ✅ Run the CREATE TABLE statement from `setup-database.sql`
2. ✅ Or let Hibernate create it (with `ddl-auto=update`)
3. ✅ Verify table structure matches User entity

## Backend Issues

### ❌ Error: "Port 8080 already in use"
**Symptoms:** Backend won't start, port conflict

**Solutions:**
1. ✅ Find process using port 8080:
   ```cmd
   netstat -ano | findstr :8080
   ```
2. ✅ Kill the process:
   ```cmd
   taskkill /PID <process_id> /F
   ```
3. ✅ Or change backend port in `application.properties`:
   ```properties
   server.port=8081
   ```
   (Don't forget to update frontend API URL!)

### ❌ Error: "Could not find or load main class"
**Symptoms:** Backend won't start, class not found

**Solutions:**
1. ✅ Clean and rebuild:
   ```cmd
   mvnw.cmd clean install
   ```
2. ✅ Check Java version:
   ```cmd
   java -version
   ```
   Should be Java 11 or higher
3. ✅ Delete `target` folder and rebuild

### ❌ Error: "Failed to load driver class com.mysql.cj.jdbc.Driver"
**Symptoms:** MySQL driver not found

**Solutions:**
1. ✅ Verify `pom.xml` has MySQL connector dependency
2. ✅ Run Maven install:
   ```cmd
   mvnw.cmd clean install
   ```
3. ✅ Check internet connection (Maven needs to download dependencies)

## Frontend Issues

### ❌ Error: "Network error" when registering/logging in
**Symptoms:** Frontend can't reach backend API

**Solutions:**
1. ✅ Verify backend is running on port 8080
2. ✅ Check backend console for errors
3. ✅ Verify API URL in `App.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```
4. ✅ Check browser console for CORS errors
5. ✅ Test backend directly:
   ```
   http://localhost:8080/actuator/health
   ```

### ❌ Error: "npm ERR! code ELIFECYCLE"
**Symptoms:** Frontend won't start

**Solutions:**
1. ✅ Delete `node_modules` and reinstall:
   ```cmd
   rmdir /s /q node_modules
   npm install
   ```
2. ✅ Clear npm cache:
   ```cmd
   npm cache clean --force
   ```
3. ✅ Check Node.js version:
   ```cmd
   node --version
   ```

### ❌ Port 3000 already in use
**Symptoms:** React dev server won't start

**Solutions:**
1. ✅ Kill process on port 3000:
   ```cmd
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   ```
2. ✅ Or use different port:
   ```cmd
   set PORT=3001 && npm start
   ```

## CORS Issues

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Symptoms:** Browser blocks API requests

**Solutions:**
1. ✅ Verify `WebCorsConfig.java` exists and is configured
2. ✅ Check allowed origins include `http://localhost:3000`
3. ✅ Restart backend after CORS changes
4. ✅ Clear browser cache

## Registration/Login Issues

### ❌ Error: "Email already exists"
**Symptoms:** Can't register with same email twice

**Solutions:**
1. ✅ This is expected behavior (email must be unique)
2. ✅ Use different email or delete existing user from database
3. ✅ In phpMyAdmin: `it342g4_cabasag_db` → `users` → Delete row

### ❌ Error: "Invalid credentials"
**Symptoms:** Can't login with correct password

**Solutions:**
1. ✅ Verify user exists in database
2. ✅ Check password is hashed (should start with `$2a$` or `$2b$`)
3. ✅ Try registering a new user
4. ✅ Check backend logs for authentication errors

### ❌ Password validation fails
**Symptoms:** Can't register, password requirements not met

**Solutions:**
1. ✅ Password must be at least 6 characters
2. ✅ Include: number, uppercase, special character
3. ✅ Passwords must match in both fields

## Verification Commands

### Check if MySQL is running:
```cmd
netstat -an | findstr :3306
```

### Check if Backend is running:
```cmd
netstat -an | findstr :8080
```

### Check if Frontend is running:
```cmd
netstat -an | findstr :3000
```

### Test Backend Health:
Open in browser: `http://localhost:8080/actuator/health`

### Check Java Version:
```cmd
java -version
```

### Check Node Version:
```cmd
node --version
npm --version
```

## Complete Reset (Nuclear Option)

If nothing works, start fresh:

1. **Stop everything:**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Stop MySQL in XAMPP

2. **Clean backend:**
   ```cmd
   cd IT342_G4_CABASAG_LAB1\backend\backend
   mvnw.cmd clean
   rmdir /s /q target
   ```

3. **Clean frontend:**
   ```cmd
   cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
   rmdir /s /q node_modules
   del package-lock.json
   ```

4. **Drop and recreate database:**
   - phpMyAdmin → Drop `it342g4_cabasag_db`
   - Run `setup-database.sql` again

5. **Reinstall everything:**
   ```cmd
   cd IT342_G4_CABASAG_LAB1\backend\backend
   mvnw.cmd clean install
   
   cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
   npm install
   ```

6. **Start fresh:**
   - Start MySQL in XAMPP
   - Start backend
   - Start frontend

## Still Having Issues?

1. Check all documentation in `docs/` folder
2. Review `QUICK_START.md` for setup steps
3. Verify all prerequisites are installed
4. Check backend console logs for detailed errors
5. Check browser console (F12) for frontend errors

## Useful Log Locations

- **Backend logs:** Console output where you ran `mvnw.cmd spring-boot:run`
- **Frontend logs:** Browser console (F12 → Console tab)
- **MySQL logs:** XAMPP Control Panel → MySQL → Logs button
