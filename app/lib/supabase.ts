import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://azaexskhbjkrbdsvjewr.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YWV4c2toYmprcmJkc3ZqZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjE3MDMsImV4cCI6MjA5MTIzNzcwM30.BlGauqNaMAtDpbzWHRC85WoSg7fyM5aC24rPS55FVpw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)