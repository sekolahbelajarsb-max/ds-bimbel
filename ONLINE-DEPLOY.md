# Ds Bimbel V33 — Online

V33 siap dideploy sebagai aplikasi Node/Express + PostgreSQL.

## Pilihan paling mudah: Render
1. Buat repository GitHub dan upload isi folder V33.
2. Di Render pilih **New > Blueprint**.
3. Pilih repository tersebut.
4. Render membaca `render.yaml` untuk membuat Web Service dan PostgreSQL.
5. Isi `ADMIN_USERNAME` dan `ADMIN_PASSWORD` dengan nilai yang Anda inginkan.
6. Deploy.
7. Setelah selesai, buka URL `https://nama-service.onrender.com` dari HP atau laptop.

## Catatan
- Website lokal tetap bisa dibuka melalui `http://localhost:3000`.
- HP pada Wi-Fi yang sama dapat memakai alamat IP laptop yang dicetak server.
- Untuk akses dari mana saja, gunakan URL HTTPS hasil deployment.
- Jangan memasukkan password database ke file yang di-upload ke GitHub.
