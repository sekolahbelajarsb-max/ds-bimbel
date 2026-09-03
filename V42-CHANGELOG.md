# Ds Bimbel V42 — Fix Multi Pendaftar

- Setiap pendaftar memiliki relasi sumber (`source_registration_id`) ke siswa hasil konversi.
- Dua pendaftar dengan nama dan nomor WhatsApp sama tetap menjadi dua siswa berbeda.
- Konversi online memakai transaksi + row lock V41 dan sekarang mencari siswa berdasarkan ID pendaftar.
- Mode lokal juga tidak lagi menggabungkan siswa hanya karena nama + WhatsApp sama.
- ID pendaftar lokal yang belum memiliki ID kini dipersistenkan ke localStorage.
- Label admin dan package version diperbarui ke V42.

## Catatan
V42 memperbaiki logika multi-pendaftar. Untuk data online yang benar-benar tersimpan di Supabase, Vercel tetap harus memiliki `DATABASE_URL` yang valid. Jangan kirim password database ke chat.
