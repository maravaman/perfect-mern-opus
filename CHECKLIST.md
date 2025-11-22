# Admin Panel Working Checklist

Use this checklist to verify everything is working correctly.

## Quick Start Checklist

### Phase 1: Initial Setup ✓
- [ ] Node.js installed (v18+)
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Project files downloaded/cloned

### Phase 2: MongoDB Setup ✓
- [ ] MongoDB service is running
  - Windows: `net start MongoDB`
  - Mac: `brew services list`
  - Linux: `sudo systemctl status mongod`
- [ ] Can connect to MongoDB
  - Test: `mongosh` or `mongo` command works

### Phase 3: Backend Setup ✓
- [ ] Navigated to backend folder: `cd backend`
- [ ] Installed dependencies: `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Configured `MONGODB_URI` in `.env`
- [ ] Configured `JWT_SECRET` in `.env`
- [ ] Ran seed script: `node utils/seedData.js`
- [ ] Seed script completed successfully
- [ ] Started backend: `npm run dev`
- [ ] Backend shows "Server running on port 5000"
- [ ] Backend shows "MongoDB Connected"

### Phase 4: Frontend Setup ✓
- [ ] Opened new terminal
- [ ] Navigated to project root
- [ ] Installed dependencies: `npm install` (if needed)
- [ ] Verified `.env` has `VITE_API_URL=http://localhost:5000/api`
- [ ] Started frontend: `npm run dev`
- [ ] Frontend shows "Local: http://localhost:5173"

---

## Backend Tests

### Test 1: Health Check ✓
**Command:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"success":true,"message":"Server is running","timestamp":"..."}
```

- [ ] Response shows `"success": true`
- [ ] Response has timestamp

### Test 2: Database Connection ✓
**Command:**
```bash
mongosh
use knight21
db.users.findOne({email: "admin@knight21.com"})
```

**Expected:**
- [ ] knight21 database exists
- [ ] Admin user document is returned
- [ ] User has email "admin@knight21.com"
- [ ] User role is "admin"

### Test 3: Login API ✓
**Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}'
```

**Expected Response:**
```json
{"success":true,"data":{"token":"eyJ..."}}
```

- [ ] Response shows `"success": true`
- [ ] Response includes JWT token
- [ ] Token starts with "eyJ"

### Test 4: Protected Endpoints ✓
**Command:**
```bash
# Replace YOUR_TOKEN with actual token from login
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/site-settings
```

**Expected:**
- [ ] Returns 200 status
- [ ] Response has `"success": true`
- [ ] Response includes settings data

---

## Frontend Tests

### Test 5: Homepage Loads ✓
**Action:** Open `http://localhost:5173` in browser

**Expected:**
- [ ] Page loads without errors
- [ ] Knight21 homepage displays
- [ ] Navigation menu visible
- [ ] No console errors (check F12 > Console)

### Test 6: Admin Login Page ✓
**Action:** Navigate to `http://localhost:5173/admin/login`

**Expected:**
- [ ] Login page displays
- [ ] "Admin Login" title visible
- [ ] Email input field present
- [ ] Password input field present
- [ ] Login button present
- [ ] No console errors

### Test 7: Admin Login Works ✓
**Action:**
1. Go to `http://localhost:5173/admin/login`
2. Enter email: `admin@knight21.com`
3. Enter password: `Admin@123456`
4. Click "Login"

**Expected:**
- [ ] Button shows "Logging in..." while processing
- [ ] Success toast notification appears
- [ ] Redirected to `/admin/new-dashboard`
- [ ] No error messages

### Test 8: Admin Dashboard Loads ✓
**Action:** After successful login, check dashboard

**Expected:**
- [ ] Page title shows "Knight21 Admin"
- [ ] Welcome message shows "Welcome back, Admin"
- [ ] Logout button visible (top right)
- [ ] Tab navigation visible with all tabs:
  - [ ] Settings
  - [ ] Blogs
  - [ ] Services
  - [ ] Courses
  - [ ] Tools
  - [ ] Portfolio
  - [ ] App Dev
  - [ ] Web Apps
  - [ ] Pricing
  - [ ] Contacts

### Test 9: Site Settings Tab ✓
**Action:** Click on Settings tab (should be active by default)

**Expected:**
- [ ] Settings form displays
- [ ] Display Name field present
- [ ] Logo upload field present
- [ ] Background type dropdown present
- [ ] Contact info fields present
- [ ] SEO settings fields present
- [ ] Analytics fields present
- [ ] Social media fields present
- [ ] "Save Changes" button present

### Test 10: Save Settings ✓
**Action:**
1. Change "Display Name" to "Test Name"
2. Click "Save Changes"

**Expected:**
- [ ] Button shows "Saving..." while processing
- [ ] Success toast appears: "Settings updated successfully"
- [ ] No error messages

**Verify in Database:**
```bash
mongosh
use knight21
db.sitesettings.findOne()
# Should show displayName: "Test Name"
```

- [ ] Database shows updated displayName

### Test 11: File Upload ✓
**Action:**
1. In Settings tab, Logo section
2. Click file input, select an image
3. Wait for upload

**Expected:**
- [ ] File input accepts image
- [ ] Upload progress or loading indicator
- [ ] Success message appears
- [ ] Image preview displays
- [ ] URL populated in form

**Check Backend:**
```bash
ls backend/uploads/
# Should show uploaded file
```

- [ ] File exists in uploads folder

### Test 12: Logout Works ✓
**Action:** Click "Logout" button

**Expected:**
- [ ] Success toast: "Logged out successfully"
- [ ] Redirected to login page
- [ ] Cannot access dashboard without login

### Test 13: Protected Routes ✓
**Action:**
1. Logout
2. Try to access `http://localhost:5173/admin/new-dashboard` directly

**Expected:**
- [ ] Automatically redirected to login page
- [ ] Cannot access without authentication

### Test 14: Other Tabs Display ✓
**Action:** Click through each tab

**Expected for each tab:**
- [ ] Blogs tab shows placeholder
- [ ] Services tab shows placeholder
- [ ] Courses tab shows placeholder
- [ ] Tools tab shows placeholder
- [ ] Portfolio tab shows placeholder
- [ ] App Dev tab shows placeholder
- [ ] Web Apps tab shows placeholder
- [ ] Pricing tab shows placeholder
- [ ] Contacts tab shows placeholder

---

## API Endpoint Tests

### Test All Resource Endpoints ✓

**Get Token First:**
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo $TOKEN
```

**Test Each Endpoint:**

#### Services
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/services
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Courses
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/courses
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Tools
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/tools
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Portfolio
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/portfolio
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Clients
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/clients
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Reviews
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/reviews
```
- [ ] Returns `{"success":true,"data":[]...}`

#### Pricing Plans
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/pricing-plans
```
- [ ] Returns `{"success":true,"data":[]...}`

#### App Development
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/app-development
```
- [ ] Returns `{"success":true,"data":[...]...}`
- [ ] Data should include 7 app types from seed

#### Web Applications
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/web-applications
```
- [ ] Returns `{"success":true,"data":[...]...}`
- [ ] Data should include 4 web app types from seed

#### Contact Inquiries
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/contact-inquiries
```
- [ ] Returns `{"success":true,"data":[]...}`

---

## Browser Console Tests

### Check for JavaScript Errors ✓

**Action:**
1. Open any admin page
2. Press F12 (Developer Tools)
3. Go to Console tab

**Expected:**
- [ ] No red error messages
- [ ] No "Failed to fetch" errors
- [ ] No CORS errors
- [ ] No 404 errors

### Check Network Requests ✓

**Action:**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Login to admin panel
4. Watch network requests

**Expected Requests:**
- [ ] `POST /api/auth/login` - Status 200
- [ ] `GET /api/auth/me` - Status 200
- [ ] `GET /api/admin/site-settings` - Status 200
- [ ] All requests return 200 (success)
- [ ] No 401 (unauthorized) errors
- [ ] No 404 (not found) errors
- [ ] No 500 (server) errors

---

## Automated Test Script

### Run Test Script ✓

**Linux/Mac:**
```bash
./test-admin.sh
```

**Windows:**
```bash
test-admin.bat
```

**Expected Output:**
- [ ] All tests show ✅ PASS or [PASS]
- [ ] No tests show ❌ FAIL or [FAIL]
- [ ] Final message: "All Tests Passed! 🎉"

---

## Database Verification

### Check Collections Exist ✓

**Command:**
```bash
mongosh
use knight21
show collections
```

**Expected Collections:**
- [ ] users
- [ ] sitesettings
- [ ] blogs
- [ ] blogcategories
- [ ] services
- [ ] courses
- [ ] tools
- [ ] portfolios
- [ ] clients
- [ ] reviews
- [ ] pricingplans
- [ ] appdevelopments
- [ ] webapplications
- [ ] contactinquiries

### Check Seed Data ✓

**Check Users:**
```bash
db.users.countDocuments()
```
- [ ] At least 1 user exists

**Check App Development Types:**
```bash
db.appdevelopments.countDocuments()
```
- [ ] 7 documents (Shopping, Ride Booking, Food, Social, Utility, Finance, Health)

**Check Web Application Types:**
```bash
db.webapplications.countDocuments()
```
- [ ] 4 documents (E-commerce, SaaS, CRM, PWA)

---

## Final Verification

### Complete System Check ✓

- [ ] MongoDB is running and accessible
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5173/admin/login
- [ ] Can login with admin credentials
- [ ] Dashboard loads after login
- [ ] Site settings can be updated
- [ ] File upload works
- [ ] All API endpoints accessible
- [ ] Logout works
- [ ] Protected routes require authentication
- [ ] No console errors
- [ ] All network requests successful
- [ ] Database has all collections
- [ ] Seed data exists

---

## If Everything is Checked ✅

**Congratulations!** Your Knight21 Admin Panel is **100% functional**! 🎉

You can now:
1. ✅ Configure site settings
2. ✅ Upload files
3. ✅ Use all API endpoints
4. ✅ Build remaining admin UI components

---

## If Some Items Failed ❌

### Quick Troubleshooting:

**MongoDB Issues:**
- Start MongoDB service
- Check connection string in `backend/.env`
- Try MongoDB Atlas if local doesn't work

**Backend Issues:**
- Check `backend/.env` configuration
- Run `node utils/seedData.js`
- Restart backend: `npm run dev`

**Frontend Issues:**
- Check `VITE_API_URL` in `.env`
- Clear browser cache and localStorage
- Restart frontend: `npm run dev`

**Authentication Issues:**
- Re-run seed script
- Check password in `backend/.env`
- Clear browser localStorage and login again

### Get Detailed Help:
- **TESTING_GUIDE.md** - Detailed testing procedures
- **SETUP_GUIDE.md** - Complete setup instructions
- **backend/README.md** - Backend-specific documentation
- **backend/API_REFERENCE.md** - API usage guide

---

## Progress Tracking

**Setup Progress:** ___ / 4 phases completed
**Backend Tests:** ___ / 4 tests passed
**Frontend Tests:** ___ / 10 tests passed
**API Tests:** ___ / 10 endpoints working
**Database Checks:** ___ / 3 verifications passed

**Overall Status:** _____ (Fully Working / Partially Working / Not Working)

**Next Step:** ______________________________
