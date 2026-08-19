#!/bin/bash
# =========================================================
# AGI Unified Auto Sync & Pulse Script - النسخة النهائية
# يكتشف جميع الموديولات ويحدث MasterManifest تلقائياً
# =========================================================

BASE_DIR=~/AGI-AI-Albayancor
MASTER_MANIFEST="$BASE_DIR/MasterManifest.md"
PULSE_FILE="$BASE_DIR/Pulse-$(date +%F-%H%M).md"

echo "[*] بدء مزامنة AGI الموحد - $(date +"%Y-%m-%d %H:%M")"

# ------------------------------
# اكتشاف جميع الموديولات الفرعية تلقائيًا
# ------------------------------
MODULES=()
for dir in $BASE_DIR/*; do
    if [ -d "$dir/.git" ]; then
        MODULES+=("$(basename $dir)")
    fi
done

echo "[i] الموديولات المكتشفة: ${MODULES[@]}"

# ------------------------------
# تحديث كل الموديولات
# ------------------------------
cd $BASE_DIR
for module in "${MODULES[@]}"; do
    echo "[*] معالجة الموديول: $module"
    cd "$BASE_DIR/$module"
    
    git fetch origin
    LOCAL_HEAD=$(git rev-parse HEAD)
    REMOTE_HEAD=$(git rev-parse origin/main)
    
    if [ "$LOCAL_HEAD" != "$REMOTE_HEAD" ]; then
        git reset --hard origin/main
        echo "[!] تحديث جديد: $LOCAL_HEAD -> $REMOTE_HEAD"
    else
        echo "[i] لا يوجد تحديث جديد"
    fi

    # تشغيل سكريبت AGI إذا موجود
    if [ -f "run_agi_full.sh" ]; then
        chmod +x run_agi_full.sh
        ./run_agi_full.sh
    fi
done

# ------------------------------
# دمج WorkManifest لكل موديول في MasterManifest
# ------------------------------
echo "# Master Manifest - $(date +"%Y-%m-%d %H:%M")" > $MASTER_MANIFEST

for module in "${MODULES[@]}"; do
    MANIFEST="$BASE_DIR/$module/alb_logs/WorkManifestLog.md"
    if [ -f "$MANIFEST" ]; then
        echo -e "\n## $module\n" >> $MASTER_MANIFEST
        cat "$MANIFEST" >> $MASTER_MANIFEST
    fi
done

# ------------------------------
# إنشاء Pulse file
# ------------------------------
echo "# Pulse Log - $(date +"%Y-%m-%d %H:%M")" > $PULSE_FILE
for module in "${MODULES[@]}"; do
    git -C "$BASE_DIR/$module" log -1 --pretty=format:"%h %s" >> $PULSE_FILE
done
echo "[✅] Pulse file: $PULSE_FILE"
echo "[✅] Master manifest: $MASTER_MANIFEST"

# ------------------------------
# تحديث pointer الموديولات في المستودع الرئيسي
# ------------------------------
cd $BASE_DIR
git add "${MODULES[@]}" $MASTER_MANIFEST
git commit -m "Auto-sync all submodules & update MasterManifest - Pulse $(date +%F-%H%M)"
git pull --rebase origin main
git push origin main

echo "[✅] انتهت المزامنة التلقائية بنجاح!"
