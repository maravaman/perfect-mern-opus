# 🚀 Knight21 Admin System - Quick Reference Card

## 📍 Important URLs

```
Setup (First Time):    http://localhost:5173/admin/setup
Login:                 http://localhost:5173/admin/login
Dashboard:             http://localhost:5173/admin/dashboard
```

## 🔐 Default Credentials

```
Email:     admin@knight21.com
Password:  (set during first setup)
```

## 📊 Available Tabs

1. **Settings** - Site configuration
2. **Services** - Service management
3. **Courses** - Course management
4. **Portfolio** - Project showcase
5. **Blogs** - Blog posts
6. **Tools** - Tools/products
7. **Clients** - Client logos
8. **Pricing** - Pricing plans
9. **Contacts** - Contact inquiries

## 🖼️ Image Upload

- **Supported**: JPG, PNG, GIF, WebP
- **Max Size**: 5MB recommended
- **Storage**: Supabase Storage (knight21-uploads bucket)

## 📁 Project Structure

```
src/
├── contexts/AuthContext.tsx              # Auth state
├── lib/storage.ts                        # Image uploads
├── pages/
│   ├── AdminLogin.tsx                    # Login page
│   ├── AdminSetupNew.tsx                 # Setup page
│   └── AdminDashboardComplete.tsx        # Dashboard
└── components/admin/
    ├── ServicesTabComplete.tsx           # Services
    ├── CoursesTabComplete.tsx            # Courses
    ├── PortfolioTabComplete.tsx          # Portfolio
    ├── BlogsTabNew.tsx                   # Blogs
    ├── ToolsTab.tsx                      # Tools
    ├── SiteSettingsTab.tsx               # Settings
    ├── TrustedClientsTab.tsx             # Clients
    ├── PricingPlansTab.tsx               # Pricing
    └── ContactSubmissionsTab.tsx         # Contacts
```

## 🗄️ Database Tables

```
✅ services              ✅ blogs
✅ courses               ✅ blog_categories
✅ portfolio             ✅ tools
✅ pricing_plans         ✅ trusted_clients
✅ contact_inquiries     ✅ reviews
✅ site_settings         ✅ user_roles
✅ app_development_types
✅ web_app_types
```

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ Row Level Security (RLS)
- ✅ Admin-only access
- ✅ Protected routes
- ✅ Password hashing
- ✅ Session management

## 🛠️ Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📚 Documentation

- **ADMIN_GUIDE.md** - Complete usage guide
- **COMPLETE_SYSTEM_SUMMARY.md** - Full overview
- **TESTING_GUIDE.md** - Testing procedures
- **CHECKLIST.md** - Verification checklist

## 🐛 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Can't login | Check admin role in database |
| Upload fails | Check file size < 5MB |
| Page errors | Open console (F12) |
| Not saving | Fill required fields (*) |

## ✅ Quick Test

1. Visit `/admin/setup`
2. Create admin account
3. Login at `/admin/login`
4. Access `/admin/dashboard`
5. Try creating a service
6. Upload an image
7. Save and verify

## 📞 Supabase Dashboard

```
URL: https://supabase.com/dashboard
Project: tdlghmhvtoyyupfzgbzx
```

**Access:**
- Table Editor - View data
- SQL Editor - Run queries
- Storage - Manage files
- Authentication - Manage users

## 🎯 Next Steps

1. ✅ Create admin account
2. ✅ Login to dashboard
3. ✅ Configure site settings
4. ✅ Add your services
5. ✅ Upload portfolio projects
6. ✅ Create courses
7. ✅ Add client logos
8. ✅ Set pricing plans
9. ✅ Write blog posts

## 💡 Pro Tips

- **Images**: Compress before uploading
- **SEO**: Fill meta fields for better rankings
- **Order**: Use display_order to control sorting
- **Featured**: Highlight best content
- **Active**: Toggle to hide without deleting

## 🚀 System Status

✅ Database: Ready
✅ Storage: Configured
✅ Auth: Working
✅ Frontend: Built
✅ Security: Enabled
✅ **EVERYTHING WORKING PERFECTLY!**

---

**Ready to manage your content!** 🎉
