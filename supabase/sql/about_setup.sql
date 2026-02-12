-- ABOUT tables
create table if not exists public.about_profile (
  id smallint primary key default 1,
  display_name text not null,
  location_label text not null,
  location_value text not null,
  profile_image_url text not null,
  section_title_prefix text not null,
  section_title_highlight text not null,
  intro_text text not null,
  detail_text text not null
);

create table if not exists public.about_stats (
  id bigint generated always as identity primary key,
  label text not null,
  value text not null,
  color_name text not null default 'cyan',
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table if not exists public.about_resume (
  id smallint primary key default 1,
  file_label text not null,
  file_name text not null,
  file_meta text not null,
  file_url text not null,
  button_label text not null
);

-- ABOUT seed
insert into public.about_profile (
  id, display_name, location_label, location_value, profile_image_url,
  section_title_prefix, section_title_highlight, intro_text, detail_text
) values (
  1,
  'Jakob',
  'Standort',
  'Frankfurt, DE',
  '/images/profileImage.jpg',
  'Hi, ich bin',
  'Jakob',
  'Ich baue digitale Loesungen, die funktionieren und Spass machen. Aktuell studiere ich Medieninformatik in Frankfurt mit Fokus auf Web- und Mobile-Entwicklung.',
  'Was mich antreibt? Probleme loesen und Ideen zum Leben bringen. Von kompletten Web-Apps ueber Mobile-Loesungen bis hin zu Automatisierung.'
)
on conflict (id) do update set
  display_name = excluded.display_name,
  location_label = excluded.location_label,
  location_value = excluded.location_value,
  profile_image_url = excluded.profile_image_url,
  section_title_prefix = excluded.section_title_prefix,
  section_title_highlight = excluded.section_title_highlight,
  intro_text = excluded.intro_text,
  detail_text = excluded.detail_text;

delete from public.about_stats;
insert into public.about_stats (label, value, color_name, sort_order, is_visible) values
  ('Projekte', '10+', 'cyan', 1, true),
  ('Jahre Code', '6+', 'emerald', 2, true),
  ('Motivation', 'inf', 'purple', 3, true);

insert into public.about_resume (id, file_label, file_name, file_meta, file_url, button_label) values
  (1, 'DOWNLOAD', 'Lebenslauf_JakobDickhardt.pdf', '248 KB • PDF', '/data/Lebenslauf_JakobDickhardt.pdf', 'CV herunterladen')
on conflict (id) do update set
  file_label = excluded.file_label,
  file_name = excluded.file_name,
  file_meta = excluded.file_meta,
  file_url = excluded.file_url,
  button_label = excluded.button_label;
