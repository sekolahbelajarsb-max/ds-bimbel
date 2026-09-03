# Deploy Ds Bimbel V36 ke Vercel + Supabase

## 1. GitHub
Pastikan file V36 berada di root repository. File penting: `api/index.js`, `server/server.js`, `server/init-db.js`, dan `config/schema_v27.sql`.

## 2. Vercel
Import repository `ds-bimbel`. Vercel mendukung Express dengan konfigurasi minimal/zero configuration.

## 3. Environment Variables
Tambahkan pada Production (dan Preview bila diperlukan):
- `DATABASE_URL`: connection string **Transaction pooler** Supabase, port 6543.
- `ADMIN_USERNAME`: misalnya `admin`.
- `ADMIN_PASSWORD`: password admin yang kuat.
- `SESSION_SECRET`: secret acak panjang.

Simpan. Lalu Deploy/Redeploy.

## 4. Verifikasi
- Buka URL `.vercel.app` yang diberikan Vercel.
- Buka `/api/health`; hasil sehat harus menunjukkan `database: true`.
- Buka `/admin.html` dan login dengan kredensial environment.

Jangan menaruh DATABASE_URL di GitHub.
