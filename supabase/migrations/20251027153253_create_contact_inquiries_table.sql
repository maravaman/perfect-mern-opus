/*
  # Create contact inquiries table

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `name` (text) - Name of the person submitting the inquiry
      - `email` (text) - Email address for contact
      - `phone` (text) - Phone number (optional)
      - `subject` (text) - Subject of the inquiry
      - `message` (text) - Detailed message from the user
      - `created_at` (timestamptz) - Timestamp when inquiry was submitted
      - `status` (text) - Status of inquiry (new, contacted, resolved)
      
  2. Security
    - Enable RLS on `contact_inquiries` table
    - Add policy for inserting inquiries (anyone can submit)
    - Add policy for authenticated admin users to view inquiries
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);