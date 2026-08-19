#!/bin/bash
# سكربت Termux لتشغيل AI albayancor Ultra-Live ثلاثي الوكلاء

# 1️⃣ تحديث النظام وتثبيت Python (إذا لم يكن مثبت)
echo "🟢 تحديث النظام وتثبيت Python إذا لزم الأمر..."
pkg update -y && pkg upgrade -y
pkg install -y python zip wget

# 2️⃣ إنشاء مجلد العمل
WORKDIR=$HOME/AI_albayancor_sim_UL
mkdir -p $WORKDIR
cd $WORKDIR

# 3️⃣ تنزيل النسخة ZIP
ZIP_URL="https://your-server.com/AI_albayancor_sim_UL_v1.0.zip"  # ضع رابط النسخة الخاصة بك هنا
echo "🟢 تنزيل النسخة Ultra-Live..."
wget -O AI_albayancor_sim_UL.zip $ZIP_URL

# 4️⃣ فك الضغط
echo "🟢 فك ضغط النسخة..."
unzip -o AI_albayancor_sim_UL.zip

# 5️⃣ الدخول إلى المجلد وتشغيل السكريبت
cd AI_albayancor_sim_UL
echo "🟢 تشغيل AI albayancor Ultra-Live..."
python ai_albayancor_live.py
