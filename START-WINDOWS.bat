@echo off
cd /d "%~dp0"
echo ==============================================
echo       DS BIMBEL V33 - SERVER
 echo ==============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js belum terpasang. Install Node.js 20+ terlebih dahulu.
  pause
  exit /b 1
)
cd server
if not exist node_modules (
  echo Menyiapkan dependency...
  npm install
)
echo.
echo Server akan menampilkan alamat yang bisa dibuka dari HP.
echo Pastikan HP dan laptop memakai Wi-Fi yang sama.
echo.
npm start
pause
