DS BIMBEL V69 — FULL SIAP PASANG
================================

TUJUAN
------
Memperbaiki pesan:
"Lowongan: Endpoint tidak ditemukan"

Penyebab yang sudah diverifikasi:
- Admin Lowongan sudah ada.
- Schema `jobs` sudah ada.
- Backend pada paket terbaru sudah memiliki `/api/jobs`.
- Tetapi source yang sedang aktif di GitHub/Vercel masih backend lama.

V69 memakai basis V68 yang sudah mempertahankan:
- Form pendaftaran V64 yang sudah normal.
- Lowongan publik.
- Admin Lowongan.
- Siswa, Tutor, Jadwal, Absensi, Pembayaran, Tagihan, Notifikasi, Laporan.
- Import Excel Siswa.
- Gambar program dan poster lowongan.

ISI PENTING
-----------
admin.html
index.html
server/server.js
config/schema_v27.sql
api/index.js
vercel.json
package.json
Template_Import_Siswa.xlsx
gambar program + poster lowongan

CARA PASANG — FULL REPLACE
---------------------------
1. Backup repository GitHub terlebih dahulu.
2. Ekstrak ZIP V69.
3. Upload seluruh isi folder hasil ekstrak ke ROOT repository GitHub.
4. Jika GitHub bertanya Replace, pilih Replace untuk file yang sama.
5. Pastikan file berikut ada:
   - admin.html
   - index.html
   - server/server.js
   - api/index.js
   - vercel.json
   - package.json
   - config/schema_v27.sql
6. Commit ke branch `main`.
7. Tunggu Vercel selesai deploy.
8. Buka:
   https://ds-bimbel.vercel.app/admin.html
9. Login.
10. Klik `💼 Lowongan Kerja`.

HASIL YANG DIHARAPKAN
---------------------
- Tidak lagi muncul "Endpoint tidak ditemukan".
- Dua lowongan awal dari schema jobs dapat dimuat.
- Tambah Lowongan bekerja.
- Edit bekerja.
- Aktif/Nonaktif bekerja.
- Hapus bekerja.

PENTING
-------
Jangan mengubah form pendaftaran lagi karena V64 sudah normal.
Jangan memakai file V65_ADMIN_PATCH.html sebagai halaman Admin.
Jangan menghapus Environment Variables Vercel.

Jika setelah deployment masih muncul endpoint lama, buka:
https://ds-bimbel.vercel.app/api/health
dan kirim screenshot hasilnya. Itu akan menunjukkan apakah deployment baru sudah benar-benar aktif.
