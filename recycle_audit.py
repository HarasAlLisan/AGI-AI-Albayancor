import json, pathlib, os
base = pathlib.Path("kalki_ledger")
print("=== جرد المواد القديمة ===")
for f in base.iterdir():
    size = f.stat().st_size
    print(f"- {f.name}: {size/1024:.1f}K")

# نفص القديم
try:
    proxies = json.loads(open(base/"smart_proxies.json").read())
    print(f"\n[خامات] smart_proxies: {len(proxies)} بروكسي")
except: pass

try:
    db = json.loads(open(base/"2026_factual_database.json").read())
    print(f"[خامات] 2026_factual: {len(db) if isinstance(db, list) else 'dict'} مادة")
except: pass

try:
    chain = json.loads(open(base/"full_blockchain.json").read())
    print(f"[أساس] chain: {len(chain)} بلوك")
    print(f"[ختم] {open(base/'FINAL_SEAL.txt').read()[:16]}...")
except: pass
