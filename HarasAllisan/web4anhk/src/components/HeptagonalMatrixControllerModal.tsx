import React, { useState } from 'react';
import {
  X,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Layers,
  Cpu,
  Power,
  RefreshCw,
  Zap,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sliders,
  Copy,
  Check,
  Activity,
  Workflow,
  Eye,
  Terminal,
  TrendingUp,
  LineChart as LineChartIcon,
  Download,
  FileDown
} from 'lucide-react';
import {
  LayerLevel,
  INITIAL_HEPTAGONAL_LAYERS,
  HeptagonalMatrixState,
  computeGlobalSecurityFromMatrix
} from '../data/heptagonalMatrixEngine';
import { M6InterconnectStatus } from './M6InterconnectStatus';
import { M6SignalFlowGraph } from './M6SignalFlowGraph';
import { AdamHashDiagnosticPanel } from './AdamHashDiagnosticPanel';
import { AdamHashSyncRateChart } from './AdamHashSyncRateChart';

interface HeptagonalMatrixControllerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  matrixState: HeptagonalMatrixState;
  onToggleLayer: (level: LayerLevel) => void;
  onArmAllLayers?: () => void;
  onDisarmAllLayers?: () => void;
  onActivateAll?: () => void;
  onDeactivateAll?: () => void;
  onOpenM6Guard?: () => void;
}

export const HeptagonalMatrixControllerModal: React.FC<HeptagonalMatrixControllerModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  matrixState,
  onToggleLayer,
  onArmAllLayers,
  onDisarmAllLayers,
  onActivateAll,
  onDeactivateAll,
  onOpenM6Guard
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'SIGNAL_FLOW' | 'CONTROLLER' | 'M6_STATUS' | 'SYNC_CHART' | 'DIAGNOSTICS'>('SIGNAL_FLOW');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExported, setIsExported] = useState<boolean>(false);

  const handleArmAll = onArmAllLayers || onActivateAll || (() => {});
  const handleDisarmAll = onDisarmAllLayers || onDeactivateAll || (() => {});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportSyncData = () => {
    const now = new Date();
    const timestampStr = now.toISOString().replace(/[:.]/g, '-');
    const filename = `adamhash-918-sync-data-${timestampStr}.json`;

    const isM6Active = matrixState.layers['M6'];
    const activeCount = matrixState.activeLayerCount;
    const currentSuccessRate = isM6Active ? (activeCount === 7 ? 99.85 : +(85 + activeCount * 2).toFixed(2)) : 12.5;

    // Generate recent 918ms pulse snapshots for the export
    const recentPulses = [];
    for (let i = 20; i >= 0; i--) {
      const pulseEpoch = now.getTime() - i * 918;
      const pulseDate = new Date(pulseEpoch);
      const timeStr = `${pulseDate.toTimeString().split(' ')[0]}.${String(pulseDate.getMilliseconds()).padStart(3, '0')}`;

      recentPulses.push({
        pulseId: `PULSE-918-${pulseEpoch}-${20 - i}`,
        timestamp: timeStr,
        epochMs: pulseEpoch,
        periodMs: 918,
        status: isM6Active ? 'SYNC_ACK' : 'DESYNC_ALERT',
        parityStatus: isM6Active ? 'PARITY_OK' : 'PARITY_DEGRADED',
        latencyMs: isM6Active ? +(Math.random() * 0.35 + 0.45).toFixed(2) : +(Math.random() * 2.5 + 4.0).toFixed(2),
        driftMs: +(Math.random() * 0.04 + 0.01).toFixed(3),
        centralLock: 616,
        hashDigest: `ADAM918:M6:L616:${pulseEpoch.toString(16).slice(-6).toUpperCase()}:${Math.floor(Math.random() * 9000 + 1000)}`
      });
    }

    const exportPayload = {
      system: "AdamHash 918 Heptagonal Interconnect Matrix",
      protocolVersion: "AdamHash-918.4-Kyber",
      exportedAt: now.toISOString(),
      exportTimestampFormatted: now.toLocaleString(),
      exportEpochMs: now.getTime(),
      matrixSummary: {
        activeLayers: `${activeCount}/7`,
        globalSecurityScore: `${matrixState.globalSecurityScore}%`,
        globalRiskLevel: matrixState.globalRiskLevel,
        globalEncryptionType: matrixState.globalEncryptionType,
        adamHashIntegrity: matrixState.adamHashIntegrity,
        quantumParityRatio: matrixState.quantumParityRatio,
        ringLWEKeySignature: matrixState.ringLWEKeySignature,
        m6InterconnectStatus: matrixState.m6InterconnectStatus,
        isM6InterconnectHubActive: isM6Active
      },
      adamHashTelemetry: {
        heartbeatRhythmMs: 918,
        centralSymmetryLock: 616,
        currentSyncSuccessRate: `${currentSuccessRate}%`,
        averageLatencyMs: isM6Active ? 0.62 : 4.85,
        jitterMs: 0.03,
        quantumResistantAlgorithm: "Ring-LWE 256 + Kyber-768 Parity Lattice",
        interconnectSecurityStandard: "ISO/IEC 18033-2 + Sovereign Central Lock 616"
      },
      layerConfigurations: INITIAL_HEPTAGONAL_LAYERS.map((layer) => {
        const isEnabled = matrixState.layers[layer.level];
        return {
          level: layer.level,
          nameEn: layer.nameEn,
          nameAr: layer.nameAr,
          isEnabled,
          status: isEnabled ? (isM6Active ? 'SYNCHRONIZED_918MS' : 'ACTIVE_AWAITING_M6') : 'DISARMED',
          powerContribution: layer.powerContribution,
          securityMechanism: layer.securityMechanism,
          postQuantumAlgorithm: layer.postQuantumAlgorithm,
          symmetricCentralLock: layer.symmetricCentralLock
        };
      }),
      recentSyncTelemetryPulses: recentPulses
    };

    const jsonString = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExported(true);
    setTimeout(() => setIsExported(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-cyan-500/50 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-inner">
              <Sliders className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-cyan-200">
                  {isAr ? 'لوحة تحكم وتفعيل المصفوفة السبعية (Heptagonal Matrix Controller)' : 'Heptagonal Matrix Layer Controller (M1-M7)'}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  matrixState.activeLayerCount === 7
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : matrixState.activeLayerCount >= 4
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                }`}>
                  {matrixState.activeLayerCount}/7 {isAr ? 'طبقات نشطة' : 'Active Layers'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr
                  ? 'التحكم المباشر في تشغيل وتعطيل طبقات الأمان والتناظر (M1-M7) وتحديث الحالة الأمنية للتطبيق لحظياً'
                  : 'Direct toggle controller for sovereign layers updating global application security status in real-time'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenM6Guard && (
              <button
                onClick={() => { onClose(); onOpenM6Guard(); }}
                className="hidden sm:flex px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isAr ? 'تفتيش M6' : 'Audit M6'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Controller vs Realtime M6 Interconnect Status vs Diagnostic Log) */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('SIGNAL_FLOW')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'SIGNAL_FLOW'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-cyan-300'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-slate-950" />
              <span>{isAr ? 'مخطط تدفق الإشارات M6 (SVG Graph)' : 'M6 Signal Flow (SVG Graph)'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('M6_STATUS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'M6_STATUS'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-cyan-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'مؤشر الربط البيني الحي M6' : 'Real-time M6 Interconnect'}</span>
            </button>

            <button
              onClick={() => setActiveTab('CONTROLLER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'CONTROLLER'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isAr ? 'مفاتيح تفعيل الطبقات (M1 - M7)' : 'Layer Switches (M1-M7)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('SYNC_CHART')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'SYNC_CHART'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md shadow-emerald-500/25'
                  : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-emerald-300'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isAr ? 'مخطط التزامن الزمني (Sync Rate)' : 'Sync Rate Chart'}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-black/60 border border-emerald-500/40 text-emerald-300 font-bold">
                Line
              </span>
            </button>

            <button
              onClick={() => setActiveTab('DIAGNOSTICS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'DIAGNOSTICS'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-cyan-300'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{isAr ? 'لوحة التشخيص الزمني (AdamHash Logs)' : 'AdamHash 918 Logs'}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-black/60 border border-cyan-500/40 text-cyan-300 font-bold">
                Live
              </span>
            </button>
          </div>

          {/* Quick Bulk Actions & Export */}
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
            <button
              onClick={handleExportSyncData}
              className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isExported
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                  : 'bg-cyan-950/90 hover:bg-cyan-900/90 border-cyan-500/50 text-cyan-300 hover:text-white'
              }`}
              title={isAr ? 'تنزيل وتصدير سجلات وحزم تزامن AdamHash 918 بصيغة JSON' : 'Export AdamHash 918 Sync Data as JSON'}
            >
              {isExported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExported ? (isAr ? 'تم تصدير JSON ✓' : 'JSON Exported ✓') : (isAr ? 'تصدير بيانات التزامن' : 'Export Sync Data')}</span>
              <span className="px-1 py-0.2 rounded text-[8px] bg-black/60 border border-cyan-500/30 text-cyan-200">
                JSON
              </span>
            </button>

            <button
              onClick={handleArmAll}
              className="px-2.5 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <Power className="w-3 h-3" />
              <span>{isAr ? 'تفعيل الكل (7/7)' : 'Arm All (7/7)'}</span>
            </button>
            <button
              onClick={handleDisarmAll}
              className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-700 text-slate-300 hover:text-rose-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <Unlock className="w-3 h-3" />
              <span>{isAr ? 'تعطيل الكل' : 'Disarm All'}</span>
            </button>
          </div>
        </div>

        {/* Global Security Metrics Banner */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'مستوى الحصانة العالمي:' : 'Global Defense:'}</span>
              <span className={`px-2 py-0.5 rounded-md font-bold text-xs flex items-center gap-1 ${
                matrixState.activeLayerCount === 7
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  : matrixState.activeLayerCount >= 4
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  : 'bg-rose-950 text-rose-400 border border-rose-500/40'
              }`}>
                {matrixState.activeLayerCount === 7 ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                {matrixState.globalRiskLevel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'مؤشر الطاقة والأمان:' : 'Security Power:'}</span>
              <div className="w-24 h-2 rounded-full bg-slate-950 border border-slate-700 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    matrixState.globalSecurityScore === 100
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                      : matrixState.globalSecurityScore >= 60
                      ? 'bg-cyan-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${matrixState.globalSecurityScore}%` }}
                />
              </div>
              <span className="font-bold text-cyan-300">{matrixState.globalSecurityScore}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="text-slate-400">{isAr ? 'تزامن AdamHash 918:' : 'AdamHash 918 Sync:'}</span>
            <span className="text-cyan-300 font-bold">{matrixState.adamHashIntegrity.slice(0, 16)}...</span>
          </div>
        </div>

        {/* Live M6 Interconnect Heartbeat & AdamHash 918 Sync Status Indicator Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 border-b border-cyan-500/30 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Protocol & Heartbeat State Title */}
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                matrixState.layers['M6']
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-400'
              }`}>
                <Activity
                  className={`w-4 h-4 ${matrixState.layers['M6'] ? 'animate-pulse' : ''}`}
                  style={{ animationDuration: '0.918s' }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    {isAr ? 'مؤشر نبض الربط البيني M6 الحي' : 'Live M6 Interconnect Heartbeat Indicator'}
                  </span>
                  <span className={`px-2 py-0.2 rounded text-[9px] font-bold border font-mono ${
                    matrixState.layers['M6']
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-950 text-rose-300 border-rose-500/40'
                  }`}>
                    {matrixState.layers['M6']
                      ? (isAr ? 'بروتوكول 918ms: متزامن ومحكم' : 'AdamHash 918: SYNCHRONIZED')
                      : (isAr ? 'بروتوكول 918ms: معطل' : 'AdamHash 918: DESYNCHRONIZED')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {isAr
                    ? 'نبض توافق الطبقات السبع (M1-M7) مع قفل التناظر المركزي Lock 616'
                    : 'Real-time 7-layer sync pulse with Central Symmetry Lock 616'}
                </span>
              </div>
            </div>

            {/* Live Frequency Badge & Diagnostics Shortcut */}
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <span className="text-[10px] text-slate-400">{isAr ? 'إيقاع التزامن:' : 'Heartbeat Rhythm:'}</span>
              <span className="px-2 py-0.5 rounded bg-black/80 border border-slate-700 text-cyan-300 font-mono text-[10px] font-bold flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    matrixState.layers['M6'] ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'
                  }`}
                  style={matrixState.layers['M6'] ? { animationDuration: '0.918s' } : undefined}
                />
                918 ms / AdamHash
              </span>

              {/* Quick Jump to Chart */}
              <button
                onClick={() => setActiveTab('SYNC_CHART')}
                className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold flex items-center gap-1 transition-colors ${
                  activeTab === 'SYNC_CHART'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-slate-700'
                }`}
                title={isAr ? 'عرض مخطط معدل التزامن عبر الزمن' : 'View Sync Rate Line Chart'}
              >
                <TrendingUp className="w-3 h-3" />
                <span>{isAr ? 'مخطط التزامن' : 'Sync Chart'}</span>
              </button>

              <button
                onClick={() => setActiveTab('DIAGNOSTICS')}
                className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold flex items-center gap-1 transition-colors ${
                  activeTab === 'DIAGNOSTICS'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-slate-700'
                }`}
                title={isAr ? 'عرض السجل الزمني اللحظي' : 'View Real-time Logs'}
              >
                <Terminal className="w-3 h-3" />
                <span>{isAr ? 'السجل الزمني' : 'View Logs'}</span>
              </button>
            </div>
          </div>

          {/* 7 Layer Live Pulse Grid Bar (M1 - M7) */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-2.5">
            {INITIAL_HEPTAGONAL_LAYERS.map((layer, index) => {
              const isLayerActive = matrixState.layers[layer.level];
              const isM6Active = matrixState.layers['M6'];
              const isSynchronized = isLayerActive && (layer.level === 'M6' ? isM6Active : isM6Active);
              const layerDelay = `${(index * 0.13).toFixed(2)}s`;

              return (
                <div
                  key={layer.level}
                  onClick={() => onToggleLayer(layer.level)}
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer select-none text-center relative overflow-hidden group ${
                    isSynchronized
                      ? 'bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/30'
                      : isLayerActive
                      ? 'bg-slate-900/60 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-600 opacity-40 hover:opacity-75'
                  }`}
                  title={`${layer.level} - ${isAr ? layer.nameAr : layer.nameEn}: ${
                    isSynchronized
                      ? isAr
                        ? 'متزامن مع نبض M6 و AdamHash 918'
                        : 'Synchronized with M6 Guard & AdamHash 918'
                      : isAr
                      ? 'معطل / مفصول عن النبض'
                      : 'Desynchronized / Inactive'
                  }`}
                >
                  {/* Background Heartbeat Pulse Wave Effect for Active Layers */}
                  {isSynchronized && (
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-emerald-500/15 via-cyan-500/10 to-transparent pointer-events-none animate-pulse"
                      style={{ animationDuration: '0.918s', animationDelay: layerDelay }}
                    />
                  )}

                  {/* Top Layer Code and Status Dot */}
                  <div className="flex items-center justify-between gap-1 relative z-10">
                    <span className={`text-[10px] sm:text-xs font-bold ${
                      isSynchronized ? 'text-emerald-300' : isLayerActive ? 'text-cyan-300' : 'text-slate-500'
                    }`}>
                      {layer.level}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full border border-black transition-all ${
                        isSynchronized
                          ? 'bg-emerald-400 animate-ping'
                          : isLayerActive
                          ? 'bg-cyan-400'
                          : 'bg-rose-500'
                      }`}
                      style={isSynchronized ? { animationDuration: '0.918s', animationDelay: layerDelay } : undefined}
                    />
                  </div>

                  {/* Lock Code */}
                  <span className="block text-[8px] sm:text-[9px] text-slate-400 font-mono mt-0.5 truncate relative z-10">
                    L-{layer.symmetryLock}
                  </span>

                  {/* Dynamic Pulse Sync Badge */}
                  <span className={`block text-[7.5px] sm:text-[8.5px] font-mono font-bold mt-1 px-1 py-0.2 rounded relative z-10 ${
                    isSynchronized
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      : isLayerActive
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                      : 'bg-rose-950/60 text-rose-400 border border-rose-800/30'
                  }`}>
                    {isSynchronized ? '918ms' : isLayerActive ? 'SYNC' : 'OFF'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono">
          {activeTab === 'SIGNAL_FLOW' ? (
            /* Dedicated Real-time SVG M6 Interconnect Signal Flow Topology Graph */
            <div className="space-y-4">
              <M6SignalFlowGraph
                matrixState={matrixState}
                onToggleLayer={onToggleLayer}
                lang={lang}
              />
              <M6InterconnectStatus
                matrixState={matrixState}
                onToggleLayer={onToggleLayer}
                lang={lang}
              />
            </div>
          ) : activeTab === 'M6_STATUS' ? (
            /* Real-time M6 Interconnect Status Dashboard */
            <div className="space-y-4">
              <AdamHashSyncRateChart
                matrixState={matrixState}
                lang={lang}
                showControls={false}
                onExportSyncData={handleExportSyncData}
              />
              <M6SignalFlowGraph
                matrixState={matrixState}
                onToggleLayer={onToggleLayer}
                lang={lang}
              />
              <M6InterconnectStatus
                matrixState={matrixState}
                onToggleLayer={onToggleLayer}
                lang={lang}
              />
            </div>
          ) : activeTab === 'SYNC_CHART' ? (
            /* Dedicated AdamHash 918 Synchronization Success Rate Line Chart View */
            <div className="space-y-4">
              <AdamHashSyncRateChart
                matrixState={matrixState}
                lang={lang}
                showControls={true}
                onExportSyncData={handleExportSyncData}
              />
              <AdamHashDiagnosticPanel
                matrixState={matrixState}
                lang={lang}
                onToggleLayer={onToggleLayer}
                onExportSyncData={handleExportSyncData}
              />
            </div>
          ) : activeTab === 'DIAGNOSTICS' ? (
            /* Real-time AdamHash 918 Synchronization Timestamps & Diagnostics Panel */
            <div className="space-y-4">
              <AdamHashSyncRateChart
                matrixState={matrixState}
                lang={lang}
                showControls={true}
                onExportSyncData={handleExportSyncData}
              />
              <AdamHashDiagnosticPanel
                matrixState={matrixState}
                lang={lang}
                onToggleLayer={onToggleLayer}
                onExportSyncData={handleExportSyncData}
              />
            </div>
          ) : (
            /* 7 Layer Toggles (M1 - M7) */
            <div className="space-y-4">
              {/* SVG-based M6 Interconnect Signal Flow real-time graph with AdamHash 918 heartbeat */}
              <M6SignalFlowGraph
                matrixState={matrixState}
                onToggleLayer={onToggleLayer}
                lang={lang}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {INITIAL_HEPTAGONAL_LAYERS.map((layer) => {
                  const isEnabled = matrixState.layers[layer.level];
                  const isM6Active = matrixState.layers['M6'];
                  const isIntegratedWithM6 = isEnabled && (layer.level === 'M6' ? isM6Active : isM6Active);

                  return (
                    <div
                      key={layer.level}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 relative overflow-hidden ${
                        isEnabled
                          ? `${layer.bgClass} ${layer.borderClass} shadow-md ring-1 ring-cyan-500/20`
                          : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl shadow-inner shrink-0 relative ${
                            isEnabled
                              ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-300'
                              : 'bg-slate-950 border-slate-800 text-slate-600'
                          }`}>
                            {layer.icon}
                            {/* Live Heartbeat Sync Indicator Dot */}
                            {isIntegratedWithM6 && (
                              <span
                                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping"
                                style={{ animationDuration: '0.918s' }}
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-extrabold text-sm ${isEnabled ? layer.colorClass : 'text-slate-500'}`}>
                                [{layer.code}]
                              </span>
                              <span className="px-1.5 py-0.2 rounded bg-black/60 border border-slate-800 text-[10px] text-slate-400 font-mono">
                                Lock {layer.symmetryLock}
                              </span>
                              {isIntegratedWithM6 && (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] text-emerald-300 font-mono font-bold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  918ms
                                </span>
                              )}
                            </div>
                            <h4 className={`text-xs font-bold mt-0.5 ${isEnabled ? 'text-slate-200' : 'text-slate-500'}`}>
                              {isAr ? layer.nameAr : layer.nameEn}
                            </h4>
                          </div>
                        </div>

                        {/* Master Switch for each layer */}
                        <button
                          onClick={() => onToggleLayer(layer.level)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              isEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Layer Details */}
                      <p className="text-[11px] text-slate-400 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-slate-800/80">
                        {isAr ? layer.descriptionAr : layer.descriptionEn}
                      </p>

                      {/* M6 Interconnect Guard Integration Bar */}
                      <div className="p-2 rounded-xl bg-black/60 border border-slate-800/90 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Activity className={`w-3.5 h-3.5 ${isIntegratedWithM6 ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} style={isIntegratedWithM6 ? { animationDuration: '0.918s' } : undefined} />
                          {isAr ? 'حراسة M6:' : 'M6 Guard:'}
                        </span>
                        <span className={`font-bold ${
                          isIntegratedWithM6
                            ? 'text-emerald-400'
                            : isEnabled
                            ? 'text-cyan-400'
                            : 'text-rose-400/80'
                        }`}>
                          {isIntegratedWithM6
                            ? (isAr ? '✓ متزامن بنبض 918ms' : '✓ SYNCHRONIZED (918ms)')
                            : isEnabled
                            ? (isAr ? 'في انتظار محور M6' : 'Awaiting M6 Hub')
                            : (isAr ? '✗ مفصول عن المنظومة' : '✗ DESYNCHRONIZED')}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" />
                          {isAr ? 'المساهمة في الأمان:' : 'Power Weight:'} +{layer.powerContribution}%
                        </span>
                        <span className={`font-bold ${isEnabled ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {isEnabled ? (isAr ? 'مقفلة ومحمية' : 'SEALED & ACTIVE') : (isAr ? 'معطلة' : 'DISARMED')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Realtime AdamHash Lock Info */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    {isAr ? 'البصمة الحية لنظام التناظر (Live AdamHash 918 Status):' : 'Live AdamHash 918 Status:'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(matrixState.adamHashIntegrity, 'matrixHash')}
                    className="px-2 py-0.5 rounded bg-black hover:bg-slate-800 border border-slate-700 text-[10px] text-cyan-300 flex items-center gap-1"
                  >
                    {copiedKey === 'matrixHash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'matrixHash' ? 'تم النسخ' : 'نسخ القفل'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-black text-cyan-400 border border-slate-800 text-[11px] break-all select-all">
                  {matrixState.adamHashIntegrity} • Mode: {matrixState.globalEncryptionType}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'المصفوفة السبعية تتحكم بجميع بروتوكولات وتشفيرات البريد' : 'Heptagonal Matrix dynamically controls global security'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSyncData}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isExported
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-cyan-300'
              }`}
              title={isAr ? 'تنزيل سجلات وبيانات التزامن كملف JSON' : 'Download AdamHash 918 Sync Data JSON file'}
            >
              {isExported ? <Check className="w-3.5 h-3.5" /> : <FileDown className="w-3.5 h-3.5" />}
              <span>{isExported ? (isAr ? 'تم تصدير JSON ✓' : 'JSON Exported ✓') : (isAr ? 'تصدير بيانات التزامن (JSON)' : 'Export Sync Data (JSON)')}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors shadow-md"
            >
              {isAr ? 'إغلاق وحدة التحكم' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
