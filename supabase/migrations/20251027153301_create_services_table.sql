/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key) - Unique identifier
      - `number` (text) - Service number (01, 02, etc.)
      - `title` (text) - Service title
      - `description` (text) - Service description
      - `icon` (text) - Icon name or URL (optional)
      - `display_order` (integer) - Order to display services
      - `active` (boolean) - Whether service is active
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access to active services
    - Add policy for authenticated users to manage services
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  TO anon
  USING (active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);