import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hxjuxfbvctaeeyppqljs.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4anV4ZmJ2Y3RhZXlwcHFpbGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTQzMzUsImV4cCI6MjA4NzI3MDMzNX0.rMNgKiMJpxVbewWT6v5lEahpGKkhWTkJZnMC9wV8QpQ"

export const supabase = createClient(supabaseUrl, supabaseKey)