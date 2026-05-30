import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vttregjdwdtzedemoojg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dHJlZ2pkd2R0emVkZW1vb2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTk2MDQsImV4cCI6MjA5NTYzNTYwNH0._s_p1j_DIfz3AxKeAlNaP1oIQRH-iYhOL7kV-15t3uQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
