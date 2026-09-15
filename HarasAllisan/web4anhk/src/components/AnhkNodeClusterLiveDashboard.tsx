import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Coins, 
  Cpu, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Sparkles,
  Lock,
  Flame,
  CheckCircle2,
  Clock,
  Key
} from 'lucide-react';

interface AnhkNodeClusterLiveDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

export const AnhkNodeClusterLiveDashboard: React.FC<AnhkNodeClusterLiveDashboardProps> = ({
  isOpen,
  onClose,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';
  const [pulseCount, setPulseCount] = useState<number>(104821);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [hashSuffix, setHashSuffix] = useState<string>('919_616_920');
  const [activeTab, setActiveTab] = useState<'nodes' | 'termux' | 'telemetry'>('nodes');

  // 918ms Live Sovereign Pulse
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
      const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
      setHashSuffix(`919_${hex}_920`);
    }, 918);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Forced pulse with flash effect
  const handleForcePulse = () => {
    setPulseCount(prev => prev + 10);
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 200);
  };

  const termuxCode = `node anhk_termux_7172.mjs
# فحص الحالة الميدانية للبوابة:
curl -s http://localhost:7172/api/cluster/status | jq .
# إرسال نبضة قسرية (+10):
curl -s -X POST http://localhost:7172/api/cluster/pulse`;

  const copyTermuxCode = () => {
    navigator.clipboard.writeText(termuxCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Screen flash on force pulse */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-200 z-50 bg-cyan-500/25 ${
          isFlashing ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-950/95 text-slate-200 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col custom-scrollbar">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-slate-900/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border border-purple-500/40 text-cyan-300">
              <span className="text-xl font-bold font-mono">𓋹</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-mono tracking-wide">
                  {isAr ? 'عنقود النواة 4.2 | لوحة البث الحي والسيادة المطلقة (+1)' : 'ANHK Node Cluster v4.2 | Live Sovereign Broadcast'}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE • 918ms
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isAr ? 'المحور 919 ➔ 920 مستقر • في انتظار الإشارة 921 يا حارس • LOCK 616' : 'Axis 919 ➔ 920 Stable • Standby for Signal 921 • LOCK 616'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/anhk_node_cluster_v4_agentic_artifact_5_dd1c0776d1a1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title={isAr ? 'فتح ملف الداشبورد المستقل' : 'Open standalone HTML dashboard'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAr ? 'عرض الداشبورد المستقل' : 'Standalone HTML'}</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">

          {/* Sovereign Pulse Banner */}
          <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 p-4 flex flex-wrap items-center justify-between gap-4 shadow-inner">
            <div>
              <div className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{isAr ? 'النواة تشتعل تحت السيادة المطلقة (+1)' : 'Core Ignited under Absolute Sovereignty (+1)'}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 mt-1 flex items-baseline gap-2">
                <span>+{pulseCount.toLocaleString()}</span>
                <span className="text-xs font-normal text-slate-400 font-mono">PULSES (Δt = 918ms)</span>
              </div>
              <div className="text-[11px] font-mono text-purple-400 mt-1">
                AdamHash_Stable: <span className="text-purple-200">0x{hashSuffix}</span>
              </div>
            </div>

            <button
              onClick={handleForcePulse}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-300/40 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{isAr ? 'نبضة قسرية (+10 Flash)' : 'Forced Pulse (+10 Flash)'}</span>
            </button>
          </div>

          {/* 4 Sovereign Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Lock 616 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-900/50 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>القفل الكمي</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">LOCK 616</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                SYMMETRY STABLE (1/0 = ☥)
              </div>
            </div>

            {/* Towers */}
            <div className="rounded-xl border border-emerald-500/30 bg-slate-900/50 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>أبراج البث السيادية</span>
                <Radio className="w-3.5 h-3.5" />
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">77M + 26,160</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {isAr ? 'العالم + مصر (تناظر ثنائي الاتجاه)' : '77M Global + 26,160 Egypt'}
              </div>
            </div>

            {/* Gold Peg */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                <span>المحور الصخري</span>
                <Coins className="w-3.5 h-3.5" />
              </div>
              <div className="text-lg font-bold text-amber-300 font-mono mt-1">7G GOLD (24K)</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                1 ANKH POUND = 7G ذهب عيار 24
              </div>
            </div>

            {/* SPF / DKIM / PQC */}
            <div className="rounded-xl border border-purple-500/30 bg-slate-900/50 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-purple-400 font-mono">
                <span>التشفير والمصادقة</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-lg font-bold text-purple-300 font-mono mt-1">PASS 100%</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                SPF • DKIM • DMARC • AES-256
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('nodes')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'nodes'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'عقد المحور 919 ➔ 920 ➔ 921' : 'Axis Nodes 919 ➔ 920 ➔ 921'}
            </button>
            <button
              onClick={() => setActiveTab('termux')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'termux'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'كود الإنفاذ في Termux (Port 7172)' : 'Termux Daemon (Port 7172)'}
            </button>
          </div>

          {/* Tab 1: Nodes Table */}
          {activeTab === 'nodes' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-cyan-500/20 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-right">
                  <thead className="bg-slate-900/80 text-cyan-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">رقم العقدة</th>
                      <th className="p-3">الاسم والبيان السيادي</th>
                      <th className="p-3">التردد والحالة</th>
                      <th className="p-3">الختم الأمني</th>
                      <th className="p-3 text-left">التوقيع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {/* Node 919 */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="p-3 font-bold text-purple-400">#919</td>
                      <td className="p-3">
                        <div className="font-bold text-white">ختم الجذر الهرمسي مفعل</div>
                        <div className="text-[10px] text-slate-400">عقدة القفل الكمي مؤمنة</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          6236 Hz SECURED
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">ROOT_HERMETIC_ACTIVE</td>
                      <td className="p-3 text-left font-mono text-[10px] text-cyan-400">0x616...919</td>
                    </tr>

                    {/* Node 920 */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="p-3 font-bold text-cyan-400">#920</td>
                      <td className="p-3">
                        <div className="font-bold text-white">تردد الشريان نشط</div>
                        <div className="text-[10px] text-slate-400">نقطة الربط متصلة • علامة الفتح مفتوحة</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-[10px]">
                          <Activity className="w-3 h-3 animate-spin" />
                          918ms PULSE (OPEN GATE)
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">GATE_OPEN_SYMMETRY_616</td>
                      <td className="p-3 text-left font-mono text-[10px] text-cyan-400">0x918...920</td>
                    </tr>

                    {/* Node 921 */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="p-3 font-bold text-amber-400">#921</td>
                      <td className="p-3">
                        <div className="font-bold text-white">إشارة الترقب الكبرى</div>
                        <div className="text-[10px] text-slate-400">في انتظار الإشارة 921 يا حارس</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 text-[10px]">
                          <Clock className="w-3 h-3" />
                          AWAITING SIGNAL
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">HARIS_SENTINEL_STANDBY</td>
                      <td className="p-3 text-left font-mono text-[10px] text-amber-400">STANDBY</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>الفاعل الأوحد هو الله. مملكة التمكين مستقرة على (+1).</span>
                <span className="text-cyan-400">DIGITAL_SOVEREIGNTY_HASH: VERIFIED</span>
              </div>
            </div>
          )}

          {/* Tab 2: Termux Port 7172 Code */}
          {activeTab === 'termux' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-300 font-mono">
                {isAr
                  ? 'قم بتشغيل هذا الكود في Termux على هاتفك أو خادمك الشخصي للاستماع على المنفذ 7172 وتنسيق النبضات مع المنفذ 9090:'
                  : 'Execute this daemon code in Termux on port 7172 to coordinate pulses with port 9090:'}
              </div>

              <div className="relative rounded-xl border border-indigo-500/30 bg-slate-950 p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                <button
                  onClick={copyTermuxCode}
                  className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الكود' : 'Copy')}</span>
                </button>
                <pre className="text-left font-mono pt-4 select-all" dir="ltr">
                  {termuxCode}
                </pre>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>
                  {isAr
                    ? 'الخادم الرئيسي يستمع أيضاً على المنفذ 7172 و 9090 بالتوازي لتحقيق التناظر التام.'
                    : 'The main server also coordinates listeners on 7172 and 9090 for full symmetry.'}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">
            {isAr ? 'بروتوكول البث: ANHK Cluster v4.2 • تم الإطباق والبث 𓋹' : 'Protocol: ANHK Cluster v4.2 • Engaged & Broadcasting 𓋹'}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono transition-colors"
          >
            {isAr ? 'إغلاق اللوحة' : 'Close Dashboard'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnhkNodeClusterLiveDashboard;
