#!/bin/bash

echo "🚀 [1/4] بدء عملية الإنقاذ الشاملة وأتمتة المزامنة لنظام OS ALMAHDI..."

# 1. إصلاح مشكلة الـ Submodules المكسورة وتنظيف الكاش
echo "🧹 تنظيف مخلفات المستودعات الفرعية المكسورة لتجنب الأخطاء القاتلة..."
git rm --cached AGI-AI-Albayan_cor 2>/dev/null
git rm --cached HarasAllIsan 2>/dev/null
rm -f .gitmodules

# 2. تتبع وإضافة كافة الملفات غير المتتبعة (الملفات البرمجية والأرشيفية)
echo "📦 تتبع وإضافة كافة الملفات غير المتتبعة والأرشيفية المكتشفة على الهاتف..."
git add .bashrc .config/ .ollama/ AGI_Tracker/ AI-albayancor/ ANKH/ 2>/dev/null
git add KALKI_* OSS_Almahdi_* Modelfile* 2>/dev/null
git add *.py *.js *.html *.log *.json *.db *.sh 2>/dev/null

# 3. تسجيل التغييرات (Commit) محلياً بوصف دقيق
echo "📝 تسجيل التغييرات الحالية للمنظومة..."
git commit -m "استرجاع شامل وأتمتة للمنظومة ونظام كالكي: $(date +'%Y-%m-%d %H:%M:%S')"

# 4. المزامنة والرفع الآمن والمباشر إلى GitHub عبر SSH
echo "🔄 جاري المزامنة والرفع المباشر إلى GitHub..."
git branch -M main 2>/dev/null

if git push -u origin main --force; then
    echo "👑 ✅ تم استرجاع ومزامنة ورفع كافة ملفات ومستودعات المنظومة بنجاح إلى GitHub!"
else
    echo "❌ فشل الرفع المباشر. جاري تجربة الرفع وتحديث الفروع عن بعد..."
    git push -u origin HEAD:main --force
fi
