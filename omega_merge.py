import json, pathlib, hashlib

# نحمل السوبر القديم
super_chain = json.loads(open("KALKI_SUPER/super_chain.json").read())
inner = json.loads(open("KALKI_SUPER/inner_manifest.json").read())

print(f"القديم: {len(super_chain)} سوبر بلوك + {len(inner)} نواة داخلية")

# نحول كل نواة داخلية لبلوك حقيقي
prev = super_chain[-1]["hash"] if super_chain else "0"*64
for i, entry in enumerate(inner):
    fpath = entry["file"]
    try:
        content = open(fpath, errors='ignore').read()
        h_content = hashlib.sha256(content.encode()).hexdigest()
    except:
        h_content = "0"*64
        content = ""

    raw = f"{prev}{h_content}{fpath}".encode()
    block_hash = hashlib.sha256(raw).hexdigest()
    
    super_chain.append({
        "super_id": f"OMEGA_{len(super_chain):05d}",
        "original_file": fpath,
        "size": len(content),
        "content_hash": h_content,
        "prev": prev,
        "hash": block_hash,
        "continent_shard": ["ASIA","AFRICA","EU","EUROPE","NORTH_AMERICA","SOUTH_AMERICA","AUSTRALIA"][len(super_chain) % 7],
        "core": ["LATTICE","CONSTITUTION_6236","AGI_HARAS","M5_TREASURY","ANKH","SEAL_A1","KALKI"][len(super_chain) % 7],
        "type": "INNER_CORE"
    })
    prev = block_hash

# ختم أوميجا النهائي
old_seal = "ac7f6d350da07c84"
super_seal_text = open("KALKI_SUPER/SUPER_SEAL.txt").read().strip()
omega_seal = hashlib.sha256(f"{prev}{old_seal}{super_seal_text}{len(super_chain)}".encode()).hexdigest()

pathlib.Path("KALKI_OMEGA").mkdir(exist_ok=True)
open("KALKI_OMEGA/omega_chain.json","w").write(json.dumps(super_chain))
open("KALKI_OMEGA/OMEGA_SEAL.txt","w").write(omega_seal)
open("KALKI_OMEGA/OMEGA_MANIFEST.txt","w").write(f"""
OMEGA v13 - دمج الأنوية الداخلية
KALKI 5000 + INNER 1267 = TOTAL {len(super_chain)} blocks
OLD: ac7f6d35
SUPER: 3b48184a
OMEGA: {omega_seal}
SHARDS: 7 قارات - بيت المال الكعبة
CORES: 7 أنوية - Lattice + 6236 + Haras + M5 + ANKH + Seal_A1 + Kalki
""")

print(f"✅ OMEGA DONE: {len(super_chain)} blocks")
print(f"OMEGA SEAL: {omega_seal}")
