/*
  # Add Missing Admin Tables
  
  1. New Tables
    - services: Company services/offerings
    - courses: Training courses
    - portfolio: Portfolio projects
    - pricing_plans: Pricing tiers
    - contact_inquiries: Contact form submissions
    - reviews: Client reviews/testimonials
  
  2. Security
    - Enable RLS on all tables
    - Admin-only write access
    - Public read access for published content
*/

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text,
  icon text DEFAULT 'Code',
  image_url text,
  features text[] DEFAULT ARRAY[]::text[],
  benefits text[] DEFAULT ARRAY[]::text[],
  process_steps jsonb DEFAULT '[]'::jsonb,
  pricing_info jsonb,
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  meta_title text,
  meta_description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text,
  instructor text,
  duration text,
  level text DEFAULT 'beginner',
  image_url text,
  curriculum jsonb DEFAULT '[]'::jsonb,
  learning_outcomes text[] DEFAULT ARRAY[]::text[],
  prerequisites text[] DEFAULT ARRAY[]::text[],
  price numeric(10,2),
  discount_price numeric(10,2),
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  enrollment_link text,
  meta_title text,
  meta_description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active courses"
  ON courses FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text,
  client_name text,
  client_logo text,
  project_url text,
  image_url text,
  gallery_images text[] DEFAULT ARRAY[]::text[],
  technologies text[] DEFAULT ARRAY[]::text[],
  features text[] DEFAULT ARRAY[]::text[],
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  project_date date,
  completion_date date,
  meta_title text,
  meta_description text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active portfolio"
  ON portfolio FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage portfolio"
  ON portfolio FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Pricing Plans Table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  billing_period text DEFAULT 'monthly',
  features text[] DEFAULT ARRAY[]::text[],
  limitations text[] DEFAULT ARRAY[]::text[],
  cta_text text DEFAULT 'Get Started',
  cta_link text,
  popular boolean DEFAULT false,
  category text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing plans"
  ON pricing_plans FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage pricing plans"
  ON pricing_plans FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text,
  message text NOT NULL,
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can create inquiry"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Reviews/Testimonials Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  client_company text,
  client_avatar text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  project_id uuid REFERENCES portfolio(id) ON DELETE SET NULL,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active reviews"
  ON reviews FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(active);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio(active);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_slug ON pricing_plans(slug);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active ON pricing_plans(active);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_reviews_active ON reviews(active);

-- Create update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
