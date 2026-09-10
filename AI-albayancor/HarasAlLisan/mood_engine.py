"""
Haras AlLisan - Mood Engine - 7 Continents - A1=19 Mizan
OS Almahdi 256 - Complete Module - 616
"""
import hashlib, time, json
from pathlib import Path

class LisanMood:
    MOODS_7 = {
        "Africa": "Sakina",
        "Antarctica": "Sabr",
        "Asia": "Hikma",
        "Europe": "Mizan",
        "North America": "Quwa",
        "Oceania": "Safa",
        "South America": "Rahma"
    }
    MIZAN_GENESIS = "A1:1=19"

    def __init__(self):
        self.mood_file = Path("blockchain/continents/mood_state.json")
        self.chain_file = Path("blockchain/blockchain.json")

    def adam_hash(self, data: str) -> str:
        return hashlib.sha256(data.encode()).hexdigest()

    def get_mood(self, continent: str, ayah_text: str = "") -> dict:
        mood = self.MOODS_7.get(continent, "Mizan")
        payload = f"{continent}_{mood}_{ayah_text}_{self.MIZAN_GENESIS}"
        h = self.adam_hash(payload)
        return {
            "continent": continent,
            "mood": mood,
            "mizan": self.MIZAN_GENESIS,
            "adam_hash": h,
            "timestamp": time.time(),
            "ayah_len": len(ayah_text)
        }

    def initialize_7_moods(self):
        print(f"[MOOD] Initializing 7 Moods - {self.MIZAN_GENESIS} - 7 continents")
        states = []
        for cont, mood in self.MOODS_7.items():
            st = self.get_mood(cont, f"A3:{cont}")
            states.append(st)
            print(f"[{cont:15}] -> {mood:8} -> {st['adam_hash'][:16]}... MIZAN OK")

        self.mood_file.parent.mkdir(parents=True, exist_ok=True)
        self.mood_file.write_text(json.dumps(states, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"[✓] Mood saved -> {self.mood_file} - {len(states)} GREEN")
        return states

if __name__ == "__main__":
    LisanMood().initialize_7_moods()
