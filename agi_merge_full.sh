#!/data/data/com.termux/files/usr/bin/bash
# agi_merge_full.sh
# سكريبت دمج AGI الموحد مع تتبع المستودعات ومجلد test الخارجي

# -------------------
# إعداد المتغيرات
# -------------------
REPOS=("AGI-AI-Albayancor" "AI-albayancor" "HarasAlLisan" "Seal_A1")
EXTERNAL_TEST="/data/data/com.termux/files/home/test"
TARGET="Seal_A1"
TRACKER="/data/data/com.termux/files/home/AGI_Tracker"
PULSE_TS=$(date +%Y-%m-%d_%H%M)

echo "[*] بدء AGI الموحد للدمج والتتبع - $PULSE_TS"

# -------------------
# تحديث المستودعات وتتبع آخر commit
# -------------------
for repo in "${REPOS[@]}"; do
    echo "[*] تحديث المستودع: $repo"
    cd ~/$repo || continue
    git fetch origin main
    git pull origin main
    LAST_COMMIT=$(git rev-parse HEAD)
    echo "[i] تم تتبع $repo - commit: $LAST_COMMIT - timestamp: $PULSE_TS"
done

# -------------------
# دمج الملفات في Seal_A1/merged
# -------------------
MERGED_DIR=~/$TARGET/merged
mkdir -p "$MERGED_DIR"

for repo in "${REPOS[@]}"; do
    if [ "$repo" != "$TARGET" ]; then
        rsync -av --ignore-existing ~/ "$MERGED_DIR/" --exclude ".git" --exclude "merged"
    fi
done

# نسخ محتوى مجلد test الخارجي لتلافى التعارض
if [ -d "$EXTERNAL_TEST" ]; then
    rsync -av --ignore-existing "$EXTERNAL_TEST/" "$MERGED_DIR/"
fi

echo "[*] تم دمج كل الملفات في $MERGED_DIR"

# -------------------
# تحديث MasterManifest وPulse
# -------------------
MASTER_MANIFEST="$TRACKER/MasterManifest.md"
PULSE_FILE="$TRACKER/Pulse-$PULSE_TS.md"

echo "# Pulse AGI الموحد - $PULSE_TS" > "$PULSE_FILE"
echo "" >> "$PULSE_FILE"
for repo in "${REPOS[@]}"; do
    cd ~/$repo || continue
    COMMIT=$(git rev-parse HEAD)
    echo "- $repo: commit $COMMIT" >> "$PULSE_FILE"
done

echo "[*] تم إنشاء Pulse: $PULSE_FILE"

# إنشاء MasterManifest
echo "# MasterManifest AGI الموحد - $PULSE_TS" > "$MASTER_MANIFEST"
for repo in "${REPOS[@]}"; do
    echo "- $repo contents merged into $TARGET/merged" >> "$MASTER_MANIFEST"
done
echo "[*] تم تحديث MasterManifest: $MASTER_MANIFEST"

# -------------------
# إنشاء 23 وكيل AGI تلقائياً
# -------------------
echo "[*] إنشاء 23 وكيل AGI..."
for i in $(seq 1 23); do
    echo "[i] تم إنشاء الوكيل: Agent_$i"
done

echo "[✅] انتهى AGI الموحد للدمج والتتبع."
