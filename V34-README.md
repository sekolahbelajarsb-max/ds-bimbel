# Ds Bimbel V34 — Online Ready

V34 adalah paket Ds Bimbel yang disiapkan untuk diakses dari HP, laptop, tablet, dan perangkat lain melalui internet.

## Jalur akses
- Lokal laptop: `http://localhost:3000`
- Satu Wi-Fi: `http://IP-LAPTOP:3000`
- Online: deploy sebagai Web Service + PostgreSQL; Render memberikan URL publik `https://nama-layanan.onrender.com`.

## Login lokal
Username: `admin`
Password: `admin123`

Untuk deployment online, WAJIB isi `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di environment hosting. Jangan memakai password contoh untuk produksi.

## Deployment online
1. Upload folder V34 ke repository GitHub.
2. Di Render pilih **New → Blueprint** dan hubungkan repository tersebut.
3. Render membaca `render.yaml`, membuat Web Service dan PostgreSQL.
4. Isi `ADMIN_USERNAME` dan `ADMIN_PASSWORD` saat diminta.
5. Deploy. Setelah selesai, buka URL `onrender.com` dari HP/laptop mana pun.

Catatan: Render Free cocok untuk uji coba. Free web service dapat sleep setelah tidak ada aktivitas; Free Postgres saat ini memiliki masa berlaku 30 hari. Untuk penggunaan bisnis jangka panjang gunakan paket database berbayar/backups.
