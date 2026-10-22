import pathlib, sys
path = pathlib.Path(sys.argv[1])
text = path.read_text()

# نحدث أي شكل للـ KEY
text = text.replace("KEY:web4ankh", "KEY:web4ankh|DOSTOR:6236|SOLAR:790|TARIKH:571-2026")
text = text.replace("KEY:web4anhk", "KEY:web4ankh|DOSTOR:6236|SOLAR:790|TARIKH:571-2026")

path.write_text(text)
print(f"[+] Updated {path}")
# نتأكد
for line in text.splitlines():
    if "KEY:web4ankh" in line:
        print(line[:200])
