import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  Lock,
  Unlock,
  Radio,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Shield,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';
import { LayerLevel, HeptagonalMatrixState, INITIAL_HEPTAGONAL_LAYERS } from '../data/heptagonalMatrixEngine';

interface M6SignalFlowGraphProps {
  matrixState: HeptagonalMatrixState;
  onToggleLayer?: (level: LayerLevel) => void;
  lang?: 'ar' | 'en';
}

export const M6SignalFlowGraph: React.FC<M6SignalFlowGraphProps> = ({
  matrixState,
  onToggleLayer,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';
  const isM6Active = matrixState.layers['M6'];
  const activeCount = matrixState.activeLayerCount;
  const [selectedNode, setSelectedNode] = useState<LayerLevel | 'M6'>('M6');
  const [pulseTick, setPulseTick] = useState<number>(0);

  // Interval for heartbeat tick state
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 1000);
    }, 918); // Exact 918ms AdamHash heartbeat cycle
    return () => clearInterval(timer);
  }, []);

  // Geometry for 7-Point Heptagonal Star Topology in SVG
  // Center is M6 (x=240, y=145), surrounding 6 nodes (M7, M5, M4, M3, M2, M1)
  const peripheralLayers: LayerLevel[] = ['M7', 'M5', 'M4', 'M3', 'M2', 'M1'];
  const centerX = 240;
  const centerY = 145;
  const radius = 105;

  const nodeCoordinates: Record<LayerLevel, { x: number; y: number; angle: number }> = {
    M7: { x: centerX + radius * Math.cos(-Math.PI / 2), y: centerY + radius * Math.sin(-Math.PI / 2), angle: -90 }, // Top
    M5: { x: centerX + radius * Math.cos(-Math.PI / 6), y: centerY + radius * Math.sin(-Math.PI / 6), angle: -30 }, // Top-Right
    M4: { x: centerX + radius * Math.cos(Math.PI / 6), y: centerY + radius * Math.sin(Math.PI / 6), angle: 30 },   // Bottom-Right
    M3: { x: centerX + radius * Math.cos(Math.PI / 2), y: centerY + radius * Math.sin(Math.PI / 2), angle: 90 },   // Bottom
    M2: { x: centerX + radius * Math.cos((5 * Math.PI) / 6), y: centerY + radius * Math.sin((5 * Math.PI) / 6), angle: 150 }, // Bottom-Left
    M1: { x: centerX + radius * Math.cos((-5 * Math.PI) / 6), y: centerY + radius * Math.sin((-5 * Math.PI) / 6), angle: -150 }, // Top-Left
    M6: { x: centerX, y: centerY, angle: 0 } // Sovereign Hub Center
  };

  const selectedLayerData = INITIAL_HEPTAGONAL_LAYERS.find((l) => l.level === selectedNode);

  return (
    <div className="rounded-2xl bg-slate-950 border border-cyan-500/40 p-3 sm:p-4 space-y-3 font-mono shadow-2xl">
      {/* Embedded CSS Keyframes for SVG real-time signal flow and AdamHash 918 heartbeat */}
      <style>{`
        @keyframes adamHashHeartbeat {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.4));
          }
          15% {
            transform: scale(1.09);
            filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.9)) drop-shadow(0 0 24px rgba(6, 182, 212, 0.6));
          }
          28% {
            transform: scale(0.97);
            filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.5));
          }
          40% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8));
          }
          60% {
            transform: scale(1);
            filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.4));
          }
        }

        @keyframes layerHeartbeatPulse {
          0% {
            transform: scale(1);
            opacity: 0.85;
            filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.4));
          }
          18% {
            transform: scale(1.07);
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.85)) drop-shadow(0 0 14px rgba(16, 185, 129, 0.6));
          }
          32% {
            transform: scale(0.98);
            opacity: 0.9;
          }
          45% {
            transform: scale(1.04);
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
          }
          100% {
            transform: scale(1);
            opacity: 0.85;
            filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.4));
          }
        }

        @keyframes layerDesyncPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.55;
            transform: scale(0.98);
          }
        }

        @keyframes signalFlowDash {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulsePacketFlight {
          0% {
            offset-distance: 0%;
            opacity: 0.1;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0.2;
          }
        }

        @keyframes ringPulseWave {
          0% {
            r: 28px;
            opacity: 0.85;
            stroke-width: 2.5px;
          }
          100% {
            r: 68px;
            opacity: 0;
            stroke-width: 0.4px;
          }
        }

        @keyframes ecgScan {
          0% {
            stroke-dashoffset: 600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes waveSignalRipple {
          0% {
            transform: scale(0.9);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .anim-heartbeat-hub {
          animation: adamHashHeartbeat 0.918s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          transform-origin: 240px 145px;
        }

        .anim-pulse-wave {
          animation: ringPulseWave 0.918s ease-out infinite;
          transform-origin: 240px 145px;
        }

        .anim-signal-active {
          animation: signalFlowDash 1.2s linear infinite;
        }

        .anim-layer-heartbeat {
          animation: layerHeartbeatPulse 0.918s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        .anim-layer-desync {
          animation: layerDesyncPulse 1.836s ease-in-out infinite;
        }

        .anim-ecg-heartbeat {
          stroke-dasharray: 600;
          animation: ecgScan 1.836s linear infinite;
        }
      `}</style>

      {/* Top Header of the Graph */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border font-bold transition-all ${
            isM6Active
              ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-inner shadow-cyan-500/20'
              : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
          }`}>
            <Workflow className={`w-4 h-4 ${isM6Active ? 'animate-spin' : ''}`} style={{ animationDuration: '9.18s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-cyan-200">
                {isAr ? 'مخطط تدفق إشارات الربط البيني M6 (SVG M6 Signal Flow Graph)' : 'SVG M6 Interconnect Signal Flow Topology Graph'}
              </h4>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                CSS 918ms Keyframes
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              {isAr ? 'عرض تناظر إشارات الطبقات السبع اللحظي والتزامن بنبضات قلب AdamHash 918' : 'Real-time 7-layer signal flow & AdamHash 918 sync heartbeat with CSS keyframes'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-black border border-slate-700 text-cyan-300 font-bold flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isM6Active ? 'bg-cyan-400 animate-ping' : 'bg-rose-500'}`} />
            Lock 616 Hub
          </span>
          <span className={`px-2 py-0.5 rounded border font-bold ${
            isM6Active ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' : 'bg-rose-950 text-rose-400 border-rose-500/40'
          }`}>
            {isM6Active ? (isAr ? 'التزامن: 918ms محكم' : 'SYNC: 918ms NOMINAL') : (isAr ? 'التزامن: معطل' : 'SYNC: BROKEN')}
          </span>
        </div>
      </div>

      {/* Main Interactive SVG Signal Topology Canvas */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800 p-2 overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334410_1px,transparent_1px),linear-gradient(to_bottom,#08334410_1px,transparent_1px)] bg-[size:16px_16px]" />

        <svg
          viewBox="0 0 480 290"
          className="w-full max-w-[500px] h-auto select-none overflow-visible z-10"
        >
          <defs>
            {/* Center Hub Glow Filter */}
            <filter id="m6GlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radial gradient for central M6 node */}
            <radialGradient id="m6HubGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#083344" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </radialGradient>

            {/* Gradient for active spoke links */}
            <linearGradient id="activeSpokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0e7490" stopOpacity="0.2" />
            </linearGradient>

            {/* Gradients for node states */}
            <linearGradient id="nodeActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Interconnect Bus Peripheral Star/Ring Lines connecting outer nodes */}
          {peripheralLayers.map((lvl, idx) => {
            const nextLvl = peripheralLayers[(idx + 1) % peripheralLayers.length];
            const p1 = nodeCoordinates[lvl];
            const p2 = nodeCoordinates[nextLvl];
            const isPairActive = matrixState.layers[lvl] && matrixState.layers[nextLvl];

            return (
              <line
                key={`ring-${lvl}-${nextLvl}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isPairActive ? '#0284c7' : '#1e293b'}
                strokeWidth={isPairActive ? '1.5' : '1'}
                strokeDasharray={isPairActive ? '4 3' : '2 4'}
                strokeOpacity={isPairActive ? 0.6 : 0.25}
                className={isPairActive && isM6Active ? 'anim-signal-active' : undefined}
              />
            );
          })}

          {/* Radial Spokes: Connecting Each Layer (M1-M7 except M6) to Central Hub (M6) */}
          {peripheralLayers.map((lvl) => {
            const coord = nodeCoordinates[lvl];
            const isLayerActive = matrixState.layers[lvl];
            const isFlowing = isM6Active && isLayerActive;

            return (
              <g key={`spoke-${lvl}`}>
                {/* Spoke Base Track */}
                <line
                  x1={coord.x}
                  y1={coord.y}
                  x2={centerX}
                  y2={centerY}
                  stroke={isFlowing ? 'url(#activeSpokeGradient)' : '#334155'}
                  strokeWidth={isFlowing ? '2.5' : '1'}
                  strokeOpacity={isFlowing ? 0.85 : 0.25}
                  strokeDasharray={isFlowing ? '6 3' : undefined}
                  className={isFlowing ? 'anim-signal-active' : undefined}
                />

                {/* Flowing Signal Particles (Bidirectional Synchronizer Packets) */}
                {isFlowing && (
                  <>
                    <circle
                      r="3.5"
                      fill="#38bdf8"
                      filter="url(#m6GlowFilter)"
                    >
                      <animateMotion
                        path={`M ${coord.x},${coord.y} L ${centerX},${centerY}`}
                        dur="0.918s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      r="2.5"
                      fill="#a5f3fc"
                      opacity="0.8"
                    >
                      <animateMotion
                        path={`M ${centerX},${centerY} L ${coord.x},${coord.y}`}
                        dur="1.836s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}
              </g>
            );
          })}

          {/* Central Hub M6 Node (With CSS Keyframe Heartbeat & Pulse Waves) */}
          <g
            className={`cursor-pointer transition-transform duration-200 ${isM6Active ? 'anim-heartbeat-hub' : ''}`}
            onClick={() => setSelectedNode('M6')}
          >
            {/* CSS Keyframe Animated Radar Pulse Wave */}
            {isM6Active && (
              <>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="28"
                  fill="none"
                  stroke="#22d3ee"
                  className="anim-pulse-wave"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="28"
                  fill="none"
                  stroke="#38bdf8"
                  className="anim-pulse-wave"
                  style={{ animationDelay: '0.459s' }}
                />
              </>
            )}

            {/* Hub Base Body */}
            <circle
              cx={centerX}
              cy={centerY}
              r="29"
              fill="url(#m6HubGradient)"
              stroke={isM6Active ? '#22d3ee' : '#f43f5e'}
              strokeWidth={isM6Active ? '2.5' : '1.5'}
              filter={isM6Active ? 'url(#m6GlowFilter)' : undefined}
            />

            {/* Hub Labeling */}
            <text
              x={centerX}
              y={centerY - 4}
              textAnchor="middle"
              fill="#ecfeff"
              fontSize="11.5"
              fontWeight="900"
              letterSpacing="0.5"
            >
              M6
            </text>
            <text
              x={centerX}
              y={centerY + 9}
              textAnchor="middle"
              fill={isM6Active ? '#a5f3fc' : '#fda4af'}
              fontSize="7.5"
              fontWeight="bold"
            >
              {isM6Active ? 'HUB: 616' : 'DISARMED'}
            </text>
            <text
              x={centerX}
              y={centerY + 18}
              textAnchor="middle"
              fill="#38bdf8"
              fontSize="6"
              fontWeight="bold"
              opacity={isM6Active ? '0.9' : '0.4'}
            >
              918 BPM
            </text>
          </g>

          {/* Peripheral Layer Nodes (M7, M5, M4, M3, M2, M1) with Activation Indicators & Per-Layer Heartbeat */}
          {peripheralLayers.map((lvl, index) => {
            const coord = nodeCoordinates[lvl];
            const cfg = INITIAL_HEPTAGONAL_LAYERS.find((l) => l.level === lvl)!;
            const isLayerActive = matrixState.layers[lvl];
            const isSelected = selectedNode === lvl;
            const isIntegratedWithM6 = isLayerActive && isM6Active;

            // Staggered heartbeat animation delay per layer (propagating outward from M6)
            const layerHeartbeatDelay = `${(index * 0.13).toFixed(2)}s`;

            return (
              <g
                key={`node-${lvl}`}
                className={`cursor-pointer transition-all duration-300 ${
                  isIntegratedWithM6
                    ? 'anim-layer-heartbeat'
                    : isLayerActive
                    ? 'opacity-80'
                    : 'anim-layer-desync'
                }`}
                style={{
                  transformOrigin: `${coord.x}px ${coord.y}px`,
                  animationDelay: isIntegratedWithM6 ? layerHeartbeatDelay : undefined
                }}
                onClick={() => setSelectedNode(lvl)}
              >
                {/* Selection Ring */}
                {isSelected && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                )}

                {/* Per-Layer AdamHash 918 Radar Ripple when integrated with M6 */}
                {isIntegratedWithM6 && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="18"
                    fill="none"
                    stroke="#22d3ee"
                    className="anim-pulse-wave"
                    style={{ animationDelay: layerHeartbeatDelay }}
                  />
                )}

                {/* Node Outer Glow for Active Layers */}
                {isLayerActive && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="19"
                    fill="none"
                    stroke={isM6Active ? '#06b6d4' : '#64748b'}
                    strokeWidth="1.5"
                    strokeOpacity={isIntegratedWithM6 ? 0.75 : 0.3}
                  />
                )}

                {/* Node Body with dynamic color opacity and drop shadow */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="18"
                  fill="url(#nodeActiveGradient)"
                  stroke={
                    isLayerActive
                      ? isSelected
                        ? '#38bdf8'
                        : isIntegratedWithM6
                        ? '#10b981'
                        : '#0891b2'
                      : '#e11d48'
                  }
                  strokeWidth={isLayerActive ? '2.2' : '1.2'}
                  opacity={isLayerActive ? 1 : 0.4}
                />

                {/* Layer Code & Lock */}
                <text
                  x={coord.x}
                  y={coord.y - 2}
                  textAnchor="middle"
                  fill={isLayerActive ? (isIntegratedWithM6 ? '#ecfeff' : '#cbd5e1') : '#64748b'}
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  {lvl}
                </text>
                <text
                  x={coord.x}
                  y={coord.y + 9}
                  textAnchor="middle"
                  fill={isLayerActive ? (isIntegratedWithM6 ? '#34d399' : '#38bdf8') : '#94a3b8'}
                  fontSize="6.5"
                  fontWeight="bold"
                >
                  {cfg.symmetryLock}
                </text>

                {/* Status Ping Dot Indicator with Pulsing Beat */}
                <circle
                  cx={coord.x + 13}
                  cy={coord.y - 13}
                  r="3.5"
                  fill={isLayerActive ? (isIntegratedWithM6 ? '#10b981' : '#06b6d4') : '#f43f5e'}
                />
                {isIntegratedWithM6 && (
                  <circle
                    cx={coord.x + 13}
                    cy={coord.y - 13}
                    r="5"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.2"
                    className="animate-ping"
                    style={{ animationDuration: '0.918s' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Per-Layer AdamHash 918 Heartbeat Sync Indicators Strip */}
        <div className="w-full mt-2 grid grid-cols-7 gap-1 z-10">
          {INITIAL_HEPTAGONAL_LAYERS.map((l, i) => {
            const isLvlActive = matrixState.layers[l.level];
            const isLvlIntegrated = isLvlActive && (l.level === 'M6' ? true : isM6Active);
            const isSelected = selectedNode === l.level;

            return (
              <button
                key={l.level}
                onClick={() => setSelectedNode(l.level)}
                className={`p-1 rounded-lg border text-center transition-all ${
                  isSelected ? 'ring-1 ring-cyan-400' : ''
                } ${
                  isLvlIntegrated
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : isLvlActive
                    ? 'bg-cyan-950/40 border-cyan-700/40 text-cyan-400'
                    : 'bg-rose-950/30 border-rose-800/40 text-rose-400/60 opacity-50'
                }`}
                title={`Layer ${l.level}: ${isLvlIntegrated ? 'AdamHash 918ms SYNCHRONIZED' : 'DESYNCHRONIZED'}`}
              >
                <div className="flex items-center justify-center gap-0.5">
                  <span className="text-[10px] font-bold">{l.level}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLvlIntegrated
                        ? 'bg-emerald-400 animate-pulse'
                        : isLvlActive
                        ? 'bg-cyan-400'
                        : 'bg-rose-500'
                    }`}
                    style={isLvlIntegrated ? { animationDuration: '0.918s' } : undefined}
                  />
                </div>
                <span className="text-[7.5px] block font-mono">
                  {isLvlIntegrated ? '918ms' : isLvlActive ? 'WAIT' : 'OFF'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Floating Card Inside Graph Canvas with M6 Integration Verification */}
        {selectedLayerData && (
          <div className="w-full mt-2 p-2.5 rounded-xl bg-black/85 border border-slate-800 text-[11px] flex items-center justify-between flex-wrap gap-2 z-10">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{selectedLayerData.icon}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold ${selectedLayerData.colorClass}`}>
                    [{selectedLayerData.code}] {isAr ? selectedLayerData.nameAr : selectedLayerData.nameEn}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-[9px] text-cyan-300">
                    Lock {selectedLayerData.symmetryLock}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">
                    {isAr ? selectedLayerData.titleAr : selectedLayerData.titleEn}
                  </span>
                  <span className="text-[9px] text-slate-500">•</span>
                  <span className={`text-[9px] font-bold ${
                    matrixState.layers[selectedLayerData.level] && isM6Active
                      ? 'text-emerald-400'
                      : matrixState.layers[selectedLayerData.level]
                      ? 'text-cyan-400'
                      : 'text-rose-400'
                  }`}>
                    {matrixState.layers[selectedLayerData.level] && isM6Active
                      ? (isAr ? '✓ متكامل مع حراسة M6 (تزامن 918ms)' : '✓ M6 Guard Integrated (918ms Sync)')
                      : matrixState.layers[selectedLayerData.level]
                      ? (isAr ? 'عقدة نشطة (في انتظار M6)' : 'Active (Awaiting M6 Hub)')
                      : (isAr ? '✗ غير متكامل (معطلة)' : '✗ Disconnected / Disarmed')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onToggleLayer && selectedLayerData.level !== 'M6' && (
                <button
                  onClick={() => onToggleLayer(selectedLayerData.level)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    matrixState.layers[selectedLayerData.level]
                      ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border-rose-500/40'
                      : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {matrixState.layers[selectedLayerData.level] ? (isAr ? 'تعطيل الطبقة' : 'Disarm') : (isAr ? 'تفعيل ومزامنة' : 'Arm & Sync')}
                </button>
              )}
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                matrixState.layers[selectedLayerData.level]
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-950 text-rose-300 border-rose-500/40'
              }`}>
                {matrixState.layers[selectedLayerData.level] ? 'ACTIVE (918ms)' : 'DISARMED'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* AdamHash 918 ECG Real-time Heartbeat Waveform Visualizer */}
      <div className="p-3.5 rounded-xl bg-black/90 border border-cyan-500/30 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-200">
              {isAr ? 'مؤشر نبض التحقق الحي (AdamHash 918 Verification Heartbeat):' : 'AdamHash 918 Verification Heartbeat (ECG Canvas):'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-slate-400">Heartbeat Interval: <strong className="text-cyan-300">918ms</strong></span>
            <span className={`px-2 py-0.5 rounded-full font-bold border ${
              isM6Active && activeCount === 7
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : isM6Active
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                : 'bg-rose-950 text-rose-300 border-rose-500/40'
            }`}>
              {isM6Active ? (isAr ? 'الإيقاع: تزامن 616 محكم' : 'RHYTHM: LOCK 616 NOMINAL') : (isAr ? 'انقطاع النبض' : 'DESYNCHRONIZED')}
            </span>
          </div>
        </div>

        {/* ECG Waveform Canvas SVG */}
        <div className="relative w-full h-12 bg-slate-950 rounded-xl border border-slate-800/90 overflow-hidden flex items-center shadow-inner">
          {/* Heartbeat Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334420_1px,transparent_1px),linear-gradient(to_bottom,#08334420_1px,transparent_1px)] bg-[size:12px_12px]" />

          <svg className="w-full h-full z-10" preserveAspectRatio="none" viewBox="0 0 480 44">
            <defs>
              <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Continuous Heartbeat ECG Path */}
            <path
              d="M 0,22 L 40,22 L 50,18 L 60,26 L 70,22 L 100,22 L 110,14 L 118,34 L 126,2 L 134,38 L 142,16 L 152,22 L 180,22 L 195,16 L 210,22 L 250,22 L 260,18 L 270,26 L 280,22 L 310,22 L 320,14 L 328,34 L 336,2 L 344,38 L 352,16 L 362,22 L 390,22 L 405,16 L 420,22 L 480,22"
              fill="none"
              stroke={isM6Active ? 'url(#ecgGrad)' : '#f43f5e'}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isM6Active ? 'anim-ecg-heartbeat' : undefined}
            />
          </svg>
        </div>

        {/* Vital Heartbeat Info Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-cyan-400" />
            {isAr ? 'التردد الكوانتي:' : 'Lattice Integrity:'} <strong className="text-cyan-300 font-mono">Quantum Ring-LWE 256</strong>
          </span>
          <span className="font-mono text-slate-300">
            AdamHash Parity: <span className="text-emerald-400 font-bold">{matrixState.adamHashIntegrity}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
