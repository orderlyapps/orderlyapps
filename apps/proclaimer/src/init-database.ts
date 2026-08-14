import { initDatabase } from "@amodeo/proclaimer/database/context";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";

// Must be the first import in main.tsx: collection modules from
// @amodeo/proclaimer/database read these singletons at module-evaluation time.
initDatabase({ supabase, queryClient });
