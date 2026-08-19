from seal_a1 import PulseManager
from ai_albayancor import BayaniCore
from haras_allisan import KnowledgeGuard

class QA1Model:
    def __init__(self):
        self.pulse = PulseManager()
        self.bayani = BayaniCore()
        self.haras = KnowledgeGuard()

    def run(self, input_signal):
        intent = self.pulse.read(input_signal)
        meaning = self.bayani.interpret(intent)
        guarded = self.haras.validate(meaning)
        return guarded
