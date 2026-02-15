-- Pi Network App Tables

-- Users table for Pi authenticated users
CREATE TABLE IF NOT EXISTS public.pi_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pi_uid TEXT UNIQUE NOT NULL,
  pi_username TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table for chat
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pi_uid TEXT NOT NULL,
  pi_username TEXT NOT NULL,
  content TEXT NOT NULL,
  reply_to UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  reply_to_username TEXT,
  reply_to_content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payments table for Pi payments
CREATE TABLE IF NOT EXISTS public.pi_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pi_payment_id TEXT UNIQUE,
  pi_uid TEXT NOT NULL,
  pi_username TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  memo TEXT,
  status TEXT DEFAULT 'pending',
  tx_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disable RLS for public access (Pi auth handles authentication externally)
ALTER TABLE public.pi_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pi_payments ENABLE ROW LEVEL SECURITY;

-- Allow all operations via service role (API routes use service role key)
CREATE POLICY "Allow all for service role" ON public.pi_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON public.pi_payments FOR ALL USING (true) WITH CHECK (true);

-- Set admin for cipollas
-- This will be done via API after first login
