# Ds Bimbel V48

Perbaikan akses Data Siswa di HP.

- Tampilan siswa mobile berbentuk kartu, bukan tabel lebar.
- Status database terlihat jelas.
- Jika database belum terhubung, admin diberi penjelasan bahwa localStorage tidak dibagikan antar perangkat.
- Tombol Edit, Profil, dan Hapus tetap menggunakan event delegation.
- V48 tetap kompatibel dengan V47.

## Penting untuk data lintas perangkat
Jika siswa muncul di laptop tetapi tidak di HP, hampir pasti laptop sedang memakai localStorage/mode lokal. Data localStorage hanya berada di browser/perangkat tersebut. Agar data muncul di HP, Vercel harus memiliki `DATABASE_URL` yang menunjuk ke Supabase Transaction Pooler, lalu redeploy.
