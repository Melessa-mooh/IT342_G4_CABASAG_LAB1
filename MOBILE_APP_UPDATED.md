# 📱 Mobile App Updated - Backend Sync Complete!

## ✅ What Was Updated

### 1. Registration Validation (RegisterActivity.kt)
**Changed to match backend requirements:**

| Field | Old | New |
|-------|-----|-----|
| **Email** | Optional | ✅ **REQUIRED** |
| **Username** | Required | ✅ **OPTIONAL** |
| **Password Length** | 6 characters | ✅ **8 characters** |
| **Password Rules** | Basic | ✅ **Must have uppercase, lowercase, and number** |

**New Validation:**
```kotlin
- Email is required and must be valid format
- Username is optional (can be empty)
- Password must be at least 8 characters
- Password must contain uppercase letter (A-Z)
- Password must contain lowercase letter (a-z)
- Password must contain number (0-9)
- Passwords must match
```

### 2. Login Updated (LoginActivity.kt)
**Now accepts username OR email:**
- Field label changed to "Username or Email"
- Backend will check username first, then email
- Either one will work for login

### 3. UI Labels Updated
**strings.xml changes:**
- ✅ Email: "Email (Optional)" → "Email"
- ✅ Username: "Username" → "Username (Optional)"
- ✅ Login field: "Username" → "Username or Email"

---

## 🔗 Connectivity Check

### Database → Backend → Mobile

```
┌─────────────────┐
│  MySQL Database │  Port: 3306
│  it342g4_       │  Host: localhost
│  cabasag_db     │  User: root
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Spring Boot    │  Port: 8080
│  Backend        │  Version: 2.7.18
│  (Java 11)      │  JWT: 0.11.2
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Android App    │  API: http://10.0.2.2:8080/api/
│  (Kotlin)       │  (Emulator uses 10.0.2.2)
│  MiniMap        │  (Physical device: use your IP)
└─────────────────┘
```

### ✅ All Layers Connected:
1. **Database** ← Backend connects via MySQL Connector
2. **Backend** ← Mobile connects via Retrofit HTTP client
3. **Mobile** ← User interacts with Material Design UI

---

## 📋 Sample Test Data

### For Registration:
```
Firstname: Maria
Lastname: Santos
Email: maria.santos@example.com
Username: mariasantos (optional - can leave empty)
Password: Maria123
Confirm Password: Maria123
```

### For Login (after registering above):
**Option A - Use Email:**
```
Username or Email: maria.santos@example.com
Password: Maria123
```

**Option B - Use Username (if you set one):**
```
Username or Email: mariasantos
Password: Maria123
```

---

## 🚀 How to Test

### 1. Start Backend
```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd spring-boot:run
```

Wait for: `Started BackendApplication`

### 2. Open Android Studio
1. Open project: `IT342_G4_CABASAG_LAB1/mobile/`
2. Sync Gradle (if needed)
3. Run on Emulator or Physical Device

### 3. Test Registration
- Fill all required fields (Firstname, Lastname, Email, Password)
- Username is optional - you can leave it empty
- Password must be 8+ chars with uppercase, lowercase, and number
- Click Register

### 4. Test Login
- Use either username OR email
- Enter password
- Click Login

---

## 🔧 API Endpoints

### Register
```
POST http://10.0.2.2:8080/api/register
Content-Type: application/json

{
  "firstname": "Maria",
  "lastname": "Santos",
  "username": "mariasantos",  // optional
  "email": "maria@example.com",  // required
  "password": "Maria123",
  "confirmPassword": "Maria123"
}
```

### Login
```
POST http://10.0.2.2:8080/api/login
Content-Type: application/json

{
  "username": "mariasantos",  // or email
  "password": "Maria123"
}
```

---

## ⚠️ Important Notes

### For Android Emulator:
- Use `http://10.0.2.2:8080/api/` (already configured)
- This maps to `localhost:8080` on your computer

### For Physical Android Device:
1. Find your computer's IP address:
   ```cmd
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update `ApiConfig.kt`:
   ```kotlin
   private const val BASE_URL = "http://192.168.1.100:8080/api/"
   ```

3. Make sure phone and computer are on same WiFi network

---

## 🎯 Summary

✅ Mobile app now matches backend validation exactly
✅ Email is required, username is optional
✅ Password must be 8 characters with uppercase, lowercase, number
✅ Login accepts username OR email
✅ All connectivity layers verified
✅ Ready for testing!

---

**Last Updated:** February 11, 2026
**By:** Kiro AI Assistant
