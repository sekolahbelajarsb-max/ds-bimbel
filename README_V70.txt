DS BIMBEL V70 — ADMIN LOWONGAN FINAL

Tujuan:
- Mempertahankan desain Ds Bimbel yang sudah ada.
- Admin > Lowongan Kerja terhubung ke /api/jobs.
- Tambah, edit, aktif/nonaktif, hapus lowongan.
- Tombol refresh dan tautan ke halaman publik.
- Public /api/public/jobs tetap digunakan untuk menampilkan data aktif.

Validasi:
- server/server.js menggunakan endpoint /api/jobs dan /api/public/jobs.
- api/index.js meneruskan Express app.
- vercel.json meneruskan /api/* ke /api/index.js.

Catatan deployment:
1. Jangan ubah Environment Variables Supabase/Vercel yang sudah aktif.
2. Push isi package ke branch main jika ingin Vercel melakukan deployment otomatis.
3. Setelah deployment selesai, tes:
   /api/health
   /api/public/jobs
   /api/jobs (harus meminta login bila belum login)
4. Buka /admin.html, login, lalu pilih Lowongan Kerja.
