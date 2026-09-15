DS BIMBEL V61 - SIAP PAKAI LOWONGAN KERJA

Paket ini dibuat untuk memperbaiki masalah Lowongan Kerja yang belum muncul.

ISI PAKET:
1. index.html                         -> GANTI index.html lama di ROOT repository
2. lowongan-guru-les-privat.jpeg     -> UPLOAD ke ROOT repository
3. lowongan-pelatih-renang.jpeg      -> UPLOAD ke ROOT repository

PENTING:
- Jangan menghapus server/, api/, config/, admin.html, package.json, atau file lain di repository.
- Cukup replace index.html dan tambahkan dua gambar di ROOT.
- index.html sudah memakai nama file gambar program yang ada di ROOT: les-privat-1.png, les-privat-2.png, futsal.png, les-renang.png.
- Lowongan Kerja dibuat STATIC agar langsung tampil tanpa bergantung pada database.
- Form pendaftaran tetap mengirim ke /api/public/registrations seperti website sebelumnya.

CARA PASANG DI GITHUB:
1. Buka repository ds-bimbel.
2. Upload/replace index.html.
3. Upload dua file JPEG ke ROOT repository.
4. Commit changes ke branch main.
5. Tunggu Vercel selesai deploy.
6. Buka https://ds-bimbel.vercel.app/#lowongan
7. Tekan Ctrl+Shift+R.

HASIL:
- Menu "💼 Lowongan Kerja" muncul di navigasi desktop.
- Section Lowongan Kerja tampil di halaman utama.
- Dua poster lowongan tampil.
- Tombol Lamar via WhatsApp aktif.
- Tampilan responsif untuk HP.
