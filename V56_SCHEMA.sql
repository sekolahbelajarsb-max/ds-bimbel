-- V56: Lowongan Kerja
create table if not exists jobs (
  id bigserial primary key,
  title text not null,
  position text not null,
  image_url text default '',
  location text default '',
  employment_type text default 'Part Time',
  deadline date,
  qualification text default '',
  description text default '',
  requirements text default '',
  whatsapp text default '0899-4515-669',
  apply_url text default '',
  status text not null default 'Aktif',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_jobs_status on jobs(status);
create index if not exists idx_jobs_deadline on jobs(deadline);
