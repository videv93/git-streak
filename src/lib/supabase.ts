import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nayxvldmtjxwuohlvxhs.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
