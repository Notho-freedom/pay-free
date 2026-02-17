-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can read transactions by reference" ON public.transactions;

CREATE POLICY "Anyone can read transactions by reference"
ON public.transactions
FOR SELECT
USING (true);
