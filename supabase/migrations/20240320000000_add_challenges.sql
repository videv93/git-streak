-- Challenges table
CREATE TABLE public.challenges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES public.profiles(id),
    status TEXT CHECK (status IN ('active', 'upcoming', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Challenge participants table
CREATE TABLE public.challenge_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(challenge_id, user_id)
);

-- Add RLS policies
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

-- Everyone can view challenges
CREATE POLICY "Challenges are viewable by everyone" 
ON public.challenges FOR SELECT USING (true);

-- Only authenticated users can create challenges
CREATE POLICY "Users can create challenges" 
ON public.challenges FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Challenge participants policies
CREATE POLICY "Challenge participants are viewable by everyone" 
ON public.challenge_participants FOR SELECT USING (true);

-- Users can join challenges
CREATE POLICY "Users can join challenges" 
ON public.challenge_participants FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger for challenges
CREATE TRIGGER update_challenges_updated_at
    BEFORE UPDATE ON public.challenges
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();