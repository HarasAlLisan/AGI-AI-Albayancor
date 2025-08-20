chmod +x push_docs.sh
./push_docs.sh
chmod +x push_docs.sh
./push_docs.sh
#!/bin/bash

echo "🚀 بدء رفع ملفات التوثيق إلى GitHub باستخدام Token مدمج..."

# التأكد من وجود git
if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت. نفذ: pkg install git"
    exit 1
fi

# إعداد Git
git config --global user.name "HarasAlLisan"
git config --global user.email "you@example.com"

# استنساخ المستودع إن لم يكن موجودًا
if [ ! -d "HarasAlLisan" ]; then
    echo "🔄 جاري استنساخ المستودع من GitHub..."
    git clone https://HarasAlLisan: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@github.com/HarasAlLisan/HarasAlLisan.git
fi

cd HarasAlLisan

# التحقق من وجود ملفات التوثيق
if [ ! -d "../HarasAlLisanDocs" ]; then
    echo "⚠️ لم يتم العثور على مجلد HarasAlLisanDocs في المسار الأعلى."
    exit 1
fi

echo "📁 نسخ الملفات..."
cp -r ../HarasAlLisanDocs/* .

# رفع التعديلات
git add .
git commit -m "📘 رفع ملفات التوثيق تلقائيًا"
git push

echo "✅ تم رفع الملفات بنجاح!"
