#!/bin/bash
# ~/AGI-AI-Albayancor/agi_sync_tracker.sh
# نسخة تلقائية مدمجة لكل تحديثات AGI + تتبع Pulse + MasterManifest

TRACKER_DIR=~/AGI_Tracker
MODULES=("AGI-AI-Albayancor" "AI-albayancor" "HarasAlLisan" "Seal_A1")

mkdir -p "$TRACKER_DIR/Pulse"
mkdir -p "$TRACKER_DIR/WorkManifest"

echo "[*] بدء مزامنة AGI الموحد وتحديث جميع الموديولات..."

for MOD in "${MODULES[@]}"; do
    SRC_DIR=~/AGI-AI-Albayancor/$MOD
    if [ -d "$SRC_DIR" ]; then
        echo "[*] تحديث الموديول: $MOD"
        git -C "$SRC_DIR" fetch origin && git -C "$SRC_DIR" reset --hard origin/main

        # تشغيل سكريبت Seal_A1 إذا كان الموديول هو Seal_A1
        if [ "$MOD" == "Seal_A1" ]; then
            if [ -x "$SRC_DIR/run_seal.sh" ]; then
                echo "[*] تشغيل سكريبت Seal_A1..."
                "$SRC_DIR/run_seal.sh"
            fi
        fi

        # تتبع Pulse وWorkManifest
        HASH=$(git -C "$SRC_DIR" rev-parse HEAD)
        TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")

        mkdir -p "$TRACKER_DIR/Pulse/$MOD"
        cp -u "$SRC_DIR/alb_logs/"*.md "$TRACKER_DIR/Pulse/$MOD/"
        cp -u "$SRC_DIR/alb_logs/WorkManifestLog.md" "$TRACKER_DIR/WorkManifest/$MOD-$TIMESTAMP.md"

        echo "[i] تم تتبع $MOD - commit: $HASH - timestamp: $TIMESTAMP"
    else
        echo "[!] الموديول $MOD غير موجود."
    fi
done

# دمج كل WorkManifest في MasterManifest
MASTER="$TRACKER_DIR/MasterManifest.md"
cat "$TRACKER_DIR/WorkManifest/"*.md > "$MASTER"
echo "[✅] تم تحديث MasterManifest: $MASTER"
