import pathlib, json, re
root = pathlib.Path(".")
all_inner = []
pattern = re.compile(r'"hash"\s*:\s*"([a-f0-9]{32,})"|block_\d+|SEAL|ANHK', re.I)

for folder in ["FoundingChain","SealChain","Seal_A1","ANKH","HarasAllisan","AGI-AI-AlBayancor"]:
    p=root/folder
    if not p.exists(): continue
    for f in p.rglob("*"):
        if f.is_file() and f.stat().st_size < 500000: # اقل من 500k
            try:
                txt=open(f,errors='ignore').read()
                if pattern.search(txt):
                    print(f"[INNER] {f} -> {len(txt)} chars")
                    all_inner.append({"file":str(f),"snippet":txt[:300]})
            except: pass

print(f"\nTOTAL INNER FILES FOUND: {len(all_inner)}")
open("KALKI_SUPER/inner_manifest.json","w").write(json.dumps(all_inner,ensure_ascii=False))
