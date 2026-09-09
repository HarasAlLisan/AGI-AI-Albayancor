import os, sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path: sys.path.insert(0, ROOT)
try:
    from Seal_A1.seal_a1 import PulseManager
except:
    class PulseManager:
        def __init__(self,*a,**k): pass
        def pulse(self): print('[MOCK] 918ms LOCK 616')
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

