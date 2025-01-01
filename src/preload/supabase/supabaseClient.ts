import { createClient } from '@supabase/supabase-js'

// @ts-ignore (define in dts)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// @ts-ignore (define in dts)
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
