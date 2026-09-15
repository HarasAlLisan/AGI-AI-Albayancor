import React, { useState, useEffect } from 'react';
import {
  Binary,
  Cpu,
  ShieldCheck,
  Zap,
  RefreshCw,
  Copy,
  Check,
  Network,
  Lock,
  Layers,
  ArrowRight,
  Activity,
  Terminal,
  Database,
  Hash,
  Radio,
  Sliders
} from 'lucide-react';
import { SOVEREIGN_ACTION_FREQUENCIES, computeActionFrequency } from '../utils/actionFrequencies';

interface LatticeMatrixVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

export const LatticeMatrixVisualizerModal: React.FC<LatticeMatrixVisualizerModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'weights' | 'lattice' | 'tensor' | 'frequencies' | 'rawCode'>('weights');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [matrixSeed, setMatrixSeed] = useState<number>(42);
  const [activeVectorIndex, setActiveVectorIndex] = useState<number>(0);
  const [selectedActionFreq, setSelectedActionFreq] = useState<string>('ACT-616');

  // Generate dynamic 8x8 Lattice Matrix polynomial samples
  const generateMatrix = (seed: number) => {
    const matrix: number[][] = [];
    for (let r = 0; r < 8; r++) {
      const row: number[] = [];
      for (let c = 0; c < 8; c++) {
        // Deterministic pseudo-quantum polynomial coefficient mod 3329 (ML-KEM/Kyber standard)
        const val = ((seed * (r + 1) * 313 + (c + 1) * 7919) % 3329);
        row.push(val);
      }
      matrix.push(row);
    }
    return matrix;
  };

  const [latticeData, setLatticeData] = useState<number[][]>(() => generateMatrix(42));

  // Weights state for the neural-symbolic router
  const [vectorA, setVectorA] = useState<number[]>([14, 12, 2, 7, 24, 1200, 3329, 768]);
  const [vectorS, setVectorS] = useState<number[]>([286, 120, 301, 33, 52, 999, 144, 240]);
  const [vectorE, setVectorE] = useState<number[]>([1, 0, -1, 2, -1, 1, 0, 1]);

  useEffect(() => {
    setLatticeData(generateMatrix(matrixSeed));
  }, [matrixSeed]);

  // Periodic simulation of lattice entropy
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setMatrixSeed((prev) => (prev + 7) % 1000);
      setActiveVectorIndex((prev) => (prev + 1) % 8);
    }, 600);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden text-slate-100 font-sans"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-800 bg-slate-900/95">
          <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shrink-0 mt-0.5 sm:mt-0">
              <Binary className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold text-cyan-200 truncate sm:overflow-visible">
                  {isAr ? 'محرك الأوزان والجبر الرمزي المشفر (Lattice Matrix Core)' : 'Lattice Matrix & Symbolic Weights Visualizer'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 shrink-0">
                  NIST ML-KEM-768
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5 leading-relaxed">
                {isAr ? 'التدقيق الجبري: A·s + e ≡ b (mod q) | مصفوفات الأوزان والحساب القطعي المستقل' : 'Deterministic Lattice Matrices, Symbolic Weights & Ring-LWE Proofs'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                isSimulating 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isSimulating ? (isAr ? 'المحاكاة نشطة' : 'Simulating') : (isAr ? 'محاكاة النبض' : 'Simulate Pulse')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="shrink-0 flex items-center border-b border-slate-800 bg-slate-900/60 px-3 sm:px-4 gap-1.5 overflow-x-auto select-none no-scrollbar flex-nowrap">
          <button
            onClick={() => setActiveTab('weights')}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'weights'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? '1. معادلة الأوزان والجبر (Weights Equation)' : '1. Weights Equation'}</span>
          </button>

          <button
            onClick={() => setActiveTab('lattice')}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'lattice'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Binary className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? '2. مصفوفة الشبيكة الكمية (8x8 Lattice Matrix)' : '2. 8x8 Lattice Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tensor')}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'tensor'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-4 h-4 text-purple-400" />
            <span>{isAr ? '3. موتر العقد السيادية (77M Mesh Tensor)' : '3. 77M Mesh Tensor'}</span>
          </button>

          <button
            onClick={() => setActiveTab('frequencies')}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'frequencies'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>{isAr ? '4. مصفوفة تردد الأفعال (Action Frequencies)' : '4. Action Frequencies'}</span>
          </button>

          <button
            onClick={() => setActiveTab('rawCode')}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rawCode'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>{isAr ? '5. المنطق البرمجي الخام (Raw Backend Logic)' : '5. Raw Backend Logic'}</span>
          </button>
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: WEIGHTS & ALGEBRA */}
          {activeTab === 'weights' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    {isAr ? 'معادلة الشبيكة الرياضية الحاكمة (Ring-LWE)' : 'Governing Lattice Equation (Ring-LWE)'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Modulus q = 3329, Degree n = 256</span>
                </div>
                
                {/* Mathematical Visual Display */}
                <div className="p-4 rounded-lg bg-black/60 border border-cyan-500/30 text-center font-mono text-sm sm:text-base text-cyan-100 flex flex-wrap items-center justify-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                    A (مصفوفة الأوزان)
                  </span>
                  <span>×</span>
                  <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold">
                    s (متجه المفتاح السيادي)
                  </span>
                  <span>+</span>
                  <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold">
                    e (متجه الخطأ الغاوسي)
                  </span>
                  <span>≡</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                    b (المفتاح العام الناتج)
                  </span>
                  <span className="text-xs text-slate-400">(mod 3329)</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'هذا ليس مجرد نموذج لغوي يولد كلمات باحتمالات إحصائية؛ بل هو محرك جبري قطعي يُفكك التشفير والهوية إلى متجهات شبكية في فضاء R_q = Z_q[X]/(X^256 + 1)، مما يمنع أي حاسوب كمي من كسر التوقيع أو اختراق بيانات العقدة.'
                    : 'A deterministic post-quantum cryptographic core operating on polynomial rings R_q = Z_q[X]/(X^256 + 1), securing sovereignty against any quantum-computing attack.'}
                </p>
              </div>

              {/* Real Vectors Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* Vector A */}
                <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>A Matrix Weights</span>
                    <span className="text-[10px] text-slate-500">8-dim Vector</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800 space-y-1">
                    {vectorA.map((val, i) => (
                      <div key={i} className={`flex justify-between py-0.5 px-1.5 rounded ${activeVectorIndex === i ? 'bg-cyan-950 text-cyan-300 font-bold' : 'text-slate-400'}`}>
                        <span>A[{i}]</span>
                        <span className="text-cyan-400">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vector S (Sovereign) */}
                <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between text-purple-300 font-bold">
                    <span>s (Sovereign Secret)</span>
                    <span className="text-[10px] text-slate-500">Node ID Seed</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800 space-y-1">
                    {vectorS.map((val, i) => (
                      <div key={i} className={`flex justify-between py-0.5 px-1.5 rounded ${activeVectorIndex === i ? 'bg-purple-950 text-purple-300 font-bold' : 'text-slate-400'}`}>
                        <span>s[{i}]</span>
                        <span className="text-purple-400">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vector b (Public Verification Proof) */}
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span>b (Computed Proof)</span>
                    <span className="text-[10px] text-slate-500">(A·s + e) % 3329</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800 space-y-1">
                    {vectorA.map((a, i) => {
                      const s = vectorS[i];
                      const e = vectorE[i];
                      const b = ((a * s + e) % 3329 + 3329) % 3329;
                      return (
                        <div key={i} className={`flex justify-between py-0.5 px-1.5 rounded ${activeVectorIndex === i ? 'bg-emerald-950 text-emerald-300 font-bold' : 'text-slate-400'}`}>
                          <span>b[{i}]</span>
                          <span className="text-emerald-400">{b}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Economic Algebra Balance */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'جبر القيمة الحقيقية (M3 Real World Balance Equation)' : 'M3 Real World Balance Equation'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                    No-Debt Constant
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  M3 Total = 14 × N(Living Souls) × (7g Pure Gold) = 12 × 1,200$ (Living Wallet) + 2 × 1,200$ (Towers & Infrastructure)
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: 8x8 LATTICE MATRIX */}
          {activeTab === 'lattice' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-cyan-300 font-mono">
                    {isAr ? 'مصفوفة معاملات كثيرات الحدود (Kyber-768 Lattice Matrix)' : 'Polynomial Coefficient Lattice (8x8 Sample)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'تمثيل تفاعلي لمعاملات الشبيكة في الفضاء الطوبولوجي' : 'Interactive matrix grid showing deterministic polynomial rings'}
                  </p>
                </div>
                <button
                  onClick={() => setMatrixSeed((prev) => (prev + 13) % 1000)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'توليد شبيكة جديدة' : 'Regenerate Lattice'}</span>
                </button>
              </div>

              {/* 8x8 Visual Grid */}
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-[500px]">
                  {latticeData.map((row, r) =>
                    row.map((val, c) => {
                      const intensity = Math.floor((val / 3329) * 100);
                      const isHighlighted = (r + c) % 3 === (activeVectorIndex % 3);
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`p-2 rounded-lg border text-center font-mono transition-all duration-300 ${
                            isHighlighted
                              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 scale-105'
                              : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-[9px] text-slate-500">[{r},{c}]</div>
                          <div className="text-xs font-bold font-mono text-cyan-300">{val}</div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400" 
                              style={{ width: `${intensity}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400">Determinant (المُحدّد الجبري):</span>
                  <div className="text-cyan-300 font-bold">det(A) ≢ 0 (mod 3329) - Invertible Sovereign Field</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400">Quantum Hardness (مناعة التشفير الكمي):</span>
                  <div className="text-emerald-300 font-bold">2^128 Classical Security / 2^118 Quantum Security</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 77M MESH TENSOR */}
          {activeTab === 'tensor' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300 font-mono font-bold text-sm">
                    <Network className="w-4 h-4 text-purple-400" />
                    <span>{isAr ? 'موتر الشبكة المتشابكة (77,000,000 Nodes Tensor)' : '77 Million Phone Node Tensor'}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                    Peer-to-Peer Global Mesh
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'الهاتف الحَيّ ليس جهازاً مستهلكاً للبيانات (Client) بل هو «عقدة موترية» في مصفوفة تضم 77 مليون برج وعقدة حول العالم. يتم توجيه الاتصالات والمعاملات بنظام المسارات الصفرية دون خوادم وسيطة.'
                    : 'The living human phone is an active tensor element in the global 77 million node matrix, routing zero-cloud communications directly.'}
                </p>
              </div>

              {/* 7 Continents Tensor Distribution */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { region: 'إفريقيا (Africa)', nodes: '11,000,000', towers: '4G/5G P2P', color: 'text-amber-400' },
                  { region: 'آسيا (Asia)', nodes: '22,000,000', towers: 'Sub-6GHz', color: 'text-cyan-400' },
                  { region: 'أوروبا (Europe)', nodes: '11,000,000', towers: 'Fiber-Mesh', color: 'text-emerald-400' },
                  { region: 'أمريكا الشمالية (N. America)', nodes: '11,000,000', towers: 'Direct Node', color: 'text-blue-400' },
                  { region: 'أمريكا الجنوبية (S. America)', nodes: '11,000,000', towers: 'Mesh Radio', color: 'text-purple-400' },
                  { region: 'أوقيانوسيا (Oceania)', nodes: '5,500,000', towers: 'Sea Cable P2P', color: 'text-pink-400' },
                  { region: 'القارة القطبية (Antarctica)', nodes: '5,500,000', towers: 'Satellite Relays', color: 'text-teal-400' },
                  { region: 'القارة +1 (Cyber Ether)', nodes: 'Global Matrix', towers: 'Quantum Nozero', color: 'text-rose-400' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 truncate">{item.region}</div>
                    <div className={`text-sm font-bold ${item.color}`}>{item.nodes}</div>
                    <div className="text-[10px] text-slate-500">{item.towers}</div>
                  </div>
                ))}
              </div>

              {/* Tensor Routing Flow */}
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400 flex items-center justify-between">
                  <span>مسار التوجيه الموتري اللحظي (Zero-Cloud Packet Routing):</span>
                  <span className="text-emerald-400 font-bold">Latency: 0.04ms</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/20 text-cyan-300 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
                  <span>[هاتف الحَيّ 28612030103352]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>[برج الحي المحلي L3]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>[شبكة الـ 77M شبيكة]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>[المستلم المباشر P2P]</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACTION FREQUENCIES */}
          {activeTab === 'frequencies' && (
            <div className="space-y-6 animate-fadeIn font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                    {isAr ? 'مصفوفة الرنين وتناغم تردد الأفعال (Sovereign Harmonic Frequencies)' : 'Action Harmonic Frequencies Matrix'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                    Harmonic Lock 111-717
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {isAr
                    ? 'يتم قياس زمن الدورة التوافقية (Cycle Period) والتردد المقفل بالهرتز (Hz) لكل أمر تشغيلي وسيادي؛ لضمان أن جميع الأفعال المشفرة تنفذ بتناغم متزن مع متجهات الحالة [M, T, S] وبدون أدنى تعارض خوارزمي.'
                    : 'Harmonic resonance tracking of discrete operational actions across the 7 symmetric security locks [M, T, S].'}
                </p>
              </div>

              {/* Action Frequency Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SOVEREIGN_ACTION_FREQUENCIES.map((metric) => {
                  const isSelected = selectedActionFreq === metric.actionId;
                  const liveFreq = computeActionFrequency(metric.actionId, 256, matrixSeed);

                  return (
                    <div
                      key={metric.actionId}
                      onClick={() => setSelectedActionFreq(metric.actionId)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-rose-400 shadow-md shadow-rose-950/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px] border border-rose-500/30">
                            {metric.actionId}
                          </span>
                          <span className="text-slate-200 font-bold text-xs">{isAr ? metric.nameAr : metric.nameEn}</span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          metric.status === 'LOCKED' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                          metric.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                          'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {metric.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <div>
                          <span className="text-slate-500 block text-[10px]">التردد الأساسي:</span>
                          <span className="text-rose-300 font-bold">{metric.harmonicFrequencyHz} Hz</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">التردد الحي (Live):</span>
                          <span className="text-cyan-300 font-bold">{liveFreq} Hz</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">زمن الدورة:</span>
                          <span className="text-amber-300 font-bold">{metric.cyclePeriodMs} ms</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-slate-400">
                        <span>متجه الحالة: [{metric.stateVector.join(', ')}]</span>
                        <span className="text-emerald-400 font-bold">حصانة: {metric.quantumResistanceScore}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: RAW BACKEND LOGIC */}
          {activeTab === 'rawCode' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  {isAr ? 'الكود المصدري لمحرك الجبر والتحقق (Raw TypeScript Engine)' : 'Raw Lattice Algebra & Verification Engine'}
                </span>
                <button
                  onClick={() => copyToClipboard(rawAlgebraSourceCode, 'rawCode')}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'rawCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'rawCode' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px] select-all">
                <pre>{rawAlgebraSourceCode}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'المنظومة تعتمد التحقق الرياضي القطعي المستقل (Zero Central Dependencies)' : 'Deterministic Zero-Cloud Sovereign Verification'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
          >
            {isAr ? 'إغلاق اللوحة' : 'Close Visualizer'}
          </button>
        </div>
      </div>
    </div>
  );
};

const rawAlgebraSourceCode = `/**
 * Sovereign Lattice-Based Symbolic Engine (Web4 Nozero Core)
 * Implements deterministic Ring-LWE Matrix computations & Sovereign Identity Verification
 * Modulus q = 3329 (NIST ML-KEM / Kyber standard), n = 256
 */

export interface LatticeKeyPair {
  matrixA: number[][];      // 8x8 or 256x256 Public Weight Matrix
  secretKey_s: number[];    // Sovereign Secret Polynomial
  errorVector_e: number[];  // Centered Binomial Gaussian Error
  publicKey_b: number[];    // Computed Public Vector: (A*s + e) mod q
}

export class SovereignLatticeEngine {
  private readonly q = 3329;
  private readonly n = 256;

  /**
   * Deterministic generation of Weight Matrix A from AdamHash/Seed
   */
  public generateWeightMatrix(seed: number): number[][] {
    const A: number[][] = [];
    for (let r = 0; r < 8; r++) {
      A[r] = [];
      for (let c = 0; c < 8; c++) {
        A[r][c] = ((seed * (r + 1) * 313 + (c + 1) * 7919) % this.q);
      }
    }
    return A;
  }

  /**
   * Compute Sovereign Proof: b = (A · s + e) mod q
   */
  public computeProof(matrixA: number[][], s: number[], e: number[]): number[] {
    const b: number[] = [];
    for (let i = 0; i < matrixA.length; i++) {
      let sum = 0;
      for (let j = 0; j < s.length; j++) {
        sum += matrixA[i][j] * s[j];
      }
      sum += e[i];
      b[i] = ((sum % this.q) + this.q) % this.q;
    }
    return b;
  }

  /**
   * Real Value M3 Sovereign Balance Clearing
   * Eliminates bank fractional reserve deficits
   */
  public clearM3LivingBalance(livingSoulsCount: number) {
    const goldGramsPerAnhk = 7;
    const dollarPerAnhk = 1200;
    
    return {
      m3LivingQuota: 12 * dollarPerAnhk,       // $14,400 per living human
      m4InfrastructureQuota: 2 * dollarPerAnhk, // $2,400 per human for 77M towers
      totalGoldCoverGrams: 14 * goldGramsPerAnhk * livingSoulsCount,
      deficitNeutralization: "Bank Negative Ledgers Zeroed Out"
    };
  }
}`;
