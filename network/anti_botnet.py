import time
import sys

OFFICIAL_DATA = {
    "Mubarak Era (2011)": "Debt: 34.9B USD | Exchange Rate: 5.86 EGP",
    "Morsi Era (2013)": "Debt: 43.2B USD | Exchange Rate: 6.93 EGP",
    "Current Era (2026)": "Debt: 164.8B USD | Exchange Rate: 51.71 EGP"
}

PROPAGANDA_KEYWORDS = ["الإخوان", "الماضي", "٢٥ يناير", "25 يناير", "مؤامرة", "شماعة", "تحمل", "إنجاز", "السيسي", "أهل الشر"]

def save_to_blacklist(username, reason):
    with open("blacklist.txt", "a") as f:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] Account: @{username} | Reason: {reason}\n")
    print(f"[💾] SYSTEM: Account @{username} logged in 'blacklist.txt'.")

def scan_network_behavior(username, text, post_frequency, has_avatar, account_age_days):
    print(f"\n[+] Deep-Scanning Account: @{username}")
    print("[...] Evaluating NLP Content & Advanced Profile Metrics...")
    time.sleep(1.2)
    
    # 1. فحص المحتوى
    has_propaganda = any(keyword in text for keyword in PROPAGANDA_KEYWORDS)
    
    # 2. فحص المعايير السلوكية (الحسابات الحديثة وبدون صور هي السلوك الشائع للجان)
    is_high_frequency = post_frequency < 5
    is_blank_profile = has_avatar.lower() == "n"
    is_new_account = account_age_days < 30
    
    # احتساب مؤشر الشبهة الخوارزمي (Suspicion Score)
    suspicion_points = 0
    reasons = []
    
    if has_propaganda:
        suspicion_points += 2
        reasons.append("Propaganda Content")
    if is_high_frequency:
        suspicion_points += 2
        reasons.append("High Frequency Bot")
    if is_blank_profile:
        suspicion_points += 1
        reasons.append("No Profile Picture")
    if is_new_account:
        suspicion_points += 1
        reasons.append("New Account (<30 days)")

    print(f"[📊] ALGORITHM RATIO: Suspicion Score = {suspicion_points}/6")
    
    # تفعيل الـ pkill الرقمي إذا تخطى مؤشر الشبهة نصف الدرجة
    if suspicion_points >= 3:
        print("\n[🚨] ALERT: HIGH-RISK BOTNET ACCOUNT DETECTED!")
        print(f"[🛡️] ACTION: Executing structural pkill-ban on @{username}...")
        
        final_reason = " + ".join(reasons)
        save_to_blacklist(username, final_reason)
        
        counter_reply = (
            f"\n=========================================\n"
            f"🤖 COUNTER-BOT PROTOCOL v3.0 ACTIVATED 🤖\n"
            f"=========================================\n"
            f"Automated Fact-Check regarding historical scapegoats:\n"
            f"-> 2011: {OFFICIAL_DATA['Mubarak Era (2011)']}\n"
            f"-> 2013: {OFFICIAL_DATA['Morsi Era (2013)']}\n"
            f"-> 2026: {OFFICIAL_DATA['Current Era (2026)']}\n"
            f"=========================================\n"
        )
        return counter_reply
    else:
        return "\n[+] Account risk profile is within normal range."

if __name__ == "__main__":
    print("\n=========================================")
    print("🔥 SYSTEM INITIATED: ANTI-BOTNET CLEANER v3.0 🔥")
    print("=========================================")
    
    try:
        user = input("Enter Username: ")
        post_text = input("Paste comment/post: ")
        freq = int(input("Enter frequency (seconds): "))
        avatar = input("Does the account have a profile picture? (y/n): ")
        age = int(input("Enter account age in days: "))
        
        result = scan_network_behavior(user, post_text, freq, avatar, age)
        print(result)
        
    except KeyboardInterrupt:
        print("\n[+] System shutting down.")
        sys.exit()
