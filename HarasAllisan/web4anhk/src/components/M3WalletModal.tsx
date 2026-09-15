import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Send, 
  ArrowDownRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Fingerprint, 
  Scan, 
  Building2, 
  Landmark, 
  Copy, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Banknote, 
  Cpu,
  MapPin,
  AlertCircle,
  FileText,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { SOVEREIGN_COUNTRIES_195, GLOBAL_SOVEREIGN_AGGREGATE } from '../data/sovereignCountries195Data';

interface M3WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  user: UserProfile;
  onOpen195Countries?: () => void;
}

type WalletTab = 'overview' | 'corporate_derived' | 'atm_cashout' | 'instapay_transfer' | 'history';

interface ATMOutlet {
  id: string;
  name: string;
  location: string;
  distance: string;
  type: 'ATM' | 'BankBranch';
  vaultSolvency: string; // Solvency status
  status: 'Online' | 'Busy';
  availableDenominations: string[];
}

export const M3WalletModal: React.FC<M3WalletModalProps> = ({
  isOpen,
  onClose,
  lang,
  user,
  onOpen195Countries
}) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<WalletTab>('overview');
  
  // National ID & Biometric State
  const [nationalId, setNationalId] = useState('28612030103352');
  const [isBiometricVerified, setIsBiometricVerified] = useState(true);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);

  // FX & Node currency (Verified source exchange rates as of 15 July 2026)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('LYD');
  const fxRates: Record<string, { symbol: string; rate: number; name: string; flag: string; code?: string; locked14: number; living12: number; tech2: number }> = {
    LYD: { symbol: 'د.ل', rate: 6.4226, name: 'دينار ليبي', flag: '🇱🇾', code: 'cbe7', locked14: 107899.68, living12: 92485.44, tech2: 15414.24 },
    EGP: { symbol: 'ج.م', rate: 50.527, name: 'جنيه مصري', flag: '🇪🇬', code: '5393', locked14: 848853.6, living12: 727588.8, tech2: 121264.8 },
    IQD: { symbol: 'د.ع', rate: 1304.23, name: 'دينار عراقي', flag: '🇮🇶', code: '18ef', locked14: 21911064, living12: 18780912, tech2: 3130152 },
    SAR: { symbol: 'ر.س', rate: 3.7492, name: 'ريال سعودي', flag: '🇸🇦', code: '01d1', locked14: 62986.56, living12: 53988.48, tech2: 8998.08 },
    DZD: { symbol: 'د.ج', rate: 133.00, name: 'دينار جزائري', flag: '🇩🇿', locked14: 2234400, living12: 1915200, tech2: 319200 },
    TND: { symbol: 'د.ت', rate: 2.922, name: 'دينار تونسي', flag: '🇹🇳', locked14: 49089.6, living12: 42076.8, tech2: 7012.8 },
    MAD: { symbol: 'د.م', rate: 9.2946, name: 'درهم مغربي', flag: '🇲🇦', locked14: 156149.28, living12: 133842.24, tech2: 22307.04 },
    TRY: { symbol: '₺', rate: 46.8238, name: 'ليرة تركية', flag: '🇹🇷', locked14: 786639.84, living12: 674262.72, tech2: 112377.12 },
    PLN: { symbol: 'zł', rate: 3.7875, name: 'زلوتي بولندي', flag: '🇵🇱', locked14: 63630, living12: 54540, tech2: 9090 },
    GBP: { symbol: '£', rate: 0.746993, name: 'جنيه إسترليني', flag: '🇬🇧', locked14: 12549.49, living12: 10756.70, tech2: 1792.79 },
    BRL: { symbol: 'R$', rate: 5.50, name: 'ريال برازيلي', flag: '🇧🇷', locked14: 92400, living12: 79200, tech2: 13200 },
    USD: { symbol: '$', rate: 1.0, name: 'دولار أمريكي', flag: '🇺🇸', locked14: 16800, living12: 14400, tech2: 2400 },
  };

  // Base M3 stats
  const livingAnhkBalance = 12; // 12 Anhk 𓋹 per living human
  const baseUsdValue = livingAnhkBalance * 1200; // $14,400 USD
  const totalUsdLockedValue = 14 * 1200; // $16,800 USD (14 Locked)
  const currentFx = fxRates[selectedCurrency] || fxRates.LYD;
  const localValue = baseUsdValue * currentFx.rate;

  // ATM Cash Out Form State
  const [withdrawAmount, setWithdrawAmount] = useState('1000');
  const [selectedAtmId, setSelectedAtmId] = useState('atm-1');
  const [cashVoucher, setCashVoucher] = useState<{
    code: string;
    otp: string;
    qrPayload: string;
    amount: string;
    currency: string;
    atmName: string;
    expiresIn: string;
  } | null>(null);

  // Transfer Form State
  const [transferTarget, setTransferTarget] = useState('01012345678');
  const [transferType, setTransferType] = useState<'mobile' | 'national_id' | 'anhk_mail'>('mobile');
  const [transferAmount, setTransferAmount] = useState('200');
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);

  // Corporate & Sector Derived Wallet State
  const [establishmentId, setEstablishmentId] = useState('EST-EGP-9821034-2026');
  const [contractRef, setContractRef] = useState('CN-2026-M3-8821');
  const [selectedSector, setSelectedSector] = useState<'infra' | 'energy' | 'trade' | 'civil'>('infra');
  const [derivedCompanyWallet, setDerivedCompanyWallet] = useState<{
    companyName: string;
    establishmentId: string;
    sectorName: string;
    sectorWalletId: string;
    derivedWalletId: string;
    creditSolvency: string;
    clearingStatus: string;
  } | null>({
    companyName: 'شركة النيل للإنشاءات والتنمية العمرانية',
    establishmentId: 'EST-EGP-9821034-2026',
    sectorName: 'قطاع البنية الأساسية والعمران (M4 Infrastructure)',
    sectorWalletId: 'SECTOR-M4-INFRA-01',
    derivedWalletId: 'M3-CORP-INFRA-9821034-AGC',
    creditSolvency: '12,500 𓋹 (عنخ مقاصة سيادية)',
    clearingStatus: 'مستقرة ومقترنة بعقود التأسيس المعتمدة'
  });

  // Mock ATM outlets
  const atmOutlets: ATMOutlet[] = [
    {
      id: 'atm-1',
      name: isAr ? 'صراف آلي - فرع البنك المركزي الحجازي' : 'ATM - Central Hejazi Bank Branch',
      location: isAr ? 'شارع بيت المال - العقدة السيادية #01' : 'Bayt Al-Mal St - Sovereign Node #01',
      distance: '0.4 km',
      type: 'ATM',
      vaultSolvency: isAr ? 'مطابقة الجرد 100% (طبعة يوليو 2026)' : '100% Solvency (July 2026 Print)',
      status: 'Online',
      availableDenominations: ['100', '200', '500'],
    },
    {
      id: 'atm-2',
      name: isAr ? 'منفذ بنك مصر - صراف رقمي متكامل' : 'Banque Misr Outlet - Smart ATM',
      location: isAr ? 'ميدان التحرير - العقدة الإقليمية 🇪🇬' : 'Tahrir Sq - Regional Node 🇪🇬',
      distance: '1.2 km',
      type: 'BankBranch',
      vaultSolvency: isAr ? 'خزينة مغطاة بالكامل بملاءة M3' : 'Fully Covered by M3 Solvency',
      status: 'Online',
      availableDenominations: ['50', '100', '200'],
    },
    {
      id: 'atm-3',
      name: isAr ? 'صراف إنستا باي - العقدة الذكية #88' : 'InstaPay Cash Point - Node #88',
      location: isAr ? 'المركز المالي - الحجاز' : 'Financial District - Hejaz',
      distance: '2.5 km',
      type: 'ATM',
      vaultSolvency: isAr ? 'جاهز للسحب الفوري' : 'Ready for Instant Cash Out',
      status: 'Online',
      availableDenominations: ['100', '200'],
    }
  ];

  // Transaction History Mock
  const [transactions, setTransactions] = useState([
    {
      id: 'tx-101',
      type: 'clearing',
      title: isAr ? 'اعتماد مقاصة M3 السيادية (12 جنيه عنخ)' : 'M3 Sovereign Clearing Credit (12 Anhk)',
      amount: '+ 12.00 𓋹',
      equivalent: `$14,400 USD`,
      time: 'اليوم، 10:15 ص',
      hash: 'AGC-M3-983102-2026',
      status: 'Confirmed'
    },
    {
      id: 'tx-102',
      type: 'cashout',
      title: isAr ? 'سحب ورقي من صراف آلي (ATM الأهلي)' : 'ATM Paper Cash Withdrawal (Al Ahli ATM)',
      amount: '- 1,000.00 ج.م',
      equivalent: '- 0.016 𓋹',
      time: 'أمس، 04:30 م',
      hash: 'ATM-WD-28612-8821',
      status: 'Completed'
    },
    {
      id: 'tx-103',
      type: 'transfer',
      title: isAr ? 'تحويل فوري InstaPay إلى 01012345678' : 'InstaPay Transfer to 01012345678',
      amount: '- 500.00 ج.م',
      equivalent: '- 0.008 𓋹',
      time: '29 يوليو 2026',
      hash: 'INSTA-881203-ANHK',
      status: 'Completed'
    }
  ]);

  // Run Biometric Scan
  const handleTriggerBiometric = () => {
    setIsBiometricScanning(true);
    setIsBiometricVerified(false);
    setTimeout(() => {
      setIsBiometricScanning(false);
      setIsBiometricVerified(true);
    }, 1500);
  };

  // Generate ATM Cash Out Code
  const handleGenerateCashCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;

    const code = 'ATM-' + Math.floor(100000 + Math.random() * 900000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const selectedAtm = atmOutlets.find(a => a.id === selectedAtmId) || atmOutlets[0];

    setCashVoucher({
      code,
      otp,
      qrPayload: `M3_CASHOUT|${nationalId}|${withdrawAmount}|${currentFx.symbol}|${code}|${otp}`,
      amount: withdrawAmount,
      currency: currentFx.symbol,
      atmName: selectedAtm.name,
      expiresIn: '15:00'
    });

    // Add to transaction log
    setTransactions(prev => [
      {
        id: 'tx-' + Date.now(),
        type: 'cashout',
        title: `${isAr ? 'كود سحب ورقي صراف' : 'ATM Paper Cash Code'} (${selectedAtm.name})`,
        amount: `- ${withdrawAmount} ${currentFx.symbol}`,
        equivalent: `- ${(Number(withdrawAmount) / (1200 * currentFx.rate)).toFixed(4)} 𓋹`,
        time: 'الآن',
        hash: code,
        status: 'Pending ATM Scan'
      },
      ...prev
    ]);
  };

  // Handle Transfer
  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || Number(transferAmount) <= 0) return;

    setTransferSuccess(`${isAr ? 'تم التحويل الفوري بنجاح إلى' : 'Instant transfer successful to'} ${transferTarget}`);
    
    // Add to transaction log
    setTransactions(prev => [
      {
        id: 'tx-' + Date.now(),
        type: 'transfer',
        title: `${isAr ? 'تحويل فوري إلى' : 'Instant transfer to'} ${transferTarget}`,
        amount: `- ${transferAmount} ${currentFx.symbol}`,
        equivalent: `- ${(Number(transferAmount) / (1200 * currentFx.rate)).toFixed(4)} 𓋹`,
        time: 'الآن',
        hash: 'INSTA-' + Math.floor(100000 + Math.random() * 900000),
        status: 'Completed'
      },
      ...prev
    ]);

    setTimeout(() => {
      setTransferSuccess(null);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-emerald-500/30 text-slate-100 shadow-2xl shadow-emerald-950/50 overflow-hidden font-sans">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-emerald-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
              <Wallet className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-lg tracking-tight text-emerald-300">
                  {isAr ? 'محفظة M3 الرقمية السيادية' : 'M3 Sovereign Digital Wallet'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Fingerprint className="w-3 h-3 text-emerald-400" />
                  {isAr ? 'حساب أفراد حي' : 'Living Human M3'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  OS Almahdi 256
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr 
                  ? 'بريد مراسلات السيادة + محفظة M3 أفراد (سحب ورق ATM / تحويل فوري InstaPay / فودافون كاش)' 
                  : 'Official Correspondence Mail + M3 Individual Wallet (ATM Paper Cash Out / InstaPay / Mobile Wallet)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Biometric & National ID Verification Banner */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">{isAr ? 'الرقم القومي (14 رقم):' : 'National ID:'}</span>
              <span className="text-cyan-300 font-bold tracking-widest">{nationalId}</span>
            </div>

            <div className="flex items-center gap-2">
              {isBiometricScanning ? (
                <span className="px-3 py-1 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 font-mono animate-pulse">
                  <Scan className="w-3.5 h-3.5 animate-spin" />
                  {isAr ? 'جاري الفحص البيومتري...' : 'Scanning Biometrics...'}
                </span>
              ) : isBiometricVerified ? (
                <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'تحقق بيومتري حي مؤكد 100%' : '100% Live Biometric Verified'}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-rose-950 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  {isAr ? 'مطلوب تحقق بصمة' : 'Biometric Required'}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handleTriggerBiometric}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] flex items-center gap-1.5 transition-all"
            >
              <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'إعادة الفحص البيومتري (وجه/بصمة)' : 'Re-scan Biometric'}</span>
            </button>
          </div>
        </div>

        {/* Currency Decommissioning & Palestine Node Sync Banner */}
        <div className="px-6 py-2 bg-amber-950/40 border-b border-amber-500/30 flex items-center justify-between gap-2 text-[11px] font-mono text-amber-200">
          <div className="flex items-center gap-2 dir-rtl">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isAr
                ? 'إشعار سيادي: تم إلغاء التعامل بالورق النقدي للشيكل والدرهم الإماراتي، تزامناً مع ربط المقاصة بالريال الحجازي الموحد لعقدة فلسطين عبر محفظة M3.'
                : 'Sovereign Notice: Shekel & AED banknotes are decommissioned, synced with the Hejazi Riyal Palestine Node contract via M3 Wallet.'}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-500/40 text-[10px] shrink-0 font-bold">
            {isAr ? 'تحديث المقاصة' : 'Clearing Sync'}
          </span>
        </div>

        {/* Modal Main Navigation Tabs */}
        <div className="px-6 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto select-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'المحفظة القارية الموحدة' : 'Continental Unified Wallet'}</span>
          </button>

          <button
            onClick={() => setActiveTab('corporate_derived')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'corporate_derived'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'محافظ الشركات والقطاعات' : 'Corporate & Sector Wallets'}</span>
            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              مشتقة
            </span>
          </button>

          <button
            onClick={() => setActiveTab('atm_cashout')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'atm_cashout'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Banknote className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'صرف ورق (ATM / منفذ بنكي)' : 'ATM Cash Out'}</span>
            <span className="px-1.5 py-0.2 text-[9px] rounded bg-amber-950 text-amber-300 border border-amber-500/30">
              طبعة 2026
            </span>
          </button>

          <button
            onClick={() => setActiveTab('instapay_transfer')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'instapay_transfer'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Send className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'تحويل فوري (InstaPay)' : 'InstaPay Transfer'}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'history'
                ? 'bg-slate-800 text-slate-200 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{isAr ? 'سجل المعاملات' : 'Transaction History'}</span>
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Sovereign M3 Wallet Balance Card */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border border-emerald-500/40 shadow-xl overflow-hidden space-y-4">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'حساب محفظة M3 أفراد (مخصصة للحي)' : 'M3 Living Human Individual Wallet'}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                      0 ملاءة
                    </span>
                  </div>
                  
                  {/* Currency selector and 195 countries launcher */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-slate-950/90 text-emerald-300 border border-emerald-500/40 rounded-xl px-2.5 py-1 text-xs font-mono font-bold focus:outline-none"
                    >
                      {Object.entries(fxRates).map(([k, v]) => (
                        <option key={k} value={k} className="bg-slate-900 text-white">
                          {v.flag} {v.name} ({k}) • 1$={v.rate} {v.code ? `[${v.code}]` : ''}
                        </option>
                      ))}
                    </select>

                    {onOpen195Countries && (
                      <button
                        onClick={onOpen195Countries}
                        className="px-2.5 py-1 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-mono font-bold flex items-center gap-1 transition-all border border-emerald-400/50 shadow-sm"
                        title={isAr ? 'استعراض 195 دولة بالعملات المحلية - 14 مقفول' : '195 Countries Sovereign Matrix'}
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-200" />
                        <span>195 دولة</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <p className="text-xs font-mono text-slate-400">
                      {isAr ? 'الرصيد المعتمد المتاح للحَيّ:' : 'Approved M3 Balance for Living Human:'}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300 font-mono tracking-tight">
                        {livingAnhkBalance} 𓋹
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">
                        ({isAr ? '12 عيشة' : '12 Living'})
                      </span>
                      <span className="text-xs text-purple-300 font-mono">
                        + 2 تقنية
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                        = 14 مقفول
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-cyan-300 font-mono font-bold flex items-center gap-1 flex-wrap">
                      <span>14 مقفول = {currentFx.locked14.toLocaleString()} {currentFx.symbol}</span>
                      <span className="text-[10px] font-normal text-slate-400">
                        (${totalUsdLockedValue.toLocaleString()} USD @ 1$ = {currentFx.rate})
                      </span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">{isAr ? '12 عيشة (حياة وحرية):' : '12 Living Quota:'}</span>
                      <span className="font-bold text-cyan-300 font-mono">
                        12 𓋹 = {currentFx.living12.toLocaleString()} {currentFx.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">{isAr ? '2 تقنية (بنية وأجهزة):' : '2 Tech & Infra (M4):'}</span>
                      <span className="font-bold text-purple-300 font-mono">
                        2 𓋹 = {currentFx.tech2.toLocaleString()} {currentFx.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-800 font-bold">
                      <span className="text-slate-200">{isAr ? '14 مقفول لكل حي (15 يوليو 2026):' : '14 Locked Per Human:'}</span>
                      <span className="text-emerald-300 font-mono">
                        14 𓋹 = {currentFx.locked14.toLocaleString()} {currentFx.symbol}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => setActiveTab('atm_cashout')}
                    className="p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all group"
                  >
                    <Banknote className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>{isAr ? 'صرف ورق من ATM' : 'ATM Paper Cash'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('instapay_transfer')}
                    className="p-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all group"
                  >
                    <Send className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>{isAr ? 'تحويل فوري InstaPay' : 'InstaPay Transfer'}</span>
                  </button>

                  {onOpen195Countries ? (
                    <button
                      onClick={onOpen195Countries}
                      className="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all group"
                    >
                      <Globe className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{isAr ? '195 دولة (14 مقفول)' : '195 Countries Matrix'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(isAr ? 'تم تأكيد ربط الرقم القومي برصيد محفظة M3 بنجاح عبر بروتوكول AdamHash.' : 'National ID linked to M3 Wallet balance successfully.')}
                      className="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all group"
                    >
                      <Fingerprint className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{isAr ? 'تحديث البيومتري' : 'Update Biometrics'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('history')}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all group"
                  >
                    <FileText className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />
                    <span>{isAr ? 'كشف حساب المزار' : 'Wallet Statement'}</span>
                  </button>
                </div>
              </div>

              {/* Physical Vault Solvency & Bank Outlets Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-cyan-400" />
                    {isAr ? 'منافذ الصرف الآلي والبنوك المعتمدة المتاحة:' : 'Approved Cash Out Outlets & ATMs:'}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {isAr ? 'جرد الخزينة الورقية متصل لحظياً' : 'Physical Vault Sync Online'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {atmOutlets.map((atm) => (
                    <div
                      key={atm.id}
                      onClick={() => {
                        setSelectedAtmId(atm.id);
                        setActiveTab('atm_cashout');
                      }}
                      className="p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                          {atm.type}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {atm.distance}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-200 group-hover:text-amber-300 transition-colors">
                        {atm.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {atm.location}
                      </p>

                      <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-emerald-400 flex justify-between items-center">
                        <span>{atm.vaultSolvency}</span>
                        <span className="text-amber-300 font-bold">{isAr ? 'سحب ورق 2026' : '2026 Cash'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: CORPORATE & SECTOR DERIVED WALLETS */}
          {activeTab === 'corporate_derived' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Architecture Rule Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 text-xs space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2.5 font-bold text-purple-300">
                  <Building2 className="w-5 h-5 text-purple-400 shrink-0" />
                  <span className="text-sm">
                    {isAr 
                      ? 'هندسة الحسابات القارية الموحدة واشتقاق محافظ الشركات' 
                      : 'Unified Continental International Account & Derived Corporate Wallets'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                    {isAr ? 'إلغاء تعدد الحسابات التقليدية' : 'No Legacy Multi-Account Proliferation'}
                  </span>
                </div>
                
                <p className="leading-relaxed text-slate-300 text-[11.5px] dir-rtl">
                  {isAr ? (
                    <>
                      • <strong>الحساب القاري الدولي الموحد:</strong> تعدد الحسابات المصرفية التقليدية والعشوائية ملغى نهائياً في البروتوكول السيادي. المحفظة قارئة لحساب قاري/دولي واحد وموحد للأفراد.
                      <br />
                      • <strong>اشتقاق محافظ الشركات:</strong> أي شركة أو مؤسسة لها <strong>رقم منشأة</strong> وعقود رسمية، يتم اشتقاق محفظتها الاستثمارية والإنتاجية مباشرة من <strong>محفظة القطاع الرئيسي</strong> المنوط به تخصص الشركة (بنية تحتية، طاقة، تجارة، خدمات مدنية) ببروتوكول تشفير كمي موثق.
                    </>
                  ) : (
                    <>
                      • <strong>Unified Continental Account:</strong> Legacy multi-account clutter is completely deprecated. The wallet operates as a single unified international account.
                      <br />
                      • <strong>Derived Corporate Wallets:</strong> Companies with official Establishment Registration Numbers & contracts have their corporate wallets hierarchically derived directly from their designated Sector Wallet based on industry specialization.
                    </>
                  )}
                </p>
              </div>

              {/* Sector Parent Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? 'اختر محفظة القطاع المنوط به تخصص الشركة:' : 'Select Parent Sector Master Wallet:'}</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'infra',
                      code: 'SECTOR-M4-INFRA-01',
                      title: isAr ? '1. قطاع البنية الأساسية والعمران' : '1. Infrastructure & Urban Development',
                      desc: isAr ? 'المقاولات، الإنشاءات، الطرق، الجسور، والمشاريع القومية' : 'Construction, Roads, Bridges & Civil Works',
                      badge: 'M4 Infra'
                    },
                    {
                      id: 'energy',
                      code: 'SECTOR-ENERGY-02',
                      title: isAr ? '2. قطاع الطاقة والتكنولوجيا والبرمجيات' : '2. Energy, Tech & Quantum Systems',
                      desc: isAr ? 'الأنظمة الذكية، الشبكات، البترول، والكهرباء والذكاء الاصطناعي' : 'AI Systems, Networks, Smart Grids & Energy',
                      badge: 'Tech & Energy'
                    },
                    {
                      id: 'trade',
                      code: 'SECTOR-TRADE-03',
                      title: isAr ? '3. قطاع التجارة والتموين والخدمات اللوجستية' : '3. Trade, Supply Chain & Logistics',
                      desc: isAr ? 'الاستيراد، التصدير، السلع التموينية، والنقل البحري والبري' : 'Import, Export, Commodities & Shipping',
                      badge: 'Trade & Supply'
                    },
                    {
                      id: 'civil',
                      code: 'SECTOR-CIVIL-04',
                      title: isAr ? '4. قطاع الخدمات والخدمة المدنية والصحة' : '4. Public Services & Healthcare',
                      desc: isAr ? 'الرعاية الصحية، المستشفيات، التعليم، والخدمات الحكومية' : 'Healthcare, Education & Public Sector',
                      badge: 'Public Services'
                    }
                  ].map((sec) => (
                    <div
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id as any)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                        selectedSector === sec.id
                          ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/40'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-purple-300">{sec.title}</span>
                        <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-purple-300 border border-purple-500/30">
                          {sec.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{sec.desc}</p>
                      <span className="text-[10px] font-mono text-cyan-400 block pt-1 border-t border-slate-900">
                        {isAr ? 'رمز محفظة القطاع الأم:' : 'Sector Master Code:'} {sec.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate Establishment Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const sectorNames = {
                    infra: isAr ? 'قطاع البنية الأساسية والعمران (M4 Infrastructure)' : 'M4 Infrastructure Sector',
                    energy: isAr ? 'قطاع الطاقة والتكنولوجيا والأنظمة الذكية' : 'Energy & Tech Sector',
                    trade: isAr ? 'قطاع التجارة والتموين والخدمات اللوجستية' : 'Trade & Logistics Sector',
                    civil: isAr ? 'قطاع الخدمات والخدمة المدنية والصحة' : 'Public Services Sector'
                  };
                  const sectorCodes = {
                    infra: 'SECTOR-M4-INFRA-01',
                    energy: 'SECTOR-ENERGY-02',
                    trade: 'SECTOR-TRADE-03',
                    civil: 'SECTOR-CIVIL-04'
                  };

                  const cleanEst = establishmentId.replace(/[^a-zA-Z0-9]/g, '').slice(-7) || '9821034';
                  const newDerivedWallet = `M3-CORP-${selectedSector.toUpperCase()}-${cleanEst}-AGC`;

                  setDerivedCompanyWallet({
                    companyName: isAr ? 'منشأة معتمدة مسجلة بعقود تاسيسية' : 'Certified Enterprise with Legal Contracts',
                    establishmentId: establishmentId,
                    sectorName: sectorNames[selectedSector],
                    sectorWalletId: sectorCodes[selectedSector],
                    derivedWalletId: newDerivedWallet,
                    creditSolvency: '25,000 𓋹 (ملاءة مشتقة من القطاع)',
                    clearingStatus: 'معتمدة ومقترنة بنظام OS Almahdi 256'
                  });
                }}
                className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4"
              >
                <h4 className="font-bold text-xs text-purple-300 font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? 'بيانات المنشأة وعقود التأسيس لاشتقاق رقم المحفظة:' : 'Establishment ID & Contract References:'}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">
                      {isAr ? 'رقم المنشأة / السجل التجاري / الترخيص:' : 'Establishment Registration ID:'}
                    </label>
                    <input
                      type="text"
                      value={establishmentId}
                      onChange={(e) => setEstablishmentId(e.target.value)}
                      placeholder="EST-EGP-9821034-2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 font-mono text-xs text-purple-300 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">
                      {isAr ? 'رقم العقد والتأسيس الرسمي:' : 'Official Founding Contract Reference:'}
                    </label>
                    <input
                      type="text"
                      value={contractRef}
                      onChange={(e) => setContractRef(e.target.value)}
                      placeholder="CN-2026-M3-8821"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 font-mono text-xs text-purple-300 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs font-mono shadow-md shadow-purple-950/50 border border-purple-400/30 transition-all flex items-center justify-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-cyan-300" />
                  <span>{isAr ? 'اشتقاق محفظة الشركات من محفظة القطاع المنوط' : 'Derive Corporate Wallet from Sector Master'}</span>
                </button>
              </form>

              {/* Active Derived Corporate Certificate Display */}
              {derivedCompanyWallet && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 border border-purple-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                    <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'المحفظة المشتقة المعتمدة للمنشأة:' : 'Derived Corporate Wallet Certificate:'}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {isAr ? 'ربط قطاعي نشط' : 'Active Sector Link'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-slate-400 block">{isAr ? 'عنوان المحفظة المشتقة للشركة:' : 'Derived Corporate Wallet Address:'}</span>
                      <span className="text-sm font-extrabold text-purple-300 block bg-slate-950 p-2.5 rounded-xl border border-purple-500/30">
                        {derivedCompanyWallet.derivedWalletId}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 block">{isAr ? 'القطاع الأم المنوط به التخصص:' : 'Parent Sector Wallet:'}</span>
                      <span className="text-xs font-bold text-cyan-300 block bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        {derivedCompanyWallet.sectorName} ({derivedCompanyWallet.sectorWalletId})
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
                    <span className="text-slate-400">
                      {isAr ? 'رقم المنشأة وعقد التأسيس:' : 'Establishment ID & Contract:'} <strong className="text-slate-200">{derivedCompanyWallet.establishmentId}</strong>
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {derivedCompanyWallet.creditSolvency}
                    </span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ATM CASH OUT */}
          {activeTab === 'atm_cashout' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Banknote className="w-4 h-4 text-amber-400" />
                  <span>
                    {isAr 
                      ? 'خدمة صرف الورق النقدي من الصراف الآلي (ATM) والبدائل البنكية' 
                      : 'Physical Banknote Cash Out Service from ATMs and Bank Counters'}
                  </span>
                </div>
                <p className="leading-relaxed text-slate-300 text-[11.5px]">
                  {isAr
                    ? 'يستطيع أي حي باستخدام بطاقته القومية (الرقم القومي 14 رقم) والتحقق البيومتري توليد كود سحب مؤقت أو رمز QR ممسوح عند الصراف الآلي لطباعة وسحب الورق المالي مباشرة وفق حد ملاءة M3 طبعة يوليو 2026.'
                    : 'Any living citizen using their 14-digit National ID & live biometric verification can generate a temporary cash withdrawal voucher code or QR Code to cash out banknotes directly from any registered ATM.'}
                </p>
              </div>

              {!cashVoucher ? (
                <form onSubmit={handleGenerateCashCode} className="space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span>{isAr ? 'المبلغ المطلوب صرفه ورقياً:' : 'Withdrawal Cash Amount:'}</span>
                      <span className="text-emerald-400">{isAr ? 'حدك المتاح:' : 'Available Ceiling:'} {localValue.toLocaleString()} {currentFx.symbol}</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="1000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-500 text-lg font-mono font-bold text-amber-300 outline-none"
                      />
                      <span className="absolute left-4 font-mono font-bold text-slate-400 text-sm">
                        {currentFx.symbol}
                      </span>
                    </div>
                  </div>

                  {/* ATM Outlet Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      {isAr ? 'اختر الصراف الآلي أو المنفذ البنكي القريب:' : 'Select Nearby ATM or Bank Counter:'}
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {atmOutlets.map((atm) => (
                        <label
                          key={atm.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedAtmId === atm.id
                              ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="selectedAtm"
                              checked={selectedAtmId === atm.id}
                              onChange={() => setSelectedAtmId(atm.id)}
                              className="accent-amber-500"
                            />
                            <div>
                              <p className="font-bold text-xs text-slate-200">{atm.name}</p>
                              <p className="text-[11px] text-slate-400">{atm.location}</p>
                            </div>
                          </div>
                          <div className="text-right font-mono text-[10px]">
                            <span className="text-emerald-400 block">{atm.vaultSolvency}</span>
                            <span className="text-slate-500">{atm.distance}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 border border-amber-400/30 transition-all flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-5 h-5 stroke-[2.5]" />
                    <span>{isAr ? 'توليد كود السحب الورقي ورمز الـ QR للصراف' : 'Generate ATM Paper Cash Voucher & QR'}</span>
                  </button>
                </form>
              ) : (
                /* Generated Cash Voucher View */
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-6 text-center animate-fadeIn">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'تم إصدار وثيقة السحب الورقي السيادي بنجاح' : 'Sovereign Cash Voucher Issued Successfully'}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Simulated QR Code Box */}
                    <div className="p-4 rounded-xl bg-white text-slate-950 flex flex-col items-center justify-center gap-2 shadow-xl mx-auto max-w-[220px]">
                      <QrCode className="w-36 h-36 text-slate-950" />
                      <span className="text-[10px] font-mono text-slate-600 font-bold">
                        {isAr ? 'امسح الرمز أمام ماسح الصراف' : 'Scan at ATM Scanner'}
                      </span>
                    </div>

                    <div className="space-y-4 text-right dir-rtl">
                      <div>
                        <span className="text-xs text-slate-400 block">{isAr ? 'كود السحب المؤقت:' : 'ATM Cash Code:'}</span>
                        <span className="text-2xl font-mono font-extrabold text-amber-300 tracking-wider">
                          {cashVoucher.code}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block">{isAr ? 'رمز التأكيد السرّي (OTP):' : 'Confirmation OTP:'}</span>
                        <span className="text-3xl font-mono font-extrabold text-cyan-300 tracking-widest">
                          {cashVoucher.otp}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-xs font-mono space-y-1">
                        <p className="text-slate-300">
                          {isAr ? 'المبلغ:' : 'Amount:'} <strong className="text-amber-300">{cashVoucher.amount} {cashVoucher.currency}</strong>
                        </p>
                        <p className="text-slate-400">
                          {isAr ? 'الصراف:' : 'ATM:'} {cashVoucher.atmName}
                        </p>
                        <p className="text-amber-400 text-[10px]">
                          ⏱️ {isAr ? 'صلاحية الرمز: 15 دقيقة فقط' : 'Code valid for 15 minutes'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-900 justify-center">
                    <button
                      onClick={() => setCashVoucher(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
                    >
                      {isAr ? 'إجراء عملية سحب أخرى' : 'New Cash Out Request'}
                    </button>
                    <button
                      onClick={() => alert(isAr ? 'تم إرسال كود السحب إلى هاتفك المسجل برقمك القومي.' : 'Cash out code sent to registered mobile.')}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{isAr ? 'إرسال لرسائل الموبايل (SMS)' : 'Send to SMS'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: INSTAPAY / MOBILE TRANSFER */}
          {activeTab === 'instapay_transfer' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-cyan-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-300">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>
                    {isAr 
                      ? 'التحويل الفوري المباشر (شبكة InstaPay / فودافون كاش / بريد عنخ)' 
                      : 'Instant Direct Transfer (InstaPay / Mobile Wallet / ANHK Mail)'}
                  </span>
                </div>
                <p className="leading-relaxed text-slate-300 text-[11.5px]">
                  {isAr
                    ? 'تحويل فوري فائق السرعة بدون أي رسوم تحويل أو عمولات عبر بروتوكول المقاصة السيادي OS Almahdi 256. يمكنك التحويل برقم الموبايل أو الرقم القومي أو البريد الإلكتروني.'
                    : 'Zero-fee instant transfer powered by OS Almahdi 256 sovereign clearing engine. Transfer seamlessly using mobile phone number, National ID, or ANHK Mail.'}
                </p>
              </div>

              {transferSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold font-mono flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{transferSuccess}</span>
                </div>
              )}

              <form onSubmit={handleExecuteTransfer} className="space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                {/* Transfer Target Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    {isAr ? 'وسيلة التحويل:' : 'Transfer Target Method:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setTransferType('mobile')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        transferType === 'mobile'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isAr ? '📱 رقم الموبايل' : '📱 Mobile Phone'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransferType('national_id')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        transferType === 'national_id'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isAr ? '🆔 الرقم القومي' : '🆔 National ID'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransferType('anhk_mail')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        transferType === 'anhk_mail'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isAr ? '📧 بريد عنخ' : '📧 ANHK Mail'}
                    </button>
                  </div>
                </div>

                {/* Target Address Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    {transferType === 'mobile'
                      ? (isAr ? 'رقم موبايل المستلم (فودافون كاش / إنستا باي):' : 'Recipient Mobile Number:')
                      : transferType === 'national_id'
                      ? (isAr ? 'الرقم القومي للمستلم (14 رقم):' : '14-digit Recipient National ID:')
                      : (isAr ? 'عنوان بريد المستلم على عنخ:' : 'Recipient ANHK Mail Address:')}
                  </label>
                  <input
                    type="text"
                    value={transferTarget}
                    onChange={(e) => setTransferTarget(e.target.value)}
                    placeholder={
                      transferType === 'mobile' ? '01012345678' : transferType === 'national_id' ? '28612030103352' : 'almahdi@anhkmail.anhk'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-500 text-sm font-mono text-cyan-300 outline-none"
                  />
                </div>

                {/* Transfer Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 flex justify-between">
                    <span>{isAr ? 'قيمة المبلغ المراد تحويله:' : 'Transfer Amount:'}</span>
                    <span className="text-slate-400">{currentFx.symbol}</span>
                  </label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="200"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-500 text-lg font-mono font-bold text-emerald-300 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/20 border border-cyan-400/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 stroke-[2.5]" />
                  <span>{isAr ? 'تأكيد التحويل الفوري الآن (بدون عمولة)' : 'Confirm Instant Zero-Fee Transfer'}</span>
                </button>
              </form>

            </div>
          )}

          {/* TAB 4: TRANSACTION HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-200">
                  {isAr ? 'سجل السحوبات والمعاملات المقاصية:' : 'Clearing & Cash Out History:'}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {isAr ? 'مختومة بـ OS Almahdi 256' : 'Sealed by OS Almahdi 256'}
                </span>
              </div>

              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl font-bold ${
                        tx.type === 'clearing' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : tx.type === 'cashout'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {tx.type === 'clearing' ? <ArrowDownRight className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-200">{tx.title}</h4>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mt-0.5">
                          <span>{tx.time}</span>
                          <span>•</span>
                          <span className="text-cyan-400">{tx.hash}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className={`block font-bold text-sm ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {tx.amount}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{tx.equivalent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="font-bold text-cyan-200 block">-- Almahdi | Senior Infrastructure Lead</span>
              <span className="text-slate-400 text-[9px] block">Web4 ANHK Quantum Engine Network • OS Almahdi 256 Kernel</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors shrink-0"
          >
            {isAr ? 'إغلاق المحفظة' : 'Close Wallet'}
          </button>
        </div>

      </div>
    </div>
  );
};
