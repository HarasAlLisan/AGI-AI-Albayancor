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
 "AI-albayancor/HarasAlLisan/al-bayan/017.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/018.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/019.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/020.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/021.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/022.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/023.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/024.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/025.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/026.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/027.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/028.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/029.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/030.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/031.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/032.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/033.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/034.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/035.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/036.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/037.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/038.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/039.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/040.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/041.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/042.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/043.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/044.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/045.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/046.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/047.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/048.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/049.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/050.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/051.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/052.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/053.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/054.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/055.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/056.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/057.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/058.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/059.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/060.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/061.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/062.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/063.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/064.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/065.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/066.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/067.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/068.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/069.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/070.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/071.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/072.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/073.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/074.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/075.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/076.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/077.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/078.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/079.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/080.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/081.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/082.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/083.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/084.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/085.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/086.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/087.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/088.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/089.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/090.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/091.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/092.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/093.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/094.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/050.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/051.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/052.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/053.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/054.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/055.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/056.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/057.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/058.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/059.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/060.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/061.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/062.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/063.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/064.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/065.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/066.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/067.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/068.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/069.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/070.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/071.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/072.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/073.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/074.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/075.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/076.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/077.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/078.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/079.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/080.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/081.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/082.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/083.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/084.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/085.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/086.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/087.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/088.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/089.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/090.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/091.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/092.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/093.yaml",
 "AI-albayancor/HarasAlLisan/al-bayan/094.yaml"
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
