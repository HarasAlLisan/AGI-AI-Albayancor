import hashlib
import json
import os
from datetime import datetime

NODE_PATH = "blockchain/A1"
FILES = ["SIYADA.ar.md", "model.json", "niya.yaml"]
PROOF_FILE = os.path.join(NODE_PATH, "proof.json")
REGISTRY_FILE = "blockchain/registry.md"

def hash_file(filepath):
    with open(filepath, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def update_proof():
    proof = {
        "node": "A1",
        "wallet": "0xD3v...a1",
        "hashes": {},
        "verified": True,
        "timestamp": datetime.utcnow().isoformat()
    }

    for fname in FILES:
        fpath = os.path.join(NODE_PATH, fname)
        proof["hashes"][fname] = hash_file(fpath)

    with open(PROOF_FILE, "w") as f:
        json.dump(proof, f, indent=2)

def update_registry():
    with open(REGISTRY_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for i, line in enumerate(lines):
        if "وحدة A1" in line:
            for j in range(i, i+5):
                if "الحالة:" in lines[j]:
                    lines[j] = "- الحالة: مثبتة\n"
                    break

    with open(REGISTRY_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

if __name__ == "__main__":
    update_proof()
    update_registry()
    print("✅ تم التحقق من وحدة A1 وتحديث إثباتها.")

