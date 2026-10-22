import subprocess
import json

def ar(text):
    """دالة برمجية ذاتية لعكس النص العربي يدوياً ليتناسب مع شاشة Termux المقلوبة"""
    # نقوم بعكس النص من النهاية للبداية ليظهر بالاتجاه الصحيح للمحطة
    return text[::-1]

def get_phone_battery():
    try:
        result = subprocess.check_output(["termux-battery-status"]).decode("utf-8")
        data = json.loads(result)
        # كتابة النص بشكل مقلوب عمداً ليظهر مع دالة العكس بشكل صحيح ومقروء
        msg = f"نسبة البطارية الحالية في عتادك هي {data['percentage']}% وحالتها الصحية {data['health']}."
        return ar(msg)
    except Exception as e:
        return ar(".داتعلاب لاصتلاا لشف")

def vibrate_phone(duration_ms=800):
    try:
        subprocess.run(["termux-vibrate", "-d", str(duration_ms)])
        return ar(".حاجنب فتاهلا في جازتها الحركي موديول تفعيل تم")
    except:
        return ar(".فتاهلا هز عن العتاد عجز")

# --- واجهة العرض المصححة ذاتياً ---
print(ar("--- بايثون يرحب بك في مختبر العتاد الذكي ---"))
user_command = input(ar("اكتب أمرك البشري هنا (مثال: نبهني أو جهازي): "))

print(ar("...ةينلا مفهو صنلا كيكفت جاري :[لآلا لقع ليلحت]"))

# الكود سيقرأ مدخلاتك الحقيقية بشكل سليم تماماً
if any(word in user_command for word in ["تعبان", "نعسان", "نبهني", "فوقني", "اهتز"]):
    print(ar("...داتعلا ليعفت .يكرح هيبنتل تاحاج المخدم نية :[يمقرلا رارقلا]"))
    print(vibrate_phone(1200))

elif any(word in user_command for word in ["جهازي", "البطارية", "الشحن", "الوضع"]):
    print(ar("...يقيقحلا داتعلا ريرقت جراختسا :[يمقرلا رارقلا]"))
    print(get_phone_battery())

else:
    print(ar(".حضأو لكشب يهيجوت يجرى ،يلاحلا فتاهلا داتعو صنلا اذه بين قعلا فمأ مل :[يمقرلا رارقلا]"))
import subprocess
import json

def ar(text):
    return text[::-1]

def get_phone_battery():
    try:
        result = subprocess.check_output(["termux-battery-status"]).decode("utf-8")
        data = json.loads(result)
        msg = f"نسبة البطارية الحاليّة هي {data['percentage']}% وحالتها الصحية {data['health']}"
        return ar(msg)
    except Exception as e:
        return ar("فشل الاتصال بالعتاد")

def vibrate_phone(duration_ms=800):
    try:
        subprocess.run(["termux-vibrate", "-d", str(duration_ms)])
        return ar("تم تفعيل نبض الاهتزاز بنجاح")
    except:
        return ar("عذراً، لا يوجد محرك ارتجاج")

# بدء حلقة التحكم والذكاء التفاعلي المستمر
while True:
    print(ar("\n--- نظام الحارس الذكي نشط ومستمر ---"))
    print(ar("اكتب (تابع) للاستمرارية والمزامنة، أو (جاهز) لفحص الطاقة، أو (خروج) للإغلاق"))
    
    user_command = input()
    
    if any(word in user_command for word in ["خروج", "انهاء"]):
        print(ar("إغلاق المنظومة التفاعلية..."))
        break
        
    elif any(word in user_command for word in ["تابع", "اسعى"]):
        print(ar("تفعيل النبضة الحسيّة والمزامنة التلقائية..."))
        vibrate_phone(1200)
        # تشغيل المزامنة الفورية مع GitHub أوتوماتيكياً عند كتابة تابع
        subprocess.run(["git", "push", "origin", "main"])
        
    elif any(word in user_command for word in ["جاهز", "طاقة"]):
        print(get_phone_battery())

