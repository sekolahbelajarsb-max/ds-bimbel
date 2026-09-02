#!/bin/sh
cd "$(dirname "$0")/server" || exit 1
if ! command -v node >/dev/null 2>&1; then echo "Node.js 20+ belum terpasang."; exit 1; fi
[ -d node_modules ] || npm install
npm start
