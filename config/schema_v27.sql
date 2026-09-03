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

