import { createClient } from '@supabase/supabase-js'

// Estas líneas leen las llaves que pusiste en el archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Aquí se crea la conexión oficial
export const supabase = createClient(supabaseUrl, supabaseAnonKey)