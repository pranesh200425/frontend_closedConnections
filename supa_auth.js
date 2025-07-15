//require('dotenv').config()
//import { SUPABASE_PROJECT_URL, SUPABASE_API_KEY } from './.env'

import { createClient } from "@supabase/supabase-js"

const supa_url = import.meta.env.VITE_SUPABASE_PROJECT_URL

const supa_anon_key = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(supa_url, supa_anon_key)