# 🎯 START HERE - MiniMap Application Setup

## 🚨 IMPORTANT: Connectivity Issues FIXED!

All database connectivity issues have been resolved. Follow this guide to get your application running.

---

## 📚 Documentation Guide

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **START_HERE.md** (this file) | Overview & navigation | Start here! |
| **QUICK_START.md** | Fast setup reference | Quick commands |
| **docs/CONNECTIVITY_SETUP.md** | Detailed step-by-step guide | First-time setup |
| **docs/TROUBLESHOOTING.md** | Problem solving | When issues occur |
| **CONNECTIVITY_FIXES.md** | What was fixed | Understanding changes |
| **docs/setup-database.sql** | Database creation script | Run in phpMyAdmin |

---

## ⚡ Quick Setup (3 Steps)

### 1️⃣ Database (phpMyAdmin)
```
1. Start XAMPP → Start MySQL
2. Open http://localhost/phpmyadmin
3. SQL tab → Paste contents of docs/setup-database.sql → Go
```

### 2️⃣ Backend
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```
✅ Wait for: "Tomcat started on port(s): 8080"

### 3️⃣ Frontend
```cmd
cd IT342_G4_CABASAG_LAB1\web\minimap-frontend
npm install
npm start
```
✅ Browser opens: http://localhost:3000

---

## 🔧 What Was Fixed

### ✅ Added MySQL Connector
The backend now has the MySQL JDBC driver to connect to your database.

### ✅ Fixed Database Column Mapping
User entity now correctly maps to database columns:
- `passwordHash` → `password_hash`
- `isActive` → `is_active`

### ✅ Complete Documentation
New guides for setup, troubleshooting, and database configuration.

---

## 🎮 Test Your Setup

1. **Register:** Create account at http://localhost:3000
2. **Verify:** Check phpMyAdmin → `it342g4_cabasag_db` → `users` table
3. **Login:** Use your credentials to login
4. **Success:** See your dashboard with profile info

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR BROWSER                         │
│              http://localhost:3000                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP POST
                     │ /api/register
                     │ /api/login
                     ▼
┌─────────────────────────────────────────────────────────┐
│              SPRING BOOT BACKEND                        │
│              http://localhost:8080                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ AuthController → AuthService → UserRepository    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ JDBC
                     │ jdbc:mysql://127.0.0.1:3306/
                     ▼
┌─────────────────────────────────────────────────────────┐
│              MYSQL DATABASE (XAMPP)                     │
│              Port: 3306                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Database: it342g4_cabasag_db                     │  │
│  │ Table: users                                     │  │
│  │   - id, firstname, lastname, email              │  │
│  │   - username, password_hash, roles, is_active   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Ports Used

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 8080 | http://localhost:8080 |
| Database | 3306 | phpMyAdmin |

---

## 📋 Configuration Files

### Database Connection
**File:** `backend/backend/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/it342g4_cabasag_db
spring.datasource.username=root
spring.datasource.password=
```

### Frontend API
**File:** `web/minimap-frontend/src/App.js`
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 🆘 Common Issues

| Problem | Quick Fix |
|---------|-----------|
| Backend won't start | Check MySQL is running in XAMPP |
| "Unknown database" | Run `docs/setup-database.sql` |
| "Access denied" | Update password in `application.properties` |
| Frontend can't connect | Verify backend is on port 8080 |
| Port already in use | Kill process or use different port |

**Full troubleshooting:** See `docs/TROUBLESHOOTING.md`

---

## 📖 Next Steps

1. ✅ **Setup:** Follow the 3-step quick setup above
2. ✅ **Test:** Register and login to verify everything works
3. ✅ **Explore:** Check out the dashboard and profile features
4. ✅ **Develop:** Start building your features!

---

## 🔗 Quick Links

- **phpMyAdmin:** http://localhost/phpmyadmin
- **Backend Health:** http://localhost:8080/actuator/health
- **Frontend:** http://localhost:3000
- **API Register:** http://localhost:8080/api/register
- **API Login:** http://localhost:8080/api/login

---

## 💡 Tips

- Keep XAMPP MySQL running while developing
- Use two terminals: one for backend, one for frontend
- Check backend console for database connection status
- Use browser DevTools (F12) to debug frontend issues
- phpMyAdmin is your friend for checking database state

---

## ✅ Verification Checklist

Before starting development, verify:

- [ ] XAMPP MySQL is running (green in control panel)
- [ ] Database `it342g4_cabasag_db` exists in phpMyAdmin
- [ ] Table `users` has correct columns
- [ ] Backend starts without errors
- [ ] Backend log shows "HikariPool-1 - Start completed"
- [ ] Frontend opens in browser
- [ ] Can register a new user
- [ ] User appears in database
- [ ] Can login successfully
- [ ] Dashboard shows user information

---

## 🎉 You're Ready!

All connectivity issues are resolved. Your database, backend, and frontend are now properly configured to work together.

**Start with:** `QUICK_START.md` for fast commands
**Need help?** Check `docs/TROUBLESHOOTING.md`

Happy coding! 🚀
