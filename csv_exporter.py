import csv
import re

def convert_txt_to_csv():
    print("[+] Reading 'blacklist.txt' from Termux storage...")
    
    # محاذاة الحقول وتسميتها داخل شيت الإكسيل
    fields = ["Timestamp", "Username", "Reason"]
    rows = []
    
    try:
        with open("blacklist.txt", "r") as txt_file:
            for line in txt_file:
                # استخراج البيانات عبر التعابير النمطية من السجل النصي
                match = re.match(r"\[(.*?)\] Account: @(.*?) \| Reason: (.*)", line)
                if match:
                    rows.append([match.group(1), match.group(2), match.group(3).strip()])
                    
        # إنشاء ملف CSV وكتابة البيانات بداخله
        with open("blacklist_report.csv", "w", newline="", encoding="utf-8") as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(fields)
            writer.writerows(rows)
            
        print("[🎉] SUCCESS: 'blacklist_report.csv' has been generated successfully!")
        print("[💡] You can now share or open this file via Excel / Google Sheets.")
        
    except FileNotFoundError:
        print("[!] Error: 'blacklist.txt' not found. Run the anti_botnet script first.")

if __name__ == "__main__":
    convert_txt_to_csv()
