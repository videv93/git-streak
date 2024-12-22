-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    github_username TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'team'))
);

-- Streaks table
CREATE TABLE public.streaks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_check_in TIMESTAMP WITH TIME ZONE,
    total_check_ins INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Check-ins table
CREATE TABLE public.check_ins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    check_in_date DATE NOT NULL,
    commit_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_url TEXT,
    criteria JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User achievements table (junction table)
CREATE TABLE public.user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    achievement_id UUID REFERENCES public.achievements(id) NOT NULL,
    achieved_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, achievement_id)
);

-- Teams table
CREATE TABLE public.teams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Team members table
CREATE TABLE public.team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(team_id, user_id)
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Streaks policies
CREATE POLICY "Users can view own streaks" ON public.streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.streaks
    FOR ALL USING (auth.uid() = user_id);

-- Check-ins policies
CREATE POLICY "Users can view own check-ins" ON public.check_ins
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own check-ins" ON public.check_ins
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
    FOR SELECT USING (true);

-- User achievements policies
CREATE POLICY "Users can view own achievements" ON public.user_achievements
    FOR SELECT USING (auth.uid() = user_id);

-- Teams policies
CREATE POLICY "Teams are viewable by members" ON public.teams
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_members.team_id = teams.id
            AND team_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Team admins can update team" ON public.teams
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_members.team_id = teams.id
            AND team_members.user_id = auth.uid()
            AND team_members.role = 'admin'
        )
    );

-- Team members policies
CREATE POLICY "Team members are viewable by team members" ON public.team_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.team_members AS tm
            WHERE tm.team_id = team_members.team_id
            AND tm.user_id = auth.uid()
        )
    );

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at
    BEFORE UPDATE ON public.streaks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();