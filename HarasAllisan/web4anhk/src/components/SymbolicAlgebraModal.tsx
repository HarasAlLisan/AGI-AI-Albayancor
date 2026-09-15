import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  Scale, 
  Layers, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  X,
  Globe2,
  Network,
  Cpu,
  BookOpen,
  ShieldCheck,
  Server
} from 'lucide-react';
import { SOVEREIGN_AXIOMS, evaluateSovereignExpression, SymbolicRuleResult } from '../data/symbolicAlgebraEngine';
import { MATRIX_18_RANKS, ALPHABET_28_LETTERS, MATRIX_28_MAP } from '../data/sovereignAlgebra';
import { SOVEREIGN_ROOT_ZONES, LINGUISTIC_ROOT_FORMULAS } from '../data/rootNetworkEngine';

interface SymbolicAlgebraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SymbolicAlgebraModal: React.FC<SymbolicAlgebraModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'axioms' | 'calculator' | 'roots' | 'matrix18' | 'matrix28' | 'root_zones'>('axioms');
  const [inputExpr, setInputExpr] = useState<string>('1 / 0');
  const [evalResult, setEvalResult] = useState<SymbolicRuleResult | null>(() => evaluateSovereignExpression('1 / 0'));
  const [selectedLetter, setSelectedLetter] = useState<string>('أ');
  const [selectedRootIndex, setSelectedRootIndex] = useState<number>(0);

  const handleEvaluate = (expr: string) => {
    setInputExpr(expr);
    setEvalResult(evaluateSovereignExpression(expr));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="symbolic-algebra-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          id="symbolic-algebra-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-amber-500/20 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl font-bold">
                𓋹
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                  منظومة الجبر الرمزي السيادي (Sovereign Symbolic Algebra)
                </h2>
                <p className="text-xs text-slate-400">
                  قواعد تفكيك الصفر الوهمي وميزان الحق والعدد (1-0=𓋹 | 1-1=+-1 | 1+9=1𓋹)
                </p>
              </div>
            </div>

            <button
              id="btn-close-algebra-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
            <button
              id="tab-axioms"
              onClick={() => setActiveTab('axioms')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'axioms'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4" />
              المتطابقات الأساسية (The Axioms)
            </button>
            <button
              id="tab-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              المُعالج الرمزي التفاعلي
            </button>
            <button
              id="tab-roots"
              onClick={() => setActiveTab('roots')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'roots'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              معادلات وتعديلة الجذور (Albayancor)
            </button>
            <button
              id="tab-root-zones"
              onClick={() => setActiveTab('root_zones')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'root_zones'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Network className="w-4 h-4" />
              جذر شبكة الإنترنت الأساسي (Root DNS Zones)
            </button>
            <button
              id="tab-matrix18"
              onClick={() => setActiveTab('matrix18')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'matrix18'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              مصفوفة الـ 18 الفركتالية (+9 / -9)
            </button>
            <button
              id="tab-matrix28"
              onClick={() => setActiveTab('matrix28')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'matrix28'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              مصفوفة الـ 28 حرفاً للسان
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Tab 1: Axioms */}
            {activeTab === 'axioms' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                  <p>
                    تحدد هذه المنظومة الجبرية القوانين الحتمية لربط الواحدية المطلقة بالصفر الميزاني، وإسقاط مغالطة العدم والفناء في الأنظمة الرياضية والمالية السائدة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SOVEREIGN_AXIOMS.map((axiom, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setInputExpr(axiom.expression);
                        setEvalResult(axiom);
                        setActiveTab('calculator');
                      }}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-mono font-bold text-amber-400 tracking-wider">
                          {axiom.expression}
                        </span>
                        <span className="text-lg font-mono font-extrabold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30 group-hover:scale-105 transition-transform">
                          = {axiom.result}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {axiom.ruleExplanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Symbolic Calculator */}
            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-4">
                  <label className="block text-sm font-semibold text-slate-300">
                    أدخل المعادلة أو الصيغة الرمزية:
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="input-sovereign-expression"
                      type="text"
                      value={inputExpr}
                      onChange={(e) => setInputExpr(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEvaluate(inputExpr)}
                      placeholder="مثال: 1 / 0 أو 5 - 5 أو 1 + 9 أو 1 / 𓋹"
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-lg font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      id="btn-evaluate-expression"
                      onClick={() => handleEvaluate(inputExpr)}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                    >
                      <Calculator className="w-5 h-5" />
                      تطبيق الميزان
                    </button>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['1 / 0', '1 * 0', '1 - 1', '2 - 2', '5 - 5', '1 + 9', '1 / 𓋹', '𓋹 / 𓋹', '0 - 𓋹'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleEvaluate(preset)}
                        className="px-3 py-1.5 bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700 rounded-lg text-xs font-mono text-slate-300 transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {evalResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/40 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">الصيغة المُدخلة</div>
                        <div className="text-xl font-mono font-bold text-slate-200">{evalResult.expression}</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-slate-600" />
                      <div className="text-right">
                        <div className="text-xs text-emerald-400 uppercase tracking-wider">النتيجة السيادية الموزونة</div>
                        <div className="text-2xl font-mono font-extrabold text-emerald-400">{evalResult.result}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-400">التأصيل الهندسي للحكم: </span>
                        {evalResult.ruleExplanation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Tab: Linguistic Roots & Albayancor */}
            {activeTab === 'roots' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-sm text-slate-300 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>مصفوفة هندسة وتعديلة الجذور اللسانية (Albayancor Foundation)</span>
                  </div>
                  <span className="font-mono text-xs bg-amber-950/80 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/40">
                    نواة حراس اللسان
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {LINGUISTIC_ROOT_FORMULAS.map((rf, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRootIndex(idx)}
                      className={`p-4 rounded-xl text-right border transition-all ${
                        selectedRootIndex === idx
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10 scale-[1.02]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-lg font-bold text-amber-400 mb-1">{rf.rootWord}</div>
                      <div className="text-xs font-mono text-slate-400">{rf.lettersFormula}</div>
                    </button>
                  ))}
                </div>

                {LINGUISTIC_ROOT_FORMULAS[selectedRootIndex] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/40 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">الجذر اللساني السيادي</div>
                        <div className="text-2xl font-bold text-amber-400">{LINGUISTIC_ROOT_FORMULAS[selectedRootIndex].rootWord}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-wider">ميزان الاستقرار الجبري</div>
                        <div className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
                          {LINGUISTIC_ROOT_FORMULAS[selectedRootIndex].balanceScale}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">التركيب الحسابي لمتوالية الآحاد التراكمية (Repunit Weights):</span>
                        <div className="font-mono text-xs text-cyan-300 break-all">
                          {LINGUISTIC_ROOT_FORMULAS[selectedRootIndex].totalRepunitWeight}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">البعد الدلالي التأسيسي (Semantic Dimension):</span>
                        <div className="text-slate-200">
                          {LINGUISTIC_ROOT_FORMULAS[selectedRootIndex].semanticDimension}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Tab: Root Network DNS Zones */}
            {activeTab === 'root_zones' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-sm text-slate-300 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <span>جذور شبكة الإنترنت السيادية وعقد النطاقات الأساسية (Root DNS Authority)</span>
                  </div>
                  <span className="font-mono text-xs bg-cyan-950/80 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                    DoH • RFC 8484 • NIST PQC
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SOVEREIGN_ROOT_ZONES.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-mono font-extrabold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-500/30">
                            {zone.tld}
                          </span>
                          <span className="text-xs font-semibold text-slate-300">{zone.rootAuthority}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                          {zone.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {zone.description}
                      </p>

                      <div className="pt-2 border-t border-slate-900 text-[11px] font-mono space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>البروتوكول:</span>
                          <span className="text-slate-200">{zone.protocol}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>تشفير المقاومة الكمومية:</span>
                          <span className="text-cyan-300">{zone.quantumCipher}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>غطاء الذهب والسيادة:</span>
                          <span className="text-amber-400">{zone.goldReserveBacking}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: 18 Matrix */}
            {activeTab === 'matrix18' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 flex justify-between items-center">
                  <span>المصفوفة الفركتالية الهرمية المزدوجة (18 / 2 = 9)</span>
                  <span className="font-mono text-amber-400 font-bold">18 Ranks Balance</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Positive +9 */}
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-3">
                    <h3 className="text-sm font-bold text-cyan-400 flex items-center justify-between">
                      <span>القطب الصاعد الموجب (+9)</span>
                      <span className="font-mono text-xs bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">+1 to +111111111</span>
                    </h3>
                    <div className="space-y-2 font-mono text-sm">
                      {MATRIX_18_RANKS.map((r) => (
                        <div key={r.rank} className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-xs">رتبة {r.rank}</span>
                          <span className="text-cyan-300 font-bold">{r.positiveRepunit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Negative -9 */}
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-3">
                    <h3 className="text-sm font-bold text-amber-400 flex items-center justify-between">
                      <span>القطب النازل الضابط (-9)</span>
                      <span className="font-mono text-xs bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">-1 to -111111111</span>
                    </h3>
                    <div className="space-y-2 font-mono text-sm">
                      {MATRIX_18_RANKS.map((r) => (
                        <div key={r.rank} className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-xs">رتبة {r.rank}</span>
                          <span className="text-amber-300 font-bold">{r.negativeRepunit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: 28 Alphabet Matrix */}
            {activeTab === 'matrix28' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 flex justify-between items-center">
                  <span>مصفوفة حروف اللسان العربي الـ 28 المربوطة بمتوالية الواحدية التراكمية</span>
                  <span className="font-mono text-emerald-400 font-bold">28 Repunit Matrix</span>
                </div>

                <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
                  {ALPHABET_28_LETTERS.map((letter) => {
                    const mapping = MATRIX_28_MAP[letter];
                    const isSelected = selectedLetter === letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`p-3 rounded-xl flex flex-col items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="text-xl font-bold">{letter}</span>
                        <span className="text-[10px] font-mono text-slate-500">{mapping.order}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedLetter && MATRIX_28_MAP[selectedLetter] && (
                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl font-bold text-amber-400">
                          {selectedLetter}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-200">
                            الحرف {MATRIX_28_MAP[selectedLetter].order} في مصفوفة اللسان
                          </div>
                          <div className="text-xs text-slate-400">
                            الوزن الميزاني: {MATRIX_28_MAP[selectedLetter].weightGrams} جرام ذهب
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-500">متوالية الآحاد التراكمية</span>
                        <div className="text-lg font-mono font-bold text-emerald-400">
                          {MATRIX_28_MAP[selectedLetter].repunit}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400">
                      يُمثل الحرف «{selectedLetter}» رتبة بناء هندسية مكونة من ({MATRIX_28_MAP[selectedLetter].order}) آحاد متصلة، تضمن عدم فقدان المعنى أو تشتيته في احتمالات عشوائية.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
            <span>Web4ANHK Symbolic Engine • OS Almahdi 256</span>
            <span>الحق والعدد • بدون صفر وهمي</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
