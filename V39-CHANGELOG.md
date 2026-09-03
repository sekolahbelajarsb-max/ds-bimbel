# Ds Bimbel V39

## Perbaikan
- Tombol **Terima Siswa** dibuat lebih kuat: tanpa konfirmasi yang menghambat, menampilkan status proses, dan otomatis membuka Data Siswa setelah berhasil.
- Error API saat konversi ditampilkan melalui toast.
- Konversi pendaftar ke siswa membawa seluruh data pendaftaran baru.

## Format pendaftaran baru
- Nama
- Alamat
- Jenis Kelamin
- Asal Sekolah
- Jenjang Pendidikan
- Kelas
- Paket Privat
- Jadwal Hari Privat
- Pukul
- Nomor HP/WhatsApp
- Catatan tambahan (opsional)

## Database
Menambahkan kolom baru secara backward-compatible pada `registrations` dan `students` dengan `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`.
