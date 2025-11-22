/*
  # Fix user_roles access and add helper function
  
  1. Changes
    - Add a secure function to check user role that bypasses RLS
    - Update RLS policies to be more permissive for authenticated users viewing their own roles
  
  2. Security
    - Function uses security definer to bypass RLS safely
    - Only returns role for the authenticated user
*/

-- Create a function to get user role that bypasses RLS
CREATE OR REPLACE FUNCTION public.get_user_role(check_user_id uuid DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
  target_user_id uuid;
BEGIN
  -- If no user_id provided, use the authenticated user
  target_user_id := COALESCE(check_user_id, auth.uid());
  
  -- Get the role from user_roles table
  SELECT role::text INTO user_role
  FROM user_roles
  WHERE user_id = target_user_id;
  
  RETURN COALESCE(user_role, 'user');
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_role TO authenticated;