import { supabaseKeys } from '@config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = supabaseKeys.url;
const supabaseKey = supabaseKeys.key;
export const supabase = createClient(supabaseUrl, supabaseKey);
