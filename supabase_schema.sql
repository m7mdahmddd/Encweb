-- ================================================================
-- Encweb Supabase Database Schema & Access Control (RLS)
-- Copy & Paste this entire file into your Supabase Dashboard SQL Editor!
-- ================================================================

-- 1. Create Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Friends table
CREATE TABLE IF NOT EXISTS public.friends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'accepted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, friend_id)
);

-- 3. Create Secret Messages / Cloud Vault table
CREATE TABLE IF NOT EXISTS public.secret_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_ids UUID[] DEFAULT '{}',
    access_type TEXT DEFAULT 'public', -- 'public', 'private', 'friends'
    title TEXT DEFAULT 'Encrypted Message',
    cover_text TEXT,
    disguised_payload TEXT NOT NULL,
    disguise_mode TEXT DEFAULT 'stego-invisible',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secret_messages ENABLE ROW LEVEL SECURITY;

-- Profiles Security Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Friends Security Policies
CREATE POLICY "Users can view their own friends" ON public.friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can add friends" ON public.friends FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete friends" ON public.friends FOR DELETE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Secret Messages Security Policies
-- Ensures only allowed recipients (or sender, or public) can SELECT secret messages!
CREATE POLICY "Targeted access control for secret messages" ON public.secret_messages 
FOR SELECT USING (
    auth.uid() = sender_id 
    OR access_type = 'public' 
    OR auth.uid() = ANY(recipient_ids)
);

CREATE POLICY "Authenticated users can insert secret messages" ON public.secret_messages 
FOR INSERT WITH CHECK (auth.uid() = sender_id);
