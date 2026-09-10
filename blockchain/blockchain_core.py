import hashlib, json, time, pathlib

class AnkhSovereignBlockchain:
    OS_NAME = "OS Almahdi 256"
    TOKEN_SYMBOL = "☥ (AGC)"
    TOTAL_VAULT = 24000000000000
    GLOBAL_NODES = 9000000000
    CONTINENTS = ["Africa","Antarctica","Asia","Europe","North America","Oceania","South America"]
    INDIVIDUAL_SHARE = 2666.66
    MIZAN_GENESIS = "A1:1=19"

    def __init__(self):
        self.chain_file = pathlib.Path("blockchain/blockchain.json")
        self.bayan_files = [
            "AI-albayancor/HarasAlLisan/al-bayan/001_al_fatiha.yaml",
            "AI-albayancor/HarasAlLisan/al-bayan/002.yaml",
            "AI-albayancor/HarasAlLisan/al-bayan/003.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/004.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/005.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/006.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/007.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/008.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/009.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/010.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/011.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/012.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/013.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/014.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/015.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/016.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/017.yaml"
        ]

    def adam_hash(self, data: str) -> str:
        return hashlib.sha256(data.encode()).hexdigest()

    def initialize_financial_command(self):
        print(f"[+] {self.OS_NAME} - ميزان {self.MIZAN_GENESIS} - للـ {len(self.CONTINENTS)} قارات...")
        vault_per_continent = self.TOTAL_VAULT // len(self.CONTINENTS)
        nodes_per_continent = self.GLOBAL_NODES // len(self.CONTINENTS)
        metrics = {
            "Total_Sovereign_Vault": f"{self.TOTAL_VAULT:,} {self.TOKEN_SYMBOL}",
            "Unified_Human_Nodes": f"{self.GLOBAL_NODES:,} Nodes",
            "Continents": len(self.CONTINENTS),
            "Vault_Per_Continent": f"{vault_per_continent:,} {self.TOKEN_SYMBOL}",
            "Nodes_Per_Continent": f"{nodes_per_continent:,} Nodes",
            "Sovereign_Distribution": f"{self.INDIVIDUAL_SHARE} {self.TOKEN_SYMBOL} per Node",
            "Mizan_Genesis": self.MIZAN_GENESIS,
            "Continents_List": self.CONTINENTS
        }
        print(json.dumps(metrics, indent=2, ensure_ascii=False))
        chain = []
        for i, cont in enumerate(self.CONTINENTS, 1):
            ledger_payload = str(metrics) + f"{cont}_Mohamed_Salah_Senior_Identity_Lead_{i}" + self.MIZAN_GENESIS
            sovereign_hash = self.adam_hash(ledger_payload)
            block = {
                "continent_id": i,
                "continent": cont,
                "vault": vault_per_continent,
                "nodes": nodes_per_continent,
                "adam_hash": sovereign_hash,
                "mizan": self.MIZAN_GENESIS,
                "timestamp": time.time()
            }
            chain.append(block)
            pathlib.Path(f"blockchain/continents/{cont}.json").write_text(json.dumps(block, indent=2, ensure_ascii=False), encoding='utf-8')
            print(f"[🔒] قارة {i}/7 {cont}: {sovereign_hash[:16]}...")

        for bf in self.bayan_files:
            p = pathlib.Path(bf)
            if p.exists():
                h = hashlib.sha256(p.read_bytes()).hexdigest()
                print(f"{bf} -> {h[:16]}... {p.stat().st_size} bytes - MIZAN OK")

        self.chain_file.write_text(json.dumps(chain, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"[✓] Chain saved -> {self.chain_file} - {len(chain)} blocks GREEN")
        return chain

if __name__ == "__main__":
    AnkhSovereignBlockchain().initialize_financial_command()
