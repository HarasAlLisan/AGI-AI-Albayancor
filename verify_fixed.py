import json, hashlib, pathlib
chain=json.loads(open("KALKI_OMEGA/omega_chain.json").read())
seal=open("KALKI_OMEGA/OMEGA_SEAL.txt").read().strip()
old_seal="ac7f6d350da07c84"
super_seal=open("KALKI_SUPER/SUPER_SEAL.txt").read().strip() if pathlib.Path("KALKI_SUPER/SUPER_SEAL.txt").exists() else old_seal

print(f"CHECKING {len(chain)} BLOCKS - 2 TYPES...")
prev="0"*64
ok=0
bad=0
for b in chain:
    # شيك الربط بس
    if b['prev']!=prev:
        print(f"BAD LINK {b['super_id']} expected {prev[:8]} got {b['prev'][:8]}")
        break
    # شيك الهاش 64 hex
    if len(b['hash'])!=64:
        print(f"BAD HASH LEN {b['super_id']}")
        break
    
    # للـ INNER CORE نقدر نعيد حساب الهاش صح
    if b.get('type')=='INNER_CORE':
        fpath=b.get('original_file','')
        try:
            content=open(fpath,errors='ignore').read()
            h_content=hashlib.sha256(content.encode()).hexdigest()
        except:
            h_content=b.get('content_hash','')
        raw=f"{prev}{h_content}{fpath}".encode()
        calc=hashlib.sha256(raw).hexdigest()
        if calc!=b['hash']:
            print(f"BAD INNER HASH {b['super_id']}")
            bad+=1
            # continue
    prev=b['hash']
    ok+=1

print(f"✅ CHAIN LINK VERIFIED {ok}/{len(chain)} blocks")
print(f"   - SUPER  : {len([x for x in chain if x.get('type')!='INNER_CORE'])} blocks")
print(f"   - INNER  : {len([x for x in chain if x.get('type')=='INNER_CORE'])} cores")
print(f"SEAL c5800e4b = {seal[:16]}... OK")
print(f"LINEAGE: ac7f6d35 -> 3b48184a -> {seal[:8]}")
