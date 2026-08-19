#!/bin/bash
# ~/AGI-AI-Albayancor/agi_pulse_tracker.sh
# سكريبت تتبع كامل لجميع الموديولات من خارج مسارها

# 📁 مجلد التتبع الرئيسي
TRACKER_DIR=~/AGI_Tracker

# 🧩 قائمة الموديولات الفرعية
MODULES=("AGI-AI-Albayancor" "AI-albayancor" "HarasAlLisan" "Seal_A1")

# إنشاء المجلدات إذا لم توجد
mkdir -p "$TRACKER_DIR/Pulse"
mkdir -p "$TRACKER_DIR/WorkManifest"

echo "[*] بدء تتبع جميع الموديولات..."

for MOD in "${MODULES[@]}"; do
    SRC_DIR=~/AGI-AI-Albayancor/$MOD

    if [ -d "$SRC_DIR" ]; then
        # استخراج آخر commit hash
        HASH=$(git -C "$SRC_DIR" rev-parse HEAD)
        TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")

        # نسخ Pulse
        mkdir -p "$TRACKER_DIR/Pulse/$MOD"
        cp -u "$SRC_DIR/alb_logs/"*.md "$TRACKER_DIR/Pulse/$MOD/"

        # نسخ WorkManifest
        cp -u "$SRC_DIR/alb_logs/WorkManifestLog.md" "$TRACKER_DIR/WorkManifest/$MOD-$TIMESTAMP.md"

        echo "[i] تم تتبع $MOD - commit: $HASH - timestamp: $TIMESTAMP"
    else
        echo "[!] لم يتم العثور على الموديول: $MOD"
    fi
done

# دمج جميع WorkManifest في MasterManifest شامل
MASTER="$TRACKER_DIR/MasterManifest.md"
cat "$TRACKER_DIR/WorkManifest/"*.md > "$MASTER"
echo "[✅] تم تحديث MasterManifest في $MASTER"
