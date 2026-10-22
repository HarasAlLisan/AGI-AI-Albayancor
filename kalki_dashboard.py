import json, pathlib
base = pathlib.Path("kalki_ledger")
chain = json.loads(open(base/"full_blockchain.json").read())
seal = open(base/"FINAL_SEAL.txt").read().strip()

html = f"""
<html><head><meta charset="utf-8"><title>KALKI v11 - {seal[:8]}</title>
<style>
body{{background:#000;color:#0f0;font-family:monospace;padding:20px}}
.block{{border:1px solid #0f0;margin:10px;padding:10px;background:#0a0a0a;word-break:break-all}}
.seal{{background:#0f0;color:#000;padding:15px;text-align:center;font-weight:bold}}
</style></head><body>
<div class=seal>🔒 G-CODE 6236 APPLIED<br>{seal}<br>Blocks: {len(chain)} | IMMUTABLE</div>
<h2>KALKI LEDGER EXPLORER v11</h2>
"""

for b in chain[:100]:
    data_str = str(b['data'])[:120]
    html += f"<div class=block><b>{b['id']}</b><br>prev: {b['prev'][:16]}...<br>hash: {b['hash'][:16]}...<br>data: {data_str}...</div>"

html += f"<div class=block>... و {len(chain)-100} بلوك تاني في full_blockchain.json</div></body></html>"

open("index.html","w",encoding="utf-8").write(html)
print(f"✅ Dashboard fixed - {len(chain)} blocks - Seal {seal[:8]}")
