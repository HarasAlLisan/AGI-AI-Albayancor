import json, pathlib, hashlib, os
root = pathlib.Path(".")
targets = ["FoundingChain","SealChain","Seal_A1","ANKH","HarasAllisan","os_almahdi_256","AGI-AI-AlBayancor"]
all_blocks = []

print("=== فحص الأنوية الداخلية ===")
for t in targets:
    p = root / t
    if not p.exists(): continue
    for jf in p.rglob("*.json"):
        try:
            data = json.loads(open(jf,errors='ignore').read()[:2000000])
            # لو جواه بلوكات
            if isinstance(data, list) and len(data)>0 and isinstance(data[0], dict):
                if "hash" in data[0] or "prev" in data[0] or "id" in data[0]:
                    print(f"FOUND CHAIN: {jf} -> {len(data)} blocks")
                    all_blocks.extend(data)
            elif isinstance(data, dict) and "blocks" in data:
                print(f"FOUND WRAPPED: {jf}")
                all_blocks.extend(data["blocks"])
        except: pass

# زود عليهم KALKI v12
v12 = pathlib.Path("kalki_v12/full_blockchain_v12.json")
if v12.exists():
    chain12 = json.loads(open(v12).read())
    print(f"KALKI v12: {len(chain12)} blocks")
    all_blocks.extend(chain12)

print(f"\nTOTAL RAW BLOCKS COLLECTED: {len(all_blocks)}")

# نبني سوبر تشين موحدة - كل نواة تبقى shard
# Genesis هو ختم الكعبة + ختم KALKI
old_seal = "ac7f6d350da07c844e2907b9a7f5785333945ad5340ce3ca78c2bf52781080a"
new_seal = open("kalki_v12/FINAL_SEAL_V12.txt").read().strip() if pathlib.Path("kalki_v12/FINAL_SEAL_V12.txt").exists() else old_seal

super_chain = []
prev = "0"*64
for i, b in enumerate(all_blocks[:10000]): # نلم اول 10k
    raw = f"{prev}{json.dumps(b,sort_keys=True)[:500]}{old_seal}{new_seal}".encode()
    h = hashlib.sha256(raw).hexdigest()
    super_chain.append({
        "super_id": f"SUPER_{i:05d}",
        "original_id": b.get("id","unk"),
        "source": b.get("source","inner"),
        "prev": prev,
        "hash": h,
        "continent_shard": ["ASIA","AFRICA","EU","EUROPE","NORTH_AMERICA","SOUTH_AMERICA","AUSTRALIA"][i % 7],
        "core": ["LATTICE","CONSTITUTION_6236","AGI_HARAS","M5_TREASURY","ANKH","SEAL_A1","KALKI"][i % 7]
    })
    prev = h

super_seal = hashlib.sha256(f"{prev}{old_seal}{new_seal}{len(super_chain)}".encode()).hexdigest()
pathlib.Path("KALKI_SUPER").mkdir(exist_ok=True)
open("KALKI_SUPER/super_chain.json","w").write(json.dumps(super_chain))
open("KALKI_SUPER/SUPER_SEAL.txt","w").write(super_seal)
open("KALKI_SUPER/MERGE_MANIFEST.txt","w").write(f"MERGED: KALKI 5000 + {len(all_blocks)-5000} inner blocks\nOLD ac7f6d35 + NEW 9f1046e5 -> SUPER {super_seal}\nSHARDS: 7 continents | CORES: 7 cores\n")

print(f"✅ SUPER CHAIN DONE: {len(super_chain)} blocks")
print(f"SUPER SEAL: {super_seal}")
