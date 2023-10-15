// import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabase = createServerComponentClient<Database>({ cookies })

export default supabase
