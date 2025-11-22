/*
  # Fix all admin RLS policies to use helper function
  
  1. Changes
    - Drop all existing admin policies that check user_roles directly
    - Recreate them using the get_user_role() function
    - This prevents 500 errors from enum type issues
  
  2. Security
    - Maintains same security level
    - Only admins can perform ALL operations
    - Uses SECURITY DEFINER function to bypass RLS issues
*/

-- Drop and recreate admin policies for blogs
DROP POLICY IF EXISTS "Admins can manage blogs" ON blogs;
CREATE POLICY "Admins can manage blogs"
  ON blogs FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for portfolio
DROP POLICY IF EXISTS "Admins can manage portfolio" ON portfolio;
CREATE POLICY "Admins can manage portfolio"
  ON portfolio FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for services
DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for courses
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for tools
DROP POLICY IF EXISTS "Admins can manage tools" ON tools;
CREATE POLICY "Admins can manage tools"
  ON tools FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for pricing_plans
DROP POLICY IF EXISTS "Admins can manage pricing plans" ON pricing_plans;
CREATE POLICY "Admins can manage pricing plans"
  ON pricing_plans FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for reviews
DROP POLICY IF EXISTS "Admins can manage reviews" ON reviews;
CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for trusted_clients
DROP POLICY IF EXISTS "Admins can manage clients" ON trusted_clients;
CREATE POLICY "Admins can manage clients"
  ON trusted_clients FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for contact_inquiries
DROP POLICY IF EXISTS "Admins can manage inquiries" ON contact_inquiries;
CREATE POLICY "Admins can manage inquiries"
  ON contact_inquiries FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for site_settings
DROP POLICY IF EXISTS "Admins can manage site settings" ON site_settings;
CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for career_applications
DROP POLICY IF EXISTS "Admins can manage career applications" ON career_applications;
CREATE POLICY "Admins can manage career applications"
  ON career_applications FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for blog_categories
DROP POLICY IF EXISTS "Admins can manage blog categories" ON blog_categories;
CREATE POLICY "Admins can manage blog categories"
  ON blog_categories FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for app_development_types
DROP POLICY IF EXISTS "Admins can manage app development types" ON app_development_types;
CREATE POLICY "Admins can manage app development types"
  ON app_development_types FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for app_development_examples
DROP POLICY IF EXISTS "Admins can manage app development examples" ON app_development_examples;
CREATE POLICY "Admins can manage app development examples"
  ON app_development_examples FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for web_app_types
DROP POLICY IF EXISTS "Admins can manage web app types" ON web_app_types;
CREATE POLICY "Admins can manage web app types"
  ON web_app_types FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

-- Drop and recreate admin policies for web_app_examples
DROP POLICY IF EXISTS "Admins can manage web app examples" ON web_app_examples;
CREATE POLICY "Admins can manage web app examples"
  ON web_app_examples FOR ALL
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');