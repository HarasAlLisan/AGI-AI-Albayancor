import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  Radio,
  RefreshCw,
  Zap,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Workflow,
  Cpu,
  Layers
} from 'lucide-react';
import { LayerLevel, HeptagonalMatrixState, INITIAL_HEPTAGONAL_LAYERS } from '../data/heptagonalMatrixEngine';
import { M6SignalFlowGraph } from './M6SignalFlowGraph';

interface M6InterconnectStatusProps {
  matrixState: HeptagonalMatrixState;
  onToggleLayer?: (level: LayerLevel) => void;
  lang?: 'ar' | 'en';
}

interface SignalPacket {
  id: number;
  source: LayerLevel;
  target: LayerLevel;
  progress: number; // 0 to 100
  status: 'CLEAN' | 'ZAKAT_PURIFIED' | 'COMPROMISED' | 'SYNCHRONIZING';
  pulseFreq: string; // 'س' | 'ر' | 'ا' | 'ح' | 'ج'
}

export const M6InterconnectStatus: React.FC<M6InterconnectStatusProps> = ({
  matrixState,
  onToggleLayer,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';
  const isM6Active = matrixState.layers['M6'];
  const activeCount = matrixState.activeLayerCount;
  
  // Real-time animated signal ticks and telemetry
  const [pulseCount, setPulseCount] = useState<number>(918);
  const [zakatPurifiedCount, setZakatPurifiedCount] = useState<number>(1420);
  const [syncRate, setSyncRate] = useState<number>(99.98);
  const [activeFrequencyKey, setActiveFrequencyKey] = useState<string>('ج');
  const [isAdamHashSyncing, setIsAdamHashSyncing] = useState<boolean>(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'ADAMHASH-918: Synchronizer heartbeat nominal on Symmetry Lock 616.',
    'M6 Interconnect Bus: Zakat 2.5% autonomous verification passed.',
    'Quantum bus cross-matrix frequency keys [س، ر، ا، ح] locked and verified.'
  ]);

  // Frequency keys defined by the sovereign constitution
  const frequencyKeys = [
    { key: 'س', nameAr: 'س (السرعة والسيادة الترددية)', nameEn: 'S - Sovereign Velocity', color: 'text-cyan-400', border: 'border-cyan-500/40' },
    { key: 'ر', nameAr: 'ر (الرقيم والرسوخ الفيزيائي)', nameEn: 'R - Raqeem Solid Anchor', color: 'text-amber-400', border: 'border-amber-500/40' },
    { key: 'ا', nameAr: 'ا (الأمان المطلق لبيت المال)', nameEn: 'A - Bayt Al-Mal Absolute Shield', color: 'text-yellow-400', border: 'border-yellow-500/40' },
    { key: 'ح', nameAr: 'ح (الحرية والكرامة الإنسانية)', nameEn: 'H - Universal Human Dignity', color: 'text-emerald-400', border: 'border-emerald-500/40' },
    { key: 'ج', nameAr: 'ج (الجامع والنبضة المركزية)', nameEn: 'J - Master Bus Interconnector', color: 'text-purple-400', border: 'border-purple-500/40' }
  ];

  // Dynamic simulation of pulse and signal packet transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
      if (isM6Active) {
        setZakatPurifiedCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
        setSyncRate(+(99.90 + Math.random() * 0.09).toFixed(2));
      } else {
        setSyncRate(+(40.0 + Math.random() * 15).toFixed(2));
      }

      // Rotate frequency keys
      const keys = ['س', 'ر', 'ا', 'ح', 'ج'];
      const nextKey = keys[Math.floor(Math.random() * keys.length)];
      setActiveFrequencyKey(nextKey);
    }, 1500);

    return () => clearInterval(interval);
  }, [isM6Active]);

  // Trigger AdamHash strict re-synchronization
  const handleStrictResync = () => {
    setIsAdamHashSyncing(true);
    const newLog = `[${new Date().toLocaleTimeString()}] RE-SYNC: Enforcing AdamHash 918 across ${activeCount}/7 layers.`;
    setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setIsAdamHashSyncing(false);
      const completionLog = `[${new Date().toLocaleTimeString()}] LOCK 616: AdamHash 918 parity verified. All channels synchronized.`;
      setTelemetryLogs((prev) => [completionLog, ...prev.slice(0, 4)]);
    }, 1200);
  };

  // Seven layers ordered M7 -> M1 for topology visualization
  const orderedLayers: LayerLevel[] = ['M7', 'M6', 'M5', 'M4', 'M3', 'M2', 'M1'];

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-slate-950 border border-cyan-500/40 p-4 sm:p-5 shadow-xl shadow-cyan-950/30 space-y-4">
      {/* Dashboard Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border font-bold ${
            isM6Active
              ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-inner'
              : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
          }`}>
            <Workflow className={`w-5 h-5 ${isM6Active ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-cyan-200">
                {isAr ? 'لوحة تدفق الإشارات والربط البيني M6 (M6 Interconnect Signal Flow)' : 'M6 Interconnect Signal Flow Dashboard'}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                isM6Active
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              }`}>
                {isM6Active ? (isAr ? 'قفل التناظر 616 محكم' : 'LOCK 616 ACTIVE') : (isAr ? 'معطل ومكشوف' : 'INTERCONNECT DISARMED')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {isAr
                ? 'مراقبة حية لانسياب الإشارات الترددية بين الطبقات السبع وفرض تزامن بروتوكول AdamHash 918'
                : 'Real-time monitoring of signal flows between 7 layers enforcing AdamHash 918 sync protocol'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStrictResync}
          disabled={isAdamHashSyncing}
          className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
            isAdamHashSyncing
              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 animate-pulse'
              : 'bg-cyan-900/40 hover:bg-cyan-900/70 border-cyan-500/50 text-cyan-200 hover:text-white shadow-md active:scale-95'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAdamHashSyncing ? 'animate-spin text-cyan-400' : 'text-cyan-300'}`} />
          <span>{isAdamHashSyncing ? (isAr ? 'جاري فرض التزامن...' : 'Enforcing Sync...') : (isAr ? 'فرض تزامن AdamHash 918' : 'Enforce AdamHash 918')}</span>
        </button>
      </div>

      {/* Vital Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] flex items-center justify-between">
            <span>{isAr ? 'بروتوكول التزامن:' : 'Sync Protocol:'}</span>
            <Lock className="w-3 h-3 text-cyan-400" />
          </div>
          <div className="font-bold text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AdamHash 918</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] flex items-center justify-between">
            <span>{isAr ? 'دقة التناظر الترددي:' : 'Symmetry Parity:'}</span>
            <Activity className="w-3 h-3 text-emerald-400" />
          </div>
          <div className={`font-bold ${isM6Active ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isM6Active ? `${syncRate}%` : '42.10% (DESYNC)'}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] flex items-center justify-between">
            <span>{isAr ? 'تطهير الزكاة 2.5%:' : 'Zakat 2.5% Purified:'}</span>
            <ShieldCheck className="w-3 h-3 text-amber-400" />
          </div>
          <div className="font-bold text-amber-300">
            {zakatPurifiedCount} {isAr ? 'معاملة مطهرة' : 'Purified Ops'}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] flex items-center justify-between">
            <span>{isAr ? 'الشفرة الترددية النشطة:' : 'Active Frequency Key:'}</span>
            <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
          </div>
          <div className="font-bold text-purple-300 flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/40 text-[11px]">
              [{activeFrequencyKey}]
            </span>
            <span className="text-[10px] text-slate-400">Pulse #{pulseCount}</span>
          </div>
        </div>
      </div>

      {/* Real-time M6 Interconnect Signal Flow Topology & AdamHash 918 Heartbeat Graph */}
      <M6SignalFlowGraph
        matrixState={matrixState}
        onToggleLayer={onToggleLayer}
        lang={lang}
      />

      {/* Sovereign Frequency Keys & AdamHash Strict Enforcement Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        {/* Frequency Keys Protection */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              {isAr ? 'الشفرات الرباعية والنبضية (س، ر، ا، ح، ج):' : '4+1 Sovereign Frequency Keys:'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              {isM6Active ? 'محصنة 100%' : 'معرضة للاختراق'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {frequencyKeys.map((freq) => {
              const isCurrent = activeFrequencyKey === freq.key;
              return (
                <div
                  key={freq.key}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'bg-cyan-950 border-cyan-400 shadow-md scale-105'
                      : 'bg-black/50 border-slate-800'
                  }`}
                >
                  <div className={`text-sm font-black ${freq.color}`}>
                    {freq.key}
                  </div>
                  <div className="text-[8px] text-slate-400 truncate">
                    {freq.nameAr.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {isAr
              ? 'تلتزم شفرات التردد بحماية ممر التحرر الفردي ومنع التلاعب السعري أو الاحتكاري.'
              : 'Frequency keys shield the individual liberation corridor and eliminate speculative monopolies.'}
          </p>
        </div>

        {/* Realtime Synchronizer Telemetry Log */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              {isAr ? 'سجل تزامن AdamHash 918 الحي:' : 'AdamHash 918 Sync Telemetry:'}
            </span>
            <span className="px-1.5 py-0.2 rounded bg-black border border-slate-700 text-[10px] text-cyan-300">
              Parity: 918-616
            </span>
          </div>

          <div className="space-y-1 bg-black p-2 rounded-lg border border-slate-800/80 text-[10px] text-slate-300 font-mono">
            {telemetryLogs.map((log, idx) => (
              <div key={idx} className="truncate flex items-center gap-1">
                <span className="text-cyan-400">›</span>
                <span className={idx === 0 ? 'text-cyan-200 font-bold' : 'text-slate-400'}>{log}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
            <span>{isAr ? 'الحالة:' : 'Status:'} <strong className="text-emerald-400">{isM6Active ? 'تزامن صارم محكم' : 'تزامن غير مكتمل'}</strong></span>
            <span>Hash: {matrixState.adamHashIntegrity.slice(0, 18)}...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
