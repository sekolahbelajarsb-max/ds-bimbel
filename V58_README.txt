DS BIMBEL V58 — UPLOAD POSTER LOWONGAN

V58 melanjutkan modul Lowongan Kerja.

FITUR:
- Admin memilih poster langsung dari komputer/HP.
- Preview sebelum disimpan.
- JPG/PNG/WEBP.
- Maksimum 5 MB.
- File disimpan di Supabase Storage bucket job-posters.
- URL otomatis masuk ke jobs.image_url.
- Poster kemudian tampil di website publik.
- SERVICE_ROLE_KEY hanya berada di Vercel Environment Variables.

LANGKAH:
1. Jalankan V58_SUPABASE_STORAGE.sql di Supabase SQL Editor.
2. Tambahkan SUPABASE_SERVICE_ROLE_KEY di Vercel Environment Variables.
3. Tambahkan dependency multer.
4. Terapkan V58_SERVER_PATCH.txt pada server/server.js.
5. Terapkan V58_ADMIN_PATCH.txt pada admin.html.
6. Commit ke main dan tunggu Vercel deploy.
7. Login Admin -> Lowongan Kerja -> Tambah/Edit -> pilih poster.

KEAMANAN:
JANGAN memasukkan SUPABASE_SERVICE_ROLE_KEY ke index.html/admin.html,
GitHub, screenshot, atau chat.
