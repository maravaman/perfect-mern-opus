# Admin Panel Testing Guide

This guide will help you verify that everything is working correctly.

## Prerequisites Check

Before testing, ensure these are running:

### 1. MongoDB Status
```bash
# Windows
sc query MongoDB

# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

**Expected**: MongoDB service should be "RUNNING" or "started"

### 2. Backend Server Status
```bash
# Should show:
# "Server running in development mode on port 5000"
# "MongoDB Connected: ..."
```

### 3. Frontend Server Status
```bash
# Should show:
# "VITE v5.x.x ready in xxx ms"
# "Local: http://localhost:5173"
```

---

## Test 1: Backend Health Check

### Terminal Test:
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-22T..."
}
```

### Browser Test:
Open: `http://localhost:5000/api/health`

**✅ Pass**: You see the JSON response above
**❌ Fail**: Connection refused / Cannot connect

**If Failed:**
- Check if backend is running on port 5000
- Check `backend/.env` PORT setting
- Restart backend server: `cd backend && npm run dev`

---

## Test 2: MongoDB Connection

### Check Database Created:
```bash
# Connect to MongoDB shell
mongo

# Or for MongoDB 6+
mongosh

# List databases
show dbs

# You should see 'knight21' database
# Use the database
use knight21

# Check collections
show collections

# You should see collections like:
# users, blogs, services, courses, etc.

# Check if admin user exists
db.users.findOne({email: "admin@knight21.com"})

# Should return the admin user document
```

**✅ Pass**: You see the knight21 database and collections
**❌ Fail**: Database doesn't exist

**If Failed:**
```bash
cd backend
node utils/seedData.js
```

---

## Test 3: Backend API Authentication

### Test Login Endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@knight21.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**✅ Pass**: You get a token back
**❌ Fail**: "Invalid credentials" or error

**If Failed:**
- Verify admin user exists (Test 2)
- Check password in `backend/.env` matches
- Re-run seed script: `node utils/seedData.js`

---

## Test 4: Frontend Loads

### Browser Test:
Open: `http://localhost:5173`

**✅ Pass**: You see the Knight21 homepage
**❌ Fail**: Blank page or error

**If Failed:**
- Check frontend server is running
- Check browser console for errors (F12)
- Clear cache and reload

---

## Test 5: Admin Login Page

### Browser Test:
Open: `http://localhost:5173/admin/login`

**Expected**:
- Login form with email and password fields
- "Admin Login" title
- Clean, professional design

**✅ Pass**: Login page displays correctly
**❌ Fail**: 404 or page not found

**If Failed:**
- Check that routes are properly configured in `src/App.tsx`
- Restart frontend server

---

## Test 6: Admin Panel Login

### Step-by-Step Test:

1. **Go to**: `http://localhost:5173/admin/login`

2. **Enter Credentials**:
   - Email: `admin@knight21.com`
   - Password: `Admin@123456` (or whatever you set in `backend/.env`)

3. **Click "Login"**

**Expected Behavior:**
- Shows "Logging in..." on button
- Success toast notification appears
- Redirects to: `http://localhost:5173/admin/new-dashboard`

**✅ Pass**: Login successful, redirected to dashboard
**❌ Fail**: Error message appears

**If Failed - Common Issues:**

### Error: "Network Error" or "Failed to fetch"
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check VITE_API_URL in .env file
cat .env | grep VITE_API_URL
# Should be: VITE_API_URL=http://localhost:5000/api

# Restart frontend after .env changes
```

### Error: "Invalid credentials"
```bash
# Check admin user in MongoDB
mongosh
use knight21
db.users.findOne({email: "admin@knight21.com"})

# Verify password in backend/.env
cat backend/.env | grep ADMIN_PASSWORD

# Re-seed if needed
cd backend
node utils/seedData.js
```

### Error: "CORS Error"
```bash
# Check FRONTEND_URL in backend/.env
cat backend/.env | grep FRONTEND_URL
# Should be: FRONTEND_URL=http://localhost:5173

# Restart backend server
cd backend
npm run dev
```

---

## Test 7: Admin Dashboard Access

After successful login, you should see:

### Dashboard Header:
- "Knight21 Admin" title
- "Welcome back, Admin" message
- Logout button (top right)

### Tab Navigation:
- Settings (active by default)
- Blogs
- Services
- Courses
- Tools
- Portfolio
- App Dev
- Web Apps
- Pricing
- Contacts

**✅ Pass**: Dashboard displays with all tabs
**❌ Fail**: Error or blank page

---

## Test 8: Site Settings Functionality

### Test Site Settings Tab:

1. **Navigate to Site Settings tab** (should be active by default)

2. **Check Form Fields**:
   - Display Name input
   - Logo upload
   - Background Type dropdown
   - Contact information fields
   - SEO settings
   - Analytics fields
   - Social media links

3. **Test Update**:
   - Change "Display Name" to "Test Knight21"
   - Click "Save Changes"
   - Should show success toast: "Settings updated successfully"

4. **Verify in Database**:
```bash
mongosh
use knight21
db.sitesettings.findOne()
# Should show displayName: "Test Knight21"
```

**✅ Pass**: Settings save successfully
**❌ Fail**: Error on save

---

## Test 9: File Upload

### Test Image Upload:

1. **In Site Settings tab**
2. **Logo section** - click "Choose File"
3. **Select an image** (jpg, png, gif)
4. **Wait for upload**
5. **Should see**:
   - Success message
   - Image preview appears
   - URL saved in form

**✅ Pass**: Image uploads and preview shows
**❌ Fail**: Upload error

**If Failed:**
```bash
# Check uploads folder exists
ls -la backend/uploads/

# Check permissions
chmod 755 backend/uploads/

# Check backend logs for errors
```

---

## Test 10: Protected Routes

### Test Authentication Protection:

1. **Logout** from admin panel
2. **Try to access**: `http://localhost:5173/admin/new-dashboard` directly
3. **Expected**: Redirected to login page

**✅ Pass**: Redirects to login (protected)
**❌ Fail**: Can access without login

---

## Test 11: API Endpoints

### Test Each Resource Endpoint:

```bash
# First, login and get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo $TOKEN  # Should show your JWT token

# Test services endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/services

# Test courses endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/courses

# Test tools endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/tools

# Test site settings
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/site-settings

# All should return: {"success":true,"data":[...]}
```

**✅ Pass**: All endpoints return success responses
**❌ Fail**: 401 Unauthorized or 500 errors

---

## Test 12: Default Seed Data

### Verify Seed Data Loaded:

```bash
mongosh
use knight21

# Check admin user
db.users.countDocuments()
# Should be at least 1

# Check app development types
db.appdevelopments.find().pretty()
# Should see 7 types (Shopping, Ride Booking, Food Delivery, etc.)

# Check web application types
db.webapplications.find().pretty()
# Should see 4 types (E-commerce, SaaS, CRM, PWA)
```

**✅ Pass**: All seed data exists
**❌ Fail**: Collections empty

**If Failed:**
```bash
cd backend
node utils/seedData.js
```

---

## Complete Test Checklist

Run through this checklist:

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Health check endpoint works (`/api/health`)
- [ ] MongoDB has knight21 database
- [ ] Admin user exists in database
- [ ] Login API endpoint works (returns token)
- [ ] Frontend homepage loads
- [ ] Admin login page displays
- [ ] Can login with credentials
- [ ] Redirects to dashboard after login
- [ ] Dashboard displays correctly
- [ ] All tabs are visible
- [ ] Site Settings loads data
- [ ] Can update and save settings
- [ ] File upload works
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] API endpoints return data with token
- [ ] Seed data exists in database

---

## Quick Automated Test Script

Save this as `test.sh`:

```bash
#!/bin/bash

echo "=== Knight21 Admin Panel Test Suite ==="
echo ""

# Test 1: Backend Health
echo "Test 1: Backend Health Check..."
HEALTH=$(curl -s http://localhost:5000/api/health)
if [[ $HEALTH == *"success"* ]]; then
  echo "✅ Backend is running"
else
  echo "❌ Backend not responding"
  exit 1
fi

# Test 2: Login
echo ""
echo "Test 2: Testing Login..."
LOGIN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}')

if [[ $LOGIN == *"token"* ]]; then
  echo "✅ Login successful"
  TOKEN=$(echo $LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)
else
  echo "❌ Login failed"
  echo $LOGIN
  exit 1
fi

# Test 3: Protected Endpoint
echo ""
echo "Test 3: Testing Protected Endpoint..."
SETTINGS=$(curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/site-settings)

if [[ $SETTINGS == *"success"* ]]; then
  echo "✅ Protected endpoints working"
else
  echo "❌ Protected endpoint failed"
  exit 1
fi

echo ""
echo "=== All Tests Passed! ✅ ==="
echo ""
echo "Admin Panel is fully functional!"
echo "Login at: http://localhost:5173/admin/login"
echo "Credentials: admin@knight21.com / Admin@123456"
```

Run it:
```bash
chmod +x test.sh
./test.sh
```

---

## Browser Developer Tools Check

### Check for Console Errors:

1. Open admin login page
2. Press F12 (open DevTools)
3. Go to Console tab
4. Look for any red errors

**Expected**: No errors or warnings

**Common Errors & Fixes:**

#### "Failed to fetch"
- Backend not running
- Wrong API URL in `.env`

#### "CORS Error"
- Wrong FRONTEND_URL in `backend/.env`
- Restart backend

#### "Unexpected token < in JSON"
- Backend returned HTML instead of JSON
- Check backend is running on correct port

---

## Network Tab Check

1. Open DevTools (F12)
2. Go to Network tab
3. Login to admin panel
4. Check the requests

**Should see:**
- `POST /api/auth/login` - Status 200
- `GET /api/auth/me` - Status 200
- `GET /api/admin/site-settings` - Status 200

**✅ Pass**: All requests return 200 status
**❌ Fail**: 404, 500, or network errors

---

## Final Verification

If all tests pass:

✅ **Backend is working**
✅ **Database is connected**
✅ **Authentication is working**
✅ **Frontend is connected to backend**
✅ **Admin panel is functional**
✅ **API endpoints are accessible**
✅ **File upload is working**

**Your admin panel is fully operational!** 🎉

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| MongoDB not running | `net start MongoDB` (Windows) or `brew services start mongodb-community` (Mac) |
| Backend won't start | Check `MONGODB_URI` in `backend/.env` |
| Login fails | Run `node utils/seedData.js` in backend folder |
| CORS error | Verify `FRONTEND_URL` in `backend/.env` is `http://localhost:5173` |
| 404 on API calls | Check `VITE_API_URL` in `.env` is `http://localhost:5000/api` |
| Can't access dashboard | Clear browser localStorage and login again |
| File upload fails | Check `backend/uploads/` folder exists with write permissions |

---

## Need More Help?

1. Check backend console for error messages
2. Check browser console (F12) for frontend errors
3. Review `SETUP_GUIDE.md` for detailed setup
4. Check `backend/README.md` for backend-specific issues
5. Verify all environment variables are set correctly

## Report Issues

If tests fail, note:
- Which test failed
- Error messages from console
- MongoDB status
- Backend server status
- Environment variable values (hide passwords!)
