// Re-export Supabase client at the root-aliased path so admin code can use `@/lib/supabase`.
export { supabase } from '@/src/integrations/supabase/client';
export type { Database } from '@/src/integrations/supabase/types';
