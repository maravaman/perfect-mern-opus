/*
  # Comprehensive Admin Tables V2
  
  ## Tables
  - site_settings: Global configuration
  - blog_categories: Blog categories
  - blogs: Blog posts with SEO
  - app_development_types: Mobile app categories
  - app_development_examples: App examples
  - web_app_types: Web app categories
  - web_app_examples: Web app examples
  - trusted_clients: Client logos
  - tools: AI tools and resources
  
  ## Security
  - RLS enabled on all tables
  - Role-based access control
*/

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL DEFAULT 'Knight21',
  logo_url text,
  favicon_url text,
  theme_color text DEFAULT '#0066cc',
  background_type text DEFAULT 'gradient',
  background_value text DEFAULT 'from-background to-secondary/20',
  meta_title text,
  meta_description text,
  meta_keywords text,
  google_analytics_id text,
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;
CREATE POLICY "Admins can update site settings"
  ON site_settings FOR UPDATE
  USING (public.is_admin(auth.uid()));

INSERT INTO site_settings (display_name, theme_color)
SELECT 'Knight21', '#0066cc'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active blog categories" ON blog_categories;
CREATE POLICY "Anyone can view active blog categories"
  ON blog_categories FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage categories" ON blog_categories;
CREATE POLICY "Admins can manage categories"
  ON blog_categories FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor') OR
    public.has_role(auth.uid(), 'manager')
  );

-- Blogs
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  feature_image text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  meta_title text,
  meta_description text,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published boolean DEFAULT false,
  published_at timestamptz,
  views integer DEFAULT 0,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view published blogs" ON blogs;
CREATE POLICY "Anyone can view published blogs"
  ON blogs FOR SELECT
  USING (
    published = true OR 
    public.is_admin(auth.uid()) OR 
    public.has_role(auth.uid(), 'editor') OR 
    public.has_role(auth.uid(), 'manager')
  );

DROP POLICY IF EXISTS "Admins can manage blogs" ON blogs;
CREATE POLICY "Admins can manage blogs"
  ON blogs FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor') OR
    public.has_role(auth.uid(), 'manager')
  );

-- App Development Types
CREATE TABLE IF NOT EXISTS app_development_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE app_development_types ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active app types" ON app_development_types;
CREATE POLICY "Anyone can view active app types"
  ON app_development_types FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage app types" ON app_development_types;
CREATE POLICY "Admins can manage app types"
  ON app_development_types FOR ALL
  USING (public.is_admin(auth.uid()));

-- App Development Examples
CREATE TABLE IF NOT EXISTS app_development_examples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_id uuid REFERENCES app_development_types(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  logo_url text,
  description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE app_development_examples ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active app examples" ON app_development_examples;
CREATE POLICY "Anyone can view active app examples"
  ON app_development_examples FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage app examples" ON app_development_examples;
CREATE POLICY "Admins can manage app examples"
  ON app_development_examples FOR ALL
  USING (public.is_admin(auth.uid()));

-- Web App Types
CREATE TABLE IF NOT EXISTS web_app_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE web_app_types ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active web app types" ON web_app_types;
CREATE POLICY "Anyone can view active web app types"
  ON web_app_types FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage web app types" ON web_app_types;
CREATE POLICY "Admins can manage web app types"
  ON web_app_types FOR ALL
  USING (public.is_admin(auth.uid()));

-- Web App Examples
CREATE TABLE IF NOT EXISTS web_app_examples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_id uuid REFERENCES web_app_types(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  logo_url text,
  description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE web_app_examples ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active web app examples" ON web_app_examples;
CREATE POLICY "Anyone can view active web app examples"
  ON web_app_examples FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage web app examples" ON web_app_examples;
CREATE POLICY "Admins can manage web app examples"
  ON web_app_examples FOR ALL
  USING (public.is_admin(auth.uid()));

-- Trusted Clients
CREATE TABLE IF NOT EXISTS trusted_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE trusted_clients ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active clients" ON trusted_clients;
CREATE POLICY "Anyone can view active clients"
  ON trusted_clients FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage clients" ON trusted_clients;
CREATE POLICY "Admins can manage clients"
  ON trusted_clients FOR ALL
  USING (public.is_admin(auth.uid()));

-- Tools
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT 'Bot',
  color_from text DEFAULT 'blue-500',
  color_to text DEFAULT 'cyan-600',
  features text[] DEFAULT ARRAY[]::text[],
  capabilities jsonb DEFAULT '[]'::jsonb,
  use_cases text[] DEFAULT ARRAY[]::text[],
  price decimal(10,2),
  resource_links jsonb DEFAULT '[]'::jsonb,
  image_url text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN null;
END $$;

DROP POLICY IF EXISTS "Anyone can view active tools" ON tools;
CREATE POLICY "Anyone can view active tools"
  ON tools FOR SELECT
  USING (active = true OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage tools" ON tools;
CREATE POLICY "Admins can manage tools"
  ON tools FOR ALL
  USING (public.is_admin(auth.uid()));
