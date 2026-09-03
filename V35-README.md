# Ds Bimbel V35 — Supabase + Vercel

Versi ini mempertahankan tampilan/fitur V34 dan menambahkan konfigurasi deployment serverless untuk Vercel + Supabase PostgreSQL.

## Environment Variables
- `DATABASE_URL` = Transaction Pooler connection string dari Supabase (port 6543). Jangan commit secret ini.
- `ADMIN_USERNAME` = username admin.
- `ADMIN_PASSWORD` = password admin.
- `SESSION_SECRET` = random secret panjang (disarankan).

## Deploy
1. Upload/replace seluruh isi V35 ke repository GitHub.
2. Import repository ke Vercel.
3. Tambahkan environment variables di Vercel.
4. Deploy. Database akan diinisialisasi otomatis saat aplikasi pertama kali membutuhkan koneksi database.

## Catatan
- Transaction pooler Supabase menggunakan port 6543 dan cocok untuk deployment serverless.
- Password database tidak boleh dimasukkan ke source code atau dikirim melalui chat.
- Untuk local run: `npm install` lalu `npm start`.
