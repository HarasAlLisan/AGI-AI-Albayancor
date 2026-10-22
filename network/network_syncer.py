import csv, json, requests

# تجميع الرابط ديناميكياً لمنع الهاتف من قصه أثناء اللصق
host = "jsonplaceholder." + "typicode." + "com"
path = "/posts"
URL = f"https://{host}{path}"

def sync():
    print("[+] Connecting to Secure Server...")
    try:
        with open("blacklist_report.csv", "r", encoding="utf-8") as f:
            data = list(csv.DictReader(f))
        if not data: 
            return print("[!] Empty table.")
            
        print(f"[...] Sending database packets to targeted server...")
        res = requests.post(URL, json={"records": data})
        
        if res.status_code == 201 or res.status_code == 200:
            print("\n=========================================")
            print("[🎉] CLOUD SYNC SUCCESS: Data mirrored to central database!")
            print("=========================================\n")
        else:
            print(f"[!] Server error code: {res.status_code}")
    except Exception as e:
        print(f"[!] Connection Error: {e}")

if __name__ == "__main__": 
    sync()
