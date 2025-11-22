/*
  # Fix Admin RLS Policies
  
  This migration fixes the Row Level Security policies to allow:
  1. Public can view active content
  2. Authenticated users can view ALL content (for admin panel)
  3. Only admin role can insert/update/delete
  
  Changes:
  - Add separate policies for authenticated users to view all records
  - Keep admin-only policies for write operations
  - Allow public to view active content
*/

-- Services policies
DROP POLICY IF EXISTS "Anyone can view active services" ON services;
DROP POLICY IF EXISTS "Admins can manage services" ON services;

CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Courses policies
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;

CREATE POLICY "Public can view active courses"
  ON courses FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Portfolio policies
DROP POLICY IF EXISTS "Anyone can view active portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admins can manage portfolio" ON portfolio;

CREATE POLICY "Public can view active portfolio"
  ON portfolio FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all portfolio"
  ON portfolio FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert portfolio"
  ON portfolio FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update portfolio"
  ON portfolio FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete portfolio"
  ON portfolio FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Blogs policies
DROP POLICY IF EXISTS "Authenticated can view all blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can manage blogs" ON blogs;

CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated can view all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Tools policies
DROP POLICY IF EXISTS "Anyone can view active tools" ON tools;
DROP POLICY IF EXISTS "Admins can manage tools" ON tools;

CREATE POLICY "Public can view active tools"
  ON tools FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all tools"
  ON tools FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert tools"
  ON tools FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update tools"
  ON tools FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete tools"
  ON tools FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Trusted Clients policies
DROP POLICY IF EXISTS "Anyone can view active clients" ON trusted_clients;
DROP POLICY IF EXISTS "Admins can manage clients" ON trusted_clients;

CREATE POLICY "Public can view active clients"
  ON trusted_clients FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all clients"
  ON trusted_clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert clients"
  ON trusted_clients FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update clients"
  ON trusted_clients FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete clients"
  ON trusted_clients FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Pricing Plans policies
DROP POLICY IF EXISTS "Anyone can view active pricing plans" ON pricing_plans;
DROP POLICY IF EXISTS "Admins can manage pricing plans" ON pricing_plans;

CREATE POLICY "Public can view active pricing plans"
  ON pricing_plans FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all pricing plans"
  ON pricing_plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert pricing plans"
  ON pricing_plans FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update pricing plans"
  ON pricing_plans FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete pricing plans"
  ON pricing_plans FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Reviews policies
DROP POLICY IF EXISTS "Anyone can view active reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON reviews;

CREATE POLICY "Public can view active reviews"
  ON reviews FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Site Settings - Everyone can read, only admins can update
DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;

CREATE POLICY "Everyone can view site settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Contact Inquiries - Keep existing policies
-- Already has proper policies from previous migration
