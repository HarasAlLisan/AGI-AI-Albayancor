import requests
import json
import os
import arabic_reshaper
from bidi.algorithm import get_display

def fix_arabic(text):
    reshaped_text = arabic_reshaper.reshape(text)
    return get_display(reshaped_text)

print(fix_arabic("مرحباً بك! نظام وكيل AGI المحلي جاهز الآن."))
print(fix_arabic("يمكنك التحدث معي، أو كتابة مسار أي ملف (مثل: test.py) ليقوم النظام باستكشافه وتعلّمه."))

while True:
    try:
        user_input = input("\n>>> ")
        if user_input.lower() in ['exit', 'quit', 'خروج']:
            break
            
        file_context = ""
        if os.path.exists(user_input) and os.path.isfile(user_input):
            with open(user_input, 'r', encoding='utf-8') as f:
                file_context = f.read()
            print(fix_arabic(f"🤖 جاري استكشاف وقراءة الملف: {user_input}..."))
            prompt = f"المستخدم قام بتلقيمك ملف برمجي يسمى {user_input}، محتويات الملف هي:\n\n{file_context}\n\nقم بتحليل هذا المستودع وتعلّم منه وتصرف كـ AGI لتطويره."
        else:
            prompt = user_input

        url = "http://127.0.0"
        data = {
            "model": "my-agi",
            "prompt": prompt,
            "stream": False
        }
        
        response = requests.post(url, json=data)
        result = response.json().get('response', '')
        print("\n" + fix_arabic(result))
        
    except Exception as e:
        print(f"Error: {e}")
