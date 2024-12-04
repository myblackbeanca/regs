import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jrpfiwzzbcvclwfwtbwd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycGZpd3p6YmN2Y2x3Znd0YndkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NjM1NTEsImV4cCI6MjA0NzQzOTU1MX0.9_Mx7PxXJE6xgGkaKeFrMBHo88MiuQ91D4vDYsBlLLI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)