import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend
} from 'recharts';
import {
  Activity,
  TrendingUp,
  ShieldCheck,
  AlertOctagon,
  Clock,
  Zap,
  Layers,
  RotateCcw,
  Sparkles,
  BarChart2,
  Download
} from 'lucide-react';
import {
  LayerLevel,
  HeptagonalMatrixState,
  INITIAL_HEPTAGONAL_LAYERS
} from '../data/heptagonalMatrixEngine';

interface SyncDataPoint {
  time: string;
  timestamp: number;
  successRate: number; // 0 - 100 %
  latencyMs: number;
  activeLayers: number;
  m6HubRate: number;
  threshold: number;
}

interface AdamHashSyncRateChartProps {
  matrixState: HeptagonalMatrixState;
  lang?: 'ar' | 'en';
  showControls?: boolean;
  onExportSyncData?: () => void;
}

export const AdamHashSyncRateChart: React.FC<AdamHashSyncRateChartProps> = ({
  matrixState,
  lang = 'ar',
  showControls = true,
  onExportSyncData
}) => {
  const isAr = lang === 'ar';
  const isM6Active = matrixState.layers['M6'];
  const activeCount = matrixState.activeLayerCount;

  const [dataPoints, setDataPoints] = useState<SyncDataPoint[]>([]);
  const [windowSize, setWindowSize] = useState<number>(30); // 20, 30, 60 points
  const [showLatency, setShowLatency] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Initialize initial history data
  useEffect(() => {
    const initial: SyncDataPoint[] = [];
    const now = Date.now();
    for (let i = 25; i >= 0; i--) {
      const pointTime = new Date(now - i * 918);
      const timeStr = `${pointTime.toTimeString().split(' ')[0].substring(3)}.${String(
        pointTime.getMilliseconds()
      ).padStart(3, '0').substring(0, 2)}`;

      const baseRate = isM6Active ? (activeCount === 7 ? 99.8 : 85 + activeCount * 2) : 15;
      const noise = (Math.random() * 0.4 - 0.2);
      const rate = Math.min(100, Math.max(0, +(baseRate + noise).toFixed(2)));

      initial.push({
        time: timeStr,
        timestamp: pointTime.getTime(),
        successRate: rate,
        latencyMs: +(Math.random() * 0.4 + 0.45).toFixed(2),
        activeLayers: activeCount,
        m6HubRate: isM6Active ? 100 : 0,
        threshold: 99.0
      });
    }
    setDataPoints(initial);
  }, []);

  // Update data stream every 918ms heartbeat
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0].substring(3)}.${String(
        now.getMilliseconds()
      ).padStart(3, '0').substring(0, 2)}`;

      // Calculate real rate based on active layers & M6 hub state
      let currentRate = 0;
      if (isM6Active) {
        // Base rate scales with number of active layers (7/7 -> 99.85%)
        const layerRatio = activeCount / 7;
        const base = layerRatio * 99.6;
        const jitter = (Math.random() * 0.5 - 0.25);
        currentRate = Math.min(100, Math.max(5, +(base + jitter).toFixed(2)));
      } else {
        currentRate = +(Math.random() * 8 + 4).toFixed(2);
      }

      const latency = isM6Active
        ? +(Math.random() * 0.35 + 0.4).toFixed(2)
        : +(Math.random() * 2.5 + 4.0).toFixed(2);

      const newPoint: SyncDataPoint = {
        time: timeStr,
        timestamp: now.getTime(),
        successRate: currentRate,
        latencyMs: latency,
        activeLayers: activeCount,
        m6HubRate: isM6Active ? 100 : 0,
        threshold: 99.0
      };

      setDataPoints((prev) => {
        const next = [...prev, newPoint];
        if (next.length > windowSize) {
          return next.slice(next.length - windowSize);
        }
        return next;
      });
    }, 918); // Exact 918ms AdamHash pulse

    return () => clearInterval(timer);
  }, [isPaused, isM6Active, activeCount, windowSize]);

  // Compute live statistics
  const latestPoint = dataPoints[dataPoints.length - 1];
  const currentSuccessRate = latestPoint ? latestPoint.successRate : (isM6Active ? 99.8 : 0);
  const avgSuccessRate = dataPoints.length
    ? +(dataPoints.reduce((acc, p) => acc + p.successRate, 0) / dataPoints.length).toFixed(2)
    : currentSuccessRate;
  const avgLatency = dataPoints.length
    ? +(dataPoints.reduce((acc, p) => acc + p.latencyMs, 0) / dataPoints.length).toFixed(2)
    : 0.65;

  const isNominal = currentSuccessRate >= 98.0 && isM6Active;
  const isDegraded = currentSuccessRate >= 60.0 && currentSuccessRate < 98.0;

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-cyan-500/60 p-2.5 rounded-xl shadow-2xl font-mono text-[11px] space-y-1">
          <div className="text-slate-400 border-b border-slate-800 pb-1 flex items-center justify-between gap-3">
            <span>{isAr ? 'الوقت:' : 'Timestamp:'}</span>
            <strong className="text-cyan-300">{label}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-emerald-400">
            <span>{isAr ? 'معدل التزامن (AdamHash):' : 'Sync Success Rate:'}</span>
            <strong className="font-bold">{payload[0]?.value}%</strong>
          </div>
          {showLatency && payload[1] && (
            <div className="flex items-center justify-between gap-4 text-cyan-300">
              <span>{isAr ? 'زمن الاستجابة:' : 'Latency:'}</span>
              <strong>{payload[1]?.value} ms</strong>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 text-slate-400 text-[10px]">
            <span>{isAr ? 'الطبقات النشطة:' : 'Active Layers:'}</span>
            <span className="text-slate-200">{activeCount} / 7</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-slate-950 border border-cyan-500/40 p-3.5 sm:p-4 space-y-3 font-mono shadow-2xl">
      {/* Header & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
            isNominal
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-inner'
              : isDegraded
              ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
              : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
          }`}>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-cyan-200">
                {isAr
                  ? 'مخطط معدل نجاح تزامن AdamHash 918 الزمني'
                  : 'AdamHash 918 Synchronization Success Rate Over Time'}
              </h4>
              <span className={`px-2 py-0.2 rounded text-[9px] font-bold border ${
                isNominal
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  : isDegraded
                  ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                  : 'bg-rose-950 text-rose-300 border-rose-500/40'
              }`}>
                {isNominal
                  ? (isAr ? 'تزامن مثالي 918ms' : 'NOMINAL (99.8%)')
                  : isDegraded
                  ? (isAr ? 'تزامن جزئي' : 'DEGRADED')
                  : (isAr ? 'انقطاع التزامن' : 'CRITICAL')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {isAr
                ? 'تتبع بياني مباشر لمعدل نجاح نبضات التناظر عبر الزمن واستقرار شبكة الربط M6'
                : 'Live time-series line chart monitoring AdamHash 918 heartbeat fidelity & parity stability'}
            </p>
          </div>
        </div>

        {/* Live Telemetry Pills */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="px-2.5 py-1 rounded-xl bg-black/80 border border-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-slate-400">{isAr ? 'المعدل اللحظي:' : 'Current Rate:'}</span>
            <strong className={`font-mono ${isNominal ? 'text-emerald-300' : isDegraded ? 'text-amber-300' : 'text-rose-400'}`}>
              {currentSuccessRate}%
            </strong>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-black/80 border border-slate-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-slate-400">{isAr ? 'المتوسط:' : 'Avg:'}</span>
            <strong className="text-cyan-300 font-mono">{avgSuccessRate}%</strong>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-black/80 border border-slate-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] text-slate-400">{isAr ? 'الكمون:' : 'Latency:'}</span>
            <strong className="text-slate-200 font-mono">{avgLatency}ms</strong>
          </div>
        </div>
      </div>

      {/* Chart Viewport */}
      <div className="relative w-full h-56 sm:h-64 bg-slate-950/80 rounded-xl border border-slate-800/90 p-2 sm:p-3 overflow-hidden shadow-inner">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:16px_16px]" />

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataPoints} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="syncRateStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
              <linearGradient id="latencyStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fontSize: 9, fill: '#64748b' }}
              tickLine={{ stroke: '#334155' }}
            />

            <YAxis
              domain={[0, 105]}
              stroke="#64748b"
              tick={{ fontSize: 9, fill: '#64748b' }}
              tickLine={{ stroke: '#334155' }}
              ticks={[0, 25, 50, 75, 99, 100]}
              unit="%"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Target 99% Threshold Reference Line */}
            <ReferenceLine
              y={99.0}
              stroke="#0891b2"
              strokeDasharray="4 4"
              strokeOpacity={0.7}
              label={{
                value: 'Target: 99.0%',
                fill: '#06b6d4',
                fontSize: 9,
                position: 'insideTopRight'
              }}
            />

            {/* Main Success Rate Line */}
            <Line
              type="monotone"
              dataKey="successRate"
              name={isAr ? 'معدل نجاح التزامن (%)' : 'Sync Success Rate (%)'}
              stroke="url(#syncRateStroke)"
              strokeWidth={2.5}
              dot={{ r: 2, fill: '#10b981', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#34d399', stroke: '#022c22', strokeWidth: 2 }}
              isAnimationActive={false}
            />

            {/* Optional Latency Line */}
            {showLatency && (
              <Line
                type="monotone"
                dataKey="latencyMs"
                name={isAr ? 'الكمون (ms)' : 'Latency (ms)'}
                stroke="url(#latencyStroke)"
                strokeWidth={1.5}
                strokeDasharray="3 2"
                dot={false}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Controls & Range Selector Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          {/* Range Options */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">{isAr ? 'نافذة التتبع:' : 'Window:'}</span>
            {[20, 30, 50].map((size) => (
              <button
                key={size}
                onClick={() => setWindowSize(size)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  windowSize === size
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {size} {isAr ? 'نبضة' : 'pulses'}
              </button>
            ))}
          </div>

          {/* Feature toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowLatency((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                showLatency
                  ? 'bg-sky-950 text-sky-300 border-sky-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {showLatency ? '✓ ' : ''}{isAr ? 'منحنى الكمون (Latency)' : 'Show Latency'}
            </button>

            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                isPaused
                  ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-cyan-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {isPaused ? (isAr ? 'استئناف' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}
            </button>

            {onExportSyncData && (
              <button
                onClick={onExportSyncData}
                className="px-2 py-0.5 rounded text-[10px] font-bold border bg-cyan-950/80 hover:bg-cyan-900 border-cyan-500/40 text-cyan-300 flex items-center gap-1 transition-colors"
                title={isAr ? 'تصدير بيانات التزامن كملف JSON' : 'Export AdamHash 918 Sync Data as JSON'}
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span>{isAr ? 'تصدير JSON' : 'Export JSON'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
