import pathlib
p = pathlib.Path.home() / "AGI-AI-Albayancor/OS-ALMAHDI-256/core.py"
text = p.read_text()

old = 'f"KEY:web4ankh|POW_HASH:{pow_hash}|NONCE:{nonce}|GATEWAY:enforce'
new = 'f"KEY:web4ankh|DOSTOR:6236|SOLAR:790|TARIKH:571-2026|POW_HASH:{pow_hash}|NONCE:{nonce}|GATEWAY:enforce'

if old in text:
    text = text.replace(old, new)
    p.write_text(text)
    print("[+] Payload updated to include DOSTOR 6236 + SOLAR 790 + TARIKH 571->2026")
else:
    print("[-] pattern not found")
    # اطبع السطر اللي فيه الـ KEY عشان نشوفه
    for line in text.splitlines():
        if "KEY:web4ankh" in line:
            print(line)
