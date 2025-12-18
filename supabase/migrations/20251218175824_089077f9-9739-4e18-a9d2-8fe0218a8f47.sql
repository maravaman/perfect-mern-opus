-- Fix payments table RLS to explicitly handle guest checkouts and block anonymous access
-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;

-- Authenticated users can only view their own payments (with explicit null check)
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (
    (auth.uid() = user_id AND user_id IS NOT NULL) OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Block anonymous users from accessing any payments
CREATE POLICY "Block anonymous payment access"
  ON public.payments FOR SELECT
  TO anon
  USING (false);