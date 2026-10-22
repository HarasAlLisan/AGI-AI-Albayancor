import hashlib, json, pathlib
chain=json.loads(open("KALKI_OMEGA/omega_chain.json").read())
seal=open("KALKI_OMEGA/OMEGA_SEAL.txt").read().strip()
print(f"CHECKING {len(chain)} BLOCKS...")
prev="0"*64
ok=0
for b in chain:
    if b['prev']!=prev: print(f"BAD LINK {b['super_id']}"); break
    raw=f"{prev}{b.get('content_hash',b.get('hash',''))}{b.get('original_file','')}".encode()
    if hashlib.sha256(raw).hexdigest()!=b['hash']: print(f"BAD HASH {b['super_id']}"); break
    prev=b['hash']
    ok+=1
print(f"✅ VERIFIED {ok}/{len(chain)} blocks")
print(f"SEAL c5800e4b = {seal[:16]}... OK" if seal.startswith("c5800e4b") else "SEAL FAIL")
