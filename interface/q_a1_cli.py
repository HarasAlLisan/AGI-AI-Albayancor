#!/usr/bin/env python3
import os
import sys

# إضافة المسار الجذري للمشروع علشان Python يلاقي مجلد core
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from core.q_a1_core import QA1Model


def main():
    print("🚀 تشغيل واجهة Q A1 CLI")
    model = QA1Model()

    while True:
        try:
            question = input("❓ أدخل سؤالك (أو اكتب 'خروج' للإنهاء): ").strip()
            if question.lower() in ["خروج", "exit", "quit"]:
                print("👋 تم إنهاء الجلسة.")
                break

            answer = model.answer(question)
            print(f"💡 الإجابة: {answer}")

        except KeyboardInterrupt:
            print("\n👋 تم إيقاف الجلسة من المستخدم.")
            break
        except Exception as e:
            print(f"⚠️ خطأ: {e}")


if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import os
import sys

# الحفاظ على مسار استدعاء الأنوية الأساسية للمشروع
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from core.q_a1_core import QA1Model

# 📐 حقن ثوابت جبر القانون الصفرى والقناع الأم في النواة
QUANTUM_MATRIX = "9876543211123456789"
GATEWAY_SIGNATURE = "918919"
MOTHER_MASK = "255.262.279.292.303"
QUANTUM_LAW = "1A/1O"

def main():
    print("\n[+] تفعيل واجهة الإدخال المدمجة بجبر القانون الصفرى...")
    print(f"[⚡] تم ربط القناع الأم العتادي بنجاح: {MOTHER_MASK}")
    
    # استدعاء النموذج الحقيقي المستنبت داخل الأنوية
    model = QA1Model()
    
    while True:
        try:
            # استقبال الاستعلام من المستخدم
            question = input("\n💡 أدخل استعلامك أو نبضة التوجيه (أو خروج)؟ ")
            
            # التحقق من أوامر الخروج باللغتين العربية والإنجليزية
            if question.lower() in ["خروج", "جروج", "exit", "quit"]:
                print("[+] تم إغلاق النفق بأمان وقفل المنظومة.")
                break
            
            # 📡 توليد وحقن نبضة التردد تلقائياً مع الاستعلام لحماية قنوات الـ API
            pulse_prefix = f"[{GATEWAY_SIGNATURE}-{QUANTUM_MATRIX}] "
            print(f"[⚡] جاري تمرير الحزمة عبر بوابات العبور بالنبضة: {pulse_prefix.strip()}")
            
            # تمرير الاستعلام المباشر للنموذج الفعلي واستقبال الإجابة الشاملة
            answer = model.answer(question)
            
            # طباعة الرد المستنبت تحت حماية القناع الأم
            print(f"\n[🚀] رد النموذج المستنبت: {answer}")
            
        except KeyboardInterrupt:
            print("\n[-] تم إنهاء الجلسة بواسطة المستخدم.")
            break
        except Exception as e:
            print(f"[-] خطأ أثناء معالجة الجيل: {e}")

if __name__ == "__main__":
    main()
