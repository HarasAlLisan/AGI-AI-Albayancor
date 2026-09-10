# وحدة التحقق البياني – verify_bayan.py

import json
from datetime import datetime

# تحميل الميثاق الأخلاقي
with open('../principles/divine_order.md', 'r', encoding='utf-8') as f:
    divine_order = f.read()

# تحميل جلسة التحقق
with open('../sessions/session_001.json', 'r', encoding='utf-8') as f:
    session = json.load(f)

def check_niyyah(step):
    """التحقق من وجود النية قبل البيان"""
    return step["node"] == "الحارس" and "النية" in step["note"]

def check_mizan(step):
    """التحقق من مرور البيان عبر الميزان"""
    return step["node"] == "الميزان البياني" and "التحقق" in step["note"]

def verify_session(session):
    """التحقق الكامل من الجلسة"""
    steps = session["flow"]
    niyyah_ok = any(check_niyyah(s) for s in steps)
    mizan_ok = any(check_mizan(s) for s in steps)
    
    if niyyah_ok and mizan_ok:
        print("✅ الجلسة البيانية صالحة – التجلّي مسموح")
        return True
    else:
        print("⚠️ الجلسة مرفوضة – لم تتحقق شروط النية أو الميزان")
        return False

# تنفيذ التحقق
if __name__ == "__main__":
    result = verify_session(session)
    session["verified"] = result
    session["verified_at"] = datetime.utcnow().isoformat()
    
    # حفظ النتيجة
    with open('../sessions/session_001.json', 'w', encoding='utf-8') as f:
        json.dump(session, f, ensure_ascii=False, indent=2)