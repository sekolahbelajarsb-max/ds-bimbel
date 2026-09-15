CREATE TABLE IF NOT EXISTS jobs (
 id bigserial PRIMARY KEY,
 title text NOT NULL,
 category text DEFAULT 'Lowongan Kerja',
 location text DEFAULT '',
 schedule text DEFAULT '',
 description text DEFAULT '',
 requirements text DEFAULT '',
 whatsapp text DEFAULT '628994515669',
 image_url text DEFAULT '',
 status text DEFAULT 'Aktif',
 published_at timestamptz DEFAULT now(),
 created_at timestamptz DEFAULT now(),
 updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
INSERT INTO jobs(title,category,location,schedule,description,requirements,whatsapp,image_url,status)
SELECT 'Guru Les Privat Matematika','Guru Les Privat','Aur Kuning, Kota Bukittinggi','Sesuai kesepakatan','Mengajar Matematika SMP & SMA secara privat.','Perempuan; S1/final-semester; menyukai anak; serius; pengalaman diutamakan; memiliki kendaraan sendiri.','628994515669','/lowongan-guru-les-privat.jpeg','Aktif'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title='Guru Les Privat Matematika');
INSERT INTO jobs(title,category,location,schedule,description,requirements,whatsapp,image_url,status)
SELECT 'Pelatih Renang Pria/Wanita','Pelatih Renang','Padang','Sabtu/Minggu 08.00–11.00 WIB','Melatih renang dasar hingga pengembangan kemampuan.','Mampu berenang; mampu mengajar dasar/pengembangan; menyukai anak; komunikatif; sabar; disiplin; bertanggung jawab; pengalaman diutamakan.','628994515669','/lowongan-pelatih-renang.jpeg','Aktif'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title='Pelatih Renang Pria/Wanita');
