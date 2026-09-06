import json
base = json.load(open('pyramids_50_other_language.json','r',encoding='utf-8'))
layers = base['pyramids_50_other_language']['layers']
# الـ 5 الأساسين عندك
for i in range(6, 51):
    layers.append({
        "id": i,
        "lang": f"LANG-{i} - توليد تلقائي من 1717->256",
        "role": f"مشتق من هرم {(i % 5) + 1} - تردد 6236Hz",
        "freq": "6236Hz",
        "pattern": "432Hz",
        "pipeline": "256-bit"
    })
base['pyramids_50_other_language']['layers'] = layers
base['pyramids_50_other_language']['count'] = len(layers)
json.dump(base, open('pyramids_50_other_language.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
print(f"Generated {len(layers)} pyramids - 50 READY")
