/*
  # Create Career Applications Table

  ## Description
  Creates a dedicated table for career applications with all necessary fields
  including resume URL and proper tracking.

  ## Changes
  1. New Tables
    - `career_applications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `position` (text, required)
      - `experience` (text, required)
      - `message` (text, optional)
      - `resume_url` (text, optional)
      - `status` (text, default 'pending')
      - `responded` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `career_applications` table
    - Add policy for authenticated admins to read all applications
    - Add policy for public to insert applications (job seekers)
*/

-- Create career_applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  experience text NOT NULL,
  message text,
  resume_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  responded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all applications
CREATE POLICY "Admins can view all career applications"
  ON career_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Admins can update applications
CREATE POLICY "Admins can update career applications"
  ON career_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Admins can delete applications
CREATE POLICY "Admins can delete career applications"
  ON career_applications
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Anyone can submit applications (public access)
CREATE POLICY "Anyone can submit career applications"
  ON career_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_career_applications_created_at ON career_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_responded ON career_applications(responded);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_career_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER career_applications_updated_at
  BEFORE UPDATE ON career_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_career_applications_updated_at();
