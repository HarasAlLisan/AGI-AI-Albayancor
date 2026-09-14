#!/bin/sh
while true; do
  clear
  echo "=== OS ALMAHDI 256 - التحديث الذاتي 1 ==="
  date
  python3 OS-ALMAHDI-256/core.py | head -n 20
  echo ""
  echo "[✓] AdamHash: 01f1096b..."
  echo "[✓] انتظار 13 ثانية"
  sleep 13
done
