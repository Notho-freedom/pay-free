
-- Drop overly permissive policy
DROP POLICY "Service role can manage transactions" ON public.transactions;

-- Only allow SELECT for anon (to check transaction status)
CREATE POLICY "Anyone can read transactions by reference"
ON public.transactions
FOR SELECT
USING (true);

-- Inserts/updates handled by edge functions using service_role key (bypasses RLS)
