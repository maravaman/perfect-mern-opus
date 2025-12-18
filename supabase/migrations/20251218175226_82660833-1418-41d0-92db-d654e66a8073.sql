-- Fix overly permissive payments INSERT policy
-- The current "Anyone can create payments" policy allows any user to insert arbitrary payment records

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create payments" ON public.payments;

-- Create a more restrictive policy that supports guest checkouts but requires validation
CREATE POLICY "Validated payment creation"
  ON public.payments FOR INSERT
  WITH CHECK (
    -- Either authenticated user creating payment for themselves
    (auth.uid() = user_id) OR
    -- OR guest payment (user_id null, requires email and phone for validation)
    (user_id IS NULL AND email IS NOT NULL AND phone IS NOT NULL)
  );