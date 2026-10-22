import time
import os
import subprocess

print("=========================================")
print("2026 ACTIVE INJECTION MATRIX: ALMAHDI-256")
print("=========================================")

def run_continuous_filtration():
    print("[+] Hooking into Local Server Node Streams...")
    
    while True:
        try:
            print(f"\n[{time.strftime('%H:%M:%S')}] Intercepting Matrix Traffic...")
            subprocess.run(["python", "system_core.py"], check=True)
            time.sleep(30)
            
        except KeyboardInterrupt:
            print("\n[🔒] Detaching Daemon Hook safely. Matrix Core remains active.")
            break
        except Exception as e:
            print(f"[!] Hook Exception: {e}")
            time.sleep(5)

if __name__ == "__main__":
    run_continuous_filtration()
