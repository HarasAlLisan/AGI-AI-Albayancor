import json, hashlib, pathlib, time
base = pathlib.Path("kalki_ledger")
v12 = pathlib.Path("kalki_v12")
v12.mkdir(exist_ok=True)

chain = json.loads(open(base/"full_blockchain.json").read())
proxies = json.loads(open(base/"smart_proxies.json").read())
seal = open(base/"FINAL_SEAL.txt").read().strip()
factual = json.loads(open(base/"2026_factual_database.json").read())

print(f"♻️  بيعيد تدوير: {len(chain)} بلوك + {len(proxies)} بروكسي")

# ناخد اخر هاش هو بداية الجديد
last_hash = chain[-1]['hash']
new_chain = chain.copy()  # نكمل على القديم

# نوسع من 1200 لـ 5000
for i in range(1200, 5000):
    proxy = proxies[i % len(proxies)]
    data = {
        "id": f"proxy_{i:04d}",
        "proxy": proxy,
        "oracle_fact": f"FACT_{i}_{factual.get('sovereign','ALMAHDI')}",
        "validator": f"VAL_{proxy.get('ip','')[:8] if isinstance(proxy, dict) else str(proxy)[:8]}",
        "timestamp": "2026-09-14T19:40:00",
        "recycled_from": "v11_ac7f6d35"
    }
    prev = new_chain[-1]['hash']
    raw = f"{prev}{json.dumps(data, sort_keys=True)}{seal}".encode()
    h = hashlib.sha256(raw).hexdigest()
    new_chain.append({"id": f"block_{i:04d}", "prev": prev, "hash": h, "data": data})

# ختم جديد
new_seal_raw = f"{seal}{new_chain[-1]['hash']}{len(new_chain)}".encode()
new_seal = hashlib.sha256(new_seal_raw).hexdigest()

open(v12/"full_blockchain_v12.json","w").write(json.dumps(new_chain))
open(v12/"FINAL_SEAL_V12.txt","w").write(new_seal)
open(v12/"MANIFEST_V12.txt","w").write(f"V12 EXPANDED: {len(chain)}->5000 | OLD_SEAL={seal} | NEW_SEAL={new_seal} | PROXIES_RECYCLED={len(proxies)}")

print(f"✅ v12 DONE: {len(new_chain)} blocks")
print(f"OLD SEAL: {seal[:16]}...")
print(f"NEW SEAL: {new_seal[:16]}...")
