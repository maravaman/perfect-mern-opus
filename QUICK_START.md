# ⚡ Knight21 - Quick Start Guide

## 🚀 For Developers - Setup in 5 Minutes

### Step 1: Clone & Install
```bash
git clone <YOUR_GIT_URL>
cd knight21-project
npm install
```

### Step 2: Configure Environment
```bash
# Create .env file
cat > .env << EOF
VITE_SUPABASE_URL=https://tdlghmhvtoyyupfzgbzx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
EOF
```

### Step 3: Start Dev Server
```bash
npm run dev
```

### Step 4: Access
- **Website:** http://localhost:8080/
- **Admin:** http://localhost:8080/admin/setup

---

## 👤 For Admins - Daily Use

### Login
```
URL: http://localhost:8080/admin/login
Email: [your-admin-email]
Password: [your-password]
```

### Common Tasks
- **Add Blog Post:** Blogs tab → Add New
- **Edit Service:** Services tab → Edit
- **Upload Image:** Use image picker in forms
- **View Submissions:** Contact Submissions tab

---

## 📊 For Clients - What You Need to Know

### Access Points

**1. Supabase Dashboard** (Database)
- URL: https://supabase.com/dashboard
- Project: Knight21 (tdlghmhvtoyyupfzgbzx)

**2. Admin Panel** (Content Management)
- URL: https://your-domain.com/admin/login

**3. Google Sheets** (Form Backups)
- Spreadsheet: [YOUR_SHEETS_URL]

### Daily Management
✅ No coding needed for content updates
✅ Use admin panel for everything
✅ Changes appear in real-time
✅ Mobile-friendly interface

---

## 🔧 Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Create production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code quality

# Database
# Access via Supabase Dashboard

# Deployment
vercel               # Deploy to Vercel
# OR push to Git (auto-deploy on Netlify/Vercel)
```

---

## 📱 Test URLs

**Local Development:**
- Website: http://localhost:8080/
- Admin: http://localhost:8080/admin/login
- Setup: http://localhost:8080/admin/setup

**Key Pages:**
- Home: /
- Services: /services
- Courses: /courses
- Portfolio: /portfolio
- Blog: /blog
- Contact: /contact
- Career: /career

---

## 🆘 Quick Troubleshooting

**Port already in use:**
```bash
npx kill-port 8080
npm run dev
```

**Module errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database connection:**
- Verify `.env` file exists
- Check Supabase URL and key
- Restart dev server

**Admin login:**
- Create account at `/admin/setup`
- Check credentials
- Clear browser cache

---

## 📚 Full Documentation

- **LOCAL_SETUP_GUIDE.md** - Complete setup instructions
- **ADMIN_GUIDE.md** - Admin panel guide
- **CLIENT_HANDOVER_GUIDE.md** - Handover information
- **TECH_STACK.md** - Technology details
- **TROUBLESHOOTING.md** - Common issues

---

## 🎯 Real-Time Features

**These pages update automatically:**
- ✅ Courses page (when admin adds/edits)
- ✅ Blog page (when posts published)
- ✅ Tools page (when tools updated)

**No refresh needed!** Magic! ✨

---

## 📞 Support

**Email:** [SUPPORT_EMAIL]
**Phone:** [SUPPORT_PHONE]
**Docs:** See documentation files

---

**Last Updated:** November 22, 2025
**Version:** 1.0.0

🚀 **Knight21 - Your Digital Success Platform**
