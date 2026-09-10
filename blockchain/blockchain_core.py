import hashlib, json, time, pathlib
class AnkhSovereignBlockchain:
    OS_NAME="OS Almahdi 256"; TOKEN_SYMBOL="☥ (AGC)"; TOTAL_VAULT=24000000000000
    GLOBAL_NODES=9000000000; CONTINENTS=["Africa","Antarctica","Asia","Europe","North America","Oceania","South America"]
    INDIVIDUAL_SHARE=2666.66; MIZAN_GENESIS="A1:1=19"
    def __init__(self):
        self.chain_file=pathlib.Path("blockchain/blockchain.json")
        self.bayan_files=[
            "AI-albayancor/HarasAlLisan/al-bayan/001_al_fatiha.yaml",
            "AI-albayancor/HarasAlLisan/al-bayan/
cd ~/AGI-AI-Albayancor

# 1. اتأكد A3 اتكتبت 200 فاضي 0
ls -lh AI-albayancor/HarasAlLisan/al-bayan/003.yaml
wc -l AI-albayancor/HarasAlLisan/al-bayan/003.yaml

# 2. صلح blockchain_core.py و ضيف 003
python3 <<'PY'
from pathlib import Path
p=Path("blockchain/blockchain_core.py")
s=p.read_text(encoding='utf-8')
if "003.yaml" not in s:
    s=s.replace('"AI-albayancor/HarasAlLisan/al-bayan/002.yaml"','"AI-albayancor/HarasAlLisan/al-bayan/002.yaml",\n            "AI-albayancor/HarasAlLisan/al-bayan/003.yaml"')
    p.write_text(s,encoding='utf-8')
    print("FIXED: added 003.yaml")
else:
    print("already has 003")
print("--- bayan_files ---")
for line in s.splitlines():
    if "bayan" in line or "00" in line:
        print(line)
