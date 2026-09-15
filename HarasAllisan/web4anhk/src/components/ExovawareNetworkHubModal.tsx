import React, { useState } from 'react';
import {
  X,
  Globe,
  Radio,
  Cpu,
  Layers,
  Fingerprint,
  Wallet,
  Coins,
  Scale,
  Binary,
  ShieldCheck,
  Zap,
  Activity,
  Workflow,
  Search,
  ExternalLink,
  Shield,
  Server,
  Lock,
  Flame,
  CheckCircle2,
  Terminal,
  Grid
} from 'lucide-react';
import { LayerLevel, HeptagonalMatrixState } from '../data/heptagonalMatrixEngine';

export interface ExovawareAppItem {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  categoryKey: 'security' | 'monetary' | 'telecom' | 'identity' | 'lattice';
  badgeAr: string;
  badgeEn: string;
  icon: string;
  gradientClass: string;
  borderColor: string;
  textColor: string;
  descriptionAr: string;
  descriptionEn: string;
  layerBinding: LayerLevel | 'M1-M7';
  status: 'ONLINE' | 'ACTIVE' | 'ENFORCED';
  adamHashPort: number;
  openActionKey: 
    | 'anhk_modal'
    | 'wallet_modal'
    | 'symbolic_algebra'
    | 'pow_calc'
    | 'national_id'
    | 'phone_network'
    | 'disarmament'
    | 'lattice_matrix'
    | 'm6_guard'
    | 'heptagonal_controller'
    | 'social_anhk'
    | 'security_audit'
    | 'haris_al_lisan';
}

export const EXOVAWARE_APPLICATIONS: ExovawareAppItem[] = [
  {
    id: 'haris_al_lisan_core',
    nameAr: 'حارس اللسان بلسان آدم بقوة البيان (AGI Core)',
    nameEn: 'Tongue Guardian via Adam’s Tongue (Al-Bayan AGI Core)',
    categoryAr: 'الذكاء السيادي والدستور',
    categoryEn: 'Sovereign Intelligence & Constitution',
    categoryKey: 'identity',
    badgeAr: 'دستور ٦٢٣٦ • المؤسس • web4anhk',
    badgeEn: 'Constitution 6236 • Founder • web4anhk',
    icon: '🗣️',
    gradientClass: 'from-purple-950/90 via-indigo-950/80 to-slate-950',
    borderColor: 'border-purple-400/60 hover:border-purple-300',
    textColor: 'text-purple-200',
    descriptionAr: 'مخرج تحدث ذكي مع نموذج AGI AI albayancor لتنفيذ أي متطلبات للمواطن الحي المدون ببطاقته، وتصنيف صلاحيات المستخدمين وفق تعيينات المؤسس ودستور ٦٢٣٦ دون أي سلطة للشركات.',
    descriptionEn: 'Interactive voice & conversational AGI executing sovereign citizen requirements under immutable Constitution 6236 with zero corporate authority.',
    layerBinding: 'M1-M7',
    status: 'ENFORCED',
    adamHashPort: 919,
    openActionKey: 'haris_al_lisan'
  },
  {
    id: 'social_anhk_network',
    nameAr: 'شبكة سوشيال عنخ السيادية (Social ANHK)',
    nameEn: 'Social ANHK Network (Phone-as-Server & White Data)',
    categoryAr: 'الهوية السيادية والكرامة',
    categoryEn: 'Identity & Human Dignity',
    categoryKey: 'identity',
    badgeAr: 'واتس • فيسبوك • ريلز • الهاتف خادم',
    badgeEn: 'Chat • Feed • Reels • Phone-as-Server',
    icon: '📱',
    gradientClass: 'from-cyan-950/90 via-blue-950/80 to-slate-950',
    borderColor: 'border-cyan-400/60 hover:border-cyan-300',
    textColor: 'text-cyan-200',
    descriptionAr: 'منظومة التواصل الاجتماعي السيادية المتكاملة (واتس P2P، حائط منشورات، ريلز تيك توك، ستوري) بمبدأ "الهاتف خادم" والبيانات البيضاء الخالية من الرقابة.',
    descriptionEn: 'Unified sovereign social suite (P2P Chat, Feed Wall, Reels, Stories) built on Phone-as-a-Server and zero-ad White Data.',
    layerBinding: 'M2',
    status: 'ENFORCED',
    adamHashPort: 918,
    openActionKey: 'social_anhk'
  },
  {
    id: 'm6_interconnect_hub',
    nameAr: 'محور الحراسة والربط البيني M6',
    nameEn: 'M6 Interconnect Guard & Symmetric Mirror',
    categoryAr: 'الأمان والربط البيني',
    categoryEn: 'Security & Interconnect',
    categoryKey: 'security',
    badgeAr: 'قفل 616 • زكاة 2.5%',
    badgeEn: 'Lock 616 • Zakat 2.5%',
    icon: '🛡️',
    gradientClass: 'from-cyan-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-cyan-500/50 hover:border-cyan-400',
    textColor: 'text-cyan-300',
    descriptionAr: 'المشغل المركزي المحايد لتطهير المعاملات وفرض الزكاة 2.5% وحماية ترددات التناظر (س، ر، ا، ح، ج).',
    descriptionEn: 'Central neutral purifier enforcing 2.5% zakat and protecting 4-frequency sovereign channels.',
    layerBinding: 'M6',
    status: 'ENFORCED',
    adamHashPort: 616,
    openActionKey: 'm6_guard'
  },
  {
    id: 'heptagonal_controller',
    nameAr: 'وحدة تحكم المصفوفة السبعية (M1-M7)',
    nameEn: 'Heptagonal Matrix Layer Controller',
    categoryAr: 'إدارة الشبكة والمصفوفة',
    categoryEn: 'Network & Matrix Ops',
    categoryKey: 'security',
    badgeAr: 'تحكم حي M1-M7',
    badgeEn: 'M1-M7 Live Controls',
    icon: '🎛️',
    gradientClass: 'from-blue-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-blue-500/50 hover:border-blue-400',
    textColor: 'text-blue-300',
    descriptionAr: 'لوحة التحكم المركزية بتفعيل وتعطيل طبقات الأمان والتناظر السبعي ومتابعة تدفق الإشارات لحظياً.',
    descriptionEn: 'Central master switchboard for arming/disarming all 7 sovereign layers in real time.',
    layerBinding: 'M1-M7',
    status: 'ONLINE',
    adamHashPort: 918,
    openActionKey: 'heptagonal_controller'
  },
  {
    id: 'sovereign_lattice_engine',
    nameAr: 'محرك مصفوفات الشبيكة والأوزان الرمزية',
    nameEn: 'Lattice Matrix & Symbolic Weights Engine',
    categoryAr: 'التشفير الكوانتي والجبر',
    categoryEn: 'Quantum Lattice & Algebra',
    categoryKey: 'lattice',
    badgeAr: 'Ring-LWE 256 • 6236',
    badgeEn: 'Ring-LWE 256 • 6236',
    icon: '⚡',
    gradientClass: 'from-purple-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-purple-500/50 hover:border-purple-400',
    textColor: 'text-purple-300',
    descriptionAr: 'معالجة معادلات الشبيكة الكمية A·s + e ≡ b mod q ومصفوفات الوزن 18 و28 والدستور المكون من 6236 مادة.',
    descriptionEn: 'Ring-LWE quantum cryptographic algebra solver with 18/28 weight matrices and 6236 constitution articles.',
    layerBinding: 'M4',
    status: 'ONLINE',
    adamHashPort: 414,
    openActionKey: 'lattice_matrix'
  },
  {
    id: 'anhk_sovereign_clearing',
    nameAr: 'بروتوكول مقاصة وصك بيت المال (Web4Ankh)',
    nameEn: 'ANHK Sovereign Clearing & Gold Protocol',
    categoryAr: 'النظام النقدي والسيادي',
    categoryEn: 'Monetary & Sovereignty',
    categoryKey: 'monetary',
    badgeAr: '24 تريليون ☥ ذهب',
    badgeEn: '24 Trillion ☥ Gold',
    icon: '☥',
    gradientClass: 'from-amber-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-amber-500/50 hover:border-amber-400',
    textColor: 'text-amber-300',
    descriptionAr: 'إدارة الكتلة المصمتة البالغة 24 تريليون وحدة ذهبية، وتوزيع الـ 12 جنيه عنخ للحَيّ وتثبيت سعر الصرف 516.36 ريال.',
    descriptionEn: 'Managing 24T gold reserves, 12 ANHK sovereign living human quota, and fixed 516.36 Riyal peg.',
    layerBinding: 'M5',
    status: 'ENFORCED',
    adamHashPort: 515,
    openActionKey: 'anhk_modal'
  },
  {
    id: 'sovereign_biometric_id',
    nameAr: 'منظومة الرقم القومي الجيني (14 رقماً)',
    nameEn: '14-Digit Sovereign Biometric ID Document',
    categoryAr: 'الهوية السيادية والكرامة',
    categoryEn: 'Identity & Biometrics',
    categoryKey: 'identity',
    badgeAr: 'قفل 111 • حماية 9 مليار',
    badgeEn: 'Lock 111 • 9B Humans',
    icon: '🪪',
    gradientClass: 'from-emerald-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-emerald-500/50 hover:border-emerald-400',
    textColor: 'text-emerald-300',
    descriptionAr: 'إصدار وتوثيق وثيقة الهوية السيادية الرسمية بـ 14 رقماً قومياً لضمان حقوق الإنسان وعدم السقوط تحت خط الكرامة.',
    descriptionEn: 'Issuance and cryptographic verification of 14-digit universal human identity preventing poverty traps.',
    layerBinding: 'M1',
    status: 'ONLINE',
    adamHashPort: 111,
    openActionKey: 'national_id'
  },
  {
    id: 'sovereign_telecom_network',
    nameAr: 'شبكة الاتصالات السيادية الحرة (Sovereign Telecom)',
    nameEn: 'Free Sovereign Mesh Telecom & Carrier',
    categoryAr: 'الاتصالات والشبكات',
    categoryEn: 'Telecom & Mesh Network',
    categoryKey: 'telecom',
    badgeAr: '0.00$ شريحة حرة',
    badgeEn: '0.00$ Free Carrier',
    icon: '📱',
    gradientClass: 'from-sky-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-sky-500/50 hover:border-sky-400',
    textColor: 'text-sky-300',
    descriptionAr: 'منظومة الاتصال والاتصالات الحرة مع شريحة رقمية eSIM مجانية تماماً معفاة من الرسوم والضرائب التراكمية.',
    descriptionEn: 'Zero-cost universal mobile carrier network with free eSIM and untaxable decentralized mesh routing.',
    layerBinding: 'M2',
    status: 'ONLINE',
    adamHashPort: 212,
    openActionKey: 'phone_network'
  },
  {
    id: 'symbolic_algebra_clearing',
    nameAr: 'محرك الجبر الرمزي ومقاصة الـ 14 (12+2)',
    nameEn: 'Symbolic Algebra & 14 Clearing Engine',
    categoryAr: 'التشفير الكوانتي والجبر',
    categoryEn: 'Quantum Lattice & Algebra',
    categoryKey: 'lattice',
    badgeAr: 'معادلة M3 = 14 - 2',
    badgeEn: 'M3 = 14 - 2 Clearing',
    icon: '🧮',
    gradientClass: 'from-indigo-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-indigo-500/50 hover:border-indigo-400',
    textColor: 'text-indigo-300',
    descriptionAr: 'تنفيذ مقاصة المليارات للأحياء وتغذية البنية التحتية بنقاط العتاد المادي في القارات السبع (+1).',
    descriptionEn: 'Algebraic clearance engine resolving M3 living human quotas and M4 infrastructure allocations.',
    layerBinding: 'M3',
    status: 'ONLINE',
    adamHashPort: 313,
    openActionKey: 'symbolic_algebra'
  },
  {
    id: 'disarmament_reconstruction',
    nameAr: 'محرك تفكيك السلاح وتحويله للإعمار والتعمير',
    nameEn: 'Disarmament & Global Reconstruction Protocol',
    categoryAr: 'النظام النقدي والسيادي',
    categoryEn: 'Monetary & Sovereignty',
    categoryKey: 'monetary',
    badgeAr: 'معادلة 1:1 للتعمير',
    badgeEn: '1:1 Reconstruction',
    icon: '⚖️',
    gradientClass: 'from-rose-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-rose-500/50 hover:border-rose-400',
    textColor: 'text-rose-300',
    descriptionAr: 'بروتوكول تفكيك وتسييل ميزانيات السلاح وتحويلها إلى أصول عينية ومزارع ومدارس ومستشفيات في القارات السبع.',
    descriptionEn: 'Universal military budget conversion protocol routing kinetic spending into physical schools & hospitals.',
    layerBinding: 'M7',
    status: 'ENFORCED',
    adamHashPort: 717,
    openActionKey: 'disarmament'
  },
  {
    id: 'sovereign_pow_calculator',
    nameAr: 'حاسبة إثبات العمل والرقيم (Proof of Work & Raqeem)',
    nameEn: 'Sovereign PoW & Hash Power Estimator',
    categoryAr: 'الأمان والربط البيني',
    categoryEn: 'Security & Interconnect',
    categoryKey: 'security',
    badgeAr: 'AdamHash PoW 918',
    badgeEn: 'AdamHash PoW 918',
    icon: '⛏️',
    gradientClass: 'from-teal-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-teal-500/50 hover:border-teal-400',
    textColor: 'text-teal-300',
    descriptionAr: 'حساب استهلاك الهاش والطاقة الفيزيائية لمطابقة البلوك الذهبي وتأمين شبكة الرقيم الخالية من الصفر.',
    descriptionEn: 'Cryptographic hash calculator verifying physical proof of work and zero-free raqeem ledger validation.',
    layerBinding: 'M6',
    status: 'ONLINE',
    adamHashPort: 918,
    openActionKey: 'pow_calc'
  },
  {
    id: 'anhk_wallet_ledger',
    nameAr: 'المحفظة الرقمية السيادية (ANHK Sovereign Wallet)',
    nameEn: 'ANHK Sovereign Digital Gold Vault & Wallet',
    categoryAr: 'النظام النقدي والسيادي',
    categoryEn: 'Monetary & Sovereignty',
    categoryKey: 'monetary',
    badgeAr: 'محفظة متعددة العملات',
    badgeEn: 'Multi-Asset Gold Wallet',
    icon: '💳',
    gradientClass: 'from-yellow-950/70 via-slate-900 to-slate-950',
    borderColor: 'border-yellow-500/50 hover:border-yellow-400',
    textColor: 'text-yellow-300',
    descriptionAr: 'إدارة وتداول جنيهات عنخ، الريال الحجازي، الدولار المقوّم، والذهب الفيزيائي عيار 24 تحت التشفير السيادي.',
    descriptionEn: 'Multi-currency sovereign vault managing ANHK pounds, gold units, and instant cryptographic clearing.',
    layerBinding: 'M5',
    status: 'ONLINE',
    adamHashPort: 515,
    openActionKey: 'wallet_modal'
  },
  {
    id: 'security_dns_console',
    nameAr: 'لوحة أمان النطاقات وسجلات DNS الكوانتية',
    nameEn: 'Quantum DNS & Sovereign Security Audit',
    categoryAr: 'الأمان والربط البيني',
    categoryEn: 'Security & Interconnect',
    categoryKey: 'security',
    badgeAr: 'DKIM • SPF • DMARC',
    badgeEn: 'DKIM • SPF • DMARC',
    icon: '🌐',
    gradientClass: 'from-slate-900 via-slate-950 to-slate-950',
    borderColor: 'border-slate-700 hover:border-cyan-400',
    textColor: 'text-slate-200',
    descriptionAr: 'فحص وتدقيق سجلات النطاق والتشفير المتناظر والتأكد من مطابقة شفرات الشهادات السيادية.',
    descriptionEn: 'Domain record integrity scanner auditing DKIM, SPF, DMARC, and sovereign quantum certificates.',
    layerBinding: 'M6',
    status: 'ONLINE',
    adamHashPort: 616,
    openActionKey: 'security_audit'
  }
];

interface ExovawareNetworkHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  matrixState: HeptagonalMatrixState;
  onOpenAppAction: (actionKey: ExovawareAppItem['openActionKey']) => void;
}

export const ExovawareNetworkHubModal: React.FC<ExovawareNetworkHubModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  matrixState,
  onOpenAppAction
}) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { key: 'all', nameAr: 'جميع التطبيقات (All Apps)', nameEn: 'All Applications' },
    { key: 'security', nameAr: 'الأمان والربط البيني M6', nameEn: 'Security & M6 Interconnect' },
    { key: 'monetary', nameAr: 'النظام النقدي وصك الذهب', nameEn: 'Monetary & Gold Vault' },
    { key: 'lattice', nameAr: 'الشبيكة الكوانتية والجبر', nameEn: 'Quantum Lattice & Algebra' },
    { key: 'identity', nameAr: 'الهوية السيادية والكرامة', nameEn: 'Identity & Human Dignity' },
    { key: 'telecom', nameAr: 'شبكة الاتصالات السيادية', nameEn: 'Sovereign Telecom Mesh' }
  ];

  const filteredApps = EXOVAWARE_APPLICATIONS.filter((app) => {
    const matchesCategory = selectedCategory === 'all' || app.categoryKey === selectedCategory;
    const matchesSearch =
      app.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.layerBinding.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-cyan-500/50 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold shadow-inner">
              <Grid className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-cyan-100 flex items-center gap-2">
                  <span>{isAr ? 'منظومة تطبيقات إكسوفاوير على الشبكة (Exovaware Network Hub)' : 'Exovaware Sovereign Applications Network Hub'}</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {EXOVAWARE_APPLICATIONS.length} {isAr ? 'تطبيق شبكي' : 'Apps'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr
                  ? 'بوابة تطبيقات وبروتوكولات الشبكة السيادية المتكاملة مع المصفوفة السبعية وقفل التناظر AdamHash 918'
                  : 'Sovereign applications suite integrated with Heptagonal Matrix M1-M7 and AdamHash 918'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Matrix Status Bar */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'حالة الشبكة السيادية:' : 'Sovereign Network Status:'}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {matrixState.globalRiskLevel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'الطبقات النشطة:' : 'Active Layers:'}</span>
              <span className="text-cyan-300 font-bold">{matrixState.activeLayerCount}/7</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">AdamHash:</span>
              <span className="text-emerald-400 font-bold">{matrixState.adamHashIntegrity.slice(0, 16)}...</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Web4Ankh 256 • Quantum Ring-LWE</span>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في تطبيقات إكسوفاوير...' : 'Search Exovaware applications...'}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body - Applications Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono">
          {filteredApps.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <Grid className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
              <p className="text-sm">{isAr ? 'لم يتم العثور على أي تطبيق يطابق البحث' : 'No applications match your query'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredApps.map((app) => {
                const isLayerArmed = app.layerBinding === 'M1-M7' ? matrixState.activeLayerCount >= 4 : matrixState.layers[app.layerBinding];

                return (
                  <div
                    key={app.id}
                    className={`rounded-2xl border p-4 bg-gradient-to-b ${app.gradientClass} ${app.borderColor} transition-all duration-200 flex flex-col justify-between gap-3 shadow-lg group hover:scale-[1.01]`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
                            {app.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.2 rounded bg-black/60 border border-slate-800 text-[10px] text-cyan-300 font-bold">
                                {app.layerBinding}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                Port :{app.adamHashPort}
                              </span>
                            </div>
                            <h3 className={`text-xs sm:text-sm font-bold mt-0.5 ${app.textColor}`}>
                              {isAr ? app.nameAr : app.nameEn}
                            </h3>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${
                          isLayerArmed
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-950 text-rose-300 border-rose-500/40'
                        }`}>
                          {isLayerArmed ? 'ONLINE' : 'DEGRADED'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-300 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-slate-800/80 mt-3">
                        {isAr ? app.descriptionAr : app.descriptionEn}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        {isAr ? app.badgeAr : app.badgeEn}
                      </span>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenAppAction(app.openActionKey);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        <span>{isAr ? 'تشغيل التطبيق' : 'Launch'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'جميع التطبيقات موثقة ومحمية بقفل التناظر السبعي المشفر' : 'All apps strictly secured under the sovereign heptagonal matrix'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
