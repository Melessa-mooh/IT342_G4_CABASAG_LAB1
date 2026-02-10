# Android App Setup Guide

## Quick Start

### 1. Open Project in Android Studio
1. Launch **Android Studio Iguana** (2023.2.1 or later)
2. Click **File** → **Open**
3. Navigate to `IT342_G4_CABASAG_LAB1/mobile`
4. Click **OK**
5. Wait for Gradle sync to complete

### 2. Configure Backend Connection

#### For Android Emulator:
The default configuration uses `http://10.0.2.2:8080/api/` which automatically maps to your computer's localhost.

**No changes needed!**

#### For Physical Android Device:
1. Find your computer's IP address:
   ```cmd
   ipconfig
   ```
   Look for **IPv4 Address** (e.g., `192.168.1.100`)

2. Open `app/src/main/java/com/miniapp/mobile/network/ApiConfig.kt`

3. Change the BASE_URL:
   ```kotlin
   private const val BASE_URL = "http://192.168.1.100:8080/api/"
   ```
   Replace `192.168.1.100` with your actual IP address

4. **Important:** Ensure your phone and computer are on the **same WiFi network**

### 3. Start Backend Server
Before running the app, make sure your backend is running:

```cmd
cd IT342_G4_CABASAG_LAB1\backend\backend
mvnw.cmd spring-boot:run
```

Wait for: `Tomcat started on port(s): 8080`

### 4. Run the App

#### Using Emulator:
1. Click **Device Manager** in Android Studio
2. Create a new device or select existing one
3. Click **Run** (▶) button
4. Select your emulator
5. Wait for app to install and launch

#### Using Physical Device:
1. Enable **Developer Options** on your Android device:
   - Go to Settings → About Phone
   - Tap **Build Number** 7 times
   - Go back to Settings → Developer Options
   - Enable **USB Debugging**

2. Connect device via USB

3. Click **Run** (▶) button

4. Select your device from the list

5. Click **OK**

## Testing the App

### Test Registration:
1. Open the app
2. Click **Register**
3. Fill in:
   - Firstname: Test
   - Lastname: User
   - Username: testuser
   - Email: test@example.com
   - Password: Test123!
   - Confirm Password: Test123!
4. Click **Register**
5. Should see dashboard with your info

### Test Login:
1. Click **Logout**
2. Click **Login**
3. Enter:
   - Username: testuser
   - Password: Test123!
4. Click **Login**
5. Should see dashboard

### Verify in Database:
1. Open phpMyAdmin
2. Check `it342g4_cabasag_db` → `users` table
3. Your user should be there

## Project Structure

```
mobile/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/miniapp/mobile/
│   │       │   ├── MainActivity.kt          # Welcome screen
│   │       │   ├── LoginActivity.kt         # Login screen
│   │       │   ├── RegisterActivity.kt      # Registration screen
│   │       │   ├── DashboardActivity.kt     # Dashboard screen
│   │       │   ├── models/                  # Data models
│   │       │   │   ├── User.kt
│   │       │   │   ├── LoginRequest.kt
│   │       │   │   ├── RegisterRequest.kt
│   │       │   │   └── AuthResponse.kt
│   │       │   └── network/                 # API layer
│   │       │       ├── ApiService.kt        # API endpoints
│   │       │       └── ApiConfig.kt         # Retrofit config
│   │       ├── res/
│   │       │   ├── layout/                  # UI layouts
│   │       │   ├── values/                  # Colors, strings, themes
│   │       │   └── xml/                     # Network config
│   │       └── AndroidManifest.xml
│   └── build.gradle.kts                     # App dependencies
├── build.gradle.kts                         # Project config
├── settings.gradle.kts                      # Project settings
└── README.md

```

## Troubleshooting

### Cannot Connect to Backend

**Error:** "Network error" or "Failed to connect"

**Solutions:**
1. ✅ Verify backend is running: `http://localhost:8080/actuator/health`
2. ✅ For emulator: Use `10.0.2.2` instead of `localhost`
3. ✅ For device: Use your computer's IP address
4. ✅ Check both are on same WiFi network
5. ✅ Disable firewall temporarily to test
6. ✅ Check `network_security_config.xml` allows cleartext traffic

### Gradle Sync Failed

**Solutions:**
1. ✅ File → Invalidate Caches → Invalidate and Restart
2. ✅ Check internet connection
3. ✅ Update Android Studio if prompted
4. ✅ Delete `.gradle` folder and sync again

### App Crashes on Launch

**Solutions:**
1. ✅ Check Logcat for error messages
2. ✅ Clean Project: Build → Clean Project
3. ✅ Rebuild Project: Build → Rebuild Project
4. ✅ Uninstall app from device and reinstall

### Cannot Find Device

**Solutions:**
1. ✅ Enable USB Debugging on device
2. ✅ Try different USB cable
3. ✅ Install device drivers (for Windows)
4. ✅ Revoke USB debugging authorizations and reconnect

### Network Security Error

**Error:** "Cleartext HTTP traffic not permitted"

**Solution:**
The `network_security_config.xml` is already configured to allow HTTP. If you still see this error:
1. ✅ Check AndroidManifest.xml has `android:networkSecurityConfig="@xml/network_security_config"`
2. ✅ Clean and rebuild project

## API Endpoints Used

- **POST** `/api/register` - Register new user
- **POST** `/api/login` - Login user

## Features

✅ User Registration with validation
✅ User Login with authentication
✅ Dashboard with user profile
✅ Material Design 3 UI
✅ Gold & Maroon theme matching web app
✅ Error handling and loading states
✅ Network connectivity with Retrofit
✅ Coroutines for async operations

## Requirements

- Android Studio Iguana (2023.2.1) or later
- Minimum SDK: 24 (Android 7.0)
- Target SDK: 34 (Android 14)
- Kotlin 1.9.22
- Gradle 8.2.2

## Dependencies

- **Retrofit 2.9.0** - HTTP client for API calls
- **Gson 2.10.1** - JSON serialization/deserialization
- **OkHttp 4.12.0** - HTTP logging interceptor
- **Coroutines 1.7.3** - Async programming
- **Material Design 3** - UI components
- **AndroidX Libraries** - Core Android components

## Next Steps

1. ✅ Test registration and login
2. ✅ Verify data in database
3. ✅ Test on both emulator and physical device
4. ✅ Customize UI colors if needed
5. ✅ Add more features (profile edit, etc.)

## Support

For issues:
1. Check backend is running
2. Check network configuration
3. Review Logcat for errors
4. See main project documentation in `docs/`

---

**Your Android app is ready to use!** 🎉
