# Ds Bimbel V43 — Database Online & Multi-Pendaftar

V43 melanjutkan V42 dengan fokus pada koneksi database online agar masalah mode lokal tidak lagi tersembunyi.

## Perbaikan utama
- Status `/api/health` sekarang menampilkan apakah `DATABASE_URL` terkonfigurasi dan apakah PostgreSQL dapat diakses.
- Admin menampilkan status **Supabase terhubung** atau alasan database belum terhubung.
- Tombol **Coba Koneksi Lagi** tersedia di Status Sistem.
- Jika `ALLOW_LOCAL_MODE=false`, admin **tidak diam-diam kembali ke localStorage** saat database online gagal. Ini penting untuk deployment Vercel agar data tidak terbagi antara browser dan Supabase.
- V42 tetap dipertahankan: setiap pendaftar memiliki `source_registration_id`, sehingga pendaftar dengan nama/WA sama dapat menjadi siswa yang berbeda.

## Environment Vercel
Wajib isi:
- `DATABASE_URL` = connection string **Transaction Pooler** Supabase (port 6543)
- `ADMIN_USERNAME` = admin
- `ADMIN_PASSWORD` = password admin testing
- `SESSION_SECRET` = secret acak panjang
- `NODE_ENV` = production
- `ALLOW_LOCAL_MODE` = false

Jangan kirim password database atau SESSION_SECRET ke chat. Salin connection string langsung dari Supabase ke Vercel Environment Variables.

Setelah mengubah Environment Variables, lakukan redeploy Production.

## Verifikasi
Buka `/api/health` pada domain Vercel. Kondisi berhasil harus menunjukkan `database: true`.
Kemudian login admin dan pada Status Sistem harus terlihat:
`✓ Server + database Supabase terhubung.`

## Catatan keamanan
`ADMIN_PASSWORD=admin123` hanya untuk pengujian. Ganti sebelum penggunaan nyata.
