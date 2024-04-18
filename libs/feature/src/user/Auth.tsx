import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { supabaseKeys } from '@config';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(supabaseKeys.url, supabaseKeys.key);

export const SupabaseAuth = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={['google', 'facebook', 'apple']}
    showLinks={false}
    onlyThirdPartyProviders
  />
);
