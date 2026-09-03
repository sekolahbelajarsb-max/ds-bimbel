const fs=require('fs');
const path=require('path');
const {Pool}=require('pg');
if(!process.env.DATABASE_URL){console.log('DATABASE_URL belum diatur; melewati init database.');process.exit(0)}
const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1,connectionTimeoutMillis:10000,ssl:process.env.NODE_ENV==='production'?{rejectUnauthorized:false}:false});
(async()=>{try{const sql=fs.readFileSync(path.resolve(__dirname,'../config/schema_v27.sql'),'utf8');const statements=sql.split(';').map(x=>x.trim()).filter(Boolean);for(const statement of statements) await pool.query(statement);console.log(`Database schema Ds Bimbel siap (${statements.length} perintah).`)}catch(e){console.error('Gagal menyiapkan database:',e.message);process.exitCode=1}finally{await pool.end()}})();
