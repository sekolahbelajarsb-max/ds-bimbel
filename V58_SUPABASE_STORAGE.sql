-- V58 — SUPABASE STORAGE
-- Jalankan di Supabase SQL Editor.

insert into storage.buckets (id, name, public)
values ('job-posters', 'job-posters', true)
on conflict (id) do update set public=true;

-- Public READ agar poster dapat tampil di website.
drop policy if exists "job-posters public read" on storage.objects;
create policy "job-posters public read"
on storage.objects for select
to public
using (bucket_id='job-posters');

-- Upload/update/delete dilakukan oleh server menggunakan SERVICE_ROLE_KEY.
-- Karena service role melewati RLS, tidak perlu membuka INSERT/UPDATE/DELETE
-- kepada browser/public.
