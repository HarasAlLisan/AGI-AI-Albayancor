import React, { useState } from 'react';
import {
  X,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Layers,
  Cpu,
  Globe,
  Coins,
  Scale,
  Fingerprint,
  Radio,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  Zap,
  Flame,
  ArrowRight,
  RefreshCw,
  Sliders,
  Power
} from 'lucide-react';
import { LayerLevel, HeptagonalMatrixState } from '../data/heptagonalMatrixEngine';

interface M6InterconnectGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  matrixState?: HeptagonalMatrixState;
  onToggleLayer?: (level: LayerLevel) => void;
  onOpenController?: () => void;
}

interface HeptagonalLayer {
  level: LayerLevel;
  code: string;
  symmetryLock: number; // 717, 616, 515, etc.
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  descriptionAr: string;
  descriptionEn: string;
  assetTypeAr: string;
  assetTypeEn: string;
  auditHash: string;
}

export const M6InterconnectGuardModal: React.FC<M6InterconnectGuardModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  matrixState,
  onToggleLayer,
  onOpenController
}) => {
  const isAr = lang === 'ar';
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(1); // Default to M6 Guard Layer
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'specifications' | 'adamhash'>('matrix');

  const heptagonalLayers: HeptagonalLayer[] = [
    {
      level: 'M7',
      code: '717 = M7',
      symmetryLock: 717,
      nameAr: 'طبقة صك معادن الله المطلقة',
      nameEn: 'Absolute Minerals Sovereign Ledger',
      titleAr: 'الغطاء الفيزيائي الكوني الخالي من الصفر',
      titleEn: 'Zero-Free Cosmic Physical Backing',
      icon: '🌌',
      colorClass: 'text-amber-300',
      borderClass: 'border-amber-500/40',
      bgClass: 'bg-amber-950/20',
      descriptionAr: 'تأمين الـ (714412𓋹𓋹𓋹𓋹𓋹𓋹𓋹𓋹𓋹𓋹𓋹𓋹) جنيه عنخ المستخلصة من خراج القارات السبع، وربطها جينياً بقفل التناظر 717 لضمان ثبات الغطاء الفيزيائي الكوني.',
      descriptionEn: 'Securing the 714412 ANHK sovereign pounds extracted from the seven continents, anchored to symmetry lock 717.',
      assetTypeAr: 'الغطاء المطلق والنهائي لكوكب الأرض تحت الرقيم الحي',
      assetTypeEn: 'Earth Absolute Physical Commodity Baseline',
      auditHash: '0x717_M7_ABSOLUTE_MINERAL_LEDGER_714412'
    },
    {
      level: 'M6',
      code: '616 = M6',
      symmetryLock: 616,
      nameAr: 'طبقة الحراسة والربط البيني المستقل',
      nameEn: 'M6 Interconnect Guard & Symmetric Mirror',
      titleAr: 'المشغل والمطهر المركزي المحايد وفرض الزكاة 2.5%',
      titleEn: 'Neutral Central Purifier & 2.5% Zakat Enforcement',
      icon: '🛡️',
      colorClass: 'text-cyan-300',
      borderClass: 'border-cyan-500/60 shadow-cyan-500/20 shadow-lg',
      bgClass: 'bg-cyan-950/30',
      descriptionAr: 'المشغل والمطهر المركزي المحايد، الذي يفرض الزكاة العامة الـ 2.5% على الحول، ويحمي الشفرات الرباعية الترددية (س، ر، ا، ح) والنبضية الأساسية (ج) تحت وضح الضوء وفي نهار الشفافية المطلقة لمنع كارتيلات التلاعب.',
      descriptionEn: 'The sovereign neutral inter-connector and purifier enforcing 2.5% annual zakat and protecting the four-frequency keys under complete transparency.',
      assetTypeAr: 'إدارة التناظر الترددي الكلي والربط البيني وحظر التلاعب الاحتكاري',
      assetTypeEn: 'Total Frequency Symmetry & Interconnect Firewall',
      auditHash: '0x616_M6_INTERCONNECT_GUARD_SYMMETRIC_ZAKAT_25'
    },
    {
      level: 'M5',
      code: '515 = M5',
      symmetryLock: 515,
      nameAr: 'طبقة صك بيت مال الكعبة (الـ 5% الموزونة)',
      nameEn: 'Bayt Al-Mal 5% Sovereign Treasury',
      titleAr: 'الكتلة المصمتة البالغة 24 تريليون وحدة ذهبية',
      titleEn: '24 Trillion Gold Units Solid Reserve',
      icon: '🕋',
      colorClass: 'text-yellow-400',
      borderClass: 'border-yellow-500/40',
      bgClass: 'bg-yellow-950/20',
      descriptionAr: 'الكتلة المصمتة البالغة 24 تريليون وحدة ذهبية، المحصنة بقفل 515 لتكون المصد المالي الفوقي الحامي للحقوق الجينية لـ 9 مليار إنسان بالتساوي، ومآل التركات وفق دستور 6236 مادة.',
      descriptionEn: 'Solid reserve of 24 trillion gold units anchored with lock 515 protecting universal heritage for 9 billion living humans.',
      assetTypeAr: 'صك بيت مال الكعبة الموزون المغذي لميزانيات الافتتاح',
      assetTypeEn: 'Weighted Sovereign Treasury Baseline',
      auditHash: '0x515_M5_BAYT_AL_MAL_24T_GOLD_CONSTITUTION_6236'
    },
    {
      level: 'M4',
      code: '414 = M4',
      symmetryLock: 414,
      nameAr: 'طبقة حسابات الدول وعقد القطاعات الـ 8',
      nameEn: 'Sovereign States & 8-Sector Portfolios',
      titleAr: 'ميزانيات الدول (32 وزارة معلنة مكشوفة)',
      titleEn: 'State Budgets (32 Open Transparent Ministries)',
      icon: '🏛️',
      colorClass: 'text-indigo-300',
      borderClass: 'border-indigo-500/40',
      bgClass: 'bg-indigo-950/20',
      descriptionAr: 'تقييد ميزانيات الدول بـ 32 وزارة (28 تنفيذية + 4 لبيت المال عند M4+1)، ومحكومة بالقفل 414 لمنع البيروقراطية القديمة والتسييل المعتم.',
      descriptionEn: 'Constraining state budgets to 32 open ministries governed by symmetry lock 414 preventing opaque debt cycles.',
      assetTypeAr: 'حسابات معلنة ومكشوفة باسم كل دولة وبنك مركزي',
      assetTypeEn: 'Transparent Public National Central Ledgers',
      auditHash: '0x414_M4_STATES_8_SECTORS_32_MINISTRIES'
    },
    {
      level: 'M3',
      code: '313 = M3',
      symmetryLock: 313,
      nameAr: 'طبقة التحكم التكتيكي وميزانية عمر الحي (M3 = 14)',
      nameEn: 'Living Human Lifetime Allocation (M3 = 14)',
      titleAr: 'تسييل 12 للحي سنوياً وتجميد 2 للبنية والقطاعات',
      titleEn: 'Direct Allocation (12 for Living Human + 2 Infrastructure)',
      icon: '⏱️',
      colorClass: 'text-emerald-300',
      borderClass: 'border-emerald-500/40',
      bgClass: 'bg-emerald-950/20',
      descriptionAr: 'تفعيل بروتوكول الافتتاح الفوري للمواليد والكهول بأثر رجعي، ومقيدة بالقفل 313 لضمان فصل الـ (12 للحي) في غرفة حد الكفاية وتراكم الأرباح، عن الـ (2 للبنية والقطاعات).',
      descriptionEn: 'Immediate lifetime allowance protocol separating 12 sovereign units for direct living dignity from 2 infrastructure units.',
      assetTypeAr: 'مخصص سنوي تلقائي (M3 = 14) فور تسجيل المولود دون ديون',
      assetTypeEn: 'Automatic Lifetime Allowance Baseline',
      auditHash: '0x313_M3_LIFETIME_ALLOCATION_14_UNITS_SEAL'
    },
    {
      level: 'M2',
      code: '212 = M2',
      symmetryLock: 212,
      nameAr: 'طبقة العقود الذكية وشراكة الأصول الثقيلة (1:1:1:1)',
      nameEn: 'Heavy Production Quad-Partnership (1:1:1:1)',
      titleAr: 'حماية العمال والمعدات وترحيل الخسائر لبيت المال',
      titleEn: 'Worker & Asset Protection with Loss Absorption',
      icon: '⛓️',
      colorClass: 'text-orange-300',
      borderClass: 'border-orange-500/40',
      bgClass: 'bg-orange-950/20',
      descriptionAr: 'تقييد عصب العمل (العمال)، وأصول المعدات (الشركة الإسمنتية)، والوزارات التخصصية، ومحمية بالقفل 212 لترحيل الخسائر المحاسبية بالكامل إلى بيت المال دون المساس بالحي.',
      descriptionEn: 'Balancing labor force, heavy industrial equipment, and public oversight with total loss shielding for human labor.',
      assetTypeAr: 'تحميل الخسارة المحاسبية بالكامل لبيت المال وموازنة آدم',
      assetTypeEn: 'Complete Sovereign Deficit Shield for Workers',
      auditHash: '0x212_M2_QUAD_PARTNERSHIP_WORKER_DEFICIT_SHIELD'
    },
    {
      level: 'M1',
      code: '111 = M1',
      symmetryLock: 111,
      nameAr: 'طبقة البصمة الجينية الرقمية (Proof of Identity)',
      nameEn: 'Genetic Biometric Proof of Identity',
      titleAr: 'القاعدة الارتكازية للأفراد والرقم القومي الحي',
      titleEn: 'Individual Sovereignty & 14-Digit National ID',
      icon: '🧬',
      colorClass: 'text-rose-300',
      borderClass: 'border-rose-500/40',
      bgClass: 'bg-rose-950/20',
      descriptionAr: 'القاعدة الارتكازية للأفراد؛ حيث يربط الرقم القومي وشهادة الميلاد الحية الفرد بالشبكة تلقائياً، ومحصنة بقفل الأحدية 111 لمنع حجب الهويات أو تزوير البيانات.',
      descriptionEn: 'The root baseline for 9 billion humans connecting verified national identity to the sovereign network without censorship.',
      assetTypeAr: 'ممر التحرر والتحكيم الفردي ومغادرة الدول المتعنتة بهدوء',
      assetTypeEn: 'Individual Sovereign Gateway & Universal Human Dignity',
      auditHash: '0x111_M1_PROOF_OF_IDENTITY_GENETIC_AUTHENTICATION'
    }
  ];

  const currentLayer = heptagonalLayers[selectedLayerIndex];
  const isCurrentLayerActive = matrixState ? matrixState.layers[currentLayer.level] : true;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-cyan-500/50 shadow-2xl shadow-cyan-950/50 overflow-hidden font-sans">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-inner">
              <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-cyan-200">
                  {isAr ? 'طبقة الحراسة والربط البيني للمصفوفة السبعية (M6 Interconnect Guard)' : 'M6 Interconnect Guard & Heptagonal Matrix'}
                </h2>
                {matrixState && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    matrixState.activeLayerCount === 7
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {matrixState.activeLayerCount}/7 {isAr ? 'طبقات نشطة' : 'Active'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr
                  ? 'الهندسة التناظرية لطبقة الحراسة M6 وأقفال التناظر السبعي (111-717) - النظام الفيدرالي المستقل 2026'
                  : 'Symmetric inter-layer security matrix anchoring universal physical assets from M1 to M7'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenController && (
              <button
                onClick={() => { onClose(); onOpenController(); }}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'وحدة التحكم والتفعيل' : 'Matrix Controller'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'المصفوفة السبعية (M1-M7)' : 'Heptagonal Matrix'}</span>
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-colors ${
                activeTab === 'specifications'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'تأصيل حراسة M6 والزكاة 2.5%' : 'M6 Guard & Zakat 2.5%'}</span>
            </button>

            <button
              onClick={() => setActiveTab('adamhash')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-colors ${
                activeTab === 'adamhash'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'قفل AdamHash 918 والثابت 2520' : 'AdamHash 918 & Constant 2520'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className={`w-2 h-2 rounded-full ${matrixState && matrixState.activeLayerCount < 7 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-ping'}`} />
            <span>{isAr ? 'الربط البيني نشط ومطهر' : 'Symmetric Bus Active'}</span>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'matrix' && (
            <div className="space-y-6 font-mono">
              {/* 7-Layer Interactive Selector Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">
                    {isAr ? 'أقفال التناظر السبعي (مرايا الأمان البرمجية من 111 إلى 717):' : 'Symmetric Mirror Locks (111 to 717):'}
                  </span>
                  <span className="text-[11px] text-cyan-400 font-bold">
                    {isAr ? 'الطبقة المحددة: ' : 'Selected: '} {currentLayer.code}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {heptagonalLayers.map((layer, idx) => {
                    const isSelected = selectedLayerIndex === idx;
                    const isM6 = layer.level === 'M6';
                    const isLayerActive = matrixState ? matrixState.layers[layer.level] : true;
                    return (
                      <button
                        key={layer.level}
                        onClick={() => setSelectedLayerIndex(idx)}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1 relative ${
                          isSelected
                            ? `${layer.bgClass} ${layer.borderClass} ring-2 ring-cyan-400/50 shadow-md`
                            : isLayerActive
                            ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                            : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                        }`}
                      >
                        {isM6 && (
                          <span className="absolute -top-2 -right-1 px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-extrabold shadow">
                            HUB
                          </span>
                        )}
                        <span className="text-lg leading-none">{layer.icon}</span>
                        <div className="font-extrabold text-xs">
                          <span className={isSelected ? layer.colorClass : isLayerActive ? 'text-slate-300' : 'text-slate-600'}>{layer.level}</span>
                          <span className="block text-[10px] text-slate-400">Lock {layer.symmetryLock}</span>
                        </div>
                        <span className="text-[9px] truncate max-w-full text-slate-400">
                          {isAr ? layer.nameAr.split(' ')[1] || layer.level : layer.nameEn.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Layer Detailed Inspector Panel */}
              <div className={`p-5 rounded-2xl border ${currentLayer.borderClass} ${currentLayer.bgClass} shadow-xl relative overflow-hidden`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentLayer.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-lg font-bold ${currentLayer.colorClass}`}>
                          [{currentLayer.code}] {isAr ? currentLayer.nameAr : currentLayer.nameEn}
                        </h3>
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                          isCurrentLayerActive
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                            : 'bg-rose-950/80 border-rose-500/40 text-rose-400'
                        }`}>
                          {isCurrentLayerActive ? (isAr ? 'نشطة ومقفلة' : 'ACTIVE_SEALED') : (isAr ? 'معطلة' : 'DISARMED')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {isAr ? currentLayer.titleAr : currentLayer.titleEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {onToggleLayer && (
                      <button
                        onClick={() => onToggleLayer(currentLayer.level)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-colors border ${
                          isCurrentLayerActive
                            ? 'bg-rose-950/80 hover:bg-rose-900 border-rose-500/50 text-rose-300'
                            : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/50 text-emerald-300'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{isCurrentLayerActive ? (isAr ? 'تعطيل الطبقة' : 'Disarm Layer') : (isAr ? 'تفعيل الطبقة' : 'Arm Layer')}</span>
                      </button>
                    )}
                    <span className="px-3 py-1 rounded-xl bg-black/60 border border-slate-700 text-cyan-300 text-xs font-bold">
                      قفل التناظر: {currentLayer.symmetryLock}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">
                        {isAr ? 'الوظيفة الاستراتيجية التطهيرية والحصانة:' : 'Strategic Function & Immune Seal:'}
                      </span>
                      <p className="text-slate-200 leading-relaxed bg-black/40 p-3 rounded-xl border border-slate-800/80">
                        {isAr ? currentLayer.descriptionAr : currentLayer.descriptionEn}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block mb-1">
                        {isAr ? 'طبيعة الأصول والغطاء الفيزيائي:' : 'Underlying Sovereign Physical Asset:'}
                      </span>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800/80 text-amber-300">
                        {isAr ? currentLayer.assetTypeAr : currentLayer.assetTypeEn}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">
                        {isAr ? 'بصمة التدقيق السيادية (Audit Hash):' : 'Audit Hash Signature:'}
                      </span>
                      <div className="p-2.5 rounded-xl bg-black border border-slate-800 text-[10px] text-cyan-400 break-all select-all flex items-center justify-between">
                        <span>{currentLayer.auditHash}</span>
                        <button
                          onClick={() => copyToClipboard(currentLayer.auditHash, currentLayer.level)}
                          className="p-1 hover:text-white shrink-0 ml-1"
                        >
                          {copiedKey === currentLayer.level ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">حالة التناظر:</span>
                        <span className={`font-bold ${isCurrentLayerActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCurrentLayerActive ? 'متطابق 100%' : 'معطل'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">معيار الحماية:</span>
                        <span className="text-cyan-300 font-bold">Ring-LWE 256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">الضمانة الدستورية:</span>
                        <span className="text-amber-300 font-bold">6236 مادة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Matrix Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block">
                  {isAr ? 'جدول مصفوفة الإحكام الترددي والربط البيني لخلية M6 (أغسطس 2026):' : 'M6 Heptagonal Interconnect Master Ledger:'}
                </span>

                <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-2.5 text-right sm:text-center">مستوى المصفوفة</th>
                        <th className="p-2.5 text-center">قفل التناظر</th>
                        <th className="p-2.5">الوظيفة الاستراتيجية التطهيرية</th>
                        <th className="p-2.5">الحالة والتفعيل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/70">
                      {heptagonalLayers.map((layer) => {
                        const isLayerActive = matrixState ? matrixState.layers[layer.level] : true;
                        return (
                          <tr
                            key={layer.level}
                            onClick={() => setSelectedLayerIndex(heptagonalLayers.findIndex(l => l.level === layer.level))}
                            className={`cursor-pointer transition-colors ${
                              selectedLayerIndex === heptagonalLayers.findIndex(l => l.level === layer.level)
                                ? 'bg-cyan-950/40'
                                : 'hover:bg-slate-900/50'
                            }`}
                          >
                            <td className="p-2.5 text-right sm:text-center font-bold">
                              <span className={layer.colorClass}>[{layer.level}]</span> {isAr ? layer.nameAr.split(' ')[0] + ' ' + layer.nameAr.split(' ')[1] : layer.nameEn}
                            </td>
                            <td className="p-2.5 text-center font-mono font-bold text-cyan-300">
                              {layer.symmetryLock}
                            </td>
                            <td className="p-2.5 text-slate-300 text-[11px]">
                              {isAr ? layer.titleAr : layer.titleEn}
                            </td>
                            <td className="p-2.5 text-slate-400 text-[11px]">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isLayerActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                              }`}>
                                {isLayerActive ? (isAr ? 'نشط 100%' : 'ACTIVE') : (isAr ? 'معطل' : 'INACTIVE')}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>تأصيل الحراسة الفوقية لخلية M6 (المشغل والمطهر المركزي)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  تُمثل خلية M6 الطبقة الهندسية والبرمجية العازلة والممر الآمن الذي يربط بين الأصول الفيزيائية المطلقة لكوكب الأرض وبين طبقات التنفيذ والمقاصة الجارية للحي، مانعةً كارتيلات الشركات ووادي السيليكون من إحداث أي اختراق أو خلل في حراسة الترددات الكونية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>قاعدة الزكاة العامة الـ 2.5% على الحول</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    يتم تحصيل وتطهير نسبة 2.5% تلقائياً دون وسطاء وتوجيهها مباشرة لحسابات بيت المال وكفاية الأفراد لضمان تدوير الكتلة النقدية ومنع كنز الأموال خارج الدورة الإنتاجية.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>حماية الشفرات الرباعية الترددية (س، ر، ا، ح)</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    حماية الشفرات الترددية والنبضية الأساسية (ج) تحت وضح الضوء وفي نهار الشفافية المطلقة لقطع طريق الاحتكار والتلاعب الخفي.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>الحصانة لـ 9 مليار إنسان بالتساوي</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    فصل مخصصات الأفراد الحيوية (M3 = 14) عن نفقات الدول ومخاطر الشركات، مع استقلالية تامة للبصمة الجينية الرقمية M1.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold">
                    <Scale className="w-4 h-4 text-indigo-400" />
                    <span>ترحيل الخسائر المحاسبية لبيت المال</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    في عقود الشراكة الثقيلة (1:1:1:1)، يتم تحميل الخسائر التشغيلية لبيت المال مباشرة حمايةً للعمال والمعدات من الإفلاس.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'adamhash' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span>تشفير AdamHash 918 والثابت الرياضي الكوني 2520</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  تحت الإشراف المباشر للذكاء الاصطناعي السيادي المستقل 918، وبموجب الثابت الرياضي الكوني المحكم 2520 (المضاعف المشترك الأصغر للأعداد من 1 إلى 10)، تم إقفال وتأمين شجرة الحوكمة الدستورية بالكامل لقرون قادمة دون قروض، دون ائتمان، ودون ضرائب.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold">الرمز الدستوري المشفر للأبد (AdamHash Immutable Root):</span>
                  <button
                    onClick={() => copyToClipboard('0x918_2520_ADAMHASH_HEPTAGONAL_SYMMETRY_M1_M7_SEAL_2026', 'adamRoot')}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'adamRoot' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'adamRoot' ? 'تم النسخ' : 'نسخ القفل'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 text-cyan-400 break-all select-all border border-slate-800 text-[11px]">
                  0x918_2520_ADAMHASH_HEPTAGONAL_SYMMETRY_M1_M7_SEAL_2026_SOVEREIGN_IMMUTABLE
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">مدة الصلاحية الدستورية:</span>
                  <span className="text-emerald-400 font-bold text-sm">840 عاماً</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">حماية الأجيال المتعاقبة:</span>
                  <span className="text-cyan-300 font-bold text-sm">3 أجيال (180 عاماً)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">عدد المواد الدستورية:</span>
                  <span className="text-amber-300 font-bold text-sm">6236 مادة</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'تم استقبال التشفير التناظري لـ M6 وإحكام المصفوفة السبعية لعام 2026' : 'M6 Symmetry Locked & Sealed 2026'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors shadow-md"
          >
            {isAr ? 'إغلاق المعاينة' : 'Close Guard Console'}
          </button>
        </div>
      </div>
    </div>
  );
};
