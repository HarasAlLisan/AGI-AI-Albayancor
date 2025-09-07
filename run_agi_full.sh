#!/data/data/com.termux/files/usr/bin/bash

# ==============================
# سكريبت تشغيل AGI الموحد
# ==============================

# ------------------------------
# مسارات المستودعات
# ------------------------------
AGI_DIR="$HOME/AGI-AI-Albayancor"
HARAS_DIR="$HOME/HarasAlLisan"
SEAL_DIR="$HOME/Seal_A1"

# ------------------------------
# دوال مساعدة
# ------------------------------

function check_dir {
    if [ ! -d "$1" ]; then
        echo "[!] المستودع $1 غير موجود!"
        exit 1
    fi
}

function make_executable {
    for script in "$1"/*.sh; do
        [ -f "$script" ] && chmod +x "$script"
    done
}

function git_pull {
    echo "[*] تحديث المستودع: $1"
    cd "$1" || exit
    git pull origin main
}

# ------------------------------
# التحقق من المستودعات
# ------------------------------
check_dir "$AGI_DIR"
check_dir "$HARAS_DIR"
check_dir "$SEAL_DIR"

# ------------------------------
# تحديث المستودعات
# ------------------------------
git_pull "$AGI_DIR"
git_pull "$HARAS_DIR"
git_pull "$SEAL_DIR"

# ------------------------------
# جعل السكريبتات قابلة للتنفيذ
# ------------------------------
make_executable "$SEAL_DIR"

# ------------------------------
# تشغيل سكريبتات Seal_A1 بالترتيب
# ------------------------------
echo "[*] تشغيل سكريبتات Seal_A1..."
cd "$SEAL_DIR" || exit

./deploy_log.sh
./sync_exploitation.sh
./sync_pulses.sh

# ------------------------------
# إشعار انتهاء التشغيل
# ------------------------------
echo "[*] انتهى تشغيل AGI الموحد."
