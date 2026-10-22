import json
chain=json.loads(open("KALKI_OMEGA/omega_chain.json").read())
seal=open("KALKI_OMEGA/OMEGA_SEAL.txt").read().strip()
manifest=open("KALKI_OMEGA/OMEGA_MANIFEST.txt").read()

html=f"""<html dir=rtl><head><meta charset=utf-8><title>OMEGA {seal[:8]} - 6267</title>
<style>
body{{background:#000;color:#0f0;font-family:monospace;padding:10px}}
.top{{background:linear-gradient(90deg,#0f0,#0a0);color:#000;padding:15px;text-align:center;border-radius:8px}}
.grid{{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin:10px 0}}
.shard{{border:1px solid #0f0;padding:8px;text-align:center;font-size:11px}}
.b{{border:1px solid #333;margin:3px;padding:5px;font-size:11px;word-break:break-all}}
</style></head><body>
<div class=top>🕌 KALKI OMEGA v13 - بيت المال الكعبة<br>
{manifest.replace(chr(10),'<br>')}<br>
SEAL: {seal}</div>
<div class=grid>
<div class=shard>ASIA<br>LATTICE<br>{len([b for b in chain if b['continent_shard']=='ASIA'])} بلوك</div>
<div class=shard>AFRICA<br>6236<br>{len([b for b in chain if b['continent_shard']=='AFRICA'])} بلوك</div>
<div class=shard>EU<br>HARAS<br>{len([b for b in chain if b['continent_shard']=='EU'])} بلوك</div>
<div class=shard>EUROPE<br>M5-5012247<br>{len([b for b in chain if b['continent_shard']=='EUROPE'])} بلوك</div>
<div class=shard>N-AMERICA<br>ANKH<br>{len([b for b in chain if b['continent_shard']=='NORTH_AMERICA'])} بلوك</div>
<div class=shard>S-AMERICA<br>SEAL_A1<br>{len([b for b in chain if b['continent_shard']=='SOUTH_AMERICA'])} بلوك</div>
<div class=shard>AUSTRALIA<br>KALKI<br>{len([b for b in chain if b['continent_shard']=='AUSTRALIA'])} بلوك</div>
</div>
"""
for b in chain[-100:]: # اخر 100 بلوك من الـ 6267
    html+=f"<div class=b>{b['super_id']} | {b['continent_shard']} | {b['core']} | {b['hash'][:12]}... | {b.get('original_file','')[ -40:]}</div>"
html+="</body></html>"
open("index_omega.html","w",encoding="utf-8").write(html)
print("OMEGA dashboard built")
