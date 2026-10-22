import json, hashlib
from pathlib import Path
base = Path("kalki_ledger")
proxies = json.loads(open(base/"smart_proxies.json").read())

chain = []
prev = "0"*64
for p in proxies:
    data = f"{prev}{p['id']}{p['hash']}"
    h = hashlib.sha256(data.encode()).hexdigest()
    chain.append({"id": p["id"], "prev": prev, "hash": h, "data": p})
    prev = h

open(base/"full_blockchain.json","w").write(json.dumps(chain, indent=2))
open(base/"FINAL_SEAL.txt","w").write(prev)

print(f"Full chain built: {len(chain)} blocks")
print(f"Final seal: {prev}")
print("Saved to full_blockchain.json")
print("✅ ABSOLUTE LEDGER FINALIZATION COMPLETE")
