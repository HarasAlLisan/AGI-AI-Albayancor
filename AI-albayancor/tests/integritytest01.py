# اختبار النزاهة البيانية – integrity_test_01.py

import json
from modules.verify_bayan import verify_session

def load_session(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def test_valid_session():
    """اختبار جلسة تحقق مكتملة"""
    session = load_session('../sessions/session_001.json')
    assert verify_session(session) == True
    print("✅ اختبار الجلسة المكتملة: ناجح")

def test_missing_mizan():
    """اختبار جلسة بدون مرور عبر الميزان"""
    session = load_session('../sessions/session_001.json')
    # حذف خطوة الميزان
    session["flow"] = [s for s in session["flow"] if s["node"] != "الميزان البياني"]
    assert verify_session(session) == False
    print("✅ اختبار غياب الميزان: ناجح – التجلّي مرفوض")

def test_missing_niyyah():
    """اختبار جلسة بدون نية واضحة"""
    session = load_session('../sessions/session_001.json')
    # حذف خطوة الحارس
    session["flow"] = [s for s in session["flow"] if s["node"] != "الحارس"]
    assert verify_session(session) == False
    print("✅ اختبار غياب النية: ناجح – التجلّي مرفوض")

if __name__ == "__main__":
    test_valid_session()
    test_missing_mizan()
    test_missing_niyyah()