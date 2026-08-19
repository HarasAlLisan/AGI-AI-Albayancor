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
