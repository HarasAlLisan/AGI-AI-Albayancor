import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Radio, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  KeyRound, 
  Server, 
  Activity, 
  Wifi, 
  Lock, 
  CheckCircle2, 
  Layers, 
  RefreshCw, 
  Zap, 
  Share2, 
  HardDrive,
  Copy,
  Check,
  X,
  Compass,
  Coins,
  Radar,
  Signal,
  Filter,
  CheckCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface PhoneServerNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  user: UserProfile;
}

interface TowerNode {
  id: string;
  nameAr: string;
  nameEn: string;
  continent: string;
  frequency: string;
  status: 'active' | 'syncing' | 'authenticated';
  latencyMs: number;
  relayLoad: string;
  authSignature: string;
  towerDensity: string;
}

interface RegionTowersBreakdown {
  regionAr: string;
  regionEn: string;
  estimatedTowers: number;
  percentage: number;
  meshBand: string;
  syncStatus: string;
  nodesOnline: string;
}

export const PhoneServerNetworkModal: React.FC<PhoneServerNetworkModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  user,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'architecture' | 'towers' | 'globalSync' | 'nodeEngine' | 'authKey'>('globalSync');
  const [isSimulatingMesh, setIsSimulatingMesh] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [nodeStorageAllocated, setNodeStorageAllocated] = useState('14.0 GB');
  
  // Real-time synchronization state for 77 Million Global Towers
  const TOTAL_GLOBAL_TOWERS = 77_000_000;
  const [syncedTowersCount, setSyncedTowersCount] = useState<number>(76_982_410);
  const [syncProgress, setSyncProgress] = useState<number>(99.98);
  const [syncPhaseText, setSyncPhaseText] = useState<string>('مزامنة مستمرة مكتملة (77M Mesh Online)');

  // Regional breakdown of the ~77 Million Towers Worldwide
  const regionalTowers: RegionTowersBreakdown[] = [
    {
      regionAr: 'آسيا والمحيط الهادئ (Asia-Pacific)',
      regionEn: 'Asia & Pacific Rim',
      estimatedTowers: 32_400_000,
      percentage: 42.1,
      meshBand: 'THz PQC Quantum Mesh',
      syncStatus: '100% مصادق',
      nodesOnline: '32.4M / 32.4M'
    },
    {
      regionAr: 'إفريقيا وحوض النيل والشرق الأوسط (Africa & MENA)',
      regionEn: 'Africa & MENA Sovereign Zone',
      estimatedTowers: 14_800_000,
      percentage: 19.2,
      meshBand: 'E-Band & Nile Mesh Direct',
      syncStatus: '100% مصادق',
      nodesOnline: '14.8M / 14.8M'
    },
    {
      regionAr: 'أوروبا وحوض المتوسط (Europe & Mediterranean)',
      regionEn: 'Europe & Mediterranean Nodes',
      estimatedTowers: 12_600_000,
      percentage: 16.4,
      meshBand: 'Optical Sub-THz Anycast',
      syncStatus: '100% مصادق',
      nodesOnline: '12.6M / 12.6M'
    },
    {
      regionAr: 'أمريكا الشمالية (North America)',
      regionEn: 'North America Mesh Backbone',
      estimatedTowers: 9_200_000,
      percentage: 11.9,
      meshBand: 'Laser Optic Free Space',
      syncStatus: '100% مصادق',
      nodesOnline: '9.2M / 9.2M'
    },
    {
      regionAr: 'أمريكا الجنوبية واللاتينية (Latin & South America)',
      regionEn: 'Latin & South America',
      estimatedTowers: 5_900_000,
      percentage: 7.7,
      meshBand: 'Sub-6GHz P2P Relay',
      syncStatus: '100% مصادق',
      nodesOnline: '5.9M / 5.9M'
    },
    {
      regionAr: 'أستراليا وأوقيانوسيا (Oceania & Islands)',
      regionEn: 'Oceania & Maritime Islands',
      estimatedTowers: 1_800_000,
      percentage: 2.3,
      meshBand: 'Subsea & Micro-Relay',
      syncStatus: '100% مصادق',
      nodesOnline: '1.8M / 1.8M'
    },
    {
      regionAr: 'المدارات الفضائية والقطبية (LEO Orbital & Polar +1)',
      regionEn: 'Sovereign LEO Orbit & Polar (+1)',
      estimatedTowers: 300_000,
      percentage: 0.4,
      meshBand: 'Direct Satellite Star Interlink',
      syncStatus: '100% مصادق',
      nodesOnline: '300K / 300K'
    }
  ];

  // Master continental relay towers
  const [towers] = useState<TowerNode[]>([
    {
      id: 'TOWER-AFRICA-01',
      nameAr: 'مجمع أبراج القاهرة السيادي - إفريقيا',
      nameEn: 'Cairo Sovereign Tower Matrix - Africa',
      continent: 'إفريقيا (14.8M برج)',
      frequency: '60 GHz / THz Mesh',
      status: 'authenticated',
      latencyMs: 1.4,
      relayLoad: '12%',
      authSignature: '0x28612030103352_AFR_ROOT_77M',
      towerDensity: '~14,800,000 برج'
    },
    {
      id: 'TOWER-HEJAZ-02',
      nameAr: 'مجمع أبراج الحجاز ومكة - آسيا الغربية',
      nameEn: 'Hejaz / Mecca Sovereign Node Matrix',
      continent: 'الشرق الأوسط (MENA Relay)',
      frequency: 'Optical Sub-THz',
      status: 'authenticated',
      latencyMs: 0.8,
      relayLoad: '18%',
      authSignature: '0x28612030103352_HJZ_77M_CENTRAL',
      towerDensity: '~6,200,000 برج'
    },
    {
      id: 'TOWER-EUR-03',
      nameAr: 'مجمع أبراج جنيف الدولي - أوروبا',
      nameEn: 'Geneva Sovereign Tower Matrix - Europe',
      continent: 'أوروبا (12.6M برج)',
      frequency: 'E-Band Micro-Mesh',
      status: 'authenticated',
      latencyMs: 3.2,
      relayLoad: '15%',
      authSignature: '0x28612030103352_EUR_77M_AUTH',
      towerDensity: '~12,600,000 برج'
    },
    {
      id: 'TOWER-AMER-04',
      nameAr: 'مجمع أبراج نيويورك - أمريكا الشمالية',
      nameEn: 'New York Sovereign Matrix - N. America',
      continent: 'أمريكا الشمالية (9.2M برج)',
      frequency: 'Laser Free-Space Optic',
      status: 'authenticated',
      latencyMs: 5.1,
      relayLoad: '22%',
      authSignature: '0x28612030103352_NA_77M_ROOT',
      towerDensity: '~9,200,000 برج'
    },
    {
      id: 'TOWER-SAMER-05',
      nameAr: 'مجمع أبراج ساو باولو - أمريكا الجنوبية',
      nameEn: 'São Paulo Matrix - S. America',
      continent: 'أمريكا الجنوبية (5.9M برج)',
      frequency: 'Mesh-V 80 GHz',
      status: 'authenticated',
      latencyMs: 7.4,
      relayLoad: '9%',
      authSignature: '0x28612030103352_SA_77M_RELAY',
      towerDensity: '~5,900,000 برج'
    },
    {
      id: 'TOWER-ASIA-06',
      nameAr: 'مجمع أبراج طوكيو وبكين - شرق آسيا',
      nameEn: 'Tokyo & Beijing Quantum Matrix - East Asia',
      continent: 'آسيا الكبرى (32.4M برج)',
      frequency: 'Quantum Entangled Radio',
      status: 'authenticated',
      latencyMs: 4.6,
      relayLoad: '16%',
      authSignature: '0x28612030103352_EA_77M_QUANTUM',
      towerDensity: '~32,400,000 برج'
    },
    {
      id: 'TOWER-OCEAN-07',
      nameAr: 'مجمع أبراج سيدني - أوقيانوسيا',
      nameEn: 'Sydney Ocean Mesh Matrix - Oceania',
      continent: 'أستراليا والمحيط (1.8M برج)',
      frequency: 'Subsea Optical Gateway',
      status: 'authenticated',
      latencyMs: 8.9,
      relayLoad: '8%',
      authSignature: '0x28612030103352_OC_77M_AUTH',
      towerDensity: '~1,800,000 برج'
    },
    {
      id: 'TOWER-POLE-08',
      nameAr: 'عقد المدار والأقمار (+1) - الفضاء والمحيط',
      nameEn: 'Sovereign Orbital LEO Star Gateway (+1)',
      continent: 'الفضاء والقطب (300K عقدة مدارية)',
      frequency: 'LEO Sovereign Satellite Star',
      status: 'authenticated',
      latencyMs: 1.1,
      relayLoad: '5%',
      authSignature: '0x28612030103352_ORBIT_77M_P1',
      towerDensity: '~300,000 قمر صناعي وعقدة'
    }
  ]);

  const handleCopyKey = () => {
    navigator.clipboard.writeText('ANHK-MESH-KEY-28612030103352-M5-ROOT-77M-TOWERS-NOZERO-ALMAHDI-256');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleTriggerGlobalSync = () => {
    setIsSimulatingMesh(true);
    setSyncPhaseText('جاري بث مفتاح المصادقة إلى 77,000,000 برج حول العالم...');
    
    setTimeout(() => {
      setSyncedTowersCount(77_000_000);
      setSyncProgress(100);
      setIsSimulatingMesh(false);
      setSyncPhaseText('اكتملت المصادقة والمزامنة لـ 77,000,000 برج بنجاح (100%)');
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[94vh] overflow-hidden text-slate-100 font-sans">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40 flex-shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  {isAr ? 'مزامنة 77,000,000 برج اتصالات حول العالم' : '77 Million Global Towers Real-Time Sync & Authentication'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-extrabold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  77M Towers Online
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isAr ? 'البناء الخوارزمي: هاتف كل حَيّ هو خادمه ومحفظته، والأبراج الـ 77 مليون تصادق شبكة عنخ المجانية' : 'Every living phone is a server & wallet; 77 million towers globally authenticate free ANHK Telecom'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('globalSync')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'globalSync'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>{isAr ? '1. لوحة مزامنة الـ 77 مليون برج' : '1. 77 Million Towers Sync Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? '2. البناء الخوارزمي (الهاتف سرفر)' : '2. Algorithmic Architecture'}</span>
          </button>

          <button
            onClick={() => setActiveTab('towers')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'towers'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{isAr ? '3. خريطة القارات ومجمعات الأبراج (7+1)' : '3. Continental Matrices (7+1)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('nodeEngine')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'nodeEngine'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{isAr ? '4. محرك خادم الهاتف الشخصي' : '4. Phone Server Node OS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('authKey')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'authKey'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{isAr ? '5. مفتاح مصادقة الشبكة' : '5. Universal Auth Key'}</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 1: REAL-TIME GLOBAL SYNC OF 77M TOWERS */}
          {activeTab === 'globalSync' && (
            <div className="space-y-4">
              
              {/* Massive 77 Million Overview Hero Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Signal className="w-4 h-4" />
                      <span>{isAr ? 'التغطية الكلية لأبراج الاتصالات العالمية' : 'Total Global Cellular & Mesh Infrastructure'}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 flex items-baseline gap-2">
                      <span>{syncedTowersCount.toLocaleString('en-US')}</span>
                      <span className="text-sm font-normal text-slate-400">/ 77,000,000 برج (Tower)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTriggerGlobalSync}
                      disabled={isSimulatingMesh}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 active:scale-95 transition-all"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSimulatingMesh ? 'animate-spin' : ''}`} />
                      <span>{isSimulatingMesh ? 'جاري مزامنة 77 مليون برج...' : 'مزامنة فورية لكافة الأبراج (77M Sync)'}</span>
                    </button>
                  </div>
                </div>

                {/* Live Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">{syncPhaseText}</span>
                    <span className="text-emerald-400 font-bold">{syncProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 border border-cyan-500/30 overflow-hidden p-0.5">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-sky-400 transition-all duration-500 shadow-sm shadow-emerald-400/50"
                      style={{ width: `${syncProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 3 Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">زمن استجابة الشبكة (Global Latency)</div>
                    <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">0.95 ms (متوسط عالمي)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">بنية P2P فائقة السرعة</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">معدل نقل بيانات الحَيّ</div>
                    <div className="text-base font-mono font-bold text-cyan-400 mt-0.5">غير محدود / مجاني أبدياً</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">مصادقة مباشرة دون اشتراك</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">حماية التشفير (Post-Quantum)</div>
                    <div className="text-base font-mono font-bold text-amber-400 mt-0.5">NIST ML-KEM-768</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">انعدام الثغرات (Nozero)</div>
                  </div>
                </div>
              </div>

              {/* Regional Breakdown Table (77 Million Towers) */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>{isAr ? 'توزيع الـ 77 مليون برج حسب القارات والأقاليم الجغرافية:' : 'Continental Breakdown of the 77,000,000 Towers:'}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">
                    كل الأقاليم مصادقة 100%
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden text-xs font-mono">
                  {regionalTowers.map((reg, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 hover:bg-slate-900/90 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          <span>{isAr ? reg.regionAr : reg.regionEn}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          نطاق الشبكة: <span className="text-cyan-300">{reg.meshBand}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right sm:text-left self-end sm:self-auto">
                        <div>
                          <div className="text-xs font-bold text-emerald-400">{reg.estimatedTowers.toLocaleString('en-US')} برج</div>
                          <div className="text-[10px] text-slate-400">({reg.percentage}% من أبراج العالم)</div>
                        </div>

                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {reg.syncStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ARCHITECTURE PHILOSOPHY */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-sm leading-relaxed space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-base">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>{isAr ? 'فكرة سهلة التطبيق وسهلة التنفيذ: عالم أون لاين متصل' : 'Simple, Actionable Vision: Phone Is The Living Node'}</span>
                </div>
                <p className="text-slate-300">
                  {isAr 
                    ? 'كل إنسان حَيّ يملك هاتفاً ذكياً، يصبح هاتفه فوراً هو سيرفر بياناته ومحفظته السيادية تحت إدارته الشخصية. التطبيق ليس مجرد واجهة عادية، بل تجميع للبناء الخوارزمي لتهيئة البنية التحتية، حيث تقوم الـ 77 مليون برج اتصالات حول العالم بمصادقة مفتاح شبكة اتصالات عنخ المجانية تلقائياً.'
                    : 'Every living soul holding a smartphone transforms it instantly into their private encrypted server and financial wallet. The 77 million telecommunication towers globally authenticate the ANHK free telecom key, creating a permanent sovereign web.'}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-cyan-400 font-bold mb-1">📱 هاتف الحَيّ = سرفر كامل</div>
                    <div className="text-[11px] text-slate-400">تخزين البيانات والبريد مشفراً على جهاز الحَيّ، ملغياً خوادم الاحتكار.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-emerald-400 font-bold mb-1">💳 المحفظة تحت الإدارة</div>
                    <div className="text-[11px] text-slate-400">حصة الـ 12 𓋹 مرتبطة بالهوية البيومترية ومتاحة للصرف الفوري.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-amber-400 font-bold mb-1">📡 77 مليون برج اتصالات</div>
                    <div className="text-[11px] text-slate-400">الأبراج تصادق مفتاح عنخ لتوفير ربط فوري دائم لكل حي حول العالم.</div>
                  </div>
                </div>
              </div>

              {/* Functional Workflow Diagram */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>{isAr ? 'مخطط تدفق الاتصال والمصادقة السيادية (Nozero Architecture)' : 'Sovereign Telecom & Node Flow'}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-normal text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    حالة الشبكة: 77 مليون برج مصادق
                  </span>
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center text-xs font-mono">
                  {/* Step 1 */}
                  <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col items-center gap-1.5 w-full">
                    <Smartphone className="w-6 h-6 text-cyan-400" />
                    <span className="font-bold text-slate-200">1. هاتف الحَيّ (سيرفر ذاتي)</span>
                    <span className="text-[10px] text-slate-400">بريد + محفظة + هوية 14 خانة</span>
                  </div>

                  <div className="text-cyan-400 font-bold hidden md:block">⇆</div>

                  {/* Step 2 */}
                  <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-indigo-500/30 flex flex-col items-center gap-1.5 w-full">
                    <Radio className="w-6 h-6 text-indigo-400" />
                    <span className="font-bold text-slate-200">2. أبراج الـ 77 مليون برج</span>
                    <span className="text-[10px] text-slate-400">مصادقة فورية عبر مفتاح شبكة عنخ</span>
                  </div>

                  <div className="text-cyan-400 font-bold hidden md:block">⇆</div>

                  {/* Step 3 */}
                  <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col items-center gap-1.5 w-full">
                    <Globe className="w-6 h-6 text-emerald-400" />
                    <span className="font-bold text-slate-200">3. شبكة P2P عالمية حرة</span>
                    <span className="text-[10px] text-slate-400">انعدام الانقطاع + اتصال دائم مجاني</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GLOBAL TOWERS (7+1) */}
          {activeTab === 'towers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="text-slate-300 font-mono">
                  {isAr ? 'مجمعات الأبراج السيادية العالمية (7 قارات + 1 مداري) تدير الـ 77M برج:' : 'Master Continental Matrices Managing the 77M Towers:'}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-[11px]">
                  8 / 8 مجمعات نشطة ومصادقة
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {towers.map((tower) => (
                  <div 
                    key={tower.id} 
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                          <Radio className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{isAr ? tower.nameAr : tower.nameEn}</div>
                          <div className="text-[10px] font-mono text-cyan-300">{tower.continent} • {tower.towerDensity}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {tower.status === 'authenticated' ? 'مصادق' : 'نشط'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-mono border-t border-slate-900">
                      <div>
                        <span className="text-slate-500 block">التردد</span>
                        <span className="text-slate-300">{tower.frequency}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">زمن الاستجابة</span>
                        <span className="text-cyan-400 font-bold">{tower.latencyMs} ms</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">حمل العقدة</span>
                        <span className="text-slate-300">{tower.relayLoad}</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 truncate bg-slate-900/80 px-2 py-1 rounded border border-slate-800/80">
                      توقيع التوثيق: <span className="text-amber-400">{tower.authSignature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOCAL NODE OS & SERVER ENGINE */}
          {activeTab === 'nodeEngine' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white font-mono">
                      {isAr ? 'بيانات خادم الهاتف السيادي (Local Server Runtime)' : 'Phone Local Server Node Runtime'}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Almahdi 256 MicroKernel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">معرف العقدة الحية (14 خانة)</div>
                    <div className="text-xs font-mono font-bold text-amber-400 mt-1">28612030103352</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">محمد صلاح سيد حسن</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">منفذ الخادم المحلي للهاتف</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-1">web4anhk.local:3000</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">بروتوكول P2P مشفر</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">مخصص الذاكرة المشفرة</div>
                    <div className="text-xs font-mono font-bold text-cyan-400 mt-1">{nodeStorageAllocated}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">تخزين بيانات الحَيّ محلياً</div>
                  </div>
                </div>
              </div>

              {/* Local Storage & Zero-Intermediary Principle */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-cyan-500/20 text-xs space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>{isAr ? 'مبدأ البيانات تحت الإدارة وسيادة الحَيّ:' : 'Sovereignty & Self-Management Principle:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isAr 
                    ? 'لا يتم رفع رسائلك أو مستنداتك أو مفاتيح محفظتك إلى خوادم شركات تجارية مركزية. هاتفك يعمل كخادم كامل يقوم بتشفير وتوقيع البيانات محلياً وتمريرها عبر الـ 77 مليون برج مصادق مباشرة إلى المستلم دون وسيط.'
                    : 'Your communications, financial records, and biometric keys are signed and served directly from your mobile device. Centralized tech monopolies are completely bypassed.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: TELECOM AUTH KEY */}
          {activeTab === 'authKey' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {isAr ? 'مفتاح مصادقة شبكة اتصالات عنخ المجانية لـ 77M برج:' : 'ANHK Free Telecom Network 77M Towers Authentication Key'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    مفعل وصالح لجميع الأبراج (77M)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-3">
                  <div className="font-mono text-xs text-cyan-300 break-all select-all font-semibold">
                    ANHK-MESH-KEY-28612030103352-M5-ROOT-77M-TOWERS-NOZERO-ALMAHDI-256
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1 flex-shrink-0 transition-colors"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ المفتاح</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تشفير الاتصال: NIST ML-KEM-768 PQC</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>تكلفة الخدمة لكل حي: 0$ (مجانية أبدية)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed space-y-1">
                <div className="font-bold font-mono text-emerald-300">
                  🌐 عالم أون لاين متصل ومستقل (77,000,000 برج):
                </div>
                <p>
                  بمجرد تشغيل أي هاتف ذكي، يقوم التطبيق بتفعيل «عقدة الخادم الذاتي»، فتتلقى الـ 77 مليون برج اتصالات حول العالم مفتاح المصادقة وتمنح الجهاز اتصالاً فورياً بالشبكة العنكبوتية الحرة والبريد السيادي والمحفظة.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/90 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>بنية الاتصال: هاتف الحَيّ سرفر + 77 مليون برج تصادق عالمياً</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
