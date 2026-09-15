create table if not exists students(id bigserial primary key,name text not null,parent_name text default '',whatsapp text default '',program text default '',level_or_age text default '',area text default '',notes text default '',status text default 'Aktif',created_at timestamptz default now());
create table if not exists tutors(id bigserial primary key,name text not null,skill text default '',whatsapp text default '',status text default 'Aktif',created_at timestamptz default now());
create table if not exists schedules(id bigserial primary key,student_id bigint references students(id) on delete cascade,tutor_id bigint references tutors(id) on delete set null,program text default '',schedule_date date not null,schedule_time time,status text default 'Terjadwal',notes text default '',created_at timestamptz default now());
create table if not exists attendance(id bigserial primary key,student_id bigint references students(id) on delete cascade,schedule_id bigint references schedules(id) on delete cascade,attendance_date date not null,status text not null,notes text default '',created_at timestamptz default now(),unique(schedule_id));
create table if not exists payments(id bigserial primary key,student_id bigint references students(id) on delete cascade,amount numeric(14,2) not null,payment_date date,billing_month text,due_date date,status text default 'Belum Lunas',program text default '',notes text default '',paid_at timestamptz,created_at timestamptz default now());
create table if not exists registrations(id bigserial primary key,name text not null,parent_name text default '',whatsapp text default '',program text default '',level_or_age text default '',area text default '',notes text default '',status text default 'Pendaftar',created_at timestamptz default now());
create index if not exists idx_schedules_date on schedules(schedule_date);create index if not exists idx_payments_month on payments(billing_month);create index if not exists idx_students_status on students(status);
create index if not exists idx_registrations_status on registrations(status);
-- V39 registration fields (backward-compatible migration)
alter table registrations add column if not exists address text default '';
alter table registrations add column if not exists gender text default '';
alter table registrations add column if not exists school text default '';
alter table registrations add column if not exists education_level text default '';
alter table registrations add column if not exists class_name text default '';
alter table registrations add column if not exists private_package text default '';
alter table registrations add column if not exists private_days text default '';
alter table registrations add column if not exists private_time text default '';
alter table students add column if not exists address text default '';
alter table students add column if not exists gender text default '';
alter table students add column if not exists school text default '';
alter table students add column if not exists education_level text default '';
alter table students add column if not exists class_name text default '';
alter table students add column if not exists private_package text default '';
alter table students add column if not exists private_days text default '';
alter table students add column if not exists private_time text default '';
-- V42: one student per registration; prevents duplicate registrations from merging
alter table students add column if not exists source_registration_id bigint;
create unique index if not exists idx_students_source_registration on students(source_registration_id) where source_registration_id is not null;
-- V46: student profile enhancements
alter table students add column if not exists photo_url text default '';
alter table students add column if not exists parent_whatsapp text default '';
alter table students add column if not exists birth_date date;
alter table students add column if not exists development_notes text default '';

-- V67 READY: Lowongan Kerja
CREATE TABLE IF NOT EXISTS jobs (
 id bigserial PRIMARY KEY,
 title text NOT NULL,
 category text DEFAULT 'Lowongan Kerja',
 location text DEFAULT '',
 schedule text DEFAULT '',
 description text DEFAULT '',
 requirements text DEFAULT '',
 whatsapp text DEFAULT '628994515669',
 image_url text DEFAULT '',
 status text DEFAULT 'Aktif',
 published_at timestamptz DEFAULT now(),
 created_at timestamptz DEFAULT now(),
 updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
INSERT INTO jobs(title,category,location,schedule,description,requirements,whatsapp,image_url,status)
SELECT 'Guru Les Privat Matematika','Guru Les Privat','Aur Kuning, Kota Bukittinggi','Sesuai kesepakatan','Mengajar Matematika SMP & SMA secara privat.','Perempuan; S1/final-semester; menyukai anak; serius; pengalaman diutamakan; memiliki kendaraan sendiri.','628994515669','/lowongan-guru-les-privat.jpeg','Aktif'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title='Guru Les Privat Matematika');
INSERT INTO jobs(title,category,location,schedule,description,requirements,whatsapp,image_url,status)
SELECT 'Pelatih Renang Pria/Wanita','Pelatih Renang','Padang','Sabtu/Minggu 08.00–11.00 WIB','Melatih renang dasar hingga pengembangan kemampuan.','Mampu berenang; mampu mengajar dasar/pengembangan; menyukai anak; komunikatif; sabar; disiplin; bertanggung jawab; pengalaman diutamakan.','628994515669','/lowongan-pelatih-renang.jpeg','Aktif'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title='Pelatih Renang Pria/Wanita');
