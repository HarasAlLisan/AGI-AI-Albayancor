import React, { useState } from 'react';
import { X, ShieldCheck, Cpu, Coins, Lock, Landmark, CheckCircle2, Calculator, DollarSign, Globe2, Layers, Scale, Sparkles, Building2, FileText, CheckSquare, AlertCircle, Printer } from 'lucide-react';
import { ANHK_PROTOCOL_METRICS } from '../data/mockEmails';

interface AnhkProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  onOpen195Countries?: () => void;
}

interface CountryNode {
  id: string;
  flag: string;
  nameAr: string;
  nameEn: string;
  currencyNameAr: string;
  currencyNameEn: string;
  currencySymbol: string;
  pop: number;
  fxRateToUSD: number; // local fiat units per 1 USD
  nationalIdDigits?: number;
  isExemplar?: boolean;
  sourceCode?: string;
}

const COUNTRY_NODES: CountryNode[] = [
  {
    id: 'libya_cbe7',
    flag: '🇱🇾',
    nameAr: 'ليبيا (7,539,851 حي • 1$ = 6.4226 د.ل [cbe7])',
    nameEn: 'Libya (7,539,851 living • $1 = 6.4226 LYD [cbe7])',
    currencyNameAr: 'دينار ليبي',
    currencyNameEn: 'Libyan Dinar',
    currencySymbol: 'LYD (د.ل)',
    pop: 7539851,
    fxRateToUSD: 6.4226,
    sourceCode: 'cbe7',
    isExemplar: true,
  },
  {
    id: 'egypt_5393',
    flag: '🇪🇬',
    nameAr: 'مصر (107M حي • 1$ = 50.527 ج.م [5393])',
    nameEn: 'Egypt (107M living • $1 = 50.527 EGP [5393])',
    currencyNameAr: 'جنيه مصري',
    currencyNameEn: 'Egyptian Pound',
    currencySymbol: 'EGP (ج.م)',
    pop: 107000000,
    fxRateToUSD: 50.527,
    sourceCode: '5393',
    nationalIdDigits: 14,
    isExemplar: true,
  },
  {
    id: 'iraq_18ef',
    flag: '🇮🇶',
    nameAr: 'العراق (46M حي • 1$ = 1,304.23 د.ع [18ef])',
    nameEn: 'Iraq (46M living • $1 = 1,304.23 IQD [18ef])',
    currencyNameAr: 'دينار عراقي',
    currencyNameEn: 'Iraqi Dinar',
    currencySymbol: 'IQD (د.ع)',
    pop: 46000000,
    fxRateToUSD: 1304.23,
    sourceCode: '18ef',
  },
  {
    id: 'saudi_01d1',
    flag: '🇸🇦',
    nameAr: 'السعودية (36.5M • 1$ = 3.7492 ر.س [01d1])',
    nameEn: 'Saudi Arabia (36.5M • $1 = 3.7492 SAR [01d1])',
    currencyNameAr: 'ريال سعودي',
    currencyNameEn: 'Saudi Riyal',
    currencySymbol: 'SAR (ر.س)',
    pop: 36500000,
    fxRateToUSD: 3.7492,
    sourceCode: '01d1',
  },
  {
    id: 'algeria',
    flag: '🇩🇿',
    nameAr: 'الجزائر (46M • 1$ = 133.00 د.ج)',
    nameEn: 'Algeria (46M • $1 = 133.00 DZD)',
    currencyNameAr: 'دينار جزائري',
    currencyNameEn: 'Algerian Dinar',
    currencySymbol: 'DZD (د.ج)',
    pop: 46000000,
    fxRateToUSD: 133.00,
  },
  {
    id: 'tunisia',
    flag: '🇹🇳',
    nameAr: 'تونس (12.5M • 1$ = 2.922 د.ت)',
    nameEn: 'Tunisia (12.5M • $1 = 2.922 TND)',
    currencyNameAr: 'دينار تونسي',
    currencyNameEn: 'Tunisian Dinar',
    currencySymbol: 'TND (د.ت)',
    pop: 12500000,
    fxRateToUSD: 2.922,
  },
  {
    id: 'morocco',
    flag: '🇲🇦',
    nameAr: 'المغرب (37.8M • 1$ = 9.2946 د.م)',
    nameEn: 'Morocco (37.8M • $1 = 9.2946 MAD)',
    currencyNameAr: 'درهم مغربي',
    currencyNameEn: 'Moroccan Dirham',
    currencySymbol: 'MAD (د.م)',
    pop: 37800000,
    fxRateToUSD: 9.2946,
  },
  {
    id: 'turkey',
    flag: '🇹🇷',
    nameAr: 'تركيا (86M • 1$ = 46.8238 ليرة)',
    nameEn: 'Turkey (86M • $1 = 46.8238 TRY)',
    currencyNameAr: 'ليرة تركية',
    currencyNameEn: 'Turkish Lira',
    currencySymbol: 'TRY (₺)',
    pop: 86000000,
    fxRateToUSD: 46.8238,
  },
  {
    id: 'poland',
    flag: '🇵🇱',
    nameAr: 'بولندا (38M • 1$ = 3.7875 زلوتي)',
    nameEn: 'Poland (38M • $1 = 3.7875 PLN)',
    currencyNameAr: 'زلوتي بولندي',
    currencyNameEn: 'Polish Zloty',
    currencySymbol: 'PLN (zł)',
    pop: 38000000,
    fxRateToUSD: 3.7875,
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    nameAr: 'بريطانيا (68M • 1 باوند = 1.3387 دولار)',
    nameEn: 'United Kingdom (68M • 1 GBP = $1.3387)',
    currencyNameAr: 'جنيه إسترليني',
    currencyNameEn: 'British Pound',
    currencySymbol: 'GBP (£)',
    pop: 68000000,
    fxRateToUSD: 0.746993,
  },
  {
    id: 'brazil',
    flag: '🇧🇷',
    nameAr: 'البرازيل (213M • 1 عنخ = 6,600 ريال)',
    nameEn: 'Brazil (213M • 1 ANKH = 6,600 BRL)',
    currencyNameAr: 'ريال برازيلي',
    currencyNameEn: 'Brazilian Real',
    currencySymbol: 'BRL (R$)',
    pop: 213000000,
    fxRateToUSD: 5.50,
  },
  {
    id: 'world',
    flag: '🌍',
    nameAr: 'العالم (8.3 مليار حي • 116 مليار عنخ = 139.45 تريليون $)',
    nameEn: 'World Aggregate (8.3B living • 116B ANKH = $139.45T)',
    currencyNameAr: 'دولار أمريكي',
    currencyNameEn: 'US Dollar',
    currencySymbol: 'USD ($)',
    pop: 8300000000,
    fxRateToUSD: 1.0,
  },
];

export const AnhkProtocolModal: React.FC<AnhkProtocolModalProps> = ({ isOpen, onClose, lang, onOpen195Countries }) => {
  const [selectedNode, setSelectedNode] = useState<CountryNode>(COUNTRY_NODES[0]); // Default to Libya 🇱🇾
  const [population, setPopulation] = useState<number>(7539851); // 7,539,851 Libya Census
  const [fxBasketMode, setFxBasketMode] = useState<'single' | 'triple'>('triple');
  const [vaultAuditLocalCash, setVaultAuditLocalCash] = useState<string>(''); // Vault paper count in local currency

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const selectNode = (node: CountryNode) => {
    setSelectedNode(node);
    setPopulation(node.pop);
    setVaultAuditLocalCash('');
  };

  // Exact Mathematical Formulas specified by User:
  // 14 ☥ total = 12 ☥ للحَيّ + 2 ☥ للبنية (أنت + نقاط العتاد المادي في 7 قارات + 1)
  // 2 = ثابت محسوب مخصص على 8 قطاعات لا سلطة عليه (2/8)
  // M3 world = 14 * عدد الأحياء = عدد جنيهات عنخ * 1,200$
  // 1 جنيه عنخ 𓋹 = 1,000,000 نانو عنخ ☥ = 7 جرام ذهب 24k = 1,200 $
  // 1200 / 3 = 400$ + 400 GBP + 400 EUR
  const totalAnhkPounds = 14 * population;
  const livingHumanQuotaTotal = 12 * population; // 12 ☥ for living humans
  const infrastructureQuotaTotal = 2 * population; // 2 ☥ for system + physical hardware nodes
  const nanoAnhkTotal = totalAnhkPounds * 1000000; // 1M Nano ANHK per pound
  const totalGoldGrams24k = totalAnhkPounds * 7; // 7 grams of 24k gold per pound
  const totalUSDValuation = totalAnhkPounds * 1200;

  // Paper Printing Ceiling in Local Fiat Currency (حد طباعة الورق بالعملة الورقية المحلية للبنك المركزي)
  const localPaperPrintingLimit = totalUSDValuation * selectedNode.fxRateToUSD;

  // Vault Audit Deficit Matching Logic in Local Currency (جرد الصناديق بالورق لمطابقة العجز بالعملة المحلية)
  const userVaultLocalNum = Number(vaultAuditLocalCash.replace(/,/g, '')) || 0;
  const auditDeficitLocal = localPaperPrintingLimit - userVaultLocalNum;

  const formatNum = (num: number) => num.toLocaleString(isAr ? 'ar-EG' : 'en-US');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 text-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border-b border-cyan-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xl shadow-inner">
              𓋹
            </div>
            <div>
              <h2 className="font-bold text-base text-cyan-100 flex items-center gap-2">
                {isAr ? 'بروتوكول المقاصة السيادية المظبوطة M5 / M3 / M4' : 'M5 / M3 / M4 Sovereign Clearing Engine'}
              </h2>
              <p className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 flex-wrap">
                <span>web4anhk.anhkmail.anhk</span>
                <span>•</span>
                <span className="text-emerald-300 font-bold">OS Almahdi 256</span>
                <span>•</span>
                <span>AdamHash Golden Block (AGC)</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar text-xs">
          {/* Central Bank Header Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-800/40 space-y-3 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm text-slate-100">
                  {ANHK_PROTOCOL_METRICS.centralBankName}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {isAr ? 'مقاصة مظبوطة - تغطية داخلية بالعملة الوطنية' : 'Autonomous Local Fiat Coverage'}
              </span>
            </div>

            {/* Core Architectural Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-500/40 space-y-1">
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'نظام التشغيل السيادي' : 'Sovereign OS Kernel'}
                </p>
                <p className="font-mono text-emerald-300 font-extrabold text-xs">
                  OS Almahdi 256
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  {isAr ? 'النطاق الجغرافي' : 'Territorial Scope'}
                </p>
                <p className="font-mono text-cyan-300 font-bold text-xs">
                  {ANHK_PROTOCOL_METRICS.continentsScope}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  {isAr ? 'الوزن والعيار النقدي' : 'Gold Standard Spec'}
                </p>
                <p className="font-mono text-amber-300 font-bold text-xs">
                  {ANHK_PROTOCOL_METRICS.goldWeightSpec}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  {isAr ? 'وحدة منصة عنخ' : 'ANHK Platform Trading'}
                </p>
                <p className="font-mono text-purple-300 font-bold text-xs">
                  تداول بالجنيه 𓋹 والنانو ☥
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'العقدة المركزية' : 'Geographic Node'}
                </p>
                <p className="font-mono text-emerald-300 font-bold text-xs flex items-center gap-1">
                  <span>{selectedNode.flag}</span>
                  <span>{selectedNode.currencySymbol}</span>
                </p>
              </div>
            </div>
          </div>

          {/* ANHK Platform Trading Standard Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-cyan-950/70 border border-purple-500/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-900/80 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-base">
                𓋹
              </div>
              <div>
                <p className="font-bold text-xs text-purple-200">
                  {isAr ? 'معيار التداول الرسمي على منصة عنخ الرقمية (ANHK Trading Standard)' : 'ANHK Platform Trading Standard'}
                </p>
                <p className="text-[10px] text-slate-300 font-mono">
                  {isAr
                    ? 'يتم التداول حكماً بوحدات الجنيه عنخ (𓋹) وأجزائه بالنانو عنخ (☥ Nano) حيث 1 جنيه 𓋹 = 1,000,000 نانو ☥.'
                    : 'All platform trading executes in ANHK (𓋹) & Nano ANHK (☥ Nano): 1 ANHK = 1,000,000 Nano.'}
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-slate-950 border border-purple-500/50 text-purple-300 font-mono text-xs font-bold">
              1 𓋹 = 1,000,000 ☥ nano
            </div>
          </div>

          {/* 14 ☥ Rule Breakdown Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-3">
            <h3 className="font-bold text-xs text-cyan-200 flex items-center gap-2 font-mono border-b border-cyan-900/60 pb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              {isAr ? 'معادلة توزيع الـ 14 جنيه عنخ (التقسيم المقاصي المظبوط)' : '14 ANHK Sovereign Allocation Rule'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 12 ☥ for Living Humans */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-700/50 space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-300">{isAr ? '12 ☥ للحَيّ' : '12 ☥ for Living Human'}</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono text-[10px] border border-cyan-800">
                    M3 Net
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-tight">
                  {isAr
                    ? '12 جنيه عنخ مخصصة ومباشرة لكل فرد حَيّ على كوكب الأرض.'
                    : '12 ANHK Pounds allocated directly to each living individual.'}
                </p>
                <p className="text-xs font-mono font-bold text-cyan-200 pt-1 border-t border-slate-800">
                  {formatNum(12)} ☥ / فرد
                </p>
              </div>

              {/* 2 ☥ for Infrastructure */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-700/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-300">{isAr ? '2 ☥ للبنية' : '2 ☥ Infrastructure'}</span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 font-mono text-[10px] border border-purple-800">
                    أنت + نقاط العتاد
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-tight">
                  {isAr
                    ? '2 جنيه عنخ مخصصة للبنية التشغيلية (أنت + نقاط العتاد المادي في الـ 7 قارات + 1).'
                    : '2 ANHK Pounds for core system node + hardware nodes across 7 Continents + 1.'}
                </p>
                <p className="text-xs font-mono font-bold text-purple-200 pt-1 border-t border-slate-800">
                  {formatNum(2)} ☥ / عنصر
                </p>
              </div>

              {/* M4 Fixed 8 Sectors */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-700/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300">{isAr ? '2 = ثابت 2 / 8' : '2 / 8 Fixed Sector'}</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 font-mono text-[10px] border border-amber-800">
                    لا سلطة عليه
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-tight">
                  {isAr
                    ? 'مقدار الـ 2 ثابت محسوب مخصص بدقة على 8 قطاعات رئيسية بدون أي سلطة بشرية أو خروج عن المقاصة.'
                    : 'Fixed, computed allocation split across 8 sectors with zero arbitrary control.'}
                </p>
                <p className="text-xs font-mono font-bold text-amber-200 pt-1 border-t border-slate-800">
                  M4 = 2 / 8
                </p>
              </div>
            </div>
          </div>

          {/* Live Interactive Sovereign Calculator Section */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/80 via-slate-950 to-indigo-950/80 border border-cyan-500/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/40 pb-3">
              <span className="font-bold text-sm text-cyan-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                {isAr ? 'حاسبة التسييل والمقاصة المركزية بحسب دولة العملة' : 'Central Bank Country Node Clearing Calculator'}
              </span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <button
                  onClick={() => setFxBasketMode('single')}
                  className={`px-2 py-0.5 rounded border transition-all ${
                    fxBasketMode === 'single'
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  1 × 1,200 $
                </button>
                <button
                  onClick={() => setFxBasketMode('triple')}
                  className={`px-2 py-0.5 rounded border transition-all ${
                    fxBasketMode === 'triple'
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  3 × 400 $ (USD+GBP+EUR)
                </button>
              </div>
            </div>

            {/* Select Country Central Bank Node */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-xs font-semibold text-slate-300">
                  {isAr ? 'اختر عقدة البنك المركزي الجغرافية (مثبتة بسعر 15 يوليو 2026):' : 'Select Central Bank Country Node (Fixed 15 July 2026):'}
                </label>
                {onOpen195Countries && (
                  <button
                    onClick={onOpen195Countries}
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md border border-emerald-400/50"
                  >
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'عرض مصفوفة الـ 195 دولة كاملة (14 مقفول)' : 'View All 195 Countries Matrix'}</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {COUNTRY_NODES.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => selectNode(node)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border flex items-center gap-2 ${
                      selectedNode.id === node.id
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-cyan-700'
                    }`}
                  >
                    <span className="text-base">{node.flag}</span>
                    <span>{isAr ? node.nameAr : node.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Population Input Field */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{isAr ? 'عدد الأحياء في هذه العقدة:' : 'Living Population in Node:'}</span>
                <span className="font-mono text-cyan-400 font-bold">{formatNum(population)} {isAr ? 'فرد' : 'humans'}</span>
              </div>
              <input
                type="number"
                value={population}
                onChange={(e) => setPopulation(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-700/60 text-cyan-200 font-mono font-bold text-sm outline-none focus:border-cyan-400"
              />
            </div>

            {/* Calculated Output Equations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {/* Box 1: M3 World Total Anhk Pounds */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 space-y-1">
                <p className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  {isAr ? 'M3 world = 14 * عدد الأحياء (إجمالي جنيهات عنخ)' : 'M3 world Total ANHK Pounds (14 * Pop)'}
                </p>
                <p className="text-base font-extrabold text-cyan-200 font-mono">
                  {formatNum(totalAnhkPounds)} <span className="text-cyan-400 text-xs">𓋹 جنيه عنخ</span>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  14 ☥ × {formatNum(population)} = {formatNum(nanoAnhkTotal)} نانو عنخ ☥
                </p>
              </div>

              {/* Box 2: Total Valuation in Local Fiat Currency */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-800/60 space-y-1">
                <p className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {isAr ? `تغطية الورق بالعملة الوطنية (${selectedNode.currencySymbol})` : `Local Fiat Coverage (${selectedNode.currencySymbol})`}
                </p>
                <p className="text-base font-extrabold text-emerald-300 font-mono">
                  {formatNum(localPaperPrintingLimit)} <span className="text-emerald-400 text-xs">{selectedNode.currencySymbol}</span>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  ${formatNum(totalUSDValuation)} USD × {selectedNode.fxRateToUSD} {selectedNode.currencySymbol}
                </p>
              </div>

              {/* Box 3: M3 Net (12 ANKH for living humans) */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-800/60 space-y-1">
                <p className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {isAr ? 'حصة الأحياء المباشرة M3 = (12 ☥ * عدد الأحياء)' : 'Living Human Quota M3 = (12 ☥ * Pop)'}
                </p>
                <p className="text-sm font-extrabold text-amber-200 font-mono">
                  {formatNum(livingHumanQuotaTotal)} <span className="text-amber-400 text-xs">𓋹</span>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  12 ☥ × {formatNum(population)} فرد
                </p>
              </div>

              {/* Box 4: Infrastructure & 8-Sector Split (2 ANKH) */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-800/60 space-y-1">
                <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                  {isAr ? 'حصة البنية M4 = (2 ☥ * عدد الأحياء) على 8 قطاعات' : 'Infrastructure & M4 Split = (2 ☥ * Pop)'}
                </p>
                <p className="text-sm font-extrabold text-purple-200 font-mono">
                  {formatNum(infrastructureQuotaTotal)} <span className="text-purple-400 text-xs">𓋹</span>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  2 ☥ × {formatNum(population)} (مقسمة على 8 قطاعات ثابتة)
                </p>
              </div>
            </div>

            {/* Gold Reserve & Central Bank FX Conversion Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-mono text-[11px]">
                  {isAr ? 'غطاء الذهب (7 جرام 24k / جنيه):' : '24k Gold Reserve (7g / ANKH):'}
                </span>
                <span className="font-extrabold text-amber-300 font-mono">
                  {formatNum(totalGoldGrams24k)} <span className="text-amber-400 text-[10px]">جرام ذهب 24k</span>
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-mono text-[11px]">
                  {isAr ? `تغطية الدولار الموازية:` : 'Parallel USD Value:'}
                </span>
                <span className="font-extrabold text-emerald-300 font-mono">
                  ${formatNum(totalUSDValuation)} <span className="text-emerald-400 text-[10px]">USD</span>
                </span>
              </div>
            </div>

            {/* 14-Digit National ID Binding & Exemplar System Model Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-200 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isAr
                      ? 'النظام النموذج: 14 رقماً قومياً لكل مواطن حي (جمهورية مصر العربية 🇪🇬)'
                      : 'Exemplar System Model: 14 National ID Digits per Living Citizen (Egypt 🇪🇬)'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 text-[10px]">
                    14 National ID Digits
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                  {isAr
                    ? 'الـ 14 رقماً قومياً في البطاقات الحية ترتبط حكماً بـ 14 جنيه عنخ (12 ☥ نقد صافي + 2 ☥ تغطية بنية مادية) عند ورود ترتيب الدولة وفق تعدادها العام.'
                    : 'The 14 National ID digits directly bind to 14 ANHK (12 ☥ net cash + 2 ☥ infrastructure) according to national census sequence.'}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold whitespace-nowrap">
                14 ID ⟷ 14 ANHK 𓋹
              </div>
            </div>

            {/* Sovereign Geometric Triad Architecture (Mecca Apex • Egypt Pyramid Base • Palestine HR Node) */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-emerald-950/70 border border-amber-500/50 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-800/50 pb-2">
                <span className="font-bold text-xs text-amber-200 flex items-center gap-2 font-mono">
                  <Scale className="w-4 h-4 text-amber-400" />
                  {isAr ? 'مثلث السيادة والتأسيس الجغرافي النقدي' : 'Sovereign Geometric Monetary Triangle'}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-700/60">
                  Mecca Apex 🕋 • Pyramid Base 🇪🇬 • Palestine HR Node 🇵🇸
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* 1. Apex of Triangle: Mecca */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-amber-500/40 text-center space-y-1">
                  <div className="text-xl">🕋 🇸🇦</div>
                  <p className="text-xs font-bold text-amber-300 font-mono">
                    {isAr ? '1. مكة رأس المثلث (الريال السعودي SAR)' : '1. Mecca Apex (Saudi Riyal SAR)'}
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono leading-tight">
                    {isAr ? 'تعتمد حالياً الريال السعودي (SAR) • آخر طبعة ورقية مسموحة يوليو 2026' : 'Uses SAR currently • Last paper print edition July 2026'}
                  </p>
                </div>

                {/* 2. Foundation Base: Egypt Pyramid & Ministry Formula */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-emerald-500/40 text-center space-y-1">
                  <div className="text-xl">🇪🇬 🔺</div>
                  <p className="text-xs font-bold text-emerald-300 font-mono">
                    {isAr ? '2. التأسيس هرم مصر (32 وزارة | 4 سيادية + 28 مدنية)' : '2. Egypt Base (32 Ministries | 4 Sov + 28 Civ)'}
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono leading-tight">
                    {isAr ? '4 سيادية (6236 مادة) + 28 مدنية ÷ 4 = 7 قطاعات • النسبة 1/7 = 142857' : '4 Sovereign (6236 Code) + 28 Civ / 4 = 7 Sectors • Ratio 1/7 = 142857'}
                  </p>
                </div>

                {/* 3. Palestine Node: Hejazi Riyal Binding */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-cyan-500/40 text-center space-y-1">
                  <div className="text-xl">🇵🇸 🪙</div>
                  <p className="text-xs font-bold text-cyan-300 font-mono">
                    {isAr ? '3. عقدة فلسطين (حد الأمان = 44)' : '3. Palestine Node (Safety Anchor = 44)'}
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono leading-tight">
                    {isAr ? '1 ريال حجازي (HR) = 44 جنيه مصري (حد الثبات) • 1 دولار = 44 ج.م' : '1 HR = 44 EGP (Anchor) • $1 USD = 44 EGP'}
                  </p>
                </div>
              </div>

              {/* Floating EGP Band (45 - 55) & Safety Anchor (44) Formula Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-400/60 space-y-2.5 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/50 pb-2">
                  <p className="text-cyan-300 font-bold flex items-center gap-1.5 text-xs">
                    <Calculator className="w-4 h-4 text-cyan-400" />
                    {isAr ? 'حساب معادلة التعويم الحر (45 - 55) وحد الثبات والأمان (44):' : 'Floating Band (45-55) & Safety Anchor (44) Formula:'}
                  </p>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/50 text-emerald-300 font-bold text-xs">
                    {isAr ? 'المعادلة: 1 جنيه عنخ × 1,200 $ × سعر الصرف اليوم' : 'Eq: 1 ANHK × $1,200 × Daily FX Rate'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {/* Fixed Safety Anchor */}
                  <div className="p-2 rounded bg-slate-950/90 border border-emerald-500/50 space-y-0.5">
                    <span className="text-emerald-400 font-bold block">
                      {isAr ? '1. حد الثبات والأمان المغلق (44)' : '1. Fixed Safety Anchor (44)'}
                    </span>
                    <p className="text-slate-300">1200 × 44 = <strong className="text-emerald-200">52,800 ج.م</strong></p>
                    <p className="text-[9px] text-slate-400">52,800 / 1,200 = 44</p>
                  </div>

                  {/* Current Daily Floating Value */}
                  <div className="p-2 rounded bg-slate-950/90 border border-cyan-500/50 space-y-0.5">
                    <span className="text-cyan-400 font-bold block">
                      {isAr ? '2. القيمة اليومية (مثال 48.5)' : '2. Daily Float (e.g. 48.5)'}
                    </span>
                    <p className="text-slate-300">1200 × 48.5 = <strong className="text-cyan-200">58,200 ج.م</strong></p>
                    <p className="text-[9px] text-cyan-300/80">الفارق المسموح = +5,400 ج.م</p>
                  </div>

                  {/* Float Range (45 - 55) */}
                  <div className="p-2 rounded bg-slate-950/90 border border-amber-500/50 space-y-0.5">
                    <span className="text-amber-400 font-bold block">
                      {isAr ? '3. نطاق التعويم الحر (45 - 55)' : '3. Float Range (45 - 55)'}
                    </span>
                    <p className="text-slate-300"><strong className="text-amber-200">54,000 ج.م</strong> ⟷ <strong className="text-amber-200">66,000 ج.م</strong></p>
                    <p className="text-[9px] text-slate-400">{isAr ? 'نطاق الأمان المسموح' : 'Allowed Safety Band'}</p>
                  </div>
                </div>
              </div>

              {/* Egypt Sovereign Ministry Foundation Breakdown (32 Ministries = 4 Sovereign [6236 Code] + 28 Civilian -> 28/4 = 7 -> 1/7 = 0.142857) */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-500/50 space-y-2.5 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-200">
                      {isAr ? 'هيكلة 32 وزارة - "مصر الأساس" والقانون الحاكم (6236 مادة):' : '32 Ministry Structure - Egypt Base & Governing Code (6236 Rules):'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-400 text-emerald-300 font-extrabold text-xs">
                      1/7 = 142857
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-extrabold text-xs">
                      32 ÷ 4 = (1 + 7)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  {/* Sovereign Sector (4 Ministries) */}
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 space-y-1.5">
                    <div className="flex justify-between items-center text-emerald-300 font-bold">
                      <span>{isAr ? '🏛️ القطاع السيادي الحاكم (4 وزارات)' : '🏛️ Sovereign Governing Sector (4 Ministries)'}</span>
                      <span className="text-[10px] bg-emerald-900/80 px-1.5 py-0.5 rounded text-emerald-200 border border-emerald-400/30">6236 مادة</span>
                    </div>
                    <ul className="text-slate-300 text-[10px] space-y-1">
                      <li className="flex items-center justify-between border-b border-emerald-900/40 pb-0.5">
                        <span>{isAr ? '1. الأزهر الشريف + وزارة الأوقاف' : '1. Al-Azhar + Awqaf Ministry'}</span>
                        <span className="text-emerald-400 text-[9px]">6236 مادة برمجية</span>
                      </li>
                      <li className="border-b border-emerald-900/40 pb-0.5">{isAr ? '2. وزارة الداخلية' : '2. Ministry of Interior'}</li>
                      <li className="border-b border-emerald-900/40 pb-0.5">{isAr ? '3. وزارة الدفاع' : '3. Ministry of Defense'}</li>
                      <li>{isAr ? '4. وزارة العدل (القانون الحاكم 6236 مادة)' : '4. Ministry of Justice (6236 Code)'}</li>
                    </ul>
                  </div>

                  {/* Civilian Sectors (28 Ministries / 4 = 7 Sectors -> 1/7 = 0.142857) */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-cyan-500/40 space-y-1.5">
                    <div className="flex justify-between items-center text-cyan-300 font-bold">
                      <span>{isAr ? '🏢 القطاعات المدنية التخصصية (28 وزارة)' : '🏢 Specialized Civilian Sectors (28 Ministries)'}</span>
                      <span className="text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded text-cyan-200 border border-cyan-400/30">28 ÷ 4 = 7</span>
                    </div>
                    <p className="text-slate-300 text-[10px] leading-relaxed">
                      {isAr
                        ? 'المتبقي 28 وزارة مقسمة على 4 وزارات لكل قطاع في تخصصه = 7 قطاعات مدنية تخصصية. نسبة القطاع السيادي (1) إلى القطاعات المدنية (7) هي: 1 ÷ 7 = 0.142857.'
                        : 'Remaining 28 ministries divided into 4 per sector = 7 civilian sectors. Sovereign to Civilian ratio: 1 / 7 = 0.142857.'}
                    </p>
                    <div className="mt-1 pt-1.5 border-t border-cyan-800/40 flex justify-between items-center text-[10px]">
                      <span className="text-slate-300">{isAr ? '32 - 4 = 28 وزارة' : '32 - 4 = 28 Ministries'}</span>
                      <span className="text-emerald-400 font-bold">1/7 = 0.142857 (نسبة عنخ)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strict Paper Printing Conditions & July 2026 Expiry Notice */}
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-600/50 flex items-start gap-2 text-[10px] text-amber-200 font-mono leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">
                    {isAr ? 'شروط طباعة النقد الورقي وانقضاء الصلاحية (يوليو 2026): ' : 'Paper Currency Printing Conditions & Expiry (July 2026): '}
                  </span>
                  {isAr
                    ? 'أوراق النقد الورقي مشروطة برسم معالم الدولة النقية خالصة بدون أي صليب أو شرك أو صور أشخاص بشرية. آخر طبعة ورقية رسمية مسموحة هي طبعة يوليو 2026، ولا قيمة قانونية أو نقدية لأي إصدار ورقي بعدها أو يخالف هذه الشروط.'
                    : 'Paper currency printing requires pure state landmarks free of crosses, polytheistic symbols, or human portraits. The final legal paper print edition is July 2026; subsequent or non-compliant prints hold zero legal value.'}
                </div>
              </div>
            </div>

            {/* Central Bank Local Fiat Clearing & M3 / M4 Equations Box */}
            <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-cyan-200 font-bold">
                <span className="flex items-center gap-1.5 text-xs">
                  <Landmark className="w-4 h-4 text-cyan-400" />
                  {isAr
                    ? `معادلة تغطية البنك المركزي والنقد السيادي M3 / M4 (${selectedNode.flag} ${selectedNode.nameAr}):`
                    : `Central Bank M3 / M4 Sovereign Formulas (${selectedNode.flag} ${selectedNode.nameEn}):`}
                </span>
                <span className="text-cyan-300 text-[10px] bg-cyan-900/80 px-2 py-0.5 rounded border border-cyan-400/40">
                  M3 ➔ M4 Sovereign Expansion
                </span>
              </div>

              {/* M3 & M4 Equations Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                {/* M3 Formula (Individuals Account) */}
                <div className="p-2.5 rounded-lg bg-slate-950/90 border border-cyan-500/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-bold block text-xs">
                      {isAr ? '• معادلة M3 Egypt (حساب أفراد - 12 للحي):' : '• M3 Egypt (Individuals Account - 12 per human):'}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                      {isAr ? 'حساب أفراد (12 𓋹 للحي)' : 'Individuals (12 𓋹/human)'}
                    </span>
                  </div>
                  <p className="text-slate-200 text-[11px] font-bold">
                    M3 = 12 × (عدد الحي) × 1,200 $ × سعر الصرف
                  </p>
                  <p className="text-emerald-400 text-[10px]">
                    = 12 × {formatNum(population)} × $1,200 × {selectedNode.fxRateToUSD} = <strong className="text-emerald-300">{formatNum(12 * population * 1200 * selectedNode.fxRateToUSD)} {selectedNode.currencySymbol}</strong>
                  </p>
                </div>

                {/* M4 Formula (State Account / Infrastructure) */}
                <div className="p-2.5 rounded-lg bg-slate-950/90 border border-emerald-500/40 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300 font-bold block text-xs">
                      {isAr ? '• معادلة M4 (حساب دولة - 2 للبنية 𓋹 = 2,000,000 نانو ☥):' : '• M4 Formula (State Account - 2 Infrastructure 𓋹 = 2M Nano ☥):'}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                      {isAr ? 'حساب دولة (2 𓋹 للبنية)' : 'State (2 𓋹 Infra)'}
                    </span>
                  </div>
                  <p className="text-slate-200 text-[11px] font-bold">
                    M4 المعتمد = 2 جنيه عنخ 𓋹 (2 للبنية = 2,000,000 نانو عنخ ☥) موزعة على 8 قطاعات (1 سيادي + 7 مدني = 1+7)
                  </p>
                  <p className="text-cyan-300 text-[10px]">
                    = 2 × $1,200 × {selectedNode.fxRateToUSD} = <strong className="text-cyan-200">{formatNum(2 * 1200 * selectedNode.fxRateToUSD)} {selectedNode.currencySymbol}</strong>
                  </p>
                  <div className="mt-1 pt-1 border-t border-emerald-900/50 text-[9.5px] text-amber-300/90 leading-tight space-y-0.5">
                    <p>
                      {isAr
                        ? '• إجمالي المقاصة الإنسانية والسيادية = 14 عنخ (12 للحي + 2 للبنية).'
                        : '• Total Sovereign & Human Clearing = 14 Anhk (12 per living human + 2 for infrastructure).'}
                    </p>
                    <p>
                      {isAr
                        ? '• 𓋹 = عنخ (Ankh) | ☥ = نانو عنخ (Nano Ankh) • (1 جنيه عنخ = 1,000,000 نانو عنخ).'
                        : '• 𓋹 = Ankh | ☥ = Nano Ankh • (1 Ankh = 1,000,000 Nano Ankh).'}
                    </p>
                    <p>
                      {isAr
                        ? '• لا يوجد دولة معتمد لها أكثر من 2 جنيه عنخ (2 𓋹 = 2M ☥) افتراضياً للبنية على الـ 8 قطاعات (1+7). التوسع بالميزانية يتطلب تقديم الحكومات لـ (بيعة وطلب معتمد لاعتماد الميزانية).'
                        : '• No country is approved more than 2 Ankh (2 𓋹 = 2M ☥) by default across 8 sectors (1+7). Budget expansion requires formal government pledge & request.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Printing Solvency Ceiling (M3 + M4 Limit) */}
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-500/60 flex items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-200 block">
                      {isAr ? 'سقف ملاءة الطباعة الورقية (Printing Solvency Limit):' : 'Printing Solvency Ceiling (M3 + M4):'}
                    </span>
                    <span className="text-[11px] text-amber-300/90">
                      {isAr
                        ? `حد الطباعة الأقصى = M3 (أفراد) + M4 المعتمد (دولة)`
                        : `Maximum Printing Limit = M3 (Individuals) + Approved M4 (State)`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-2.5 py-1 rounded bg-slate-950 border border-amber-400 text-amber-300 font-extrabold text-xs shrink-0">
                    M3 + M4 (Base)
                  </div>
                  <div className="text-[10px] text-emerald-300 font-bold mt-0.5">
                    = {formatNum((totalAnhkPounds * selectedNode.fxRateToUSD) + (2 * 1200 * selectedNode.fxRateToUSD))} {selectedNode.currencySymbol}
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-300 leading-relaxed bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span>
                  14 × {formatNum(population)} {isAr ? 'فرد حي' : 'living humans'} × $1,200 × {selectedNode.fxRateToUSD} ({selectedNode.currencyNameAr})
                </span>
                <span className="text-emerald-400 font-extrabold text-xs">
                  = {formatNum(totalAnhkPounds)} جنيه عنخ 𓋹 = ${formatNum(totalUSDValuation)}
                </span>
              </p>
            </div>

            {/* Paper Printing Ceiling, Vault Physical Inventory & Local Deficit Reconciliation */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-indigo-500/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-2.5">
                <span className="font-bold text-xs text-indigo-200 flex items-center gap-2 font-mono">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  {isAr
                    ? `حد طباعة الورق • جرد الصناديق بالورق (${selectedNode.currencySymbol}) • مطابقة العجز`
                    : `Paper Print Limit • Vault Cash (${selectedNode.currencySymbol}) • Deficit Matching`}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] border border-indigo-700/50">
                  {selectedNode.flag} Node Audit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Paper Printing Ceiling in Local Currency */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 font-bold">
                    <FileText className="w-3.5 h-3.5" />
                    {isAr ? `1. حد طباعة الورق الأقصى (${selectedNode.currencySymbol}):` : `1. Print Ceiling (${selectedNode.currencySymbol}):`}
                  </p>
                  <p className="font-mono text-cyan-200 font-extrabold text-xs">
                    {formatNum(localPaperPrintingLimit)} {selectedNode.currencySymbol}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {isAr ? 'السقف المسموح قانوناً لتغطية الدولة' : 'Authorized local fiat printing limit'}
                  </p>
                </div>

                {/* 2. Physical Vault Cash Count Input in Local Currency */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-amber-800/60 space-y-1.5">
                  <label className="block text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5" />
                    {isAr ? `2. جرد الصناديق بالورق (${selectedNode.currencySymbol}):` : `2. Physical Vault Cash (${selectedNode.currencySymbol}):`}
                  </label>
                  <input
                    type="number"
                    placeholder={isAr ? `أدخل المبلغ بالورق (${selectedNode.currencySymbol})` : `Enter vault cash (${selectedNode.currencySymbol})`}
                    value={vaultAuditLocalCash}
                    onChange={(e) => setVaultAuditLocalCash(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-700/60 text-amber-200 font-mono font-bold text-xs outline-none focus:border-amber-400"
                  />
                  <p className="text-[9px] text-slate-400 font-mono">
                    {isAr ? 'المبلغ الفعلي الموجود بخزائن البنك المركزي' : 'Actual cash counted in central bank vaults'}
                  </p>
                </div>

                {/* 3. Local Deficit Matching on Node */}
                <div className="p-3 rounded-lg bg-slate-950/90 border border-emerald-800/60 space-y-1">
                  <p className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isAr ? '3. مطابقة العجز على العقدة:' : '3. Local Deficit Node Reconciliation:'}
                  </p>
                  {vaultAuditLocalCash ? (
                    auditDeficitLocal === 0 ? (
                      <p className="font-mono text-emerald-300 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {isAr ? 'مطابقة تامّة بدون عجز (0)' : 'Exact Match (0 Deficit)'}
                      </p>
                    ) : auditDeficitLocal > 0 ? (
                      <p className="font-mono text-amber-300 font-bold text-xs">
                        {isAr ? 'العجز المرحّل للعقدة: ' : 'Deficit Matched to Node: '}
                        <span className="text-amber-400">{formatNum(auditDeficitLocal)} {selectedNode.currencySymbol}</span>
                      </p>
                    ) : (
                      <p className="font-mono text-cyan-300 font-bold text-xs">
                        {isAr ? 'فائض ورقي: ' : 'Paper Surplus: '}
                        <span className="text-cyan-400">{formatNum(Math.abs(auditDeficitLocal))} {selectedNode.currencySymbol}</span>
                      </p>
                    )
                  ) : (
                    <p className="font-mono text-slate-400 text-[11px]">
                      {isAr ? 'بانتظار إدخال قيمة جرد الصناديق...' : 'Awaiting physical vault cash count...'}
                    </p>
                  )}
                  <p className="text-[9px] text-slate-400 font-mono">
                    {isAr ? 'تسوية ومطابقة آلية على عقدة AdamHash' : 'Automated AdamHash Node Reconciliation'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="font-bold text-cyan-200 block">-- Almahdi | Senior Infrastructure Lead</span>
              <span className="text-slate-400 text-[9px] block">Web4 ANHK Quantum Engine Network • almahdi@anhkmail.anhk</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
          >
            {isAr ? 'إغلاق الحاسبة' : 'Close Calculator'}
          </button>
        </div>
      </div>
    </div>
  );
};
