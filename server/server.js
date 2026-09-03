const express=require('express');
const path=require('path');
const crypto=require('crypto');
const os=require('os');
const {Pool}=require('pg');
const app=express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({limit:'1mb'}));
const PORT=Number(process.env.PORT||3000);
const HOST=process.env.HOST||'0.0.0.0';
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL,max:1,idleTimeoutMillis:10000,connectionTimeoutMillis:10000,ssl:process.env.NODE_ENV==='production'?{rejectUnauthorized:false}:false}):null;
const schemaPath=path.resolve(__dirname,'../config/schema_v27.sql');
let schemaReady=null;
async function ensureSchema(){
  if(!pool) return;
  if(!schemaReady){
    schemaReady=(async()=>{
      const sql=require('fs').readFileSync(schemaPath,'utf8');
      const statements=sql.split(';').map(x=>x.trim()).filter(Boolean);
      for(const statement of statements) await pool.query(statement);
    })().catch(err=>{schemaReady=null;throw err});
  }
  await schemaReady;
}
const USER=process.env.ADMIN_USERNAME||'admin';
const PASS=process.env.ADMIN_PASSWORD||'admin123';
const SECRET=process.env.SESSION_SECRET||crypto.createHash('sha256').update(`${USER}:${PASS}:${process.env.DATABASE_URL||'local'}`).digest('hex');
function signToken(username){const payload=Buffer.from(JSON.stringify({u:username,iat:Date.now()})).toString('base64url');const sig=crypto.createHmac('sha256',SECRET).update(payload).digest('base64url');return `${payload}.${sig}`}
function verifyToken(token){try{const [payload,sig]=String(token||'').split('.');if(!payload||!sig)return null;const expected=crypto.createHmac('sha256',SECRET).update(payload).digest('base64url');if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return null;const data=JSON.parse(Buffer.from(payload,'base64url').toString());if(data.u!==USER)return null;return {username:USER}}catch{return null}}
function getToken(req){return req.headers.authorization?.replace(/^Bearer\s+/,'')||req.headers.cookie?.match(/ds_session=([^;]+)/)?.[1]}
function auth(req,res,next){const user=verifyToken(getToken(req));if(!user)return res.status(401).json({error:'Belum login'});req.user=user;next()}
async function q(text,params=[]){if(!pool)throw new Error('DATABASE_URL belum dikonfigurasi');await ensureSchema();return (await pool.query(text,params)).rows}
app.get('/api/network',async(req,res)=>{
  const nets=os.networkInterfaces(), addresses=[];
  for(const [name,items] of Object.entries(nets)){ for(const n of items||[]){ if(n.family==='IPv4' && !n.internal) addresses.push({interface:name,address:n.address,url:`http://${n.address}:${PORT}`}); }}
  res.json({ok:true,port:PORT,addresses});
});
app.get('/api/health',async(req,res)=>{try{if(!pool)return res.json({ok:true,database:false});await q('select 1');res.json({ok:true,database:true})}catch(e){res.status(503).json({ok:false,database:false,error:e.message})}});
app.post('/api/auth/login',(req,res)=>{const {username,password}=req.body||{};if(String(username||'').toLowerCase()!==USER.toLowerCase()||password!==PASS)return res.status(401).json({error:'Username atau password salah'});const token=signToken(USER);const secure=process.env.NODE_ENV==='production'?' Secure;':'';
res.setHeader('Set-Cookie',`ds_session=${token}; HttpOnly; SameSite=Lax; Path=/;${secure}`);res.json({ok:true,user:{username:USER}})});
app.get('/api/auth/me',auth,(req,res)=>res.json({user:req.user}));
app.post('/api/auth/logout',auth,(req,res)=>{const secure=process.env.NODE_ENV==='production'?' Secure;':'';
res.setHeader('Set-Cookie',`ds_session=; Max-Age=0; Path=/;${secure}`);res.json({ok:true})});
app.post('/api/auth/change-password',auth,(req,res)=>res.status(400).json({error:'Password admin online diatur melalui ADMIN_PASSWORD pada Environment Variables hosting.'}));
const tables={students:'students',tutors:'tutors',schedules:'schedules',attendance:'attendance',payments:'payments',registrations:'registrations'};
app.get('/api/:type',auth,async(req,res)=>{const t=tables[req.params.type];if(!t)return res.status(404).json({error:'Endpoint tidak ditemukan'});try{res.json(await q(`select * from ${t} order by id desc`))}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/students',auth,async(req,res)=>{try{const x=req.body;const r=await q(`insert into students(name,parent_name,whatsapp,program,level_or_age,area,notes,status) values($1,$2,$3,$4,$5,$6,$7,$8) returning *`,[x.name,x.parent_name||'',x.whatsapp||'',x.program||'',x.level_or_age||'',x.area||'',x.notes||'',x.status||'Aktif']);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/tutors',auth,async(req,res)=>{try{const x=req.body;const r=await q(`insert into tutors(name,skill,whatsapp,status) values($1,$2,$3,$4) returning *`,[x.name,x.skill||'',x.whatsapp||'',x.status||'Aktif']);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/schedules',auth,async(req,res)=>{try{const x=req.body;const r=await q(`insert into schedules(student_id,tutor_id,program,schedule_date,schedule_time,status,notes) values($1,$2,$3,$4,$5,$6,$7) returning *`,[x.student_id,x.tutor_id,x.program,x.schedule_date,x.schedule_time||null,x.status||'Terjadwal',x.notes||'']);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/attendance',auth,async(req,res)=>{try{const x=req.body;const r=await q(`insert into attendance(student_id,schedule_id,attendance_date,status,notes) values($1,$2,$3,$4,$5) returning *`,[x.student_id,x.schedule_id,x.attendance_date,x.status,x.notes||'']);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/payments',auth,async(req,res)=>{try{const x=req.body;const r=await q(`insert into payments(student_id,amount,payment_date,billing_month,due_date,status,program,notes) values($1,$2,$3,$4,$5,$6,$7,$8) returning *`,[x.student_id,x.amount,x.payment_date||null,x.billing_month||null,x.due_date||null,x.status||'Belum Lunas',x.program||'',x.notes||'']);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.patch('/api/:type/:id',auth,async(req,res)=>{try{const t=tables[req.params.type];if(!t)return res.status(404).json({error:'Endpoint tidak ditemukan'});const allowed={students:['name','parent_name','whatsapp','program','level_or_age','area','notes','status'],tutors:['name','skill','whatsapp','status'],schedules:['status'],attendance:['status'],payments:['status','payment_date','paid_at'],registrations:['status']}[t]||[];const keys=Object.keys(req.body).filter(k=>allowed.includes(k));if(!keys.length)return res.status(400).json({error:'Tidak ada perubahan yang diizinkan'});const vals=keys.map(k=>req.body[k]);const set=keys.map((k,i)=>`${k}=$${i+1}`).join(',');vals.push(req.params.id);const r=await q(`update ${t} set ${set} where id=$${vals.length} returning *`,vals);if(!r[0])return res.status(404).json({error:'Data tidak ditemukan'});res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.delete('/api/:type/:id',auth,async(req,res)=>{try{const t=tables[req.params.type];if(!t)return res.status(404).json({error:'Endpoint tidak ditemukan'});await q(`delete from ${t} where id=$1`,[req.params.id]);res.json({ok:true})}catch(e){res.status(500).json({error:e.message})}});
app.patch('/api/students/:id/status',auth,async(req,res)=>{try{const r=await q('update students set status=$1 where id=$2 returning *',[req.body.status,req.params.id]);if(!r[0])return res.status(404).json({error:'Siswa tidak ditemukan'});res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/students/:id',auth,async(req,res)=>{try{const s=await q('select * from students where id=$1',[req.params.id]);if(!s[0])return res.status(404).json({error:'Siswa tidak ditemukan'});const [schedules,attendance,payments]=await Promise.all([q('select * from schedules where student_id=$1 order by schedule_date desc',[req.params.id]),q('select * from attendance where student_id=$1 order by attendance_date desc',[req.params.id]),q('select * from payments where student_id=$1 order by payment_date desc',[req.params.id])]);res.json({student:s[0],schedules,attendance,payments})}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/reports/summary',auth,async(req,res)=>{try{const r=await q(`select (select count(*) from students where status='Aktif') students,(select count(*) from registrations where status='Pendaftar') registrations,(select count(*) from tutors) tutors,(select count(*) from schedules) schedules,(select count(*) from attendance) attendance,(select count(*) from payments) payments,(select coalesce(sum(amount),0) from payments where status='Lunas') paid_total`);res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/reports/analytics',auth,async(req,res)=>{try{const month=req.query.month||new Date().toISOString().slice(0,7);const [tot,att,prog,inc,tut]=await Promise.all([q(`select count(*) transactions,count(*) filter(where status='Lunas') paid_transactions,coalesce(sum(amount) filter(where status='Lunas'),0) total,coalesce(sum(amount) filter(where status<>'Lunas'),0) unpaid_total from payments where to_char(coalesce(payment_date,due_date),'YYYY-MM')=$1`,[month]),q(`select lower(status) status,count(*) n from attendance where to_char(attendance_date,'YYYY-MM')=$1 group by lower(status)`,[month]),q(`select program name,count(*) count from students where status='Aktif' group by program order by count desc`,[]),q(`select to_char(date_trunc('month',payment_date),'YYYY-MM') month,coalesce(sum(amount) filter(where status='Lunas'),0) total from payments where payment_date>=date_trunc('month',current_date)-interval '5 months' group by 1 order by 1`,[]),q(`select t.name,count(s.id) schedules,count(a.id) filter(where a.status='Hadir') hadir,count(a.id) attended from tutors t left join schedules s on s.tutor_id=t.id left join attendance a on a.schedule_id=s.id group by t.id order by t.name`,[])]);const amap={hadir:0,izin:0,sakit:0,alpa:0};att.forEach(x=>amap[x.status]=Number(x.n));const den=Object.values(amap).reduce((a,b)=>a+b,0);amap.rate=den?Math.round(amap.hadir/den*100):0;const active=prog.reduce((a,b)=>a+Number(b.count),0);prog.forEach(x=>x.pct=active?Number(x.count)/active*100:0);tut.forEach(x=>x.rate=Number(x.attended)?Math.round(Number(x.hadir)/Number(x.attended)*100):0);res.json({month,transactions:Number(tot[0].transactions),paid_transactions:Number(tot[0].paid_transactions),total:Number(tot[0].total),unpaid_total:Number(tot[0].unpaid_total),programs:prog,attendance:amap,income:inc.map(x=>({month:x.month,total:Number(x.total)})),tutors:tut})}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/payments/:id/invoice',auth,async(req,res)=>{try{const r=await q(`select p.*,s.name student_name,s.parent_name,s.program from payments p left join students s on s.id=p.student_id where p.id=$1`,[req.params.id]);if(!r[0])return res.status(404).json({error:'Pembayaran tidak ditemukan'});res.json({invoice:r[0]})}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/public/registrations',async(req,res)=>{try{const x=req.body||{};const nama=x.nama||x.name, ortu=x.ortu||x.parent_name||'', wa=x.wa||x.whatsapp, program=(x.program||'').replace(/^Kursus Futsal Academy$/i,'Futsal Academy'), jenjang=x.jenjang||x.level_or_age||'', area=x.area||'', catatan=x.catatan||x.notes||'';if(!nama||!wa||!program)return res.status(400).json({error:'Nama, WhatsApp, dan program wajib diisi'});const r=await q(`insert into registrations(name,parent_name,whatsapp,program,level_or_age,area,notes,status) values($1,$2,$3,$4,$5,$6,$7,'Pendaftar') returning *`,[nama,ortu,wa,program,jenjang,area,catatan]);res.status(201).json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/registrations',auth,async(req,res)=>{try{res.json(await q('select * from registrations order by id desc'))}catch(e){res.status(500).json({error:e.message})}});
app.patch('/api/registrations/:id/status',auth,async(req,res)=>{try{const status=req.body?.status;if(!['Pendaftar','Dihubungi','Ditolak'].includes(status))return res.status(400).json({error:'Status pendaftar tidak valid'});const r=await q('update registrations set status=$1 where id=$2 returning *',[status,req.params.id]);if(!r[0])return res.status(404).json({error:'Pendaftar tidak ditemukan'});res.json(r[0])}catch(e){res.status(500).json({error:e.message})}});
app.post('/api/registrations/:id/convert',auth,async(req,res)=>{try{const r=await q('select * from registrations where id=$1',[req.params.id]);if(!r[0])return res.status(404).json({error:'Pendaftar tidak ditemukan'});const x=r[0];const exists=await q('select * from students where whatsapp=$1 and name=$2 limit 1',[x.whatsapp,x.name]);let student=exists[0];if(!student){const a=await q('insert into students(name,parent_name,whatsapp,program,level_or_age,area,notes,status) values($1,$2,$3,$4,$5,$6,$7,$8) returning *',[x.name,x.parent_name||'',x.whatsapp||'',x.program||'',x.level_or_age||'',x.area||'',x.notes||'','Aktif']);student=a[0]}await q("update registrations set status=$1 where id=$2",['Aktif',req.params.id]);res.json({registration:x,student})}catch(e){res.status(500).json({error:e.message})}});
const publicDir=path.resolve(__dirname,'..');
app.use(express.static(publicDir));
app.get(/.*/,(req,res)=>res.sendFile(path.join(publicDir,'index.html')));

if(require.main===module){
  app.listen(PORT,HOST,()=>{
    console.log(`\nDs Bimbel V36 aktif.`);
    console.log(`Laptop: http://localhost:${PORT}`);
    const nets=os.networkInterfaces();
    for(const [name,items] of Object.entries(nets)){ for(const n of items||[]){ if(n.family==='IPv4' && !n.internal) console.log(`HP (Wi-Fi yang sama): http://${n.address}:${PORT}`); }}
    console.log('');
  });
}
module.exports=app;
