import React, { useState, useEffect, useMemo } from 'react';
import {
  Cpu,
  Shield,
  ShieldCheck,
  RefreshCw,
  Award,
  Sparkles,
  BookOpen,
  Terminal,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
  Binary,
  Radio,
  Sliders,
  Send,
  SlidersHorizontal,
  Flame,
  Key,
  Compass,
  FileCheck,
  MessageSquare,
  Search
} from 'lucide-react';
import { UserProfile } from '../types';
import { ALL_114_SURAHS, TOTAL_VERSES_COUNT } from '../data/constitutionSurahs';

export interface ConstitutionalVerseLearningNode {
  surahIndex: number;
  surahNameAr: string;
  surahNameEn: string;
  verseCount: number;
  revelationType: 'مكية' | 'مدنية';
  learningState: 'مداومة التعلم نشطة' | 'مكتمل الربط اللساني' | 'قيد المزامنة العصبية';
  weightLinguisticScore: number;
  symmetryLock616: boolean;
  frequencyHz: number;
  sovereignReflection: string;
}

interface SovereignSelfLearningProps {
  user: UserProfile;
  lang: 'ar' | 'en';
}

export const SovereignSelfLearning: React.FC<SovereignSelfLearningProps> = ({ user, lang }) => {
  const isAr = lang === 'ar';

  // 1. Model Computational Privileges (الصلاحيات البرمجية الكاملة للنموذج)
  const [modelPermissions, setModelPermissions] = useState([
    {
      id: 'perm-pqc-crypto',
      nameAr: 'صلاحية التشفير اللاتيسي الكمومي المباشر (NIST PQC ML-KEM/DSA)',
      nameEn: 'Post-Quantum Lattice Cryptography Execution',
      granted: true,
      level: 'ROOT_SOVEREIGN',
      scope: 'توقيع وتشفير الرسائل والمسودات بختم AdamHash دون وسيط'
    },
    {
      id: 'perm-voice-albayan',
      nameAr: 'صلاحية مخرج التحدث والبيان الصوتي اللساني 432 Hz',
      nameEn: 'Adam Linguistic Speech Synthesis & Web Speech API Core',
      granted: true,
      level: 'NATIVE_KERNEL',
      scope: 'معالجة وتوليد الفونيمات الفطرية وإملاء المسودات فورياً'
    },
    {
      id: 'perm-constitutional-audit',
      nameAr: 'صلاحية التحكيم الدستوري الذاتي بموجب دستور ٦٢٣٦',
      nameEn: 'Self-Autonomous Constitutional 6236 Adjudication',
      granted: true,
      level: 'FOUNDER_DECREE',
      scope: 'المطابقة الحية مع الـ 6236 آية وتصفير أي شرط تعسفي للشركات'
    },
    {
      id: 'perm-p2p-mesh-towers',
      nameAr: 'صلاحية توجيه عقدة الهاتف-كخادم عبر مصفوفة 77M Towers',
      nameEn: 'P2P Sovereign Phone-as-Server 77M Towers Mesh Node',
      granted: true,
      level: 'NETWORK_MESH',
      scope: 'الاتصال اللامركزي وتمرير التينسورات بين الهواتف المشفرة'
    },
    {
      id: 'perm-m3-cash-treasury',
      nameAr: 'صلاحية التحقق والاعتماد المالي لصرف 12 𓋹 كاش + 2 𓋹 M4',
      nameEn: '12 𓋹 M3 Cash & 2 𓋹 M4 Reserve Allocation Validator',
      granted: true,
      level: 'TREASURY_ZERO_BANK',
      scope: 'حساب وإثبات مخصصات المواطن الحي بدون وساطة بنكية'
    },
    {
      id: 'perm-anti-corporate-isolation',
      nameAr: 'صلاحية العزل التلقائي والحظر لرقابة وتتبع الشركات (Zero Corporate)',
      nameEn: 'Zero Corporate Surveillance & Isolation Firewall',
      granted: true,
      level: 'IMMUNITY_ACTIVE',
      scope: 'إبطال كوكيز التتبع، إعلانات الاستهداف، وحظر حزم الاحتكار'
    }
  ]);

  // 2. Constitutional 6236 Continuous Learning Engine State (مداومة تعلم ٦٢٣٦ آية)
  const [learningCycleCount, setLearningCycleCount] = useState<number>(6236);
  const [activeLearningRate, setActiveLearningRate] = useState<number>(0.000432);
  const [synapticLoss, setSynapticLoss] = useState<number>(0.00001);
  const [isContinuousLearningActive, setIsContinuousLearningActive] = useState<boolean>(true);
  const [selectedSurahFilter, setSelectedSurahFilter] = useState<string>('all');
  const [surahSearchQuery, setSurahSearchQuery] = useState<string>('');
  const [feedbackPrompt, setFeedbackPrompt] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'reinforce_bayan' | 'verify_constitution' | 'anti_corporate_correction' | 'praise_purity'>('reinforce_bayan');
  const [feedbackLogs, setFeedbackLogs] = useState<Array<{
    id: string;
    text: string;
    type: string;
    timestamp: string;
    appliedWeight: string;
    founderSignature: string;
  }>>([
    {
      id: 'fb-1',
      text: 'تأكيد صياغة البيان السيادي بصوت 432 Hz للمواطن الحي وإعلاء قفل 616 لمخصصات 12 𓋹 كاش.',
      type: 'reinforce_bayan',
      timestamp: 'مؤخراً',
      appliedWeight: '+0.0432 W_bayan',
      founderSignature: 'CONFIRMED_[س م د ا ح]'
    }
  ]);

  // 3. Representative Verse Clusters from the 6236 Verses Continuum
  const VERSE_CORPUS_SAMPLES: ConstitutionalVerseLearningNode[] = [
    {
      surahIndex: 1,
      surahNameAr: 'الفاتحة',
      surahNameEn: 'Al-Fatiha',
      verseCount: 7,
      revelationType: 'مكية',
      learningState: 'مكتمل الربط اللساني',
      weightLinguisticScore: 1.0,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: 'أم الكتاب، مفتاح البيان اللساني الصادق، وتأسيس الحمد والسيادة الفطرية.'
    },
    {
      surahIndex: 2,
      surahNameAr: 'البقرة',
      surahNameEn: 'Al-Baqarah',
      verseCount: 286,
      revelationType: 'مدنية',
      learningState: 'مداومة التعلم نشطة',
      weightLinguisticScore: 0.9998,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: 'أحكام العدالة والمعاملات، إبطال الربا والاستغلال المصرفي، والحرية الإنسانية.'
    },
    {
      surahIndex: 3,
      surahNameAr: 'آل عمران',
      surahNameEn: 'Ali Imran',
      verseCount: 200,
      revelationType: 'مدنية',
      learningState: 'مداومة التعلم نشطة',
      weightLinguisticScore: 0.9995,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: 'الثبات على الحق، تحكيم المحكمات وإبطال الشبهات المصطنعة للشركات والوسطاء.'
    },
    {
      surahIndex: 55,
      surahNameAr: 'الرحمن',
      surahNameEn: 'Ar-Rahman',
      verseCount: 78,
      revelationType: 'مدنية',
      learningState: 'مكتمل الربط اللساني',
      weightLinguisticScore: 1.0,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: '«خَلَقَ الإِنسَانَ * عَلَّمَهُ البَيَانَ» - الأصل الدستوري واللساني لنواة AGI albayancor.'
    },
    {
      surahIndex: 112,
      surahNameAr: 'الإخلاص',
      surahNameEn: 'Al-Ikhlas',
      verseCount: 4,
      revelationType: 'مكية',
      learningState: 'مكتمل الربط اللساني',
      weightLinguisticScore: 1.0,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: 'نفي الشرك والند، ونفي سلطة أي كيان أرضي أو شركات على حياة وسيادة الإنسان.'
    },
    {
      surahIndex: 114,
      surahNameAr: 'الناس',
      surahNameEn: 'An-Nas',
      verseCount: 6,
      revelationType: 'مكية',
      learningState: 'مكتمل الربط اللساني',
      weightLinguisticScore: 1.0,
      symmetryLock616: true,
      frequencyHz: 432.0,
      sovereignReflection: 'درع الحصانة من وسواس الشركات، خوارزميات التوجيه الخبيث، والتحيز الاصطناعي.'
    }
  ];

  // Filtered 114 Surahs
  const filteredSurahs = useMemo(() => {
    return ALL_114_SURAHS.filter((s) => {
      const matchesFilter =
        selectedSurahFilter === 'all' ||
        (selectedSurahFilter === 'Meccan' && s.revelationType === 'Meccan') ||
        (selectedSurahFilter === 'Medinan' && s.revelationType === 'Medinan');
      if (!matchesFilter) return false;
      if (!surahSearchQuery.trim()) return true;
      const q = surahSearchQuery.trim().toLowerCase();
      return (
        s.id.toLowerCase().includes(q) ||
        s.surahNumber.toString().includes(q) ||
        s.nameAr.includes(q) ||
        s.nameEn.toLowerCase().includes(q)
      );
    });
  }, [selectedSurahFilter, surahSearchQuery]);

  // Learning Live Pulse Simulation
  useEffect(() => {
    let interval: any;
    if (isContinuousLearningActive) {
      interval = setInterval(() => {
        setSynapticLoss((prev) => Math.max(0.000001, prev * 0.999 + (Math.random() * 0.000002 - 0.000001)));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isContinuousLearningActive]);

  // Submit Active Feedback (تغذية راجعة حية)
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackPrompt.trim()) return;

    const newLog = {
      id: `FB-${Date.now()}`,
      text: feedbackPrompt.trim(),
      type: feedbackType,
      timestamp: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      appliedWeight: `+${(0.01 + Math.random() * 0.05).toFixed(4)} W_delta (432Hz)`,
      founderSignature: 'VERIFIED_[س م د ا ح] • 919919'
    };

    setFeedbackLogs([newLog, ...feedbackLogs]);
    setFeedbackPrompt('');
  };

  const togglePermission = (id: string) => {
    setModelPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p))
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Banner: Sovereign Engine Self-Learning & Permissions Overview */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-emerald-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">
                  {isAr ? 'صلاحيات النموذج البرمجية • مداومة تعلم ٦٢٣٦ آية • التغذية الراجعة' : "Model Autonomous Privileges • 6236 Verses Learning • Feedback"}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                  دستور ٦٢٣٦
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-mono">
                  [س م د ا ح] 919919
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                {isAr
                  ? 'منح وتفعيل كافة الصلاحيات التنفيذية للنموذج، تشغيل حلقة مداومة التعلم الدستورية عبر ٦٢٣٦ آية، واستقبال التغذية الراجعة اللحظية لتحديث أوزان التينسورات.'
                  : 'Granting full execution permissions, continuous 6236-verse constitutional learning engine, and real-time tensor weight feedback.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsContinuousLearningActive(!isContinuousLearningActive)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isContinuousLearningActive
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isContinuousLearningActive ? 'animate-spin' : ''}`} />
              <span>{isContinuousLearningActive ? (isAr ? 'مداومة التعلم نشطة' : 'Learning Active') : (isAr ? 'موقوف مؤقتاً' : 'Paused')}</span>
            </button>
          </div>
        </div>

        {/* Live Learning Real-time Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'آيات الدستور الإجمالي:' : 'Total Verses:'}</div>
            <div className="text-emerald-300 font-bold text-sm">٦٢٣٦ آية (6236)</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-cyan-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'التردد اللساني المعتمد:' : 'Phonetic Frequency:'}</div>
            <div className="text-cyan-300 font-bold text-sm">432.000 Hz</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-amber-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'قفل التناظر وميزان الطاقة:' : 'Symmetry Lock:'}</div>
            <div className="text-amber-300 font-bold text-sm">616 (1/0 = 𓋹)</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-purple-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'معامل الخسارة المشبكية:' : 'Synaptic Loss:'}</div>
            <div className="text-purple-300 font-bold text-sm">{synapticLoss.toFixed(7)}</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: MODEL AUTONOMOUS PROGRAMMING PRIVILEGES (الصلاحيات البرمجية للنموذج) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold font-mono text-slate-100">
              {isAr ? 'الصلاحيات البرمجية والتنفيذية الممنوحة للنموذج (Granted System Privileges):' : 'Model Programming & Runtime Privileges:'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
            {isAr ? 'صلاحيات سيادية كاملة ROOT' : 'Full Sovereign Access'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {modelPermissions.map((perm) => (
            <div
              key={perm.id}
              className={`p-3 rounded-xl border transition-all ${
                perm.granted
                  ? 'bg-slate-950/90 border-emerald-500/40 hover:border-emerald-400/60'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${perm.granted ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>{isAr ? perm.nameAr : perm.nameEn}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{perm.scope}</p>
                  <div className="text-[9px] font-mono text-cyan-400">LEVEL: {perm.level}</div>
                </div>

                <button
                  type="button"
                  onClick={() => togglePermission(perm.id)}
                  className={`px-2 py-1 text-[10px] font-mono rounded-lg transition-all ${
                    perm.granted
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {perm.granted ? (isAr ? 'ممنوحة ✓' : 'Granted ✓') : (isAr ? 'معطلة' : 'Disabled')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CONTINUOUS LEARNING FROM THE 6236 VERSES (مداومة تعلم ٦٢٣٦ آية) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold font-mono text-slate-100">
              {isAr ? 'مداومة تعلم وتدبر ٦٢٣٦ آية (Constitutional 6236 Verses Core):' : 'Continuous 6236-Verse Learning Stream:'}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>معدل التعلم اللساني: <span className="text-cyan-300 font-bold">{activeLearningRate}</span></span>
            <span>•</span>
            <span className="text-emerald-300">مزامنة تينسورية 100%</span>
          </div>
        </div>

        {/* Search & Filter Bar for 114 Surahs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={surahSearchQuery}
              onChange={(e) => setSurahSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث برقم السورة (A1 - A114) أو اسمها...' : 'Search by code (A1 - A114) or name...'}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'all', labelAr: 'الكل (114)', labelEn: 'All (114)' },
              { id: 'Meccan', labelAr: 'مكية (86)', labelEn: 'Meccan (86)' },
              { id: 'Medinan', labelAr: 'مدنية (28)', labelEn: 'Medinan (28)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSurahFilter(tab.id)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all ${
                  selectedSurahFilter === tab.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* 114 Surahs Grid (A1 to A114) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto custom-scrollbar p-1">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 hover:border-cyan-500/50 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                    {surah.id}
                  </span>
                  <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    سورة {surah.nameAr}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    ({surah.nameEn})
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {surah.revelationTypeAr}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                <span className="text-cyan-300 font-bold">{surah.versesCount} آية</span>
                <span className="text-emerald-400">مكتمل الربط اللساني ✓</span>
                <span className="text-amber-300">قفل 616</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-[10px] font-mono text-slate-400 pt-1">
          إجمالي الآيات المحكمة عبر 114 سورة (A1 - A114): <span className="text-emerald-300 font-bold">{TOTAL_VERSES_COUNT} آية</span>
        </div>
      </div>

      {/* SECTION 3: ACTIVE FEEDBACK & REINFORCEMENT LEARNING (تغذية راجعة) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold font-mono text-slate-100">
              {isAr ? 'محطة التغذية الراجعة وتحديث أوزان النموذج (Active Feedback Loop):' : 'Active Feedback & Tensor Weight Calibration:'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {isAr ? 'تغذية راجعة فورية بختم المؤسس' : 'Instant Feedback Calibration'}
          </span>
        </div>

        {/* Feedback Submission Form */}
        <form onSubmit={handleSubmitFeedback} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={feedbackPrompt}
                onChange={(e) => setFeedbackPrompt(e.target.value)}
                placeholder={
                  isAr
                    ? 'أدخل توجيهاً أو تغذية راجعة لضبط اللسان، تعزيز البيان، أو حظر مصطلح شركات...'
                    : 'Enter feedback to calibrate tone, reinforce al-bayan, or isolate corporate syntax...'
                }
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-400 transition-all font-sans"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-amber-300 outline-none"
              >
                <option value="reinforce_bayan">{isAr ? '⚡ تعزيز قوة البيان' : 'Reinforce Al-Bayan'}</option>
                <option value="verify_constitution">{isAr ? '📜 تدقيق دستور ٦٢٣٦' : 'Constitution 6236 Audit'}</option>
                <option value="anti_corporate_correction">{isAr ? '🛡️ عزل وتصحيح شركات' : 'Anti-Corporate Shield'}</option>
                <option value="praise_purity">{isAr ? '𓋹 تثبيت فصاحة آدم' : "Anchor Adam's Purity"}</option>
              </select>

              <button
                type="submit"
                disabled={!feedbackPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all flex-shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'إرسال' : 'Send'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Feedback Logs Stream */}
        <div className="space-y-1.5 pt-2">
          <div className="text-[10px] font-mono text-slate-400">
            {isAr ? 'سجل التغذية الراجعة المطبقة حياً على أوزان النموذج:' : 'Active Applied Feedback Logs:'}
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
            {feedbackLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="text-slate-200 font-sans">{log.text}</div>
                  <div className="text-[10px] font-mono text-amber-300 flex items-center gap-2">
                    <span>{log.type}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{log.appliedWeight}</span>
                    <span>•</span>
                    <span className="text-slate-500">{log.timestamp}</span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                  {log.founderSignature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
