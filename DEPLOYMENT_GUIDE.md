# Knight21 Deployment Guide

## Quick Deploy Options

Your project is ready to deploy! Choose your preferred platform:

---

## Option 1: Deploy to Vercel (Recommended)

### Method A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" (free account)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your Git repository
   - Or click "Import Third-Party Git Repository" if not on GitHub

3. **Configure Project**
   - Framework Preset: Vite ✅ (auto-detected)
   - Build Command: `npm run build` ✅ (auto-detected)
   - Output Directory: `dist` ✅ (auto-detected)

4. **Add Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   - Get these from your `.env` file
   - Add in "Environment Variables" section

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your free URL: `knight21.vercel.app`

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts and add environment variables when asked
```

**Your site will be live at:** `https://your-project.vercel.app`

---

## Option 2: Deploy to Netlify

### Method A: Drag & Drop (Fastest)

1. **Build Your Project**
   ```bash
   npm run build
   ```

2. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Sign up (free account)

3. **Deploy**
   - Drag and drop the `dist` folder onto Netlify
   - Your site deploys instantly!
   - Get URL: `random-name.netlify.app`

4. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Trigger redeploy

### Method B: Connect Git Repository (Best for Updates)

1. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Click "Add new site" → "Import an existing project"

2. **Connect Git**
   - Choose: GitHub / GitLab / Bitbucket
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" → Add environment variables

4. **Deploy**
   - Click "Deploy site"
   - Automatic deployments on every push!

**Your site will be live at:** `https://your-project.netlify.app`

---

## Important: Environment Variables

Both platforms need these environment variables:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get these from your `.env` file in the project root.**

---

## Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

---

## Automatic Deployments

Both platforms support automatic deployments:

- **Every time you push to GitHub** → Site updates automatically
- **Pull Request previews** → Test changes before merging
- **Rollback support** → Revert to previous versions instantly

---

## Which Platform to Choose?

### Choose Vercel if:
- ✅ You want the fastest deployment
- ✅ You prefer automatic optimization
- ✅ You want edge network performance
- ✅ Best for React/Vite projects

### Choose Netlify if:
- ✅ You want drag & drop simplicity
- ✅ You need form handling
- ✅ You want built-in serverless functions
- ✅ You prefer a more visual dashboard

**Both are excellent and 100% free for this project!**

---

## Testing Your Deployment

After deployment:

1. **Test the homepage** - Should load correctly
2. **Test navigation** - All routes should work
3. **Test admin login** - Admin panel should be accessible
4. **Test contact form** - Form submissions should work
5. **Check Supabase connection** - Data should load from database

---

## Troubleshooting

### Routes not working (404 errors)?
- ✅ Already fixed with `vercel.json` and `netlify.toml`
- Both files configure SPA routing correctly

### Build fails?
- Check environment variables are set
- Verify Node.js version is 18 or higher
- Check build logs for specific errors

### Supabase not connecting?
- Verify environment variables are correct
- Check Supabase URL and Anon Key
- Ensure no trailing slashes in URL

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Project Issues:** Check TROUBLESHOOTING.md

---

## Ready to Deploy!

Your project has:
- ✅ `vercel.json` - Vercel configuration
- ✅ `netlify.toml` - Netlify configuration
- ✅ Production build ready in `dist` folder
- ✅ All security fixes applied
- ✅ Database optimized and secure

**Choose your platform and deploy in minutes!** 🚀
