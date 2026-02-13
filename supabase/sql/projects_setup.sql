-- Projects schema (simple + consistent)
-- Run in Supabase SQL editor

do $$
begin
  if not exists (select 1 from pg_type where typname = 'project_type') then
    create type public.project_type as enum ('web', 'mobile', 'automation');
  end if;
end $$;

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique,
  type public.project_type not null,
  title text not null,
  subtitle text,
  contribution text not null,              -- statt "Rolle": dein konkreter Beitrag
  timeframe text not null,                 -- z.B. "2025" oder "2023 - heute"
  context text not null,                   -- z.B. "B2B", "Produkt", "Studium"
  description text not null,
  demo_url text,
  repo_url text,
  image_url text,                          -- Hauptbild
  image_alt text,
  is_visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_links_check check (
    demo_url is not null or repo_url is not null or image_url is not null
  )
);

create table if not exists public.project_stack_items (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects(id) on delete cascade,
  item text not null,                      -- z.B. React, TypeScript, Tailwind CSS
  sort_order int not null default 0,
  unique (project_id, item)
);

create table if not exists public.project_images (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects(id) on delete cascade,
  image_url text not null,
  image_alt text,
  sort_order int not null default 0
);

-- Optional: falls du die alte komplexe Struktur nicht mehr willst
drop table if exists public.project_workflow_steps;
drop table if exists public.project_media;
drop table if exists public.project_tags;
drop table if exists public.project_kpis;

-- Seed (idempotent)
delete from public.project_stack_items
where project_id in (
  select id from public.projects where slug in ('cenra-ai', 'vibon-app', 'ai-automation')
);

delete from public.project_images
where project_id in (
  select id from public.projects where slug in ('cenra-ai', 'vibon-app', 'ai-automation')
);

delete from public.projects
where slug in ('cenra-ai', 'vibon-app', 'ai-automation');

insert into public.projects (
  slug, type, title, subtitle, contribution, timeframe, context, description,
  demo_url, repo_url, image_url, image_alt, is_visible, sort_order
) values
(
  'cenra-ai',
  'web',
  'Cenra.ai',
  'KI-Corporate-Website',
  'Konzeption, Design und Full-Stack-Umsetzung',
  '2025',
  'B2B Website',
  'Website fuer DSGVO-konforme KI-Sprachmodelle mit Fokus auf modernes Frontend, SEO und klare Conversion-Logik.',
  'https://www.cenra.de',
  null,
  '/images/cenra.png',
  'Cenra Website Preview',
  true,
  1
),
(
  'vibon-app',
  'mobile',
  'Vibon App',
  'Interaktionsplattform',
  'Produktentwicklung und technische Gesamtverantwortung',
  '2023 - heute',
  'Mobile Produkt',
  'Cross-Platform-App fuer Echtzeit-Interaktionen und Event-Management mit standortbasierten Features.',
  null,
  null,
  '/images/vibon/image1.jpeg',
  'Vibon App Preview',
  true,
  2
),
(
  'ai-automation',
  'automation',
  'AI Automation',
  'Business-Prozesslogik',
  'Architektur und Implementierung der Automationsstrecken',
  '2025',
  'B2B Automatisierung',
  'Automatisierungsstrecken mit n8n, API-Integrationen und KI-Anreicherung fuer effizientere Prozesse.',
  null,
  null,
  '/images/workflow.png',
  'Automation Workflow Preview',
  true,
  3
);

insert into public.project_stack_items (project_id, item, sort_order)
select p.id, s.item, s.sort_order
from public.projects p
join (
  values
    ('cenra-ai', 'React', 1),
    ('cenra-ai', 'TypeScript', 2),
    ('cenra-ai', 'Tailwind CSS', 3),
    ('cenra-ai', 'GSAP', 4),
    ('vibon-app', 'React Native', 1),
    ('vibon-app', 'Firebase', 2),
    ('vibon-app', 'Google Maps API', 3),
    ('vibon-app', 'JavaScript', 4),
    ('ai-automation', 'n8n', 1),
    ('ai-automation', 'JavaScript', 2),
    ('ai-automation', 'Webhooks', 3),
    ('ai-automation', 'OpenAI API', 4),
    ('ai-automation', 'RAG', 5)
) as s(slug, item, sort_order)
  on p.slug = s.slug;

insert into public.project_images (project_id, image_url, image_alt, sort_order)
select p.id, i.image_url, i.image_alt, i.sort_order
from public.projects p
join (
  values
    ('vibon-app', '/images/vibon/image1.jpeg', 'Vibon Screen 1', 1),
    ('vibon-app', '/images/vibon/image2.jpeg', 'Vibon Screen 2', 2),
    ('vibon-app', '/images/vibon/image3.jpeg', 'Vibon Screen 3', 3)
) as i(slug, image_url, image_alt, sort_order)
  on p.slug = i.slug;
