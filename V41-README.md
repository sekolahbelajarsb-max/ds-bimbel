# Ds Bimbel V41

V41 adalah pembaruan dari V40 untuk deployment Vercel + Supabase.

## Perubahan
- Seluruh label admin yang tertinggal `V38` diperbarui menjadi `V41`.
- Metadata package/server diperbarui ke 41.0.0.
- Proses **Terima Siswa** memakai transaksi database agar pendaftar dan siswa diproses konsisten serta lebih aman dari klik ganda/permintaan bersamaan.
- Data profil siswa yang sudah ada ikut disinkronkan saat pendaftar diterima.

## Login testing
- Username: `admin`
- Password: `admin123` (jika Environment Variables Vercel masih menggunakan nilai testing tersebut)

Jangan pernah memasukkan password database atau `SESSION_SECRET` ke file GitHub.
