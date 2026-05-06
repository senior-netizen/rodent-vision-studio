GRANT SELECT ON public.user_roles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon, authenticated;