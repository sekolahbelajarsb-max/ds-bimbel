# Ds Bimbel V37 — Fix Vercel Static Assets + API

Perbaikan utama:
- Vercel tidak lagi mengarahkan semua URL ke Express.
- Hanya `/api/*` yang diteruskan ke Express API.
- `index.html`, `admin.html`, dan folder `assets/` disajikan sebagai file statis Vercel.
- Database tetap menggunakan Supabase Transaction Pooler.

PENTING: DATABASE_URL di Vercel harus berupa satu connection string PostgreSQL lengkap. Jangan memakai host `base` atau placeholder.

Contoh format (password jangan dibagikan):
`postgresql://postgres.stvtmuebrleileobshin:YOUR_PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres`
