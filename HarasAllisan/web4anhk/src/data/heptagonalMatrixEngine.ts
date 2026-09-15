export type LayerLevel = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'M7';

export interface HeptagonalLayerConfig {
  level: LayerLevel;
  code: string;
  symmetryLock: number;
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
  isActive: boolean;
  powerContribution: number; // Percentage contribution to security
  threatDefenseFactor: number;
  isolationProtocol: string;
  securityMechanism?: string;
  postQuantumAlgorithm?: string;
  symmetricCentralLock?: string;
}

export interface HeptagonalMatrixState {
  layers: Record<LayerLevel, boolean>;
  activeLayerCount: number;
  globalSecurityScore: number; // 0 - 100
  globalRiskLevel: 'Verified Safe' | 'Sovereign Absolute' | 'High Security' | 'Degraded State' | 'High Threat' | 'Critical Failure';
  globalEncryptionType: string;
  lastToggledTimestamp: string;
  adamHashIntegrity: string;
  powerRatio: number;
}

export const INITIAL_HEPTAGONAL_LAYERS: HeptagonalLayerConfig[] = [
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
    auditHash: '0x717_M7_ABSOLUTE_MINERAL_LEDGER_714412',
    isActive: true,
    powerContribution: 20,
    threatDefenseFactor: 15,
    isolationProtocol: 'Physical Cosmic Mineral Vault Insulation'
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
    auditHash: '0x616_M6_INTERCONNECT_GUARD_SYMMETRIC_ZAKAT_25',
    isActive: true,
    powerContribution: 20,
    threatDefenseFactor: 20,
    isolationProtocol: 'Symmetric Bus & Real-time Zakat Purifier'
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
    auditHash: '0x515_M5_BAYT_AL_MAL_24T_GOLD_CONSTITUTION_6236',
    isActive: true,
    powerContribution: 15,
    threatDefenseFactor: 15,
    isolationProtocol: 'Constitutional 6236 Articles Shield'
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
    auditHash: '0x414_M4_STATES_8_SECTORS_32_MINISTRIES',
    isActive: true,
    powerContribution: 15,
    threatDefenseFactor: 15,
    isolationProtocol: 'Public Decentralized State Ledger'
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
    auditHash: '0x313_M3_LIFETIME_ALLOCATION_14_UNITS_SEAL',
    isActive: true,
    powerContribution: 10,
    threatDefenseFactor: 15,
    isolationProtocol: 'Immediate Human Allowance Safeguard'
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
    auditHash: '0x212_M2_QUAD_PARTNERSHIP_WORKER_DEFICIT_SHIELD',
    isActive: true,
    powerContribution: 10,
    threatDefenseFactor: 10,
    isolationProtocol: 'Industrial Loss Transfer Firewall'
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
    auditHash: '0x111_M1_PROOF_OF_IDENTITY_GENETIC_AUTHENTICATION',
    isActive: true,
    powerContribution: 10,
    threatDefenseFactor: 10,
    isolationProtocol: 'Genetic Biometric Cryptographic Seal'
  }
];

export function computeGlobalSecurityFromMatrix(activeMap: Record<LayerLevel, boolean>): HeptagonalMatrixState {
  const levels: LayerLevel[] = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];
  let activeCount = 0;
  let totalScore = 0;

  INITIAL_HEPTAGONAL_LAYERS.forEach((layer) => {
    if (activeMap[layer.level]) {
      activeCount++;
      totalScore += layer.powerContribution;
    }
  });

  let globalRiskLevel: HeptagonalMatrixState['globalRiskLevel'] = 'Verified Safe';
  let globalEncryptionType = 'Web4Ankh 256 / Almahdi 256 (AdamHash 918)';

  if (activeCount === 7) {
    globalRiskLevel = 'Sovereign Absolute';
    globalEncryptionType = 'Quantum Lattice Ring-LWE 256 / Full 7-Symmetry Sealed';
  } else if (activeCount >= 5) {
    globalRiskLevel = 'Verified Safe';
    globalEncryptionType = 'Web4Ankh 256 / Almahdi 256';
  } else if (activeCount >= 3) {
    globalRiskLevel = 'High Security';
    globalEncryptionType = 'TLS 1.3 / Partial Ring-LWE Fallback';
  } else if (activeCount >= 1) {
    globalRiskLevel = 'Degraded State';
    globalEncryptionType = 'Basic AES-128 / Symmetry Compromised';
  } else {
    globalRiskLevel = 'Critical Failure';
    globalEncryptionType = 'Unencrypted / Classical Hardware Trap';
  }

  const rawHash = `ADAMHASH-918:M1-M7:${activeCount}:${totalScore}`;
  let hashNum = 0x811c9dc5;
  for (let i = 0; i < rawHash.length; i++) {
    hashNum ^= rawHash.charCodeAt(i);
    hashNum = Math.imul(hashNum, 0x01000193);
  }
  const hex = (hashNum >>> 0).toString(16).padStart(8, '0');

  return {
    layers: activeMap,
    activeLayerCount: activeCount,
    globalSecurityScore: totalScore,
    globalRiskLevel,
    globalEncryptionType,
    lastToggledTimestamp: new Date().toLocaleTimeString(),
    adamHashIntegrity: `0x918_${hex}_SEAL_${activeCount}_OF_7`,
    powerRatio: Math.round((totalScore / 100) * 100)
  };
}
