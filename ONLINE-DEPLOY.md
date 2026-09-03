# Ds Bimbel V35 — Deployment Online

## Opsi yang disiapkan: Render Blueprint

File `render.yaml` membuat:
- 1 Web Service Node/Express
- 1 Render Postgres
- `DATABASE_URL` otomatis terhubung ke database
- health check `/api/health`
- region Singapore

### Langkah
1. Buat repository GitHub baru, misalnya `ds-bimbel`.
2. Upload seluruh isi folder V35 ke root repository (bukan file ZIP di dalam repository).
3. Buka Render Dashboard → **New → Blueprint**.
4. Connect repository GitHub tersebut.
5. Pilih `render.yaml` pada root repository.
6. Isi `ADMIN_USERNAME` dan `ADMIN_PASSWORD` dengan kredensial Anda sendiri.
7. Klik Deploy Blueprint.
8. Tunggu Web Service dan Postgres selesai dibuat.
9. Buka URL publik yang diberikan Render. URL tersebut bisa dibuka dari HP/laptop/perangkat lain melalui internet.

### Domain sendiri
Setelah service aktif, tambahkan custom domain pada pengaturan Web Service. HTTPS dikelola oleh platform hosting.

### Keamanan
- Jangan masukkan password produksi ke file `.env`, ZIP, atau GitHub.
- Jangan memakai `admin123` untuk server publik.
- Ganti kredensial lewat environment variables hosting.
- Backup database secara berkala. Render menyatakan Free Postgres tidak menyediakan backup dan akan kedaluwarsa setelah 30 hari; untuk bisnis gunakan paket berbayar.

### Uji setelah online
- `https://DOMAIN/` → halaman utama
- `https://DOMAIN/admin.html` → login admin
- `https://DOMAIN/api/health` → status database
