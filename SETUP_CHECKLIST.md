# ✅ Setup Checklist - MiniMap Application

Use this checklist to ensure everything is properly configured.

## 📋 Pre-Setup Checklist

### Software Installation
- [ ] XAMPP installed
- [ ] Java 11 or higher installed (`java -version`)
- [ ] Maven available (or use included `mvnw.cmd`)
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)

### Verify Installations
```cmd
java -version
node --version
npm --version
```

---

## 🗄️ Database Setup Checklist

### XAMPP Configuration
- [ ] XAMPP Control Panel opened
- [ ] MySQL module started (green indicator)
- [ ] Apache module started (for phpMyAdmin)
- [ ] MySQL running on port 3306

### Verify MySQL Running
```cmd
netstat -an | findstr :3306
```
Should show: `LISTENING`

### phpMyAdmin Access
- [ ] Open http://localhost/phpmyadmin
- [ ] Can access phpMyAdmin interface
- [ ] No connection errors

### Database Creation
- [ ] Opened SQL tab in phpMyAdmin
- [ ] Copied contents from `docs/setup-database.sql`
- [ ] Executed SQL script (clicked "Go")
- [ ] Database `it342g4_cabasag_db` appears in left sidebar
- [ ] Table `users` exists in database
- [ ] Table has correct columns:
  - [ ] id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
  - [ ] firstname (VARCHAR 255)
  - [ ] lastname (VARCHAR 255)
  - [ ] email (VARCHAR 255, UNIQUE, NOT NULL)
  - [ ] username (VARCHAR 255)
  - [ ] password_hash (VARCHAR 255, NOT NULL)
  - [ ] roles (VARCHAR 50, DEFAULT 'USER')
  - [ ] is_active (TINYINT 1, DEFAULT 1)

---

## 🔧 Backend Setup Checklist

### Navigate to Backend
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
```

### Configuration Check
- [ ] File `src/main/resources/application.properties` exists
- [ ] Database URL is correct: `jdbc:mysql://127.0.0.1:3306/it342g4_cabasag_db`
- [ ] Username is correct (default: `root`)
- [ ] Password is correct (default: empty)
- [ ] If MySQL has password, updated in `application.properties`

### Dependency Installation
```cmd
mvnw.cmd clean install
```
- [ ] Command executed successfully
- [ ] No build errors
- [ ] MySQL connector downloaded
- [ ] `target` folder created

### Start Backend
```cmd
mvnw.cmd spring-boot:run
```
- [ ] Backend starts without errors
- [ ] See: `HikariPool-1 - Start completed` (database connected)
- [ ] See: `Tomcat started on port(s): 8080`
- [ ] No "Access denied" errors
- [ ] No "Unknown database" errors

### Verify Backend Running
```cmd
netstat -an | findstr :8080
```
Should show: `LISTENING`

### Test Backend Health
- [ ] Open http://localhost:8080/actuator/health
- [ ] Should see: `{"status":"UP"}`

---

## 🎨 Frontend Setup Checklist

### Navigate to Frontend
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
```

### Configuration Check
- [ ] File `src/App.js` exists
- [ ] API URL is correct: `http://localhost:8080/api`
- [ ] File `package.json` exists

### Dependency Installation
```cmd
npm install
```
- [ ] Command executed successfully
- [ ] No errors
- [ ] `node_modules` folder created
- [ ] `package-lock.json` created/updated

### Start Frontend
```cmd
npm start
```
- [ ] Frontend starts without errors
- [ ] Browser opens automatically
- [ ] Opens to http://localhost:3000
- [ ] Page loads correctly
- [ ] No console errors (F12 → Console)

### Verify Frontend Running
```cmd
netstat -an | findstr :3000
```
Should show: `LISTENING`

---

## 🧪 Testing Checklist

### Registration Test
- [ ] Navigate to http://localhost:3000
- [ ] See registration form
- [ ] Fill in test data:
  - [ ] Firstname: Test
  - [ ] Lastname: User
  - [ ] Username: testuser
  - [ ] Email: test@example.com
  - [ ] Password: Test123!
  - [ ] Confirm Password: Test123!
- [ ] Click "Register" button
- [ ] No errors in browser console
- [ ] See success message or redirect to dashboard
- [ ] Dashboard shows user information

### Database Verification
- [ ] Open phpMyAdmin
- [ ] Select `it342g4_cabasag_db` database
- [ ] Click `users` table
- [ ] Click "Browse" tab
- [ ] See the new user record
- [ ] Email matches: test@example.com
- [ ] Username matches: testuser
- [ ] Password is hashed (starts with `$2a$` or `$2b$`)
- [ ] Firstname and lastname are correct

### Login Test
- [ ] Click "Logout" (if logged in)
- [ ] Click "Login" tab
- [ ] Enter credentials:
  - [ ] Username: testuser
  - [ ] Password: Test123!
- [ ] Click "Login" button
- [ ] No errors in browser console
- [ ] See success message
- [ ] Redirect to dashboard
- [ ] Dashboard shows correct user info

### Profile Test
- [ ] Click "Profile" in sidebar
- [ ] See user information:
  - [ ] Firstname: Test
  - [ ] Lastname: User
  - [ ] Username: @testuser
  - [ ] Email: test@example.com (if provided)

---

## 🔍 Verification Summary

### All Systems Check
- [ ] ✅ MySQL running (port 3306)
- [ ] ✅ Database created and populated
- [ ] ✅ Backend running (port 8080)
- [ ] ✅ Backend connected to database
- [ ] ✅ Frontend running (port 3000)
- [ ] ✅ Frontend can reach backend
- [ ] ✅ Can register new users
- [ ] ✅ Users saved to database
- [ ] ✅ Can login with credentials
- [ ] ✅ Dashboard displays correctly

---

## 🚨 Troubleshooting Quick Reference

### If Backend Won't Start
1. Check MySQL is running in XAMPP
2. Verify database exists in phpMyAdmin
3. Check `application.properties` credentials
4. See `docs/TROUBLESHOOTING.md`

### If Frontend Can't Connect
1. Verify backend is running on port 8080
2. Check backend console for errors
3. Check browser console (F12) for errors
4. Verify API URL in `App.js`

### If Database Connection Fails
1. Check MySQL is running: `netstat -an | findstr :3306`
2. Verify database name is correct
3. Check username/password
4. Run `setup-database.sql` again

---

## 📊 Final Status

Once all checkboxes are complete:

```
✅ Database: it342g4_cabasag_db (Port 3306)
✅ Backend: Spring Boot (Port 8080)
✅ Frontend: React (Port 3000)
✅ Connectivity: All systems operational
```

**You're ready to develop!** 🎉

---

## 📚 Next Steps

- [ ] Read `docs/authentication.md` for auth flow details
- [ ] Review `docs/database.md` for schema information
- [ ] Check `TASKLIST.md` for project tasks
- [ ] Start building features!

---

## 🔗 Quick Links

- **Frontend:** http://localhost:3000
- **Backend Health:** http://localhost:8080/actuator/health
- **phpMyAdmin:** http://localhost/phpmyadmin
- **Documentation:** See `START_HERE.md`

---

**Keep this checklist handy for future setups!**
