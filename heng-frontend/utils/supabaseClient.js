// ✅ frontend/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ ใช้คีย์ anon (public) สำหรับ frontend
const SUPABASE_URL = 'https://hxjuxfbvctaeyppqiljs.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4anV4ZmJ2Y3RhZXlwcHFpbGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTQzMzUsImV4cCI6MjA4NzI3MDMzNX0.rMNgKiMJpxVbewWT6v5lEahpGKkhWTkJZnMC9wV8QpQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)