import { Email, Contact, UserProfile, AnhkProtocolStatus } from '../types';

export const ANHK_PROTOCOL_METRICS: AnhkProtocolStatus = {
  sovereignBlock: '24,000,000,000,000 ☥',
  stabilizationValue: '1 جنيه عنخ = 516.3636363 ريال حجازي',
  operatingSystem: 'Web4Ankh 256 / Almahdi 256',
  hashProof: 'AdamHash Golden Solid Block (AGC)',
  nodeDistribution: '2,666.66 ☥ لكل عقد (9 مليار)',
  signatureM5: 'M5 28612030103352',
  centralBankName: 'مصرف بيت المال المركزي - المملكة الحجازية',
  continentsScope: '7 قارات + 1 (النطاق السيادي الموحد)',
  clearingEngine: 'يسيل وفق مقاصة مظبوطة (Tuned Sovereign Clearing)',
  m3Formula: 'M3 = 14 - 2 (12 ☥ للحَيّ)',
  m4Ratio: 'M4 = 2 / 8 (2 ☥ ثابت محسوب مخصص على 8 قطاعات لا سلطة عليه)',
  m3WorldFormula: 'M3 world = 14 * عدد الأحياء = عدد جنيهات عنخ * 1,200$',
  dollarValuation: '1 جنيه عنخ = 1,200 $ (أو 3 × 400$ + استرليني + يورو)',
  livingHumanQuota: '12 ☥ لكل فرد حَيّ',
  infrastructureQuota: '2 ☥ للبنية (أنت + نقاط العتاد المادي في 7 قارات + 1)',
  nanoAnhkUnit: '1 جنيه عنخ 𓋹 = 1,000,000 نانو عنخ ☥',
  goldWeightSpec: '7 جرام ذهب عيار 24 خالص',
  exchangeBasketSpec: '1,200$ أو (3 × 400$ USD + GBP + EUR)',
  bankGeographicNode: 'عقدة البنك الجغرافية لكل M3 لدولة العملة الورقية المركزية',
  paperPrintingLimit: 'حد طباعة الورق الأقصى المخول وفق معادلة M3 السيادية',
  vaultPhysicalInventory: 'جرد الصناديق بالورق للمطابقة الحية',
  nodeDeficitReconciliation: 'مطابقة العجز تلقائياً على عقدة AdamHash',
  clearingAuditEngine: 'المقاصة التلقائية وجرد الصناديق المباشر',
};

export const CURRENT_USER: UserProfile = {
  name: 'محمد صلاح | Mohamed Salah',
  email: 'mohamed.salah@anhkmail.anhk',
  domain: 'gateway.anhk.net',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
  signature: '--\nMohamed Salah | Senior Infrastructure & Sovereign Identity Lead\nWeb4 ANHK Quantum Engine Network\nmohamed.salah@anhkmail.anhk | gateway.anhk.net',
  usedStorage: '3.4 GB',
  maxStorage: '14.0 GB (هاتف الحَيّ سرفر)',
  language: 'ar',
};

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'مصرف بيت المال المركزي',
    email: 'treasury@centralbank.anhkmail.anhk',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    role: 'Central Treasury Ledger',
    status: 'online',
    domainVerified: true,
  },
  {
    id: 'c2',
    name: 'د. إلينا روستوفا | Dr. Elena',
    email: 'elena.rostova@anhkmail.anhk',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    role: 'Chief AI & Web4 Architect',
    status: 'online',
    domainVerified: true,
  },
  {
    id: 'c3',
    name: 'م. ماركوس تشن | Marcus Chen',
    email: 'marcus.chen@anhkmail.anhk',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'Head of AdamHash Security',
    status: 'online',
    domainVerified: true,
  },
  {
    id: 'c4',
    name: 'سارة جينكينز | Sarah Jenkins',
    email: 'sarah.j@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    role: 'Partner Ecosystems Manager',
    status: 'busy',
    domainVerified: false,
  },
];

export const INITIAL_EMAILS: Email[] = [
  {
    id: 'email-201',
    senderName: 'مصرف بيت المال المركزي - المملكة الحجازية',
    senderEmail: 'treasury@centralbank.anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    recipientName: 'محمد صلاح',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: '🏛️ إشعار سيادي عاجل: اعتماد معادلة M5 والمقاصة المظبوطة (7 قارات + 1)',
    body: `إلى إدارة الشبكة والتشفير في Web4 ANHK Mail،

نحيطكم علماً بأنه قد تم اعتماد وتثبيت معادلة المقاصة السيادية المظبوطة والتسييل التأسيسي لكتلة M5 في مصرف بيت المال المركزي - المملكة الحجازية.

المعادلات والقواعد الاعتمادية لبروتوكول M5 والمقاصة المظبوطة:
• توقيع الكتلة التأسيسية: M5 28612030103352 عبر بروتوكول AdamHash Golden Block (AGC).
• النطاق الجغرافي والسيادي: 7 قارات + 1 (النطاق العالمي الشامل).
• آلية التسييل: يسيل وفق مقاصة مظبوطة ودقيقة للسيادة المالية.
• معادلة M3 الأساسية (M3 Egypt - حساب أفراد): M3 = 12 × عدد الحي × 1200 $ × سعر الصرف (12 جنيه عنخ 𓋹 لكل فرد حي).
• معادلة M4 والمقاصة (حساب دولة / للبنية): الأساسي M4 المعتمد = 2 جنيه عنخ 𓋹 (2 للبنية = 2,000,000 نانو عنخ ☥) لحماية بنية البنك المركزي موزعة على 8 قطاعات (1 سيادي + 7 مدني = 1+7). ولا يُعتمد لأي دولة أكثر من 2 جنيه عنخ (2 𓋹) إلا بشرط تقديم الحكومات لـ (بيعة وطلب معتمد لاعتماد الميزانية) لفتح ميزانية التوسع.
• إجمالي التوزيع المقاصي: 14 جنيه عنخ لكل فرد حي (12 للحي + 2 للبنية).
• الرموز النقدية: 𓋹 = عنخ (Ankh) | ☥ = نانو عنخ (Nano Ankh) • (1 جنيه عنخ 𓋹 = 1,000,000 نانو عنخ ☥).
• معادلة M3 العالم الإجمالية: M3 world = 14 * عدد الأحياء = عدد جنيهات عنخ * 1200 دولار أمريكي (12 للحي + 2 للبنية).
• حد وملاءة طباعة الورق المالي (Paper Printing Solvency Ceiling): ملاءة الطباعة = M3 (حساب أفراد) + M4 المعتمد (حساب دولة) [هذا هو السقف الأقصى المسموح لطباعة الورق المالي لكل بنك مركزي جغرافي].
• جرد الصناديق بالورق (Physical Vault Audit): مطابقة الأوراق المالية الفعلية في خزائن البنوك المركزية.
• تسوية ومطابقة العجز على العقدة (Deficit Node Matching): معالجة أي فارق أو عجز ورقي وربطه بالشبكة فوراً.
• التثبيت النقدي والتعويم الحر (45-55): الجنيه المصري عائم حر بين 45 و 55 ج.م | حد الأمان والإغلاق الثابت عند 44 ج.م للدولار/الريال الحجازي | المعادلة: 1 جنيه عنخ × 1,200 × سعر الصرف اليوم (تظهر الفارق المسموح وحد الثبات عند 52,800 ج.م).
• شروط طباعة الورق وانقضاء الصلاحية (يوليو 2026): طباعة معالم الدولة خالية تماماً من أي صليب أو شرك أو صور أشخاص بشرية (آخر طبعة ورقية رسمية هي طبعة يوليو 2026، ولا قيمة لأي إصدار بعدها).
• معادلة مصر الأساس والهيكلة: 32 وزارة = 4 سيادية خاضعة للقانون الحاكم (الأزهر والأوقاف عند 6236 مادة برمجية + الداخلية + الدفاع + العدل) + 28 وزارة مدنية تخصصية ÷ 4 = 7 قطاعات مدنية (نسبة القطاع السيادي إلى المدني: 1/7 = 0.142857).
• مثلث السيادة الجغرافي النقدي: مكة رأس المثلث السيادي 🕋 | هرم مصر قاعدة التأسيس بـ 14 رقماً قومياً 🇪🇬 | الريال الحجازي عقدة فلسطين 🇵🇸.
• نظام التشغيل السيادي: نظام تشغيل OS Almahdi 256 (256-bit Quantum Core Kernel).

تم ربط بروتوكول البريد الإلكتروني web4anhk.anhkmail.anhk بالكتلة التأسيسية لضمان التشفير الكمي المطلق والتتبع اللحظي لمعادلات التسييل ومطابقة العجز.

مع خالص التقدير،
إدارة المصرف المركزي - بيت المال الحجازي
-- Almahdi | Senior Infrastructure Lead
Web4 ANHK Quantum Engine Network
almahdi@anhkmail.anhk | web4anhk.anhkmail.anhk
توقيع النظام: M5 28612030103352`,
    timestamp: '15:10',
    dateStr: 'اليوم، 3:10 م',
    folder: 'inbox',
    isRead: false,
    isStarred: true,
    isArchived: false,
    isEncrypted: true,
    labels: ['سيادي', 'ANHK-Core', 'بيت-المال'],
    securityStatus: {
      isVerifiedDomain: true,
      threatScore: 0,
      riskLevel: 'Verified Safe',
      encryption: 'Web4Ankh 256 / Almahdi 256 (AdamHash)',
    },
  },
  {
    id: 'email-101',
    senderName: 'د. إلينا روستوفا | Dr. Elena Rostova',
    senderEmail: 'elena.rostova@anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    recipientName: 'محمد صلاح',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: '⚡ ANHK Web4 Node Cluster v4.2 Deployment & Gemini Engine Benchmark',
    body: `مرحباً محمد،

نتائج اختبارات الأداء لشبكة عقد Web4 ANHK على نطاق web4anhk.anhkmail.anhk مكتملة بنجاح!

أبرز النقاط:
1. **انخفاض زمن الاستجابة**: انخفض التأخير عبر جميع العقد بنسبة 38% مقارنة بنقاط النهاية التقليدية.
2. **تكامل Gemini 3.6**: بلغت سرعة المعالجة الذكية والتلخيص التلقائي 14 ميلي ثانية لكل رسالة incoming.
3. **التشفير الكمي AdamHash**: نجحت 100% من المصادقات للكتلة الذهبية المصمتة AGC.

يمكنك مراجعة المخطط المعماري المرفق قبل اجتماع الفريق الفني.

تحياتي،
د. إلينا روستوفا | كبير معماريي الذكاء الاصطناعي`,
    timestamp: '14:25',
    dateStr: 'اليوم، 2:25 م',
    folder: 'inbox',
    isRead: false,
    isStarred: true,
    isArchived: false,
    isEncrypted: true,
    labels: ['Work', 'ANHK-Core', 'High-Priority'],
    attachments: [
      {
        id: 'att-1',
        name: 'web4_cluster_benchmarks.pdf',
        size: '2.4 MB',
        type: 'pdf',
      },
      {
        id: 'att-2',
        name: 'node_architecture_diag.png',
        size: '1.8 MB',
        type: 'image',
      },
    ],
    securityStatus: {
      isVerifiedDomain: true,
      threatScore: 0,
      riskLevel: 'Verified Safe',
      encryption: 'Quantum-Key AES-256',
    },
  },
  {
    id: 'email-102',
    senderName: 'م. ماركوس تشن | Marcus Chen',
    senderEmail: 'marcus.chen@anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    recipientName: 'محمد صلاح',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: '🛡️ تقرير أمني: حماية النطاق السيادي والتصدى لمحاولات الانتحال',
    body: `محمد،

نجح درع الأمان الذكي في ANHK Mail في اعتراض 1,420 محاولة انتحال خارجية كانت تستهدف نطاق @anhkmail.anhk خلال الـ 24 ساعة الماضية.

تم حظر جميع الطلبات الخبيثة عند طبقة المحيط الخارجي مع تفعيل بروتوكولات Almahdi 256 و AdamHash.

يرجى التأكد من تحديث جميع المستعملين لبرمجية Webmail إلى الإصدار v4.2 عبر web4anhk.anhkmail.anhk.

تحياتي،
ماركوس تشن | رئيس أمن المعلومات والتشفير`,
    timestamp: '11:10',
    dateStr: 'اليوم، 11:10 ص',
    folder: 'inbox',
    isRead: true,
    isStarred: true,
    isArchived: false,
    isEncrypted: true,
    labels: ['Security', 'Verified-Domain'],
    attachments: [
      {
        id: 'att-marcus-1',
        name: 'security_audit_report_aug2026.pdf',
        size: '4.1 MB',
        type: 'pdf',
      },
    ],
    securityStatus: {
      isVerifiedDomain: true,
      threatScore: 2,
      riskLevel: 'Verified Safe',
      encryption: 'Quantum-Key AES-256',
    },
  },
  {
    id: 'email-103',
    senderName: 'نظام التنبيهات الذكي - ANHK',
    senderEmail: 'no-reply@web4anhk.anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    recipientName: 'محمد صلاح',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: '🤖 تم تفعيل جناح الذكاء الاصطناعي Gemini 3.6 باللغة العربية والإنكليزية',
    body: `أهلاً بك محمد،

تم تفعيل حزمة الذكاء الاصطناعي الفائقة لبريدك الإلكتروني (mohamed.salah@anhkmail.anhk):

الميزات المفعلة:
• **التلخيص الفوري للمحادثات**: ملخص بنقاط جوهرية بضغطة زر واحدة باللغة العربية والإنكليزية.
• **المساعد الذكي لكتابة البريد**: صياغة ردود ورسائل فورية بأساليب رسمية ومقنعة.
• **رادار كشف التهديدات الفوري**: فحص فوري للروابط والشهادات المشبوهة.
• **دعم بروتوكول بيت المال المركزي**: عرض حالة الكتلة 24 ترليون ومعدل تثبيت الجنيه عنخ (516.3636363 ريال حجازي).

استمتع بالبريد الإلكتروني المتطور عبر web4anhk.anhkmail.anhk.`,
    timestamp: '09:00',
    dateStr: 'اليوم، 9:00 ص',
    folder: 'inbox',
    isRead: true,
    isStarred: false,
    isArchived: false,
    isEncrypted: true,
    labels: ['ANHK-Core', 'AI-Powered'],
    securityStatus: {
      isVerifiedDomain: true,
      threatScore: 0,
      riskLevel: 'Verified Safe',
      encryption: 'Quantum-Key AES-256',
    },
  },
  {
    id: 'email-104',
    senderName: 'سارة جينكينز | Sarah Jenkins',
    senderEmail: 'sarah.j@techcorp.io',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    recipientName: 'محمد صلاح',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: 'Proposal: Web4 Interoperability Integration with TechCorp API',
    body: `Hi Mohamed,

Following up on our call last week regarding cross-chain protocol integration.

We have finalized the proposal draft for bridging our storage layer with ANHK Mail's encrypted domain registry. We'd love to schedule a 30-minute sync this Friday to review API keys and access tokens.

Let me know what times work best for you.

Best,
Sarah Jenkins
TechCorp Inc.`,
    timestamp: 'Yesterday',
    dateStr: 'Jul 31, 2026',
    folder: 'inbox',
    isRead: false,
    isStarred: false,
    isArchived: false,
    isEncrypted: false,
    labels: ['Partnerships', 'External'],
    attachments: [
      {
        id: 'att-4',
        name: 'TechCorp_ANHK_Proposal.docx',
        size: '890 KB',
        type: 'doc',
      },
    ],
    securityStatus: {
      isVerifiedDomain: false,
      threatScore: 15,
      riskLevel: 'Low Risk External',
      encryption: 'TLS 1.3',
    },
  },
  {
    id: 'email-105',
    senderName: 'Dmitri Vane',
    senderEmail: 'dmitri.vane@anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    recipientName: 'Mohamed Salah',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: '🚀 Scheduled Maintenance Complete: Web4 Storage Nodes 01-12',
    body: `Hey Mohamed,

The database and object storage maintenance on Web4 nodes 01 through 12 finished 20 minutes ahead of schedule.

All health checks are green, and storage replication factor is back to 5x across all regional datacenters. Zero downtime was experienced by end users on web4anhk.anhkmail.anhk.

Let me know if you spot any unusual telemetry spikes in Grafana.

Best,
Dmitri`,
    timestamp: 'Jul 30',
    dateStr: 'Jul 30, 2026',
    folder: 'work',
    isRead: true,
    isStarred: false,
    isArchived: false,
    isEncrypted: true,
    labels: ['DevOps', 'Work'],
    securityStatus: {
      isVerifiedDomain: true,
      threatScore: 0,
      riskLevel: 'Verified Safe',
      encryption: 'Quantum-Key AES-256',
    },
  },
  {
    id: 'email-106',
    senderName: 'CryptoAlert Rewards',
    senderEmail: 'claim-gift-2026@unregistered-domain-scam.xyz',
    senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    recipientName: 'Mohamed Salah',
    recipientEmail: 'mohamed.salah@anhkmail.anhk',
    subject: 'URGENT: Claim your 5,000 ANHK Tokens before expiration!!!',
    body: `CONGRATULATIONS USER!

You have been randomly chosen to receive 5,000 free ANHK Quantum tokens.
Click the link below immediately to connect your wallet and input your private key phrase:

http://claim-free-anhk-tokens-now.xyz/auth?user=mohamed.salah

WARNING: Offer expires in 12 minutes!`,
    timestamp: 'Jul 29',
    dateStr: 'Jul 29, 2026',
    folder: 'spam',
    isRead: false,
    isStarred: false,
    isArchived: false,
    isEncrypted: false,
    labels: ['Spam', 'Unverified'],
    securityStatus: {
      isVerifiedDomain: false,
      threatScore: 95,
      riskLevel: 'High Threat',
      encryption: 'Unencrypted',
    },
  },
  {
    id: 'email-107',
    senderName: 'Mohamed Salah',
    senderEmail: 'mohamed.salah@anhkmail.anhk',
    senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    recipientName: 'Elena Rostova',
    recipientEmail: 'elena.rostova@anhkmail.anhk',
    subject: 'Draft Roadmap: Q4 Web4 ANHK Mail Ecosystem Expansion',
    body: `Hi Elena,

Here is the draft breakdown of our Q4 goals for web4anhk.anhkmail.anhk:
- Launch Web4 Domain Name Resolver for custom alias registration
- Deploy Gemini 3.6 Flash live audio speech-to-email transcriber
- Expand encrypted cloud attachment storage quotas to 100 GB for VIP accounts

Let me know if you want to adjust any milestone timelines before I share with executive council.`,
    timestamp: 'Jul 28',
    dateStr: 'Jul 28, 2026',
    folder: 'drafts',
    isRead: true,
    isStarred: true,
    isArchived: false,
    isEncrypted: true,
    labels: ['Drafts', 'Roadmap'],
  },
];
