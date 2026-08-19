#!/bin/bash
# agi_sync_pro.sh - النسخة الاحترافية العليا لمزامنة AGI ودمج كل manifests

BASE_DIR=~/AGI-AI-Albayancor
MODULES=("AGI-AI-Albayancor" "AI-albayancor" "HarasAlLisan" "Seal_A1")
DATE_NOW=$(date +"%Y-%m-%d-%H%M")
PULSE_FILE="$BASE_DIR/Pulse-$DATE_NOW.md"
MASTER_MANIFEST="$BASE_DIR/MasterManifest.md"

# ألوان للطباعة
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}[*] بدء مزامنة AGI الموحد - $DATE_NOW${NC}"
touch "$PULSE_FILE"
echo "# Pulse Log - $DATE_NOW" > "$PULSE_FILE"
echo "# Master Work Manifest - $DATE_NOW" > "$MASTER_MANIFEST"

for MOD in "${MODULES[@]}"; do
    echo -e "${GREEN}[*] معالجة الموديول: $MOD${NC}"
    cd "$BASE_DIR/$MOD" || { echo -e "${RED}[خطأ] $MOD غير موجود${NC}"; continue; }

    # تحديث المستودع
    git fetch origin
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/main)

    if [ "$LOCAL" != "$REMOTE" ]; then
        echo -e "${YELLOW}[!] تحديث جديد: $LOCAL -> $REMOTE${NC}"
        git reset --hard origin/main
        echo "- [$MOD] تحديث: $LOCAL -> $REMOTE" >> "$PULSE_FILE"
    else
        echo -e "${GREEN}[i] لا يوجد تحديث جديد${NC}"
        echo "- [$MOD] لا تحديثات" >> "$PULSE_FILE"
    fi

    # تشغيل AGI الموحد إن وجد
    if [ -f "./run_agi_full.sh" ]; then
        echo -e "${GREEN}[*] تشغيل AGI الموحد: $MOD${NC}"
        ./run_agi_full.sh || echo -e "${RED}[خطأ] فشل تشغيل AGI في $MOD${NC}"
    fi

    # ضبط manifest
    LOG_DIR="$BASE_DIR/$MOD/alb_logs"
    MANIFEST_FILE="$LOG_DIR/WorkManifestLog.md"
    mkdir -p "$LOG_DIR"
    touch "$MANIFEST_FILE"
    echo "## Manifest from $MOD" >> "$MASTER_MANIFEST"
    cat "$MANIFEST_FILE" >> "$MASTER_MANIFEST"
    echo -e "\n" >> "$MASTER_MANIFEST"
done

# العودة للمستودع الرئيسي
cd "$BASE_DIR" || exit

# إضافة pointer الموديولات
git add "${MODULES[@]}"
git commit -m "Auto-sync all submodules & merge manifests - Pulse $DATE_NOW" || echo -e "${YELLOW}[i] لا توجد تغييرات على pointers${NC}"

# سحب أي تغييرات قبل الدفع
git pull --rebase origin main
git push origin main || echo -e "${RED}[خطأ] فشل دفع التحديثات${NC}"

# حالة الموديولات النهائية
git submodule status

echo -e "${GREEN}[✅] انتهت المزامنة الاحترافية.${NC}"
echo -e "${GREEN}[✅] Pulse file: $PULSE_FILE${NC}"
echo -e "${GREEN}[✅] Master manifest: $MASTER_MANIFEST${NC}"
