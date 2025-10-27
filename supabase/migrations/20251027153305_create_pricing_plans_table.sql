/*
  # Create pricing plans table

  1. New Tables
    - `pricing_plans`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Plan name
      - `price` (text) - Price display text
      - `features` (jsonb) - Array of features
      - `popular` (boolean) - Whether plan is marked as popular
      - `display_order` (integer) - Order to display plans
      - `active` (boolean) - Whether plan is active
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `pricing_plans` table
    - Add policy for public read access to active plans
    - Add policy for authenticated users to manage plans
*/

CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  popular boolean DEFAULT false,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing plans"
  ON pricing_plans
  FOR SELECT
  TO anon
  USING (active = true);

CREATE POLICY "Authenticated users can view all plans"
  ON pricing_plans
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert plans"
  ON pricing_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update plans"
  ON pricing_plans
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete plans"
  ON pricing_plans
  FOR DELETE
  TO authenticated
  USING (true);