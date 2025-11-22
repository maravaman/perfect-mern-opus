/*
  # Fix Blog Categories RLS Policies
  
  Add proper RLS policies for blog_categories table
*/

-- Blog Categories policies
DROP POLICY IF EXISTS "Anyone can view active blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Admins can manage blog categories" ON blog_categories;

CREATE POLICY "Public can view active blog categories"
  ON blog_categories FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated can view all blog categories"
  ON blog_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert blog categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update blog categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete blog categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
