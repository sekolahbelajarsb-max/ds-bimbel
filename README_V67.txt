DS BIMBEL V67 — FULL SIAP PASANG

Ini BUKAN patch. Paket berisi admin.html lengkap, server/server.js, schema, index.html V64 + integrasi jobs, dan poster.

1) Backup repository GitHub.
2) Ekstrak ZIP.
3) Upload isi folder Ds_Bimbel_V67_READY ke ROOT repository GitHub dan pilih Replace untuk file yang sama.
4) Commit ke main.
5) Tunggu Vercel selesai deploy.
6) Buka /admin.html dan login seperti biasa.
7) Menu "💼 Lowongan Kerja" sekarang berada di sidebar Admin utama.

Fitur Lowongan: tambah, edit, aktif/nonaktif, hapus, poster, lokasi, jadwal, WhatsApp, deskripsi, persyaratan.
Data Lowongan tersimpan di Supabase melalui /api/jobs. Website publik mengambil lowongan aktif melalui /api/public/jobs dengan fallback kartu statis V64.

Pendaftaran V64 dipertahankan.
JANGAN membuka V65_ADMIN_PATCH.html. File tersebut adalah patch, sedangkan V67/admin.html adalah halaman Admin lengkap.
