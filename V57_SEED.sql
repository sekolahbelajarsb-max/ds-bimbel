-- V57: Data awal Lowongan Kerja menggunakan 2 poster yang diberikan.
-- Jalankan SETELAH V56_SCHEMA.sql.
-- image_url memakai nama file di root website agar dapat dilayani Vercel.

insert into jobs
(title, position, image_url, location, employment_type, deadline, qualification, description, requirements, whatsapp, status, sort_order)
select
'Lowongan Guru Les Privat - Matematika',
'Guru Les Privat Matematika (SMP & SMA)',
'lowongan-guru-les-privat.jpeg',
'Aur Kuning, Kota Bukittinggi',
'Part Time',
null,
'Perempuan; Pendidikan S1 / Mahasiswa Semester Akhir; menyukai anak-anak; serius bekerja; pengalaman lebih diutamakan; memiliki kendaraan pribadi.',
'Ds Bimbel membuka kesempatan bergabung sebagai guru les privat Matematika untuk jenjang SMP dan SMA.',
'Surat lamaran; Ijazah terakhir; Transkrip nilai; CV; KTP. Dokumen dikirim dalam 1 file PDF.',
'0899-4515-669',
'Aktif',
1
where not exists (
  select 1 from jobs where position='Guru Les Privat Matematika (SMP & SMA)'
);

insert into jobs
(title, position, image_url, location, employment_type, deadline, qualification, description, requirements, whatsapp, status, sort_order)
select
'Lowongan Pelatih Renang',
'Pelatih Renang Pria / Wanita',
'lowongan-pelatih-renang.jpeg',
'Padang',
'Part Time',
null,
'Pria/Wanita; memiliki kemampuan berenang yang baik; mampu mengajarkan teknik dasar hingga pengembangan kemampuan berenang; menyukai dunia anak-anak dan mampu berkomunikasi dengan baik; sabar, ramah, disiplin, bertanggung jawab; mampu membimbing individual maupun kelompok kecil; siap mengikuti jadwal; pengalaman sebagai pelatih menjadi nilai tambah.',
'DS Bimbel membuka kesempatan bagi Anda yang memiliki kemampuan dan pengalaman dalam bidang renang untuk bergabung sebagai pelatih renang.',
'Jadwal kerja Sabtu & Minggu, pukul 08.00-11.00 WIB. Lokasi latihan mengikuti program yang tersedia di Padang/Bukittinggi.',
'0899-4515-669',
'Aktif',
2
where not exists (
  select 1 from jobs where position='Pelatih Renang Pria / Wanita'
);
