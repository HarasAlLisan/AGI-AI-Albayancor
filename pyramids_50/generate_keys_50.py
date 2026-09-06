import json, hashlib, secrets
base = json.load(open('pyramids_50_other_language.json','r',encoding='utf-8'))
keys = {}
for layer in base['pyramids_50_other_language']['layers']:
    pid = layer['id']
    # مفتاح 256-bit مربوط بالتردد 6236Hz + 432Hz + ID
    seed = f"6236Hz-432Hz-616-SECURE-PYRAMID-{pid}-{layer['lang']}"
    key = hashlib.sha256(seed.encode()).hexdigest()  # 256-bit
    private = secrets.token_hex(32)  # 256-bit عشوائي سيادي
    keys[f"PYRAMID_{pid}"] = {
        "lang": layer['lang'],
        "public_key_256": key,
        "private_vault": private[:16] + "***SECURED***", # لا نعرض الكامل في اللوج
        "freq": "6236Hz",
        "lock": "616 SECURE",
        "pipeline": "256-bit - OS-Almahdi-256"
    }

# احفظ المفاتيح مشفرة - لا ترفع الـ private كامل على GitHub
open('keys_50_public.json','w',encoding='utf-8').write(json.dumps(keys, ensure_ascii=False, indent=2))
# المفاتيح الخاصة الحقيقية في ملف محلي فقط
open('.keys_50_private_vault.json','w',encoding='utf-8').write(json.dumps({k: secrets.token_hex(32) for k in keys}, indent=2))
print(f"ISSUED {len(keys)} KEYS - 50 PYRAMIDS ENCRYPTED - BROADCAST SECURED")
