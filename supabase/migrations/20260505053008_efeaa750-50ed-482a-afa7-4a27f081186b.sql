-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- updated_at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#6366f1',
  role TEXT NOT NULL DEFAULT '',
  url TEXT,
  live_url TEXT,
  repo_url TEXT,
  tagline TEXT,
  problem TEXT NOT NULL DEFAULT '',
  solution TEXT,
  result TEXT,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  deployments JSONB NOT NULL DEFAULT '[]'::jsonb,
  hero_image TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: profiles
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS: user_roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS: projects
CREATE POLICY "Public reads published projects" ON public.projects FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert projects" ON public.projects FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update projects" ON public.projects FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete projects" ON public.projects FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS: blog_posts
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert posts" ON public.blog_posts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update posts" ON public.blog_posts FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete posts" ON public.blog_posts FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Auto profile + auto-admin-grant for anesu@rodent.co.zw
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (user_id) DO NOTHING;

  IF lower(NEW.email) = 'anesu@rodent.co.zw' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed projects from existing static data (minimal seed; admin can edit later)
INSERT INTO public.projects (slug, name, category, color, role, url, live_url, tagline, problem, solution, result, position) VALUES
  ('jofe-platform', 'JOFE Platform', 'Platform', '#0ea5e9', 'Lead Engineering', 'https://jofe.example', 'https://jofe.example', 'Job opportunities for everyone', 'Fragmented hiring workflows.', 'Unified pipeline + structured matching.', 'Reduced time-to-hire by 40%.', 1),
  ('feel-home', 'Feel at Home', 'Mobile', '#f97316', 'Product + Engineering', 'https://feelhome.example', 'https://feelhome.example', 'Hospitality companion', 'Disjointed guest experience.', 'In-app concierge & smart-room control.', '4.9 guest satisfaction.', 2),
  ('shedsense-grid', 'ShedSense Grid', 'IoT', '#10b981', 'Systems Architect', 'https://shedsense.example', 'https://shedsense.example', 'Distributed load-shed intelligence', 'Manual load-shedding response.', 'Sensor mesh + predictive switching.', '70% fewer outages.', 3),
  ('ar-experience', 'AR Experience', 'XR', '#a855f7', 'XR Engineer', 'https://ar.example', 'https://ar.example', 'Mixed-reality storytelling', 'Static brand experiences.', 'Real-time AR storytelling.', '3x engagement uplift.', 4),
  ('precise-locations-lib', 'Precise Locations', 'Library', '#ef4444', 'Library Author', 'https://npm.im/precise-locations', 'https://npm.im/precise-locations', 'Sub-meter indoor positioning', 'GPS unreliable indoors.', 'Hybrid BLE + sensor fusion library.', 'Adopted across 12 venues.', 5),
  ('meterflow', 'MeterFlow', 'Metering', '#14b8a6', 'Tech Lead', 'https://meterflow.example', 'https://meterflow.example', 'Smart utility metering', 'Manual meter reads.', 'LoRa-backed automated reads.', '95% read accuracy.', 6);

INSERT INTO public.blog_posts (slug, title, excerpt, body, published_at) VALUES
  ('designing-for-operations', 'Designing Interfaces for Operations Teams', 'How interface decisions impact uptime, mean-time-to-resolution, and operator trust.', 'Operational interfaces must optimize for clarity under stress. We prioritize deterministic state transitions, readable timelines, and context-rich alerts that reduce decision fatigue.', '2026-02-10'),
  ('building-resilient-iot-pipelines', 'Building Resilient IoT Pipelines', 'A pragmatic architecture for replay-safe ingest and resilient device telemetry processing.', 'Reliability in IoT pipelines begins with idempotent contracts and explicit sequencing. We isolate command channels from telemetry, use append-only streams, and design replay paths from day one.', '2026-01-21'),
  ('why-observability-matters', 'Why Observability Drives Better Engineering Outcomes', 'Metrics, traces, and logs should inform product decisions—not just incident response.', 'Observability is a strategic layer. By instrumenting user-critical flows and operational bottlenecks, teams can optimize architecture choices and improve delivery confidence over time.', '2025-11-03');