Ds Bimbel V63 — LOWONGAN TERHUBUNG ADMIN + SUPABASE

Tujuan:
Membuat Lowongan Kerja yang sekarang sudah tampil di V62 menjadi data yang bisa dikelola dari Admin dan tersimpan di Supabase.

CATATAN PENTING:
Source GitHub saat ini masih memakai admin.html lama dan server.js lama. Karena itu V63 disediakan sebagai paket integrasi agar desain V62 tidak diulang.

FILE:
1. V63_SCHEMA.sql — tabel jobs + dua data awal.
2. V63_SERVER_PATCH.txt — endpoint API jobs.
3. V63_ADMIN_PATCH.html — menu, form, tabel, dan fungsi CRUD admin.

URUTAN:
1. Buka repository GitHub ds-bimbel.
2. Jalankan SQL V63_SCHEMA.sql di Supabase SQL Editor.
3. Edit server.js: tempel BLOK V63 SERVER sebelum const publicDir=...
4. Edit admin.html:
   a. tempel tombol menu setelah menu Pendaftar/Pengaturan.
   b. tempel section jobs sebelum </main>.
   c. tempel JS V63 sebelum </script> terakhir.
5. Commit ke main.
6. Tunggu Vercel deploy.
7. Login Admin -> 💼 Lowongan Kerja.

Setelah V63 aktif, lowongan dapat tambah/edit/hapus/aktif-nonaktif dari Admin.
Poster yang sudah ada tetap digunakan melalui image_url, misalnya /lowongan-guru-les-privat.jpeg.
