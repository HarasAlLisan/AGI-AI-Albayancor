# core/q_a1_core.py

import json
import os

class QA1Model:
    def __init__(self, mizan_path="data/quran_mizan.json", intention_path="data/intention.json"):
        self.mizan = self._load_json(mizan_path)
        self.intention = self._load_json(intention_path)

    def _load_json(self, path):
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        else:
            return {}

    def answer(self, question: str) -> str:
        """
        نموذج مبدئي: يرد بفلتر الميزان + النية
        """
        # مثال: حالياً بيرجع نص تجريبي
        response = f"سؤالك: {question}\nالرد (موزون بالميزان والنية): جاري التفعيل..."
        return response
