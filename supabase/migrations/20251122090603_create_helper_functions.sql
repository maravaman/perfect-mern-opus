/*
  # Create Helper Functions
  
  ## Overview
  Creates utility functions for the admin system
  
  ## Functions
  - update_updated_at: Trigger function to auto-update timestamps
*/

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
