import re
import sys

# قاعدة البيانات الاقتصادية الرسمية (البنك المركزي المصري)
ECONOMIC_DB = {
    "Mubarak Era (2011)": {"Debt": "34.9 Billion USD", "USD_Rate": "5.86 EGP"},
    "Morsi Era (2013)": {"Debt": "43.2 Billion USD", "USD_Rate": "6.93 EGP"},
    "Current Era (2026)": {"Debt": "164.8 Billion USD", "USD_Rate": "51.71 EGP"}
}

# كلمات مفتاحية يتم تتبعها باللغة العربية (شماعات الإعلام لتبرير الأزمة)
TARGET_PATTERNS = [
    "الإخوان", "الماضي", "٢٥ يناير", "25 يناير", "مؤامرة", "شماعة", "تحمل", "إنجاز", "السيسي"
]

def analyze_and_reply(text_input):
    print("\n[+] Scanning input text using NLP algorithms...")
    
    # فحص النص للتأكد من وجود الكلمات المستهدفة
    matched = False
    for pattern in TARGET_PATTERNS:
        if pattern in text_input:
            matched = True
            break
            
    if matched:
        print("[!] ALERT: Propaganda / Scapegoat rhetoric detected!")
        reply = (
            f"\n=========================================\n"
            f"🚨 COUNTER-PROPAGANDA OFFICIAL DATA (CBE) 🚨\n"
            f"=========================================\n"
            f"Stop using historical scapegoats to justify currency collapse and debt accumulation:\n\n"
            f"-> Mubarak Era (2011):\n"
            f"   External Debt: {ECONOMIC_DB['Mubarak Era (2011)']['Debt']} | USD Rate: {ECONOMIC_DB['Mubarak Era (2011)']['USD_Rate']}\n\n"
            f"-> Morsi Era (2013):\n"
            f"   External Debt: {ECONOMIC_DB['Morsi Era (2013)']['Debt']} | USD Rate: {ECONOMIC_DB['Morsi Era (2013)']['USD_Rate']}\n\n"
            f"-> Current Situation (2026):\n"
            f"   External Debt: {ECONOMIC_DB['Current Era (2026)']['Debt']} | USD Rate: {ECONOMIC_DB['Current Era (2026)']['USD_Rate']}\n"
            f"=========================================\n"
            f"The data does not lie. Current economic mismanagement and asset liquidation are fully responsible.\n"
        )
        return reply
    else:
        return "[+] Text is clean. No target propaganda patterns found."

if __name__ == "__main__":
    print("\n--- Termux NLP Totheer Cleaner System Active ---")
    print("Paste the Arabic statement here to scan and press Enter:")
    
    # قراءة النص المدخل
    try:
        sample_text = input("> ")
        result = analyze_and_reply(sample_text)
        print(result)
    except KeyboardInterrupt:
        print("\n[+] Exiting system.")
        sys.exit()
