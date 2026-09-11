DS BIMBEL V56 — LOWONGAN KERJA

Tujuan:
Menambahkan menu publik "💼 Lowongan Kerja" dan menu Admin "💼 Lowongan Kerja".

Fitur:
- Lowongan disimpan di Supabase/PostgreSQL.
- Hanya status Aktif yang tampil ke pengunjung.
- Bisa menentukan judul, posisi, gambar/poster, lokasi, jenis pekerjaan, deadline, kualifikasi, deskripsi, persyaratan, WhatsApp, link lamaran, status, dan urutan.
- Tombol Lamar via WhatsApp otomatis memakai nomor lowongan.
- Tidak mengubah desain utama Ds Bimbel.
- Gambar dapat dimasukkan kemudian melalui field Gambar/Poster.

Urutan pemasangan:
1. Jalankan V56_SCHEMA.sql di Supabase SQL Editor, atau masukkan SQL-nya ke config/schema_v27.sql agar ensureSchema membuat tabel otomatis.
2. Terapkan V56_SERVER_PATCH ke server.js.
3. Terapkan V56_INDEX_PATCH ke index.html.
4. Terapkan V56_ADMIN_PATCH ke admin.html.
5. Commit ke GitHub main.
6. Tunggu Vercel deploy.
7. Login Admin -> 💼 Lowongan Kerja -> Tambah Lowongan.

Catatan gambar:
V56 sengaja memakai image_url/path agar tidak membutuhkan upload storage tambahan. Setelah Bapak/Ibu memberikan poster lowongan, kita bisa memasukkan file gambar dan mengatur path-nya. Jika ingin upload langsung dari Admin, tahap V57 dapat memakai Supabase Storage.
