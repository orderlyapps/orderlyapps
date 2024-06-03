import { Session } from '@supabase/supabase-js';

export const isCongregationAdmin = (
  congregation: any,
  session: Session | null
) => {
  return !!congregation.admins && !!session
    ? congregation.admins.some((a: any) => a.publisher_id === session.user.id)
    : false;
};
