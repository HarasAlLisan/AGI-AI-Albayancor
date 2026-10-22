import hashlib
from pathlib import Path
log = Path("kalki_ledger/sovereign.log")
prev = "0"*64
print("=== KALKI BLOCKCHAIN INSIDE ===")
for i, line in enumerate(open(log, encoding="utf-8")):
    h = hashlib.sha256((prev + line).encode()).hexdigest()
    print(f"Block {i:03d} | {h[:16]}... | prev {prev[:8]} | {line.strip()[:50]}")
    prev = h
print(f"\nLast hash: {prev}")
print("لو غيرت سطر واحد، الـ last hash هيتغير تماما")
