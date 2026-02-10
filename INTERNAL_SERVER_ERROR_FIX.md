# 🔧 Internal Server Error - Root Causes & Fixes

## Issues Found

### Issue #1: Password Validation Mismatch

**Backend Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit

**Frontend Requirements:**
- Minimum 6 characters only

**Result:** When user enters a 6-7 character password, backend rejects it causing error.

### Issue #2: Backend Password Validation is Stricter

Backend checks for:
```java
password.length() >= 8
password.matches(".*[A-Z].*")  // uppercase
password.matches(".*[a-z].*")  // lowercase
password.matches(".*[0-9].*")  // digit
```

Frontend only checks:
```javascript
password.length >= 6
```

### Issue #3: Possible Database Connection Issues

If MySQL isn't running or database doesn't exist, backend will throw Internal Server Error.

## Solutions

### Solution 1: Update Frontend Validation (Recommended)

Update Register.jsx to match backend requirements:

**Change minimum password length from 6 to 8:**
```javascript
if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
```

**Update password checklist:**
```javascript
const pwChecks = {
  length: formData.password.length >= 8,  // Changed from 6 to 8
  number: /\d/.test(formData.password),
  uppercase: /[A-Z]/.test(formData.password),
  lowercase: /[a-z]/.test(formData.password),  // Add lowercase check
};
```

### Solution 2: Verify Database is Running

1. Open XAMPP Control Panel
2. Check MySQL is running (green)
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Verify database `it342g4_cabasag_db` exists
5. Verify table `users` exists

### Solution 3: Check Backend Console

Look for these errors in backend console:
- `Access denied for user 'root'` → Database password issue
- `Unknown database` → Database doesn't exist
- `Table 'users' doesn't exist` → Run setup-database.sql

## Quick Test

Try registering with this password:
- **Password:** `Test1234` (8 chars, uppercase, lowercase, digit)
- **NOT:** `Test12!` (only 7 chars - will fail)

## Common Scenarios

### Scenario 1: Password Too Short
**User enters:** `Test12!` (7 characters)
**Backend response:** "Password must be at least 8 characters..."
**Frontend shows:** Internal Server Error (should show validation message)

### Scenario 2: No Uppercase
**User enters:** `test1234` (no uppercase)
**Backend response:** "Password must be at least 8 characters with uppercase, lowercase, and a number"
**Frontend shows:** Internal Server Error

### Scenario 3: No Number
**User enters:** `TestTest` (no number)
**Backend response:** "Password must be at least 8 characters with uppercase, lowercase, and a number"
**Frontend shows:** Internal Server Error

## The Real Fix

I'll update the frontend validation to match backend requirements exactly.

## Testing After Fix

Try these passwords:

✅ **Should Work:**
- `Test1234` - 8 chars, has uppercase, lowercase, number
- `Password123` - 11 chars, has all requirements
- `MyPass99` - 8 chars, has all requirements

❌ **Should Fail (with proper error message):**
- `Test12` - Only 6 chars
- `test1234` - No uppercase
- `TEST1234` - No lowercase
- `TestTest` - No number

## Backend Error Messages

The backend returns these specific errors:
- "First name and last name are required"
- "Email is required"
- "Invalid email format"
- "Email already registered"
- "Password is required"
- "Password must be at least 8 characters with uppercase, lowercase, and a number"
- "Passwords do not match"

Frontend should display these, not "Internal Server Error".

## Next Steps

1. I'll update Register.jsx validation
2. I'll update Login.jsx validation
3. I'll add better error handling
4. Test with correct password format
