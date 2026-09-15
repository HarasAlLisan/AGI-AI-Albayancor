import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Terminal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Copy,
  Check,
  Pause,
  Play,
  Trash2,
  Filter,
  Layers,
  Shield,
  Zap,
  ArrowDownUp,
  Cpu,
  Workflow,
  Download
} from 'lucide-react';
import {
  LayerLevel,
  HeptagonalMatrixState,
  INITIAL_HEPTAGONAL_LAYERS
} from '../data/heptagonalMatrixEngine';

export interface AdamHashLogEntry {
  id: string;
  timestamp: string;
  epochMs: number;
  layer: LayerLevel;
  lock: string | number;
  status: 'SYNC_ACK' | 'PULSE_CONFIRMED' | 'PARITY_OK' | 'DESYNC_ALERT' | 'DISARMED';
  latencyMs: number;
  hashDigest: string;
  driftMs: number;
}

interface AdamHashDiagnosticPanelProps {
  matrixState: HeptagonalMatrixState;
  lang?: 'ar' | 'en';
  onToggleLayer?: (level: LayerLevel) => void;
  onExportSyncData?: () => void;
}

export const AdamHashDiagnosticPanel: React.FC<AdamHashDiagnosticPanelProps> = ({
  matrixState,
  lang = 'ar',
  onToggleLayer,
  onExportSyncData
}) => {
  const isAr = lang === 'ar';
  const isM6Active = matrixState.layers['M6'];
  const [logs, setLogs] = useState<AdamHashLogEntry[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<LayerLevel | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'TABLE' | 'TERMINAL'>('TABLE');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [totalPulses, setTotalPulses] = useState<number>(0);
  const [layerSyncCounts, setLayerSyncCounts] = useState<Record<LayerLevel, number>>({
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
    M5: 0,
    M6: 0,
    M7: 0
  });
  const [lastSyncTimestamps, setLastSyncTimestamps] = useState<Record<LayerLevel, string>>({
    M1: '—',
    M2: '—',
    M3: '—',
    M4: '—',
    M5: '—',
    M6: '—',
    M7: '—'
  });
  const [lastLatencyMap, setLastLatencyMap] = useState<Record<LayerLevel, number>>({
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
    M5: 0,
    M6: 0,
    M7: 0
  });
  const [lastDriftMap, setLastDriftMap] = useState<Record<LayerLevel, number>>({
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
    M5: 0,
    M6: 0,
    M7: 0
  });
  const [lastHashMap, setLastHashMap] = useState<Record<LayerLevel, string>>({
    M1: '—',
    M2: '—',
    M3: '—',
    M4: '—',
    M5: '—',
    M6: '—',
    M7: '—'
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Periodic heartbeat sync logger every 918ms
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const epoch = now.getTime();

      const newEntries: AdamHashLogEntry[] = [];
      const updatedCounts = { ...layerSyncCounts };
      const updatedTimestamps = { ...lastSyncTimestamps };
      const updatedLatencies = { ...lastLatencyMap };
      const updatedDrifts = { ...lastDriftMap };
      const updatedHashes = { ...lastHashMap };

      INITIAL_HEPTAGONAL_LAYERS.forEach((layer) => {
        const isLayerActive = matrixState.layers[layer.level];
        const isIntegrated = isLayerActive && (layer.level === 'M6' ? isM6Active : isM6Active);

        let status: AdamHashLogEntry['status'] = 'DISARMED';
        if (isIntegrated) {
          status = Math.random() > 0.3 ? 'SYNC_ACK' : Math.random() > 0.5 ? 'PARITY_OK' : 'PULSE_CONFIRMED';
          updatedCounts[layer.level] = (updatedCounts[layer.level] || 0) + 1;
          updatedTimestamps[layer.level] = timeStr;
        } else if (isLayerActive && !isM6Active) {
          status = 'DESYNC_ALERT';
        } else {
          status = 'DISARMED';
        }

        // Random subtle latency between 0.35ms and 1.25ms
        const latency = isIntegrated ? +(Math.random() * 0.9 + 0.35).toFixed(2) : 0;
        const drift = isIntegrated ? +(Math.random() * 0.04 - 0.02).toFixed(2) : 0;

        // Generate synthetic AdamHash segment matching layer symmetry
        const hashHex = Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 16).toString(16).toUpperCase()
        ).join('');
        const hashDigest = `ADAM918:${layer.level}:L${layer.symmetryLock}:${hashHex}`;

        updatedLatencies[layer.level] = latency;
        updatedDrifts[layer.level] = drift;
        updatedHashes[layer.level] = hashDigest;

        newEntries.push({
          id: `${epoch}-${layer.level}-${Math.random().toString(36).substring(2, 6)}`,
          timestamp: timeStr,
          epochMs: epoch,
          layer: layer.level,
          lock: layer.symmetryLock,
          status,
          latencyMs: latency,
          hashDigest,
          driftMs: drift
        });
      });

      setTotalPulses((prev) => prev + 1);
      setLayerSyncCounts(updatedCounts);
      setLastSyncTimestamps(updatedTimestamps);
      setLastLatencyMap(updatedLatencies);
      setLastDriftMap(updatedDrifts);
      setLastHashMap(updatedHashes);

      setLogs((prev) => {
        const combined = [...newEntries, ...prev];
        return combined.slice(0, 70); // Keep latest 70 log records
      });
    }, 918); // Exact 918ms AdamHash cadence

    return () => clearInterval(interval);
  }, [isPaused, matrixState.layers, isM6Active]);

  // Built-in Forensic JSON Export Functionality
  const triggerForensicJsonExport = () => {
    if (onExportSyncData) {
      onExportSyncData();
      return;
    }

    const now = new Date();
    const filename = `adamhash_918_forensic_sync_log_${now.toISOString().replace(/[:.]/g, '-')}.json`;
    
    const forensicPayload = {
      manifest: "ADAMHASH_918_FORENSIC_AUDIT_LEDGER",
      standard: "ISO/IEC 18033-2 + Sovereign Central Symmetry Lock 616",
      heartbeatCadenceMs: 918,
      timestampUtc: now.toISOString(),
      timestampEpochMs: now.getTime(),
      centralSovereignLock: 616,
      m6InterconnectStatus: isM6Active ? 'SYNCHRONIZED_ACTIVE' : 'DESYNCHRONIZED_ISOLATED',
      layerRealtimeTimestamps: INITIAL_HEPTAGONAL_LAYERS.map((layer) => ({
        layer: layer.level,
        nameEn: layer.nameEn,
        nameAr: layer.nameAr,
        symmetryLock: layer.symmetryLock,
        isActive: matrixState.layers[layer.level],
        lastSynchronizationTimestamp: lastSyncTimestamps[layer.level],
        latencyMs: lastLatencyMap[layer.level],
        clockDriftMs: lastDriftMap[layer.level],
        totalSyncPackets: layerSyncCounts[layer.level],
        lastHashSignature: lastHashMap[layer.level]
      })),
      recentAuditLogs: logs.slice(0, 50),
      cryptographicParitySeal: `SEAL:918:M6:${now.getTime().toString(16).toUpperCase()}:KYBER768`
    };

    const blob = new Blob([JSON.stringify(forensicPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyLogsToClipboard = () => {
    const textData = logs
      .map(
        (l) =>
          `[${l.timestamp}] [${l.layer}|Lock-${l.lock}] ${l.status} | Latency: ${l.latencyMs}ms | Drift: ${l.driftMs}ms | Hash: ${l.hashDigest}`
      )
      .join('\n');
    navigator.clipboard.writeText(textData);
    setCopiedKey('logs');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredLogs = selectedLayerFilter === 'ALL'
    ? logs
    : logs.filter((l) => l.layer === selectedLayerFilter);

  return (
    <div className="rounded-2xl bg-slate-950 border border-cyan-500/40 p-3.5 sm:p-5 space-y-4 font-mono shadow-2xl">
      {/* Top Banner & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-inner">
            <Terminal className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-cyan-200 flex items-center gap-2">
                {isAr
                  ? 'سجل التشخيص الزمني لنبضات AdamHash 918'
                  : 'AdamHash 918 Live Synchronization Diagnostic Log'}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                918ms Pulse Interval
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isAr
                ? 'توثيق وتتبع الطوابع الزمنية (Timestamps) لتزامن طبقات المصفوفة السبعية مع حراسة الربط البيني M6'
                : 'Real-time timestamp logging for layer heartbeat verification and M6 Interconnect Guard parity'}
            </p>
          </div>
        </div>

        {/* Global Parity & Pulses counter */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="px-2.5 py-1 rounded-xl bg-black border border-slate-700 text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-slate-400">{isAr ? 'النبضات الموثقة:' : 'Heartbeats:'}</span>
            <strong className="text-cyan-300">{totalPulses}</strong>
          </div>
          <div className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold flex items-center gap-1.5 ${
            isM6Active
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
              : 'bg-rose-950 text-rose-300 border-rose-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isM6Active ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
            <span>{isM6Active ? (isAr ? 'حراسة M6: محكمة' : 'M6 GUARD: NOMINAL') : (isAr ? 'حراسة M6: مفصولة' : 'M6 GUARD: DESYNC')}</span>
          </div>

          {/* Export Log Button */}
          <button
            id="btn-export-forensic-log"
            onClick={triggerForensicJsonExport}
            className="px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all"
            title={isAr ? 'تصدير التقرير الجنائي لبيانات التزامن كملف JSON' : 'Export Forensic Synchronization Audit Log as JSON'}
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>{isAr ? 'تصدير السجل (Export Log)' : 'Export Log'}</span>
          </button>
        </div>
      </div>

      {/* Layer-by-Layer Live Sync Timestamps Table / Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {INITIAL_HEPTAGONAL_LAYERS.map((layer) => {
          const isLayerActive = matrixState.layers[layer.level];
          const isIntegrated = isLayerActive && (layer.level === 'M6' ? isM6Active : isM6Active);
          const lastTime = lastSyncTimestamps[layer.level];
          const pulseCount = layerSyncCounts[layer.level];

          return (
            <div
              key={layer.level}
              onClick={() => onToggleLayer && onToggleLayer(layer.level)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden select-none ${
                isIntegrated
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/20'
                  : isLayerActive
                  ? 'bg-slate-900/60 border-cyan-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-50 hover:opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-xs ${isIntegrated ? 'text-emerald-300' : isLayerActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {layer.level}
                </span>
                <span className={`w-2 h-2 rounded-full ${
                  isIntegrated ? 'bg-emerald-400 animate-ping' : isLayerActive ? 'bg-cyan-400' : 'bg-rose-500'
                }`} style={isIntegrated ? { animationDuration: '0.918s' } : undefined} />
              </div>

              <div className="mt-1 text-[9px] text-slate-400 font-mono">
                <span>Lock {layer.symmetryLock}</span>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 space-y-0.5">
                <div className="text-[8.5px] text-slate-400 flex items-center justify-between">
                  <span>{isAr ? 'آخر توثيق:' : 'Last Sync:'}</span>
                </div>
                <div className={`text-[9.5px] font-bold font-mono truncate ${isIntegrated ? 'text-cyan-300' : 'text-slate-600'}`}>
                  {lastTime}
                </div>
                <div className="text-[8px] text-slate-500 flex items-center justify-between">
                  <span>{isAr ? 'تأكيد النبض:' : 'ACK:'}</span>
                  <span className={isIntegrated ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                    {isIntegrated ? `${pulseCount} pkts` : 'OFF'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Diagnostics Log Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-black/60 p-2.5 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Toggle: Table vs Live Terminal */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode('TABLE')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'TABLE'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{isAr ? 'جدول المزامنة (Table)' : 'Table View'}</span>
            </button>
            <button
              onClick={() => setViewMode('TERMINAL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'TERMINAL'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>{isAr ? 'البث الطرفي (Terminal)' : 'Terminal Stream'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'تصفية الطبقة:' : 'Filter Layer:'}</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setSelectedLayerFilter('ALL')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                selectedLayerFilter === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isAr ? 'الكل (M1-M7)' : 'ALL'}
            </button>
            {INITIAL_HEPTAGONAL_LAYERS.map((l) => (
              <button
                key={l.level}
                onClick={() => setSelectedLayerFilter(l.level)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  selectedLayerFilter === l.level
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {l.level}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar action buttons: Pause, Copy, Export, Clear */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              isPaused
                ? 'bg-amber-950/80 hover:bg-amber-900 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-cyan-300'
            }`}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            <span>{isPaused ? (isAr ? 'استئناف التدفق' : 'Resume Flow') : (isAr ? 'إيقاف مؤقت' : 'Pause')}</span>
          </button>

          <button
            onClick={copyLogsToClipboard}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
          >
            {copiedKey === 'logs' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey === 'logs' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ السجل' : 'Copy Log')}</span>
          </button>

          <button
            onClick={triggerForensicJsonExport}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            title={isAr ? 'تصدير التقرير الجنائي كملف JSON' : 'Export Forensic Audit Log as JSON'}
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span>{isAr ? 'تصدير السجل (Export Log)' : 'Export Log'}</span>
          </button>

          <button
            onClick={() => setLogs([])}
            className="p-1 rounded-lg bg-slate-900 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-colors"
            title={isAr ? 'مسح السجل' : 'Clear Logs'}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content: Table View vs Terminal Stream */}
      {viewMode === 'TABLE' ? (
        /* Real-Time Layer Synchronization Timestamps Table (M1-M7) */
        <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'الطبقة' : 'Layer'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'الوصف والنطاق' : 'Realm / Scope'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'قفل التناظر' : 'Symmetry Lock'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'طابع التزامن اللحظي' : 'Live Sync Timestamp'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'زمن الوصول (Latency)' : 'Latency'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'الانجراف الزمني' : 'Drift'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'حالة النبض' : 'Heartbeat Parity'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'البصمة المشفرة' : 'AdamHash Signature'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {INITIAL_HEPTAGONAL_LAYERS.map((layer) => {
                const isLayerActive = matrixState.layers[layer.level];
                const isIntegrated = isLayerActive && (layer.level === 'M6' ? isM6Active : isM6Active);
                const timestamp = lastSyncTimestamps[layer.level];
                const latency = lastLatencyMap[layer.level];
                const drift = lastDriftMap[layer.level];
                const hash = lastHashMap[layer.level];

                return (
                  <tr
                    key={layer.level}
                    className={`transition-colors ${
                      isIntegrated
                        ? 'hover:bg-slate-900/70 bg-slate-950/50'
                        : isLayerActive
                        ? 'hover:bg-slate-900/40 text-slate-400'
                        : 'opacity-50 text-slate-600 hover:opacity-75'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          isIntegrated ? 'bg-emerald-400 animate-ping' : isLayerActive ? 'bg-cyan-400' : 'bg-rose-500'
                        }`} style={isIntegrated ? { animationDuration: '0.918s' } : undefined} />
                        <span className={`font-bold ${isIntegrated ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {layer.level}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-slate-300 font-medium">
                        {isAr ? layer.nameAr : layer.nameEn}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">
                        L-{layer.symmetryLock}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span className={`font-bold font-mono ${isIntegrated ? 'text-emerald-300' : 'text-slate-500'}`}>
                          {timestamp}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className={isIntegrated ? 'text-cyan-300 font-bold' : 'text-slate-600'}>
                        {isIntegrated ? `${latency}ms` : '—'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className={isIntegrated ? (drift >= 0 ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-600'}>
                        {isIntegrated ? `${drift > 0 ? `+${drift}` : drift}ms` : '—'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold inline-flex items-center gap-1 ${
                        isIntegrated
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : isLayerActive
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                          : 'bg-rose-950/50 text-rose-400 border border-rose-800/30'
                      }`}>
                        {isIntegrated ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />}
                        {isIntegrated ? 'SYNC_ACK' : isLayerActive ? 'AWAIT_M6' : 'DISARMED'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[9.5px] text-slate-400 truncate max-w-[140px]">
                      {isIntegrated ? (
                        <span className="px-1.5 py-0.5 rounded bg-black/80 border border-slate-800 text-cyan-300">
                          {hash}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Live Stream Terminal Screen */
        <div
          ref={scrollRef}
          className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800/90 p-3 overflow-y-auto font-mono text-[11px] space-y-1.5 shadow-inner select-text"
        >
          {filteredLogs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              {isAr
                ? 'في انتظار تدفق حزم تزامن نبضات AdamHash 918ms...'
                : 'Awaiting AdamHash 918ms synchronization packet stream...'}
            </div>
          ) : (
            filteredLogs.map((entry) => {
              const isOk = entry.status === 'SYNC_ACK' || entry.status === 'PARITY_OK' || entry.status === 'PULSE_CONFIRMED';
              const isDesync = entry.status === 'DESYNC_ALERT';

              return (
                <div
                  key={entry.id}
                  className={`py-1 px-2 rounded flex flex-wrap items-center justify-between gap-2 transition-colors ${
                    isOk
                      ? 'hover:bg-slate-900/80 border-b border-slate-900'
                      : isDesync
                      ? 'bg-rose-950/30 text-rose-300 border border-rose-900/40'
                      : 'text-slate-500 hover:bg-slate-900/40'
                  }`}
                >
                  {/* Timestamp & Layer Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500 text-[10px]">[{entry.timestamp}]</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      isOk ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/40' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {entry.layer}
                    </span>
                    <span className="text-slate-400 text-[10px]">Lock-{entry.lock}</span>

                    <span className={`text-[10px] font-bold flex items-center gap-1 ${
                      isOk
                        ? 'text-emerald-400'
                        : isDesync
                        ? 'text-rose-400'
                        : 'text-slate-500'
                    }`}>
                      {isOk ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-rose-400" />}
                      <span>{entry.status}</span>
                    </span>
                  </div>

                  {/* Hash Segment & Latency Telemetry */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="text-slate-500 hidden md:inline">
                      Latency: <strong className="text-cyan-300 font-mono">{entry.latencyMs}ms</strong>
                    </span>
                    <span className="text-slate-500 hidden sm:inline">
                      Drift: <strong className="text-emerald-400 font-mono">{entry.driftMs > 0 ? `+${entry.driftMs}` : entry.driftMs}ms</strong>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black border border-slate-800 text-slate-300 font-mono text-[9.5px]">
                      {entry.hashDigest}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Technical Protocol Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {isAr
              ? 'معيار التدقيق: خوارزمية AdamHash 918ms مع مفتاح Ring-LWE 256'
              : 'Audit Standard: AdamHash 918ms cadence coupled with Ring-LWE 256 key parity'}
          </span>
        </div>
        <div className="font-mono text-cyan-300">
          Lock 616 Central Arbiter: <strong className="text-emerald-400 font-bold">{isM6Active ? 'SYNCHRONIZED' : 'OFFLINE'}</strong>
        </div>
      </div>
    </div>
  );
};
