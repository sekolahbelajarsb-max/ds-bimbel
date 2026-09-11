V60 — LOWONGAN KERJA BENAR-BENAR TAMPIL

Pemeriksaan source GitHub menunjukkan main masih memakai index.html lama: menu hanya Program, Les Privat, Futsal, Renang, Pendaftaran, Hubungi Kami. Tidak ada #lowongan. Karena itu V59 belum terpasang ke main/Vercel.

V60 sengaja TIDAK memakai database/API. Dua lowongan ditampilkan langsung dari index.html agar bisa dipastikan tampil terlebih dahulu. Setelah itu baru kita sambungkan ke Admin/Supabase.

LANGKAH:
1. Buka GitHub repository ds-bimbel -> index.html -> Edit.
2. Di dalam <style>, sebelum </style>, tempel isi V60_CSS.txt.
3. Pada baris nav, setelah link Pendaftaran, tambahkan: <a href="#lowongan">💼 Lowongan Kerja</a>
4. Tepat sebelum <section id="daftar">, tempel isi V60_LOWONGAN_SECTION.html.
5. Upload dua gambar ke ROOT repository (bukan assets):
   - lowongan-guru-les-privat.jpeg
   - lowongan-pelatih-renang.jpeg
6. Commit changes ke branch main.
7. Tunggu Vercel deployment selesai.
8. Buka https://ds-bimbel.vercel.app/#lowongan
9. Tekan Ctrl+Shift+R.

HASIL: menu Lowongan Kerja muncul dan dua poster tampil di halaman.
