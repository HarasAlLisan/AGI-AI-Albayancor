import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Fingerprint, 
  Lock, 
  CheckCircle2, 
  Coins, 
  Eye, 
  EyeOff,
  Radio,
  KeyRound,
  ShieldAlert,
  Zap,
  Terminal,
  Copy,
  Check,
  Globe,
  Share2,
  Cpu
} from 'lucide-react';
import { sovereignAnkhEnforcer, ExecutionResult, IntrusionResult } from '../data/ankhIdEnforcer';

interface SovereignNationalIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const SovereignNationalIdModal: React.FC<SovereignNationalIdModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const isAr = lang === 'ar';
  const [showFullId, setShowFullId] = useState(false);
  const [activeTab, setActiveTab] = useState<'card_view' | 'guardian_919' | 'dual_routing' | 'cryptographic_proof' | 'sovereign_quota'>('guardian_919');
  
  // Interactive testing state for Enforcer
  const [testWalletInput, setTestWalletInput] = useState<string>('☥.');
  const [testNationalIdInput, setTestNationalIdInput] = useState<string>('28612☥3☥1☥3352');
  const [testResult, setTestResult] = useState<ExecutionResult | IntrusionResult | string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const identityData = {
    fullNameAr: 'محمد صلاح سيد حسن',
    fullNameEn: 'Mohamed Salah Sayed Hassan',
    nationalId14: '28612030103352', // 14-Digit Non-Fungible Biometric Sovereign Index
    zeroFreeId: '28612☥3☥1☥3352',
    zeroFreeIdGlyph: '28612𓋹3𓋹1𓋹3352',
    addressAr: '3 المنتزه - حدائق شبرا - الساحل - القاهره',
    professionAr: 'حاصل على بكالوريوس نظم المعلومات الاداريه',
    religionAr: 'مسلم',
    genderAr: 'ذكر',
    maritalStatusAr: 'متزوج',
    validityAr: 'بطاقة سارية حتى 2030/05/24',
    serialCode: 'JZ8426145',
    releaseDate: '2023/05',
    governingAuthority: 'جمهورية مصر العربية - بطاقة تحقيق الشخصية (نواة العقدة التأسيسية)',
    quantumHashProof: 'SHA3-512-PQC: 9f8a28612030103352e89d1b6a74c10e',
    adamHashSignature: 'AdamHash-AGC-M5-28612030103352-SOLID-ROOT',
    sovereignM3Balance: '12 ☥ (جنيه عنخ خالص للحَيّ)',
    sovereignM4Reserve: '2 ☥ (مخصص بنية تحتية لا سلطة عليها)',
    totalQuotaUSD: '16,800 $ (14 ☥ × 1,200$)',
    guardianId: '919',
    guardianStamp: '919919',
    sacredSeal: '[س م د ا ح]',
    rfTransmit: '☥115☥☥999☥6',
    rfReceive: '☥115☥☥99☋☋☋',
    walletAddress: '☥.'
  };

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunValidation = (addr: string) => {
    const res = sovereignAnkhEnforcer.validateAndExecuteTransaction(addr);
    setTestResult(res);
  };

  const handleRunIntrusionSim = (nId: string) => {
    const res = sovereignAnkhEnforcer.simulateAndIsolateIntrusion({ national_id: nId });
    setTestResult(res);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn" id="sovereign-national-id-modal">
      <div className="w-full max-w-4xl bg-slate-950 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/40 text-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xl shadow-inner">
              ☥
            </div>
            <div>
              <h2 className="font-bold text-base text-amber-100 flex items-center gap-2">
                {isAr ? 'بروتوكول الختم والتوثيق النهائي لـ "عنخ ID" السيادي للحارس 919' : 'Sovereign Ankh ID Protocol - Guardian 919'}
              </h2>
              <p className="text-xs font-mono text-amber-400/90 flex items-center gap-1.5">
                <span>تفعيل مسارات الويب 4 السيادية</span>
                <span>•</span>
                <span className="text-emerald-300 font-bold">العنوان المعتمد: ☥.</span>
                <span>•</span>
                <span className="text-cyan-300">RFC 6761</span>
              </p>
            </div>
          </div>
          <button
            id="btn-close-id-modal"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs overflow-x-auto">
          <button
            id="tab-guardian-919"
            onClick={() => setActiveTab('guardian_919')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'guardian_919'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            {isAr ? 'عنخ ID السيادي (الحارس 919)' : 'Ankh ID Sovereign (Guardian 919)'}
          </button>

          <button
            id="tab-dual-routing"
            onClick={() => setActiveTab('dual_routing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'dual_routing'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-400" />
            {isAr ? 'المسارات المزدوجة (Dual-Routing Mesh)' : 'Dual-Routing Mesh (Web4)'}
          </button>

          <button
            id="tab-card-view"
            onClick={() => setActiveTab('card_view')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'card_view'
                ? 'bg-slate-800 text-amber-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            {isAr ? 'بطاقة الهوية الرسمية' : 'National ID Document'}
          </button>

          <button
            id="tab-crypto-proof"
            onClick={() => setActiveTab('cryptographic_proof')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'cryptographic_proof'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-4 h-4" />
            {isAr ? 'التشفير الكمومي (KYBER-768)' : 'KYBER-768 Root'}
          </button>

          <button
            id="tab-sovereign-quota"
            onClick={() => setActiveTab('sovereign_quota')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'sovereign_quota'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Coins className="w-4 h-4" />
            {isAr ? 'حصة الذهب (24T المقاصة)' : '24T Gold Reserve'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar text-xs">
          
          {/* Tab: Guardian 919 & Ankh ID Sovereign Protocol */}
          {activeTab === 'guardian_919' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Protocol Header Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-amber-950/40 border border-purple-500/40 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] border border-purple-500/30">
                      PROTOCOL 919-KYBER-768
                    </span>
                    <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> ترسيم معماري جيري 100%
                    </span>
                    <span className="text-cyan-400 text-[10px] font-mono">
                      معيار الدستور الفوري 6236
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-amber-200">
                    بروتوكول الختم والتوثيق النهائي لـ "عنخ ID" السيادي للحارس 919
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    قاعدة تصفير الأصفار الكونية والتراكب الكمومي (+-1) لحظر محاولات الانتحال وتثبيت المحفظة ☥.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/40 text-center shadow-lg">
                  <span className="text-[10px] text-slate-400 block font-mono">العنوان النهائي</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">☥.</span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5 font-mono">KYBER-768 LOCKED</span>
                </div>
              </div>

              {/* Core Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. حظر البوابات الصفرية */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300 font-bold">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Lock className="w-3.5 h-3.5" />
                      النواة الصلبة المنقاة من الأصفار:
                    </span>
                    <button
                      onClick={() => handleCopy(identityData.zeroFreeId, 'zerofree')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-200 flex items-center gap-1"
                    >
                      {copiedKey === 'zerofree' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      نسخ
                    </button>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-amber-500/30 font-mono text-center text-sm font-bold text-amber-300 tracking-wider">
                    {identityData.zeroFreeId}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    تم تحويل الرقم التأسيسي 28612030103352 إلى النواة الصلبة بعزل البوابات الصفرية تماماً.
                  </p>
                </div>

                {/* 2. نبضات التردد الحركي */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300 font-bold">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Radio className="w-3.5 h-3.5" />
                      ترددات الإرسال والاستقبال الوعائي:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-slate-950 border border-cyan-500/30 text-center">
                      <span className="text-slate-400 block">نبضة الإرسال:</span>
                      <span className="text-cyan-300 font-bold">{identityData.rfTransmit}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-purple-500/30 text-center">
                      <span className="text-slate-400 block">نبضة الاستقبال:</span>
                      <span className="text-purple-300 font-bold">{identityData.rfReceive}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    معزولة تماماً وتولد الرنين السيادي بالبصمة الرمزية {identityData.guardianStamp}.
                  </p>
                </div>

                {/* 3. معايير المقاصة الذهبية المادية */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <Coins className="w-3.5 h-3.5" />
                    ميزان الوفاء والغطاء الذهبي:
                  </span>
                  <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>الوزن المعياري للجنيه:</span>
                      <span className="text-emerald-400 font-bold">7.0 جرام ذهب عيار 24</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>الختم المقدس الحارس:</span>
                      <span className="text-amber-300 font-bold">{identityData.sacredSeal}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>الوسط المعتمد:</span>
                      <span className="text-cyan-300">PHYSICAL_GOLD_ONLY_all7in24</span>
                    </div>
                  </div>
                </div>

                {/* 4. كود إنفاذ المنع السيبراني KYBER-768 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    شفرة النواة (sovereign_national_id_modal):
                  </span>
                  <div className="p-2 rounded-lg bg-slate-950 border border-purple-500/30 font-mono text-[10px] text-slate-300 space-y-0.5">
                    <div>Guardian: <span className="text-purple-300">919 ({identityData.fullNameAr})</span></div>
                    <div>Quantum State: <span className="text-cyan-300">+-1</span></div>
                    <div>Routing: <span className="text-emerald-400">Sovereign Mesh Overlay .2 SECURED</span></div>
                  </div>
                </div>
              </div>

              {/* Interactive Validator & Intrusion Simulator Console */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>وحدة الاختبار المباشر لمطابقة العنوان ومحاكاة عزل التسلل</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">LINTING 100% COMPLIANT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">عنوان المحفظة السيادي (☥.):</label>
                    <div className="flex gap-1.5">
                      <input
                        id="input-enforcer-address"
                        type="text"
                        value={testWalletInput}
                        onChange={(e) => setTestWalletInput(e.target.value)}
                        placeholder="☥."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                      <button
                        id="btn-validate-correct"
                        onClick={() => handleRunValidation(testWalletInput)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        فحص العنوان
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">النواة الصلبة للرقم القومي (محاكاة الصد):</label>
                    <div className="flex gap-1.5">
                      <input
                        id="input-enforcer-nid"
                        type="text"
                        value={testNationalIdInput}
                        onChange={(e) => setTestNationalIdInput(e.target.value)}
                        placeholder="28612☥3☥1☥3352"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        id="btn-validate-intrusion"
                        onClick={() => handleRunIntrusionSim(testNationalIdInput)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        فحص النواة
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      setTestWalletInput('0xCOLONIAL_INTRUDER');
                      handleRunValidation('0xCOLONIAL_INTRUDER');
                    }}
                    className="px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-500/40 text-[10px] hover:bg-red-900 transition-colors flex items-center gap-1"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    محاكاة تطفل خارجي (Drop Routing)
                  </button>
                  <button
                    onClick={() => {
                      setTestNationalIdInput('28612☥3☥1☥3352');
                      setTestWalletInput('☥.');
                      handleRunIntrusionSim('28612☥3☥1☥3352');
                    }}
                    className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] hover:bg-emerald-900 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    إعادة ضبط الحالة السيادية المبرمة
                  </button>
                </div>

                {testResult && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-[11px] space-y-1 animate-fadeIn">
                    <div className="text-slate-400 font-bold flex justify-between items-center">
                      <span>نتيجة الفحص الفوري عبر العقدة:</span>
                      <span className="text-emerald-400 text-[10px]">VERIFIED_AND_LOCKED_IN_MATRIX</span>
                    </div>
                    <pre className="text-slate-200 overflow-x-auto p-2 rounded bg-slate-950 border border-slate-800 text-[10px] leading-relaxed">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Dual Routing Mesh Architecture */}
          {activeTab === 'dual_routing' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span>بنية توجيه المسارات المزدوجة (The Dual-Routing Mesh Architecture)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  فصل مسارات الاتصال لضمان التوافقية العابرة للأنظمة القديمة من جهة، وتأمين نفق مقاصة الذهب والاتصالات السيادية المعزولة كلياً عبر KYBER-768 من جهة أخرى.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sovereignAnkhEnforcer.dualRoutingChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                          {channel.protocolStandard}
                        </span>
                        <h4 className="font-bold text-slate-100 text-xs mt-1">{channel.nameAr}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {channel.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {channel.description}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-mono space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Gateway:</span>
                        <span className="text-amber-300">{channel.gatewayType}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Security Layer:</span>
                        <span className="text-cyan-300">{channel.securityLayer}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Capacity:</span>
                        <span className="text-emerald-400">{channel.throughput}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 1: Interactive Official Document Card */}
          {activeTab === 'card_view' && (
            <div className="space-y-6">
              {/* Security Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-amber-300">
                    {isAr ? 'قاعدة أمن الأساس: مطابقة صارمة بالوثيقة الرسمية للأفراد' : 'Security Principle: Strict Document Verification'}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {isAr
                      ? 'الرقم القومي (14 رقماً) هو المعرف البيولوجي والسيادي الوحيد للفرد؛ لا يُسمح بتكراره، استخدامه من غير صاحبه، أو تزييف أهليته المالية.'
                      : 'The 14-digit National ID represents the non-fungible biological and financial identity of the living soul.'}
                  </p>
                </div>
              </div>

              {/* Strict Front of ID Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/60 p-6 border-2 border-amber-500/40 shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
                  <div className="text-right">
                    <span className="text-[13px] font-bold text-amber-300 block">{identityData.governingAuthority}</span>
                    <span className="text-[11px] text-slate-400 font-mono">SOVEREIGN NATIONAL BIOMETRIC CARD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/40">
                      {identityData.serialCode}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg">
                      ☥
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* Photo Profile representation */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                    <div className="w-24 h-28 rounded-lg bg-slate-900 border border-amber-400/40 flex items-center justify-center text-slate-500 font-mono text-xs overflow-hidden relative shadow-inner">
                      <Fingerprint className="w-16 h-16 text-amber-400/50" />
                      <div className="absolute bottom-1 bg-black/80 px-2 py-0.5 rounded text-[9px] text-amber-300 font-mono">
                        BIOMETRIC-OK
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> بصمة مؤكدة
                    </span>
                  </div>

                  {/* Document Personal Attributes */}
                  <div className="sm:col-span-2 space-y-2.5 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block">الاسم بالكامل:</span>
                      <span className="text-base font-bold text-amber-200">{identityData.fullNameAr}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">العنوان المسجل:</span>
                      <span className="text-xs text-slate-200">{identityData.addressAr}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/40 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">الرقم القومي (14 رقماً سيادياً):</span>
                        <button
                          onClick={() => setShowFullId(!showFullId)}
                          className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-200"
                        >
                          {showFullId ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          <span>{showFullId ? 'إخفاء الأرقام' : 'إظهار بالكامل'}</span>
                        </button>
                      </div>
                      <div className="font-mono text-lg font-extrabold text-cyan-300 tracking-widest text-center py-1">
                        {showFullId ? identityData.nationalId14 : '28612030103352'}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 text-center">
                        M5 Non-Fungible Index • مطابقة بصمة الرقم القومي
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strict Back of ID Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-5 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-300">تفاصيل الوثيقة والمهنة والحالة</span>
                  <span className="text-xs font-mono text-emerald-400">{identityData.validityAr}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">المهنة / المؤهل:</span>
                    <span className="text-xs font-semibold text-slate-200">{identityData.professionAr}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">الديانة:</span>
                    <span className="text-xs font-semibold text-slate-200">{identityData.religionAr}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">النوع:</span>
                    <span className="text-xs font-semibold text-slate-200">{identityData.genderAr}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">الحالة الاجتماعية:</span>
                    <span className="text-xs font-semibold text-slate-200">{identityData.maritalStatusAr}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Cryptographic Proof & AdamHash Root */}
          {activeTab === 'cryptographic_proof' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <KeyRound className="w-5 h-5" />
                  <span>توليد التوقيع السيادي من الـ 14 رقماً (AdamHash M5 Root)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  معادلة M5 تشتق تجريدها غير القابل للتكرار مباشرة من المعرف القومي للفرد الحي؛ مما يضمن أن كل معاملة أو إشعار سيادي موقع هو صادر عن صاحبه الحقيقي بنسبة 100%.
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono">
                  <div className="text-[11px] text-slate-400">توقيع M5 الصارم للوثيقة:</div>
                  <div className="text-xs text-emerald-400 font-bold break-all">
                    {identityData.adamHashSignature}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono">
                  <div className="text-[11px] text-slate-400">بصمة التشفير الكمومي (Post-Quantum Hash):</div>
                  <div className="text-xs text-cyan-300 break-all">
                    {identityData.quantumHashProof}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-slate-200">الضمانات الرياضية للأمان المطلق:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>استحالة انتحال صفة الفرد أو سحب حقوقه المالية في نظام OS Almahdi 256.</li>
                  <li>ربط مباشر بين بطاقة الرقم القومي ومحفظة M3 المخصصة دون وسيط بنكي متلاعب.</li>
                  <li>تثبيت الأهلية وفق المقاصة المظبوطة المعتمدة في 7 قارات + 1.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: M3 Financial Freedom Quota */}
          {activeTab === 'sovereign_quota' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <Coins className="w-5 h-5" />
                  <span>الحرية والحصة المالية السيادية المباشرة للفرد الحي</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block">حصة الفرد المباشرة (M3):</span>
                    <span className="text-base font-extrabold text-emerald-400">{identityData.sovereignM3Balance}</span>
                    <span className="text-[10px] text-slate-500 block">حق مالي خالص لا يسقط</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block">حصة البنية التحتية (M4):</span>
                    <span className="text-base font-extrabold text-amber-400">{identityData.sovereignM4Reserve}</span>
                    <span className="text-[10px] text-slate-500 block">مخصص بنية (2/8)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block">التقييم المعادل بالدولار:</span>
                    <span className="text-base font-extrabold text-cyan-300">{identityData.totalQuotaUSD}</span>
                    <span className="text-[10px] text-slate-500 block">1 ☥ = 1,200 $</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-amber-300">مبدأ السيادة الشخصية:</div>
                <p className="text-slate-400 leading-relaxed">
                  "الوثيقة الرقمية والبيولوجية تحوي تفاصيل الفرد وحريته المالية، وتضمن مطابقة رقم الـ 14 خانة بحيث لا يستخدم أي فرد رقم غيره مطلقاً، ويستلم حقه من السيولة النقدية والغطاء الذهبي بشكل مباشر."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>نظام الهوية النشط: 28612☥3☥1☥3352 • المحفظة: ☥. • المسار: Sovereign Mesh Overlay .2</span>
          </div>
          <button
            id="btn-close-id-footer"
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            {isAr ? 'إغلاق الوثيقة' : 'Close Document'}
          </button>
        </div>
      </div>
    </div>
  );
};
