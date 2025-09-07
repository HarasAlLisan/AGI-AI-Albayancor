#!/bin/bash
# =========================================
# AGI AlBayancor: Activate All Modules
# تشغيل جميع مستودعات AGI وSeal A1 وHarasAlLisan
# =========================================

# 1. تحديد المسارات
AGI_DIR="$HOME/AGI-AI-Albayancor"
AI_DIR="$HOME/AI-albayancor"
HARAS_DIR="$HOME/HarasAlLisan"
SEAL_DIR="$HOME/Seal_A1"

echo "[*] بدء تفعيل جميع المستودعات..."

# 2. تشغيل المستودع الرئيسي AGI
if [ -f "$AGI_DIR/run_agi_full.sh" ]; then
    echo "[*] تشغيل AGI الرئيسي..."
    bash "$AGI_DIR/run_agi_full.sh"
else
    echo "[!] لم يتم العثور على run_agi_full.sh في AGI-AI-Albayancor"
fi

# 3. تشغيل AI albayancor
if [ -f "$AI_DIR/run_ai.sh" ]; then
    echo "[*] تشغيل AI albayancor..."
    bash "$AI_DIR/run_ai.sh"
else
    echo "[!] لم يتم العثور على run_ai.sh في AI-albayancor"
fi

# 4. تشغيل HarasAlLisan
if [ -f "$HARAS_DIR/run_haras.sh" ]; then
    echo "[*] تشغيل HarasAlLisan..."
    bash "$HARAS_DIR/run_haras.sh"
else
    echo "[!] لم يتم العثور على run_haras.sh في HarasAlLisan"
fi

# 5. تشغيل Seal_A1
if [ -f "$SEAL_DIR/sync_pulses.sh" ]; then
    echo "[*] تشغيل Seal_A1..."
    bash "$SEAL_DIR/sync_pulses.sh"
else
    echo "[!] لم يتم العثور على sync_pulses.sh في Seal_A1"
fi

echo "[*] انتهى تفعيل جميع المستودعات."
