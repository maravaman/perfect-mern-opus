# 🚀 Knight21 - Complete Tech Stack

## 📋 Overview

**Project Name:** Knight21 Digital Hub
**Type:** Full-stack web application with admin panel
**Architecture:** Modern JAMstack with real-time capabilities
**Deployment:** Cloud-based (Supabase + Static hosting)

---

## 🎨 Frontend Stack

### Core Framework & Build Tools

#### **React 18.3.1**
- Modern UI library for building user interfaces
- Component-based architecture
- Hooks for state management
- Virtual DOM for performance

#### **TypeScript 5.8.3**
- Static type checking
- Enhanced IDE support
- Improved code quality
- Better refactoring capabilities

#### **Vite 5.4.19**
- Lightning-fast build tool
- Hot Module Replacement (HMR)
- Optimized production builds
- Native ES modules support
- SWC for faster compilation

**Build Configuration:**
```typescript
// vite.config.ts
- React with SWC plugin for faster compilation
- Path aliases (@/ for src/)
- Development server on port 8080
```

---

### Routing & Navigation

#### **React Router DOM 6.30.1**
- Client-side routing
- Nested routes
- Route protection
- Dynamic routing
- Navigation guards for admin routes

**Key Features Used:**
- `<BrowserRouter>` for routing
- `<Link>` for navigation
- `useNavigate()` for programmatic navigation
- `useParams()` for route parameters
- Protected routes for admin panel

---

### Styling & UI Framework

#### **Tailwind CSS 3.4.17**
- Utility-first CSS framework
- Custom design system
- Responsive design utilities
- Dark mode support (class-based)

**Custom Configuration:**
```typescript
// Custom fonts
- Outfit (body text)
- Poppins (headings)

// Custom colors
- Primary, Secondary, Accent
- Muted variants
- Sidebar colors

// Custom animations
- fade-in, slide-up
- glow-pulse, float
- accordion animations
```

#### **Tailwind Plugins:**
- `tailwindcss-animate` - Animation utilities
- `@tailwindcss/typography` - Rich text styling
- `autoprefixer` - Cross-browser compatibility

---

### Component Library

#### **shadcn/ui (Radix UI based)**
Complete UI component library built on Radix UI primitives:

**Layout Components:**
- Card, Sheet, Dialog, Popover
- Tabs, Accordion, Collapsible
- Separator, Scroll Area

**Form Components:**
- Input, Textarea, Label
- Select, Checkbox, Radio Group
- Switch, Slider, Toggle
- Calendar, Date Picker

**Feedback Components:**
- Toast (Sonner), Alert, Alert Dialog
- Progress, Skeleton, Spinner

**Navigation Components:**
- Navigation Menu, Menubar
- Dropdown Menu, Context Menu
- Breadcrumb, Pagination

**Data Display:**
- Table, Badge, Avatar
- Tooltip, Hover Card
- Aspect Ratio, Carousel

**Utilities:**
- Command (⌘K menu)
- Resizable Panels
- Drawer (Vaul)

---

### Icons

#### **Lucide React 0.462.0**
- Modern, open-source icon library
- 1000+ icons
- Customizable size and color
- Tree-shakeable (only imports used icons)

**Common Icons Used:**
- Navigation: Menu, X, ChevronDown
- Actions: Edit, Trash, Plus, Upload
- Social: Facebook, Instagram, LinkedIn
- Business: Briefcase, TrendingUp, Award
- Communication: Mail, Phone, MessageCircle

---

### Form Management

#### **React Hook Form 7.61.1**
- Performant form validation
- Minimal re-renders
- Easy integration with UI libraries

#### **Zod 3.25.76**
- TypeScript-first schema validation
- Runtime type checking
- Error messages
- Form validation rules

#### **@hookform/resolvers 3.10.0**
- Connects Zod with React Hook Form
- Validation resolver

**Example Usage:**
```typescript
const schema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required")
});
```

---

### Rich Text Editor

#### **React Quill 2.0.0**
- WYSIWYG editor for blog posts
- Toolbar customization
- HTML output
- Used in admin panel for content management

---

### Drag & Drop

#### **DND Kit**
- `@dnd-kit/core` 6.3.1
- `@dnd-kit/sortable` 10.0.0
- `@dnd-kit/utilities` 3.2.2

**Features:**
- Drag and drop functionality
- Sortable lists
- Used for reordering items in admin panel
- Accessibility-first approach

---

### Charts & Data Visualization

#### **Recharts 2.15.4**
- Composable charting library
- Built on React components
- Responsive charts
- Line, Bar, Pie, Area charts
- Used in admin dashboard for analytics

---

### State Management

#### **TanStack Query (React Query) 5.83.0**
- Server state management
- Automatic caching
- Background refetching
- Optimistic updates
- Used for Supabase data fetching

---

### Date Handling

#### **date-fns 3.6.0**
- Modern date utility library
- Immutable & pure functions
- Tree-shakeable
- Used for date formatting

#### **react-day-picker 8.10.1**
- Date picker component
- Accessible
- Customizable

---

### Carousel

#### **Embla Carousel React 8.6.0**
- Lightweight carousel library
- Touch-enabled
- Responsive
- Used for image galleries and testimonials

---

### Notifications

#### **Sonner 1.7.4**
- Modern toast notifications
- Beautiful animations
- Customizable
- Used throughout app for feedback

---

### Utilities

#### **clsx 2.1.1**
- Conditional className utility
- Combines class names

#### **class-variance-authority 0.7.1**
- Type-safe variant management
- Used for component variants

#### **tailwind-merge 2.6.0**
- Merge Tailwind classes intelligently
- Removes conflicts

#### **cmdk 1.1.1**
- Command menu (⌘K)
- Fast command palette

#### **input-otp 1.4.2**
- OTP input component
- Accessibility-focused

#### **next-themes 0.3.0**
- Theme management (dark/light mode)
- System preference detection

---

## 🗄️ Backend & Database

### Backend-as-a-Service

#### **Supabase (PostgreSQL 15)**
Complete backend solution providing:

**Database:**
- PostgreSQL 15 (relational database)
- Row Level Security (RLS)
- Real-time subscriptions
- Foreign keys & relationships
- Triggers & functions
- Full-text search

**Tables (14 total):**
```
1. services - Service offerings
2. courses - Training courses
3. portfolio - Project showcase
4. blogs - Blog posts
5. blog_categories - Blog categories
6. tools - AI tools/products
7. trusted_clients - Client logos
8. pricing_plans - Pricing tiers
9. reviews - Customer testimonials
10. site_settings - Website config
11. contact_inquiries - Contact submissions
12. career_applications - Job applications (NEW!)
13. user_roles - Admin roles
14. app_development_types - App categories
15. web_app_types - Web app categories
```

**Authentication:**
- Email/password authentication
- JWT tokens
- Session management
- Role-based access control
- Secure by default

**Storage:**
- File uploads (images, resumes)
- Public/private buckets
- CDN integration
- Automatic optimization

**Edge Functions:**
- Deno runtime
- `send-to-google-sheets` - Google Sheets integration

**Real-time:**
- WebSocket connections
- Postgres Change Data Capture (CDC)
- Live updates on Courses, Blogs, Tools

---

### Client Library

#### **@supabase/supabase-js 2.78.0**
- Official Supabase JavaScript client
- Database queries
- Authentication
- Storage
- Real-time subscriptions

**Example Usage:**
```typescript
// Database query
const { data } = await supabase
  .from('courses')
  .select('*')
  .eq('active', true);

// Real-time subscription
supabase
  .channel('courses-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'courses'
  }, () => {
    fetchCourses();
  })
  .subscribe();
```

---

## 🔧 Development Tools

### Code Quality

#### **ESLint 9.32.0**
- Code linting
- Best practices enforcement
- Custom rules

**Plugins:**
- `eslint-plugin-react-hooks` 5.2.0
- `eslint-plugin-react-refresh` 0.4.20

#### **TypeScript ESLint 8.38.0**
- TypeScript-specific linting
- Type-aware rules

---

### Development Dependencies

#### **@vitejs/plugin-react-swc 3.11.0**
- React plugin for Vite
- SWC for fast compilation

#### **PostCSS 8.5.6**
- CSS transformations
- Autoprefixer integration

#### **Lovable Tagger 1.1.11**
- Development-only component tagging
- Debugging helper

---

## 🔗 Third-Party Integrations

### Google Sheets API
**Purpose:** Backup contact and career form submissions

**Method:** Edge Functions (Deno)

**Authentication:**
- Google Service Account
- Private key authentication
- JWT tokens

**Spreadsheets:**
- "Contact Submissions" - Contact form data
- "Career Applications" - Job applications

**Data Flow:**
```
Form Submission
    ↓
Supabase Database
    ↓
Edge Function (send-to-google-sheets)
    ↓
Google Sheets API
    ↓
Spreadsheet Updated
```

---

## 📦 Package Management

**Package Manager:** npm (Node Package Manager)

**Total Dependencies:** 49 production + 11 development = 60 packages

**Key Scripts:**
```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Production build
  "preview": "vite preview",        // Preview build
  "lint": "eslint ."                // Run linter
}
```

---

## 🏗️ Project Structure

```
knight21/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── placeholder.svg
│
├── src/
│   ├── assets/               # Images, fonts
│   │   ├── clients/          # Client logos
│   │   ├── courses/          # Course images
│   │   ├── portfolio/        # Portfolio images
│   │   └── *.png             # Brand assets
│   │
│   ├── components/
│   │   ├── admin/            # Admin panel components
│   │   ├── knight21/         # Public site components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/               # shadcn/ui components (50+ files)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication context
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Mobile detection
│   │   └── use-toast.ts      # Toast notifications
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts     # Supabase client
│   │       └── types.ts      # Database types
│   │
│   ├── lib/
│   │   ├── storage.ts        # Storage utilities
│   │   └── utils.ts          # Helper functions
│   │
│   ├── pages/
│   │   ├── Knight21Home.tsx  # Homepage
│   │   ├── Knight21About.tsx # About page
│   │   ├── Knight21Services.tsx # Services page
│   │   ├── Knight21Contact.tsx # Contact page
│   │   ├── Career.tsx        # Careers page
│   │   ├── Courses.tsx       # Courses page
│   │   ├── Portfolio.tsx     # Portfolio page
│   │   ├── Blog.tsx          # Blog listing
│   │   ├── BlogPost.tsx      # Single blog post
│   │   ├── Tools.tsx         # AI tools page
│   │   ├── AdminLogin.tsx    # Admin login
│   │   ├── AdminSetup.tsx    # Admin setup
│   │   └── AdminDashboard.tsx # Admin panel
│   │
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── supabase/
│   ├── config.toml           # Supabase config
│   ├── migrations/           # Database migrations
│   └── functions/            # Edge functions
│       └── send-to-google-sheets/
│
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── tailwind.config.ts        # Tailwind config
└── postcss.config.js         # PostCSS config
```

---

## 🎯 Architecture Patterns

### Frontend Architecture

**Pattern:** Component-based architecture with hooks

**State Management:**
- Local state: `useState`, `useReducer`
- Server state: TanStack Query
- Global state: React Context (AuthContext)
- Form state: React Hook Form

**Routing:**
- Client-side routing with React Router
- Protected routes for admin
- Dynamic routes for blog posts, services

**Data Fetching:**
- TanStack Query for caching
- Supabase client for queries
- Real-time subscriptions for live updates

---

### Backend Architecture

**Pattern:** Backend-as-a-Service (BaaS)

**Database:**
- PostgreSQL with Row Level Security
- Migrations for schema management
- Triggers for automated tasks

**Authentication:**
- JWT-based authentication
- Session management
- Role-based access control

**Storage:**
- Object storage for files
- Public/private buckets
- CDN-enabled

**Serverless Functions:**
- Edge functions for custom logic
- Deno runtime
- Used for Google Sheets integration

---

## 🔐 Security Features

**Database Security:**
- Row Level Security (RLS) on all tables
- Policies for authenticated/public access
- Admin-only access for sensitive data

**Authentication:**
- Secure JWT tokens
- HTTP-only cookies (session)
- Password hashing (bcrypt)

**API Security:**
- CORS configuration
- Rate limiting (Supabase built-in)
- API key authentication

**Frontend Security:**
- Protected admin routes
- Input validation (Zod)
- XSS prevention (React escaping)
- CSRF protection

---

## ⚡ Performance Optimizations

**Build Optimizations:**
- Vite for fast builds
- SWC for faster compilation
- Code splitting
- Tree shaking
- Minification

**Runtime Optimizations:**
- React 18 concurrent features
- Lazy loading routes
- Image optimization
- Caching with TanStack Query

**Network Optimizations:**
- CDN for assets (Supabase)
- Compression (gzip)
- Efficient queries (select only needed columns)
- Real-time subscriptions (WebSocket)

---

## 📊 Bundle Size

**Production Build:**
```
dist/index.html        1.53 KB  (gzip: 0.64 KB)
dist/assets/*.css      101 KB   (gzip: 16.56 KB)
dist/assets/*.js       1,181 KB (gzip: 320 KB)
```

**Total:** ~1.28 MB (uncompressed), ~337 KB (gzipped)

---

## 🌐 Browser Support

**Target Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Polyfills:** Modern features only, no legacy browser support

---

## 🚀 Deployment Stack

**Frontend Hosting:**
- Static site hosting (Vercel/Netlify/Cloudflare Pages)
- Automatic deployments from Git
- CDN distribution
- HTTPS by default

**Backend Hosting:**
- Supabase Cloud
- PostgreSQL database
- Edge functions (Deno Deploy)
- Global CDN

**Domain & DNS:**
- Custom domain support
- SSL/TLS certificates
- DNS management

---

## 📈 Scalability

**Database:**
- PostgreSQL scales vertically
- Read replicas for read-heavy workloads
- Connection pooling (PgBouncer)

**Storage:**
- CDN for global distribution
- Automatic scaling

**Edge Functions:**
- Auto-scaling based on load
- Global edge network

**Frontend:**
- Static files served from CDN
- Scales infinitely
- No server management

---

## 🔄 Real-time Capabilities

**Technology:** PostgreSQL Change Data Capture (CDC) + WebSockets

**Implementation:**
```typescript
// Subscribe to changes
supabase
  .channel('table-changes')
  .on('postgres_changes', {
    event: '*',  // INSERT, UPDATE, DELETE
    schema: 'public',
    table: 'table_name'
  }, () => {
    // Handle change
  })
  .subscribe();
```

**Use Cases:**
- ✅ Courses page updates in real-time
- ✅ Blog posts appear instantly when published
- ✅ Tools updates live
- ✅ Admin panel shows live data

---

## 🧪 Testing Stack (Not Implemented Yet)

**Recommended for Future:**
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking

---

## 📊 Analytics & Monitoring (Optional)

**Can Be Added:**
- **Google Analytics** - User analytics
- **Sentry** - Error tracking
- **Vercel Analytics** - Performance monitoring
- **Supabase Logs** - Database monitoring

---

## 🎨 Design System

**Typography:**
- Outfit (body text) - Clean, modern sans-serif
- Poppins (headings) - Bold, geometric sans-serif

**Color Palette:**
- Primary: HSL-based (customizable)
- Secondary: Complementary colors
- Accent: Call-to-action colors
- Muted: Text and backgrounds
- Semantic: Success, warning, error

**Spacing:**
- 8px base unit
- Consistent padding/margin
- Container max-width: 1400px

**Animations:**
- Fade-in, slide-up
- Glow pulse, float
- Accordion animations
- Smooth transitions

---

## 🔧 Environment Variables

**Required:**
```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Google Sheets (Edge Function)
GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
GOOGLE_SHEETS_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com
GOOGLE_SHEETS_SPREADSHEET_ID=xxx
```

---

## 📚 Documentation Files

**Project Documentation:**
- `README.md` - Project overview
- `ADMIN_GUIDE.md` - Admin panel guide
- `TESTING_GUIDE.md` - Testing instructions
- `TROUBLESHOOTING.md` - Common issues
- `TECH_STACK.md` (this file) - Technology overview
- `DATABASE_SETUP_GUIDE.md` - Database info
- `CAREER_GOOGLE_SHEETS_SETUP.md` - Career form integration
- `REALTIME_UPDATES_FIXED.md` - Real-time features

---

## 🎯 Tech Stack Summary

### Frontend Core:
- ⚛️ React 18.3.1 + TypeScript 5.8.3
- ⚡ Vite 5.4.19 (build tool)
- 🎨 Tailwind CSS 3.4.17 (styling)
- 🧩 shadcn/ui (component library)
- 🚦 React Router 6.30.1 (routing)

### Forms & Validation:
- 📝 React Hook Form 7.61.1
- ✅ Zod 3.25.76

### Data Management:
- 🔄 TanStack Query 5.83.0 (server state)
- 🗄️ Supabase 2.78.0 (database + auth + storage)

### UI Enhancements:
- 🎭 Lucide React (icons)
- 📊 Recharts (charts)
- 🎪 Embla Carousel (image carousels)
- 🔔 Sonner (notifications)
- 📝 React Quill (rich text editor)
- 🖱️ DND Kit (drag & drop)

### Backend:
- 🗄️ Supabase PostgreSQL 15
- 🔐 Supabase Auth
- 📦 Supabase Storage
- ⚡ Supabase Edge Functions (Deno)
- 🔄 Supabase Realtime

### Integrations:
- 📊 Google Sheets API (via Edge Functions)

---

## 💻 System Requirements

**Development:**
- Node.js 18+ (LTS recommended)
- npm 9+
- Modern code editor (VS Code recommended)

**Production:**
- Modern browser (2023+)
- JavaScript enabled
- 10 Mbps internet connection (recommended)

---

## 🎓 Learning Resources

**React:** https://react.dev
**TypeScript:** https://typescriptlang.org
**Vite:** https://vitejs.dev
**Tailwind CSS:** https://tailwindcss.com
**Supabase:** https://supabase.com/docs
**shadcn/ui:** https://ui.shadcn.com
**TanStack Query:** https://tanstack.com/query

---

**Last Updated:** November 22, 2025
**Project Version:** 1.0.0
**Tech Stack Version:** Modern (2024-2025)

🚀 **Built with modern web technologies for maximum performance and developer experience!**
