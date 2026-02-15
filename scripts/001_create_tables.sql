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

-- Enable RLS
ALTER TABLE public.pi_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pi_payments ENABLE ROW LEVEL SECURITY;

-- Allow all operations (Pi SDK handles auth externally, API routes use service role key)
DROP POLICY IF EXISTS "pi_users_all" ON public.pi_users;
CREATE POLICY "pi_users_all" ON public.pi_users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "messages_all" ON public.messages;
CREATE POLICY "messages_all" ON public.messages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "pi_payments_all" ON public.pi_payments;
CREATE POLICY "pi_payments_all" ON public.pi_payments FOR ALL USING (true) WITH CHECK (true);
