# 🚀 Knight21 - Local Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software:

1. **Node.js (v18 or higher)**
   - Download: https://nodejs.org/
   - Recommended: Use LTS (Long Term Support) version
   - Verify installation: `node --version`

2. **npm (comes with Node.js)**
   - Verify installation: `npm --version`
   - Should be v9 or higher

3. **Git**
   - Download: https://git-scm.com/
   - Verify installation: `git --version`

4. **Code Editor (Recommended)**
   - Visual Studio Code: https://code.visualstudio.com/
   - OR any editor of your choice

---

## 🎯 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the project
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd knight21-project
```

**Note:** Replace `<YOUR_GIT_URL>` with your actual Git repository URL.

---

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# Wait for installation to complete (may take 2-5 minutes)
```

**What this does:**
- Installs all 60 packages listed in `package.json`
- Downloads React, TypeScript, Tailwind, Supabase client, and all other dependencies
- Creates `node_modules` folder with all libraries

---

### Step 3: Environment Variables Setup

1. **Create `.env` file** in the project root:

```bash
# Create .env file
touch .env
```

2. **Add Supabase credentials** to `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tdlghmhvtoyyupfzgbzx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**How to get Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Open your "Knight21" project
3. Click "Settings" → "API"
4. Copy "Project URL" → paste as `VITE_SUPABASE_URL`
5. Copy "anon/public" key → paste as `VITE_SUPABASE_ANON_KEY`

**⚠️ Important:** Never commit `.env` file to Git! It's already in `.gitignore`.

---

### Step 4: Verify Database Connection

Your Supabase database should already be set up with:
- ✅ 15 tables created
- ✅ Sample data populated
- ✅ RLS policies configured
- ✅ Storage buckets ready

**To verify:**
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Check if you see tables like: services, courses, portfolio, blogs, etc.

**If tables are missing:**
- Run migrations from `supabase/migrations/` folder
- See DATABASE_SETUP_GUIDE.md for details

---

### Step 5: Start Development Server

```bash
# Start the development server
npm run dev
```

**Expected output:**
```
VITE v5.4.19  ready in 345 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
```

**What this does:**
- Starts Vite development server
- Enables Hot Module Replacement (HMR)
- Opens on port 8080
- Auto-reloads on file changes

---

### Step 6: Access the Application

**Open your browser and visit:**
- **Main Website:** http://localhost:8080/
- **Admin Login:** http://localhost:8080/admin/login
- **Admin Setup:** http://localhost:8080/admin/setup (first time only)

---

### Step 7: Create Admin Account (First Time Only)

1. Visit: http://localhost:8080/admin/setup
2. Enter admin email and password
3. Click "Create Admin Account"
4. You'll be redirected to admin dashboard

**Or use existing admin:**
1. Visit: http://localhost:8080/admin/login
2. Enter your admin credentials
3. Click "Login"

---

## 🎯 Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## 📁 Project Structure

```
knight21-project/
├── public/               # Static files
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/          # Images, fonts
│   ├── components/      # React components
│   │   ├── admin/       # Admin panel components
│   │   ├── knight21/    # Public site components
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── integrations/    # Supabase integration
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
│
├── supabase/
│   ├── config.toml      # Supabase config
│   ├── migrations/      # Database migrations
│   └── functions/       # Edge functions
│
├── .env                 # Environment variables (create this!)
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
└── tailwind.config.ts  # Tailwind config
```

---

## 🔧 Configuration Files

### 1. `.env` (Environment Variables)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. `vite.config.ts` (Build Configuration)
```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,  // Dev server runs on port 8080
  },
  // ... other config
});
```

### 3. `package.json` (Dependencies)
- Contains all 60 packages
- Scripts for dev, build, preview

---

## 🗄️ Database Setup

Your database is **already configured** in Supabase cloud:

**Connection:**
- URL: https://tdlghmhvtoyyupfzgbzx.supabase.co
- Type: PostgreSQL 15
- Location: Cloud (US East)

**Tables (15 total):**
1. services
2. courses
3. portfolio
4. blogs
5. blog_categories
6. tools
7. trusted_clients
8. pricing_plans
9. reviews
10. site_settings
11. contact_inquiries
12. career_applications
13. user_roles
14. app_development_types
15. web_app_types

**No local database setup needed!** Everything is cloud-based.

---

## 🔐 Admin Panel Access

### First Time Setup:
1. Visit: http://localhost:8080/admin/setup
2. Create admin account
3. Login to dashboard

### Subsequent Access:
1. Visit: http://localhost:8080/admin/login
2. Enter credentials
3. Access full admin panel

### Admin Features:
- ✅ Manage services, courses, portfolio
- ✅ Write and publish blog posts
- ✅ Add/edit tools and pricing
- ✅ View contact submissions
- ✅ Review career applications
- ✅ Upload images
- ✅ Configure site settings
- ✅ Real-time updates

---

## 🔄 Real-time Features

**Already configured and working:**

1. **Courses Page**
   - Updates instantly when admin adds/edits courses
   - No page refresh needed

2. **Blog Page**
   - New posts appear automatically
   - Published/unpublished changes reflect immediately

3. **Tools Page**
   - Tool additions/updates show in real-time
   - Live price changes

**How it works:**
- WebSocket connection to Supabase
- PostgreSQL Change Data Capture (CDC)
- Auto-refresh on database changes

---

## 📊 Google Sheets Integration

**Already configured for:**

1. **Contact Form** → "Contact Submissions" sheet
2. **Career Form** → "Career Applications" sheet

**How it works:**
- Form submitted → Saved to Supabase
- Edge function called → Sends to Google Sheets
- Automatic backup in spreadsheet

**Setup required:**
- See CAREER_GOOGLE_SHEETS_SETUP.md
- Create sheets in Google Spreadsheet
- Share with service account

---

## 🧪 Testing Your Setup

### Test 1: Homepage
```
1. Visit http://localhost:8080/
2. Should see Knight21 homepage
3. Check navigation works
4. Verify images load
```

### Test 2: Admin Panel
```
1. Visit http://localhost:8080/admin/login
2. Login with credentials
3. Should see admin dashboard
4. Try adding a service/course
5. Verify it saves to database
```

### Test 3: Contact Form
```
1. Visit http://localhost:8080/contact
2. Fill and submit form
3. Should see success message
4. Check Supabase table: contact_inquiries
5. Check Google Sheets (if configured)
```

### Test 4: Real-time Updates
```
1. Open http://localhost:8080/courses in one tab
2. Open admin panel in another tab
3. Add a new course in admin
4. Watch first tab update automatically!
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue 2: "Port 8080 is already in use"
**Solution:**
```bash
# Kill process on port 8080
npx kill-port 8080

# Or change port in vite.config.ts
```

### Issue 3: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue 4: ".env file not found" or "undefined VITE_SUPABASE_URL"
**Solution:**
1. Create `.env` file in project root
2. Add Supabase credentials
3. Restart dev server

### Issue 5: Database connection errors
**Solution:**
1. Verify `.env` has correct Supabase URL and key
2. Check Supabase project is active
3. Verify internet connection

### Issue 6: Images not loading
**Solution:**
1. Check images exist in `src/assets/`
2. Verify import paths are correct
3. Clear browser cache

### Issue 7: Admin login not working
**Solution:**
1. Create admin account at `/admin/setup`
2. Check browser console for errors
3. Verify Supabase Auth is enabled

---

## 📱 Mobile Development

**Test on mobile devices:**

1. **Find your local IP:**
```bash
# On Mac/Linux
ifconfig | grep "inet "

# On Windows
ipconfig
```

2. **Access from mobile:**
```
http://YOUR_LOCAL_IP:8080/

Example: http://192.168.1.100:8080/
```

3. **Ensure same WiFi network**
   - Dev machine and mobile must be on same network

---

## 🚀 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

**Output:**
- Creates `dist/` folder
- Optimized, minified files
- Ready for deployment

**Build files:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
```

---

## 📦 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Netlify
1. Connect Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Option 3: GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Self-hosted
1. Run `npm run build`
2. Upload `dist/` folder to server
3. Configure web server (Nginx/Apache)

---

## 🔐 Security Best Practices

### Development:
- ✅ Never commit `.env` file
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated
- ✅ Use HTTPS in production

### Production:
- ✅ Enable Supabase RLS policies
- ✅ Set up proper CORS
- ✅ Use strong admin passwords
- ✅ Enable rate limiting
- ✅ Regular security audits

---

## 📚 Additional Documentation

**Project Documentation:**
- `README.md` - General overview
- `TECH_STACK.md` - Complete technology list
- `ADMIN_GUIDE.md` - Admin panel guide
- `DATABASE_SETUP_GUIDE.md` - Database info
- `CAREER_GOOGLE_SHEETS_SETUP.md` - Google Sheets integration
- `CLIENT_HANDOVER.md` - Client handover guide
- `TROUBLESHOOTING.md` - Common problems

---

## 💻 IDE Recommendations

### Visual Studio Code Extensions:
- **ES7+ React/Redux/React-Native snippets** - React snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Vue Plugin (Volar)** - TS support
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitLens** - Git integration

---

## 🎓 Learning Resources

### Official Documentation:
- **React:** https://react.dev
- **TypeScript:** https://typescriptlang.org
- **Vite:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Supabase:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com

### Video Tutorials:
- **React Tutorial:** https://react.dev/learn
- **TypeScript Basics:** https://typescriptlang.org/docs/
- **Supabase Crash Course:** https://supabase.com/docs/guides

---

## ✅ Setup Checklist

Before starting development, ensure:

- [ ] Node.js installed (v18+)
- [ ] npm installed (v9+)
- [ ] Git installed
- [ ] Code editor installed
- [ ] Project cloned from Git
- [ ] `npm install` completed successfully
- [ ] `.env` file created with Supabase credentials
- [ ] Development server starts (`npm run dev`)
- [ ] Can access http://localhost:8080/
- [ ] Can access admin panel
- [ ] Admin account created
- [ ] Database tables exist in Supabase
- [ ] Real-time updates working
- [ ] All documentation read

---

## 🆘 Getting Help

### If you're stuck:

1. **Check documentation** in project folder
2. **Read error messages** carefully
3. **Check browser console** (F12)
4. **Verify environment variables**
5. **Restart dev server**
6. **Clear browser cache**
7. **Delete node_modules and reinstall**

### Support Resources:
- **Supabase Docs:** https://supabase.com/docs
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind Docs:** https://tailwindcss.com

---

## 🎯 Quick Start Summary

```bash
# 1. Clone project
git clone <YOUR_GIT_URL>
cd knight21-project

# 2. Install dependencies
npm install

# 3. Create .env file
echo "VITE_SUPABASE_URL=your_url" > .env
echo "VITE_SUPABASE_ANON_KEY=your_key" >> .env

# 4. Start development
npm run dev

# 5. Open browser
# Visit: http://localhost:8080/
```

**That's it! You're ready to develop!** 🚀

---

**Last Updated:** November 22, 2025
**Project Version:** 1.0.0
**Setup Difficulty:** ⭐⭐ (Easy - Intermediate)

🎉 **Happy coding with Knight21!**
