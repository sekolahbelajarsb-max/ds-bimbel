# Ds Bimbel V44

Perbaikan Data Siswa:
- Nama Siswa dan Alamat dipisahkan menjadi kolom tabel terpisah.
- Tombol Edit, Profil, dan Hapus memakai event delegation sehingga tetap dapat diklik setelah tabel dirender ulang.
- Handler penting juga diekspos ke window untuk kompatibilitas browser.
- Data siswa manual mendukung source_registration_id.

Tetap kompatibel dengan V43 dan Supabase/PostgreSQL.
