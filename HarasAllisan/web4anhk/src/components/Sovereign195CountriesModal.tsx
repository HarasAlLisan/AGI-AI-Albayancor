import React, { useState, useMemo } from 'react';
import { 
  X, 
  Globe2, 
  Search, 
  Download, 
  ShieldCheck, 
  Calculator, 
  FileSpreadsheet, 
  Coins, 
  Lock, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Users, 
  Building2, 
  Layers,
  ArrowUpDown,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { 
  SOVEREIGN_COUNTRIES_195, 
  GLOBAL_SOVEREIGN_AGGREGATE, 
  SovereignCountry, 
  generateSovereign195CSV 
} from '../data/sovereignCountries195Data';

interface Sovereign195CountriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  onSelectCountryForWallet?: (country: SovereignCountry) => void;
}

export const Sovereign195CountriesModal: React.FC<Sovereign195CountriesModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectCountryForWallet,
}) => {
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<SovereignCountry>(
    SOVEREIGN_COUNTRIES_195[0] // Defaults to Libya 🇱🇾
  );
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(1);
  const [activeViewMode, setActiveViewMode] = useState<'grid' | 'table' | 'calculator'>('table');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return SOVEREIGN_COUNTRIES_195.filter((c) => {
      const matchSearch =
        c.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.currencyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.currencyNameAr.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRegion = selectedRegion === 'all' || c.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [searchQuery, selectedRegion]);

  if (!isOpen) return null;

  const handleDownloadXLSX = () => {
    const csvContent = generateSovereign195CSV();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', GLOBAL_SOVEREIGN_AGGREGATE.spreadsheetFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySourceCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn" id="sovereign-195-countries-modal">
      <div className="w-full max-w-6xl bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-2xl shadow-emerald-950/50 text-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-b border-emerald-900/40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold text-lg sm:text-xl shadow-inner shrink-0">
              𓋹
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="font-bold text-xs sm:text-base text-emerald-200 truncate">
                  {isAr ? 'منظومة 195 دولة بالعملات المحلية - 14 مقفول' : '195 Sovereign Countries Local Currency Matrix - 14 Locked'}
                </h2>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
                  {GLOBAL_SOVEREIGN_AGGREGATE.anchorDate}
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
                  0 ملاءة
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-0.5 truncate sm:overflow-visible">
                {isAr
                  ? 'العالم 8.3B: 116 مليار عنخ = 139.45 تريليون دولار = 121.8 تريليون يورو = 8.9 كوادريليون ين'
                  : 'World 8.3B: 116B ANKH = $139.45T USD = €121.8T EUR = ¥8.9Q JPY'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleDownloadXLSX}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md hover:shadow-emerald-500/20 border border-emerald-400/50"
              title={isAr ? 'تحميل جدول الإكسيل 195_دولة_بالعملات_المحلية_14_مقفول.xlsx' : 'Download Excel File'}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">195_دولة_14_مقفول.xlsx</span>
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Summary Stats Banner */}
        <div className="shrink-0 bg-slate-900/95 border-b border-slate-800 px-3 sm:px-5 py-2.5 sm:py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'عدد الدول السيادية' : 'Sovereign States'}</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300 font-mono mt-0.5">195 دولة</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'المخصص للفرد' : 'Per Capita Locked'}</span>
            <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono mt-0.5">14 عنخ مقفول</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'توزيع الحصة (عيشة/تقنية)' : 'Living/Tech Quota'}</span>
            <span className="text-xs sm:text-sm font-bold text-cyan-300 font-mono mt-0.5">12 عيشة + 2 تقنية</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-indigo-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'سكان العالم (الأحياء)' : 'Global Living Pop'}</span>
            <span className="text-xs sm:text-sm font-bold text-indigo-300 font-mono mt-0.5">8.3 مليار نسمة</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-purple-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'الكتلة النقدية الإجمالية' : 'Total Valuation'}</span>
            <span className="text-xs sm:text-sm font-bold text-purple-300 font-mono mt-0.5">139.45 تريليون $</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-rose-500/30 flex flex-col justify-between min-h-[54px]">
            <span className="text-[10px] text-slate-400 block font-mono leading-tight">{isAr ? 'مقياس الملاءة الربوية' : 'Solvency Requirement'}</span>
            <span className="text-xs sm:text-sm font-bold text-rose-300 font-mono mt-0.5">0 ملاءة (لا ديون)</span>
          </div>
        </div>

        {/* Verified Pinned Examples Bar */}
        <div className="shrink-0 bg-emerald-950/25 border-b border-emerald-900/30 px-3 sm:px-5 py-2 overflow-x-auto select-none no-scrollbar flex items-center gap-2 sm:gap-3 text-xs whitespace-nowrap flex-nowrap">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5 shrink-0 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {isAr ? 'أسعار مثبتة بمصدر (15 يوليو 2026):' : 'Verified Source Fixed Rates:'}
          </span>

          {SOVEREIGN_COUNTRIES_195.filter((c) => c.verifiedSourceCode).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCountry(c);
                if (activeViewMode !== 'calculator') setActiveViewMode('table');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCountry.id === c.id
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{c.flag}</span>
              <span className="font-bold">{c.nameAr}</span>
              <span className="text-emerald-400">1$={c.fxRateToUSD}</span>
              {c.verifiedSourceCode && (
                <span className="px-1 py-0.2 rounded bg-black/50 text-[9px] text-amber-300 border border-amber-500/30">
                  {c.verifiedSourceCode}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Controls: Search, Region Filter, View Modes */}
        <div className="shrink-0 px-3 sm:px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[220px]">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث بالدولة، العملة، كود ISO...' : 'Search country, currency, ISO code...'}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-nowrap">
              {[
                { id: 'all', label: isAr ? 'الكل (195)' : 'All (195)' },
                { id: 'MENA', label: isAr ? 'الشرق الأوسط والوطن العربي' : 'MENA' },
                { id: 'Africa', label: isAr ? 'إفريقيا' : 'Africa' },
                { id: 'Europe', label: isAr ? 'أوروبا' : 'Europe' },
                { id: 'Asia', label: isAr ? 'آسيا' : 'Asia' },
                { id: 'Americas', label: isAr ? 'الأمريكتين' : 'Americas' },
                { id: 'Oceania', label: isAr ? 'أوقيانوسيا' : 'Oceania' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                    selectedRegion === r.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeViewMode === 'table' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'جدول المقاصة (195)' : 'Table View'}
            </button>
            <button
              onClick={() => setActiveViewMode('calculator')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                activeViewMode === 'calculator' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {isAr ? 'حاسبة الـ 14 مقفول' : '14 Locked Calculator'}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 custom-scrollbar space-y-5 text-xs">
          {activeViewMode === 'calculator' ? (
            /* Calculator & Detailed Country Dossier */
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/40 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {selectedCountry.nameAr} ({selectedCountry.nameEn})
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/40">
                          {selectedCountry.code}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {selectedCountry.currencyNameAr} ({selectedCountry.currencyCode} - {selectedCountry.currencySymbol}) • سعر الدولار: {selectedCountry.fxRateToUSD}
                      </p>
                    </div>
                  </div>

                  {onSelectCountryForWallet && (
                    <button
                      onClick={() => onSelectCountryForWallet(selectedCountry)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Coins className="w-4 h-4" />
                      {isAr ? 'اعتماد هذه العملة للمحفظة M3' : 'Adopt for M3 Wallet'}
                    </button>
                  )}
                </div>

                {/* Family / Population Multiplier Calculator */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 items-center">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-medium block">
                      {isAr ? 'عدد الأفراد الأحياء (الحصة المقفولة):' : 'Number of living individuals:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="1000000000"
                        value={familyMembersCount}
                        onChange={(e) => setFamilyMembersCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-28 px-3 py-1.5 bg-slate-900 border border-emerald-500/50 rounded-lg text-sm text-white font-bold font-mono focus:outline-none"
                      />
                      <span className="text-slate-400 text-xs">{isAr ? 'أفراد' : 'persons'}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs block">{isAr ? 'مجموع العنخ المستحق:' : 'Total ANKH:'}</span>
                    <p className="text-base font-bold text-amber-300 font-mono">
                      {(14 * familyMembersCount).toLocaleString()} عنخ 𓋹
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      ({12 * familyMembersCount} عيشة + {2 * familyMembersCount} تقنية)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs block">{isAr ? 'القيمة بالدولار النقي:' : 'USD Pure Gold Value:'}</span>
                    <p className="text-base font-bold text-emerald-300 font-mono">
                      ${(14 * familyMembersCount * 1200).toLocaleString()} USD
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      (يعادل {14 * familyMembersCount * 7} جرام ذهب عيار 24)
                    </p>
                  </div>
                </div>

                {/* The 14 Locked Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Total 14 Locked */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">{isAr ? '14 مقفول بالعملة المحلية' : '14 Locked in Local Fiat'}</span>
                      <Lock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-lg font-extrabold text-emerald-300 font-mono">
                      {(selectedCountry.locked14Local * familyMembersCount).toLocaleString()}{' '}
                      <span className="text-xs font-normal text-slate-300">{selectedCountry.currencySymbol}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isAr ? 'حصة سيادية مقفولة لا تسقط بالتقادم ولا تخضع للربا' : 'Permanent sovereign non-dilutive share'}
                    </p>
                  </div>

                  {/* 12 Living */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">{isAr ? '12 عيشة (حياة وحرية)' : '12 Living Quota'}</span>
                      <Coins className="w-4 h-4 text-cyan-400" />
                    </div>
                    <p className="text-lg font-extrabold text-cyan-300 font-mono">
                      {(selectedCountry.living12Local * familyMembersCount).toLocaleString()}{' '}
                      <span className="text-xs font-normal text-slate-300">{selectedCountry.currencySymbol}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isAr ? 'مخصص المعيشة والكرامة الإنسانية اليومية' : 'Living endowment for dignity'}
                    </p>
                  </div>

                  {/* 2 Technology */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">{isAr ? '2 تقنية (بنية وأجهزة)' : '2 Tech & Infra Quota'}</span>
                      <Cpu className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-lg font-extrabold text-purple-300 font-mono">
                      {(selectedCountry.tech2Local * familyMembersCount).toLocaleString()}{' '}
                      <span className="text-xs font-normal text-slate-300">{selectedCountry.currencySymbol}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isAr ? 'مخصص الاتصال، عتاد الذكاء وهواتف شبكة 77M' : 'Hardware & communication infrastructure'}
                    </p>
                  </div>
                </div>

                {/* Full Country Sovereign Macro Balance */}
                <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    {isAr ? 'المقاصة الكلية لكامل الدولة والشعب:' : 'Country Macro Sovereign Ledger:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي السكان الأحياء' : 'Living Population'}</span>
                      <span className="text-slate-200 font-bold">{selectedCountry.population.toLocaleString()} نسمة</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي السند بالعملة الوطنية' : 'Total Country Fiat'}</span>
                      <span className="text-emerald-300 font-bold">
                        {selectedCountry.totalCountryLocal.toLocaleString()} {selectedCountry.currencySymbol}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي السند بالدولار' : 'Total Country USD'}</span>
                      <span className="text-cyan-300 font-bold">${selectedCountry.totalCountryUSD.toLocaleString()} USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Table View: 195 Countries */
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">{isAr ? 'الدولة' : 'Country'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'السكان (الأحياء)' : 'Population'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'العملة' : 'Currency'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'سعر الصرف (1$)' : 'FX Rate ($1)'}</th>
                      <th className="py-2.5 px-3">{isAr ? '1 عنخ' : '1 ANKH'}</th>
                      <th className="py-2.5 px-3 font-bold text-emerald-400">{isAr ? '14 مقفول (لكل حي)' : '14 Locked'}</th>
                      <th className="py-2.5 px-3 text-cyan-400">{isAr ? '12 عيشة' : '12 Living'}</th>
                      <th className="py-2.5 px-3 text-purple-400">{isAr ? '2 تقنية' : '2 Tech'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'كود التحقق' : 'Source'}</th>
                      <th className="py-2.5 px-3 text-center">{isAr ? 'إجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredCountries.map((c, idx) => (
                      <tr
                        key={c.id}
                        className={`hover:bg-slate-800/50 transition-colors ${
                          selectedCountry.id === c.id ? 'bg-emerald-950/30' : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-slate-500 text-[10px]">{idx + 1}</td>
                        <td className="py-2 px-3 font-sans">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{c.flag}</span>
                            <div>
                              <span className="font-bold text-slate-200 block">{c.nameAr}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{c.nameEn} ({c.code})</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-slate-300">{c.population.toLocaleString()}</td>
                        <td className="py-2 px-3">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">
                            {c.currencyCode}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-amber-300 font-bold">{c.fxRateToUSD}</td>
                        <td className="py-2 px-3 text-slate-200">{c.ankhLocalRate.toLocaleString()} {c.currencySymbol}</td>
                        <td className="py-2 px-3 text-emerald-300 font-extrabold bg-emerald-950/20">
                          {c.locked14Local.toLocaleString()} {c.currencySymbol}
                        </td>
                        <td className="py-2 px-3 text-cyan-300">{c.living12Local.toLocaleString()}</td>
                        <td className="py-2 px-3 text-purple-300">{c.tech2Local.toLocaleString()}</td>
                        <td className="py-2 px-3">
                          {c.verifiedSourceCode ? (
                            <button
                              onClick={() => copySourceCode(c.verifiedSourceCode!)}
                              className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-[9px] hover:bg-emerald-800 flex items-center gap-1"
                              title="كود التحقق المثبت بسعر 15 يوليو 2026"
                            >
                              <span>{c.verifiedSourceCode}</span>
                              {copiedCode === c.verifiedSourceCode ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-300" /> : null}
                            </button>
                          ) : (
                            <span className="text-[9px] text-slate-500">PQC-6236</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedCountry(c);
                              setActiveViewMode('calculator');
                            }}
                            className="p-1 px-2 rounded bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white text-[10px] font-sans font-bold transition-colors"
                          >
                            {isAr ? 'حساب' : 'Calc'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>195 دولة بالعملات المحلية • 0 ملاءة • 14 مقفول (12 عيشة + 2 تقنية)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadXLSX}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تصدير جدول الإكسيل (195 دولة)' : 'Export XLSX'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
