import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nayxvldmtjxwuohlvxhs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heXh2bGRtdGp4d3VvaGx2eGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NDgxNjUsImV4cCI6MjA1MDQyNDE2NX0.RWKhoww6fH9t-mCEOHGKNDijCIUubyt3gYtwIMCNTAg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
