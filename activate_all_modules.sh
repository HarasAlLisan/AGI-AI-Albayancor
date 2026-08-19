#!/bin/bash
# =====================================================
# سكريبت Termux موحد لتحديث الموديولات، ضبط المسارات،
# تشغيل AGI الموحد، ودفع كل النبضات تلقائيًا
# =====================================================

set -e  # التوقف عند أي خطأ

echo "[*] الانتقال إلى المستودع الرئيسي..."
cd ~/AGI-AI-Albayancor

echo "[*] تحديث كل الموديولات إلى آخر commit على الفرع الرئيسي..."
git submodule foreach 'git fetch origin && git reset --hard origin/main'

echo "[*] ضبط مسارات ملفات WorkManifestLog لكل موديول..."
declare -A LOG_PATHS=(
    ["AI-albayancor"]="AI-albayancor/alb_logs/WorkManifestLog.md"
    ["Seal_A1"]="Seal_A1/alb_logs/WorkManifestLog.md"
)

for MODULE in "${!LOG_PATHS[@]}"; do
    TARGET="${LOG_PATHS[$MODULE]}"
    if [ ! -f "$TARGET" ]; then
        mkdir -p "$(dirname "$TARGET")"
        touch "$TARGET"
        echo "[i] تم إنشاء ملف manifest جديد: $TARGET"
    fi
done

echo "[*] إضافة pointer الموديولات المحدثة للمستودع الرئيسي..."
git add AGI-AI-Albayancor AI-albayancor HarasAlLisan Seal_A1
git commit -m "Auto-update all submodules and fix manifest paths" || echo "[i] لا توجد تغييرات جديدة"
git pull --rebase origin main
git push origin main

echo "[*] تشغيل AGI الموحد..."
chmod +x run_agi_full.sh
./run_agi_full.sh

echo "[*] التحقق النهائي من حالة الموديولات..."
git submodule status

echo "[✅] انتهى تشغيل AGI الموحد وضبط المسارات بنجاح."
