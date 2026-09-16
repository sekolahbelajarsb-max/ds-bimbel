DS BIMBEL V68 — IMPORT EXCEL SISWA

Basis: V67 FULL SIAP PASANG. Form pendaftaran V64 dan Lowongan Kerja V67 dipertahankan.

FITUR BARU
- Admin > Siswa > Import Excel
- Template Excel siap pakai
- Preview 20 baris sebelum import
- Maksimal 500 siswa per import
- Import ke Supabase melalui /api/students/import
- Kolom: Nama, Orang Tua/Wali, WhatsApp, Alamat, Jenis Kelamin, Asal Sekolah, Jenjang, Kelas, Paket Privat, Jadwal Hari Privat, Pukul, Program, Area, Catatan, Status.

PEMASANGAN
1. Backup repository.
2. Ekstrak ZIP.
3. Ganti admin.html dan server/server.js dari paket.
4. Pastikan index.html, gambar, config tetap dari paket V68.
5. Upload Template_Import_Siswa.xlsx ke ROOT repository.
6. Commit ke main dan tunggu Vercel.
7. Login Admin > Siswa > Import Excel.
