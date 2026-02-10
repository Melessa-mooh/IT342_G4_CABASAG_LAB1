# MiniMap Android App

Android mobile application for MiniMap authentication system.

## Requirements
- Android Studio Iguana (2023.2.1) or later
- Minimum SDK: 24 (Android 7.0)
- Target SDK: 34 (Android 14)
- Kotlin 1.9+

## Features
- User Registration
- User Login
- Dashboard with Profile
- JWT Authentication
- Material Design 3

## Setup Instructions

1. **Open in Android Studio:**
   - Open Android Studio Iguana
   - File → Open → Select `IT342_G4_CABASAG_LAB1/mobile` folder

2. **Configure Backend URL:**
   - Open `app/src/main/java/com/miniapp/mobile/network/ApiConfig.kt`
   - Update `BASE_URL` to your backend IP:
     ```kotlin
     const val BASE_URL = "http://10.0.2.2:8080/api/" // For emulator
     // OR
     const val BASE_URL = "http://YOUR_IP:8080/api/" // For physical device
     ```

3. **Sync Gradle:**
   - Click "Sync Now" when prompted
   - Wait for dependencies to download

4. **Run the App:**
   - Connect device or start emulator
   - Click Run (▶) button

## Backend Connection

### For Android Emulator:
Use `http://10.0.2.2:8080/api/` (10.0.2.2 maps to localhost on your computer)

### For Physical Device:
1. Find your computer's IP address:
   ```cmd
   ipconfig
   ```
   Look for IPv4 Address (e.g., 192.168.1.100)

2. Update BASE_URL:
   ```kotlin
   const val BASE_URL = "http://192.168.1.100:8080/api/"
   ```

3. Ensure device and computer are on same WiFi network

## Project Structure
```
mobile/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/miniapp/mobile/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   ├── LoginActivity.kt
│   │   │   │   ├── RegisterActivity.kt
│   │   │   │   ├── DashboardActivity.kt
│   │   │   │   ├── models/
│   │   │   │   │   ├── User.kt
│   │   │   │   │   ├── LoginRequest.kt
│   │   │   │   │   ├── RegisterRequest.kt
│   │   │   │   │   └── AuthResponse.kt
│   │   │   │   └── network/
│   │   │   │       ├── ApiService.kt
│   │   │   │       └── ApiConfig.kt
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   ├── values/
│   │   │   │   └── drawable/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle.kts
│   └── build.gradle.kts
└── settings.gradle.kts
```

## Dependencies
- Retrofit 2.9.0 - HTTP client
- Gson 2.10.1 - JSON parsing
- Material Design 3 - UI components
- Coroutines - Async operations

## Testing
1. Start backend: `mvnw.cmd spring-boot:run`
2. Run Android app
3. Register a new user
4. Login with credentials
5. View dashboard

## Troubleshooting

### Cannot connect to backend
- Check backend is running on port 8080
- Verify BASE_URL is correct
- For emulator, use 10.0.2.2 instead of localhost
- For device, ensure same WiFi network

### Build errors
- File → Invalidate Caches → Invalidate and Restart
- Clean Project → Rebuild Project
- Update Gradle if prompted

### Network security error
- Check `network_security_config.xml` allows cleartext traffic
- Or use HTTPS in production
