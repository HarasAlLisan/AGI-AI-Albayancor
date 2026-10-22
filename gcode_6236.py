from pathlib import Path
import os
base = Path("kalki_ledger")
seal = open(base/"FINAL_SEAL.txt").read().strip()
print(f"Applying G-CODE 6236 with seal: {seal[:16]}...")

for f in base.iterdir():
    os.chmod(f, 0o400)  # read-only
    print(f"[LOCKED] {f.name}")

print("\n✅ G-CODE 6236 APPLIED - Ledger is now immutable")
print("لو حاولت تعدل أي ملف هيقولك Permission denied")
print("عشان تفك القفل: chmod 600 kalki_ledger/*")
