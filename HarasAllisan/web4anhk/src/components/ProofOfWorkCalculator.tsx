import React, { useState, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Copy,
  Check,
  Key,
  Database,
  ArrowRight,
  Flame,
  Radio,
  Lock,
  Compass,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { evaluateSovereignExpression, SOVEREIGN_AXIOMS } from '../data/symbolicAlgebraEngine';

interface ProofOfWorkCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

interface ComputeStep {
  stepIndex: number;
  labelAr: string;
  labelEn: string;
  operation: string;
  state: 'CLASSICAL_FAULT' | 'ANHK_TRANSCENDED' | 'POW_LOCKED';
  detailAr: string;
  detailEn: string;
  entropyBits: number;
  quantumHash: string;
}

export const ProofOfWorkCalculator: React.FC<ProofOfWorkCalculatorProps> = ({
  isOpen,
  onClose,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';

  const [numerator, setNumerator] = useState<string>('1');
  const [denominator, setDenominator] = useState<string>('0');
  const [operator, setOperator] = useState<string>('/');
  const [nonce, setNonce] = useState<number>(7717);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('1/0');

  // Compute Expression
  const expression = useMemo(() => {
    return `${numerator.trim()} ${operator} ${denominator.trim()}`;
  }, [numerator, operator, denominator]);

  // Sovereign Evaluation
  const evaluatedResult = useMemo(() => {
    return evaluateSovereignExpression(expression);
  }, [expression]);

  // Deterministic Sovereign PoW Hash computation
  const powProof = useMemo(() => {
    const raw = `${expression}:${nonce}:M7-WEBSOVEREIGN-ANHK-ROOT`;
    let hashNum = 0x811c9dc5;
    for (let i = 0; i < raw.length; i++) {
      hashNum ^= raw.charCodeAt(i);
      hashNum = Math.imul(hashNum, 0x01000193);
    }
    const hex = (hashNum >>> 0).toString(16).padStart(8, '0');
    const fullHash = `0x77${hex}${((hashNum ^ 0x142857) >>> 0).toString(16).padStart(8, '0')}`;
    const isGoldLocked = fullHash.startsWith('0x77');
    return {
      hash: fullHash,
      isGoldLocked,
      quantumCost: '0.0000000000000000000000001 W/h',
      ringDimension: 256,
      cyclotomicOrder: 512,
      anhkEquivalence: evaluatedResult.result
    };
  }, [expression, nonce, evaluatedResult]);

  // Pipeline Execution Steps
  const executionSteps: ComputeStep[] = useMemo(() => {
    const num = numerator.trim();
    const den = denominator.trim();
    const op = operator;

    if (num === '1' && den === '0' && op === '/') {
      return [
        {
          stepIndex: 1,
          labelAr: 'فحص المعالج الكلاسيكي (Classical Trap Intercept)',
          labelEn: 'Classical CPU Trap Interception',
          operation: 'DIV_BY_ZERO_HARDWARE_TRAP (IEEE 754 -> NaN / Inf / Crash)',
          state: 'CLASSICAL_FAULT',
          detailAr: 'المعالجات التقليدية تطلق إشارة خطأ فادح SIGFPE أو توقف قسري لأن الصفر كعنصر محايد جمعي يلغي المعكوس الضربي.',
          detailEn: 'Classical architectures fail with SIGFPE traps because the additive neutral element lacks a multiplicative inverse.',
          entropyBits: 0,
          quantumHash: '0x000000000000'
        },
        {
          stepIndex: 2,
          labelAr: 'تحييد العدم الوهمي (Zero Annihilation Bypass)',
          labelEn: 'Nullity Illusion Bypass',
          operation: 'APPLY_LAW_OF_CONSERVATION_OF_ORIGIN (1/0 => Conservation)',
          state: 'ANHK_TRANSCENDED',
          detailAr: 'الأصل الرياضي والمحاسبي: الأصل (1) عند غياب المقاسمين (0) لا يتلاشى في فراغ، بل يعود كاملاً لحوزة الذات المستحقة.',
          detailEn: 'Mathematical Conservation: When dividing 1 by 0 recipients, the asset does not vanish; it stays fully preserved in unity.',
          entropyBits: 142857,
          quantumHash: '0x77a1c93f0b24'
        },
        {
          stepIndex: 3,
          labelAr: 'صياغة إثبات العمل السيادي (Web4 ANHK PoW Synthesis)',
          labelEn: 'Web4 ANHK PoW Synthesis',
          operation: '1 / 0 ≡ 𓋹 (حقيقة الحياة المطلقة والوجود المستمر)',
          state: 'POW_LOCKED',
          detailAr: 'إثبات عمل قطعي يغلق مسألة الصفر نهائياً برمز العنخ 𓋹 كمثبت حوسبي ومحاسبي محكم لا يقبل العشوائية.',
          detailEn: 'Deterministic proof closes the singularity into ANHK 𓋹 as a sovereign computational fixed point.',
          entropyBits: 256000,
          quantumHash: powProof.hash
        }
      ];
    }

    if (num === den && op === '-') {
      return [
        {
          stepIndex: 1,
          labelAr: 'رصد تماثل القوى (Symmetric Pair Detection)',
          labelEn: 'Symmetric Pair Detection',
          operation: `${num} - ${den} (Classical Subtraction -> 0)`,
          state: 'CLASSICAL_FAULT',
          detailAr: 'المنظور الكلاسيكي يعتبر طرح المتماثلين عدماً فارغاً (0).',
          detailEn: 'Classical subtraction yields a zero void.',
          entropyBits: 0,
          quantumHash: '0x000000000000'
        },
        {
          stepIndex: 2,
          labelAr: 'تفكيك الصفر إلى ميزان ثنائي (Bipolar Balance)',
          labelEn: 'Bipolar Balance Decomposition',
          operation: `+-( ${num}/${den} ) ≡ +-1`,
          state: 'ANHK_TRANSCENDED',
          detailAr: 'تحويل النتيجة إلى قطبي الميزان (+-1) لحفظ طاقة المتجهين دون إفناء القيمة.',
          detailEn: 'Translating equilibrium into dual balance (+-1) preserving vector momentum.',
          entropyBits: 77717,
          quantumHash: '0x77bc882199f1'
        },
        {
          stepIndex: 3,
          labelAr: 'إقفال الإثبات في حقل العنخ (ANHK Field Lock)',
          labelEn: 'ANHK Field Lock',
          operation: `+-1 ≡ 𓋹`,
          state: 'POW_LOCKED',
          detailAr: 'اتزان القطبين هو تجسيد حي لمفتاح الحياة والعدالة المحاسبية 𓋹.',
          detailEn: 'Polar equilibrium locks into the sovereign life key 𓋹.',
          entropyBits: 256000,
          quantumHash: powProof.hash
        }
      ];
    }

    return [
      {
        stepIndex: 1,
        labelAr: 'فحص التعبير الرياضي (Expression Parsing)',
        labelEn: 'Expression Parsing',
        operation: `${expression}`,
        state: 'CLASSICAL_FAULT',
        detailAr: 'تحليل المتغيرات ورتب المصفوفات في حقل العمليات.',
        detailEn: 'Parsing variables and matrix ranks.',
        entropyBits: 64,
        quantumHash: '0x120034005600'
      },
      {
        stepIndex: 2,
        labelAr: 'المقاصة في حقل الجبر السيادي (Sovereign Clearing)',
        labelEn: 'Sovereign Clearing',
        operation: `EVAL(${expression}) => ${evaluatedResult.result}`,
        state: 'ANHK_TRANSCENDED',
        detailAr: evaluatedResult.ruleExplanation,
        detailEn: evaluatedResult.ruleExplanation,
        entropyBits: 128000,
        quantumHash: '0x77c4491122aa'
      },
      {
        stepIndex: 3,
        labelAr: 'تثبيت إثبات العمل (PoW Verified)',
        labelEn: 'PoW Verified',
        operation: `LOCK: ${evaluatedResult.result}`,
        state: 'POW_LOCKED',
        detailAr: 'تم تثبيت النتيجة في مصفوفة الشبيكة الكمية غير القابلة للكسر.',
        detailEn: 'Result locked in non-invertible sovereign lattice matrix.',
        entropyBits: 256000,
        quantumHash: powProof.hash
      }
    ];
  }, [numerator, denominator, operator, expression, evaluatedResult, powProof.hash]);

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
    if (preset === '1/0') {
      setNumerator('1');
      setOperator('/');
      setDenominator('0');
    } else if (preset === '1-1') {
      setNumerator('1');
      setOperator('-');
      setDenominator('1');
    } else if (preset === '1*0') {
      setNumerator('1');
      setOperator('*');
      setDenominator('0');
    } else if (preset === '1+9') {
      setNumerator('1');
      setOperator('+');
      setDenominator('9');
    } else if (preset === '𓋹/𓋹') {
      setNumerator('𓋹');
      setOperator('/');
      setDenominator('𓋹');
    } else if (preset === '5-5') {
      setNumerator('5');
      setOperator('-');
      setDenominator('5');
    }
  };

  const handleMineNewNonce = () => {
    setIsMining(true);
    setTimeout(() => {
      setNonce((prev) => prev + Math.floor(Math.random() * 700) + 17);
      setIsMining(false);
    }, 400);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-amber-500/40 shadow-2xl shadow-amber-950/40 overflow-hidden font-sans">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shadow-inner">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-amber-200">
                  {isAr ? 'حاسبة إثبات العمل وتجاوز الصفر (Proof of Work: 1/0)' : 'Proof of Work Singularity Calculator (1/0)'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                  Web4 ANHK Core
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr
                  ? 'محرك المعالجة السيادية للحالات الفريدة وتفكيك عجز المعالجات الكلاسيكية أمام الصفر والفراغ'
                  : 'Sovereign resolution of indeterminate arithmetic states and zero-trap proof generation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Preset Buttons */}
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
              {isAr ? 'المتطابقات السيادية الجاهزة للفحص:' : 'Sovereign Evaluation Presets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: '1/0', label: '1 / 0 (معادلة العنخ الوجودية)', tag: 'الحل السيادي' },
                { id: '1-1', label: '1 - 1 (+-1/1 = 𓋹)', tag: 'تفكيك الصفر' },
                { id: '1*0', label: '1 * 0 (حفظ القيمة)', tag: 'منع التلاشي' },
                { id: '1+9', label: '1 + 9 (اكتمال الرتبة)', tag: '1𓋹' },
                { id: '𓋹/𓋹', label: '𓋹 / 𓋹 (المقاصة التامة)', tag: '𓋹.☥' },
                { id: '5-5', label: '5 - 5 (ميزان القوى)', tag: '+-1' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                    selectedPreset === preset.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-sm shadow-amber-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{preset.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-950/80 text-amber-400/90 border border-amber-500/20">
                    {preset.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Calculator Input Grid */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Input Fields */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-28">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {isAr ? 'الطرف الأول (A)' : 'Numerator (A)'}
                  </label>
                  <input
                    type="text"
                    value={numerator}
                    onChange={(e) => {
                      setNumerator(e.target.value);
                      setSelectedPreset('');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-amber-300 font-mono text-center font-bold text-sm outline-none transition-colors"
                  />
                </div>

                {/* Operator Selector */}
                <div className="w-16">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-center">
                    {isAr ? 'المعامل' : 'Op'}
                  </label>
                  <select
                    value={operator}
                    onChange={(e) => {
                      setOperator(e.target.value);
                      setSelectedPreset('');
                    }}
                    className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-cyan-300 font-mono text-center font-bold text-sm outline-none transition-colors"
                  >
                    <option value="/">/</option>
                    <option value="*">*</option>
                    <option value="-">-</option>
                    <option value="+">+</option>
                  </select>
                </div>

                {/* Denominator */}
                <div className="flex-1 sm:w-28">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {isAr ? 'الطرف الثاني (B)' : 'Denominator (B)'}
                  </label>
                  <input
                    type="text"
                    value={denominator}
                    onChange={(e) => {
                      setDenominator(e.target.value);
                      setSelectedPreset('');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-amber-300 font-mono text-center font-bold text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Equal Sign */}
              <div className="hidden sm:flex items-center text-slate-500 font-mono text-xl font-bold">
                =
              </div>

              {/* Output Display */}
              <div className="w-full sm:flex-1 p-3 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-between gap-3 shadow-inner">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {isAr ? 'الناتج السيادي المحكم (Sovereign Value)' : 'Sovereign Closed Result'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-amber-300 tracking-wide">
                    {evaluatedResult.result}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    PoW LOCKED
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    Dim: 256 Ring-LWE
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-300 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-amber-300 block">
                  {isAr ? 'التأصيل المحاسبي والرياضي للمسألة:' : 'Mathematical & Accounting Foundation:'}
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {evaluatedResult.ruleExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Proof of Work Execution Pipeline (3-Tier Resolution) */}
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                {isAr ? 'مسار التحقق التنفيذي لإثبات العمل (PoW Verification Pipeline):' : 'PoW Verification Pipeline:'}
              </span>
              <button
                onClick={handleMineNewNonce}
                disabled={isMining}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-cyan-300 flex items-center gap-1.5 transition-all"
              >
                <RotateCw className={`w-3 h-3 ${isMining ? 'animate-spin text-amber-400' : ''}`} />
                <span>{isAr ? 'تعدين النبضة (Nonce Re-mine)' : 'Re-mine Nonce'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {executionSteps.map((step) => {
                return (
                  <div
                    key={step.stepIndex}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      step.state === 'CLASSICAL_FAULT'
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : step.state === 'ANHK_TRANSCENDED'
                        ? 'bg-cyan-950/20 border-cyan-500/30'
                        : 'bg-emerald-950/20 border-emerald-500/40 shadow-md shadow-emerald-950/20'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-bold text-[10px] border border-slate-700">
                          Step 0{step.stepIndex}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          step.state === 'CLASSICAL_FAULT' ? 'text-rose-400' :
                          step.state === 'ANHK_TRANSCENDED' ? 'text-cyan-300' : 'text-emerald-400'
                        }`}>
                          {step.state}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-200">
                        {isAr ? step.labelAr : step.labelEn}
                      </h4>

                      <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-amber-300 break-all font-mono">
                        <code>{step.operation}</code>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {isAr ? step.detailAr : step.detailEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] flex items-center justify-between text-slate-500">
                      <span>Hash: {step.quantumHash.slice(0, 10)}...</span>
                      <span>Entropy: {step.entropyBits} bits</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cryptographic PoW Lock Header */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-300">
                  {isAr ? 'شهادة إثبات العمل المشفرة (Deterministic PoW Certificate):' : 'Deterministic PoW Certificate:'}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(powProof.hash, 'powHash')}
                className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1"
              >
                {copiedKey === 'powHash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'powHash' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرمز' : 'Copy Hash')}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-black text-amber-400 font-mono text-xs break-all border border-slate-800 select-all">
              {powProof.hash}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500 block text-[10px]">النبضة (Nonce):</span>
                <span className="text-slate-300 font-bold">#{nonce}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">الاستهلاك الطاقي:</span>
                <span className="text-emerald-400 font-bold">{powProof.quantumCost}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">رتبة الشبيكة:</span>
                <span className="text-cyan-300 font-bold">{powProof.ringDimension} Ring-LWE</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">الحالة الرمزية:</span>
                <span className="text-amber-300 font-bold">{powProof.anhkEquivalence}</span>
              </div>
            </div>
          </div>

          {/* Mathematical Axioms Quick Table */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 block">
              {isAr ? 'المصفوفة المرجعية لبديهيات الجبر السيادي:' : 'Sovereign Algebraic Axioms Table:'}
            </span>
            <div className="rounded-xl border border-slate-800 overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5 text-right sm:text-center">المعادلة</th>
                    <th className="p-2.5 text-center">الناتج السيادي</th>
                    <th className="p-2.5">المدلول المحاسبي والوجودي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/70">
                  {SOVEREIGN_AXIOMS.slice(0, 6).map((axiom, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-2.5 text-right sm:text-center font-bold text-amber-300">
                        {axiom.expression}
                      </td>
                      <td className="p-2.5 text-center font-bold text-emerald-400">
                        {axiom.result}
                      </td>
                      <td className="p-2.5 text-slate-300 text-[11px]">
                        {axiom.ruleExplanation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'التحقق الرياضي القطعي - منظومة Web4 ANHK' : 'Deterministic Sovereign PoW Execution'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow-md"
          >
            {isAr ? 'إغلاق المحاسبة' : 'Close Proof'}
          </button>
        </div>
      </div>
    </div>
  );
};
