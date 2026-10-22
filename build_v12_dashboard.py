import json, pathlib
chain=json.loads(open("kalki_v12/full_blockchain_v12.json").read())
seal=open("kalki_v12/FINAL_SEAL_V12.txt").read()
html=f"""<html dir=rtl><head><meta charset=utf-8><title>KALKI v12 - {seal[:8]}</title>
<style>body{{background:#000;color:#0f0;font-family:monospace;padding:15px}} .b{{border:1px solid #0a0;margin:5px;padding:8px;font-size:12px}} .top{{background:#0f0;color:#000;padding:10px;text-align:center}}</style></head>
<body><div class=top>🚀 KALKI v12 EXPANDED<br>OLD: ac7f6d35... | NEW: {seal[:16]}...<br>{len(chain)} BLOCKS | 1200 RECYCLED PROXIES</div>"""
for b in chain[1200:1300]: # نوري اول 100 من الجديد
    html+=f"<div class=b><b>{b['id']}</b> validator:{b['data']['validator']} | hash:{b['hash'][:12]}...</div>"
html+=f"<div class=b>... و {len(chain)-1300} بلوك تاني</div></body></html>"
open("index_v12.html","w",encoding="utf-8").write(html)
print("v12 dashboard ready")
