#!/bin/sh
cd ~/AGI-AI-Albayancor
echo "============================================="
echo "  تشغيل كل الحور اللي فيها OS ALMAHDI 256"
echo "============================================="

echo "[+] OS-ALMAHDI-256/core.py"
python3 OS-ALMAHDI-256/core.py
echo ""

echo "[+] البحث التلقائي عن كل كور OS في المشروع..."
find . -type f -name "*.py" | xargs grep -l "OS_ALMAHDI_256\|OS Almahdi 256" 2>/dev/null | sort | while read core; do
  # استبعد الـ bak عشان مايكررش 200 مرة
  case "$core" in
    *".bak_616"*) continue ;;
  esac
  echo "--- $core ---"
  python3 "$core" 2>&1 | head -n 30
  echo ""
done

echo "[+] تم - 1024 = 7 | ولا عزاء لأي قانون غير موزون"
