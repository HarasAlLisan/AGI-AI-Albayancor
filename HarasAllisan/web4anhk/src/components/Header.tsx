import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Shield,
  ShieldCheck, 
  Settings, 
  Users, 
  Sun, 
  Moon, 
  RotateCw,
  SlidersHorizontal,
  X,
  Server,
  Globe,
  Coins,
  Cpu,
  Wallet,
  Menu,
  ChevronDown,
  Fingerprint,
  Smartphone,
  Radio,
  Scale,
  Binary,
  Layers,
  Grid,
  Zap,
  Activity,
  Bot,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  GitCommit
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../types';
import { useUser } from '../context/UserContext';
import { GithubSyncStatus } from '../utils/githubSync';

interface HeaderProps {
  user?: UserProfile;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
  onOpenComposer: () => void;
  onOpenContacts: () => void;
  onOpenSettings: () => void;
  onOpenAnhkModal: () => void;
  onOpenWalletModal: () => void;
  onOpenSecurityAudit: () => void;
  onOpenSymbolicAlgebra: () => void;
  onOpenPoWCalculator?: () => void;
  onOpenM6GuardModal?: () => void;
  onOpenHeptagonalMatrixController?: () => void;
  onOpenNationalIdModal: () => void;
  onOpenPhoneNetwork?: () => void;
  onOpenDisarmamentModal?: () => void;
  onOpenLatticeMatrix?: () => void;
  onOpenExovawareHub?: () => void;
  onOpenSocialAnhk?: () => void;
  onOpenHarisAlLisan?: () => void;
  onOpenGithubSync?: () => void;
  onOpenGithubDashboard?: () => void;
  onOpen195Countries?: () => void;
  onOpenNodeCluster?: () => void;
  githubSyncStatus?: GithubSyncStatus;
  onReverifyGithub?: () => Promise<void>;
  onRefresh: () => void;
  isRefreshing: boolean;
  activeFilterLabel: string | null;
  setActiveFilterLabel: (label: string | null) => void;
  unreadCount: number;
  onToggleMobileSidebar?: () => void;
  activeLayerCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  user: propUser,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  lang,
  setLang,
  onOpenComposer,
  onOpenContacts,
  onOpenSettings,
  onOpenAnhkModal,
  onOpenWalletModal,
  onOpenSecurityAudit,
  onOpenSymbolicAlgebra,
  onOpenPoWCalculator,
  onOpenM6GuardModal,
  onOpenHeptagonalMatrixController,
  onOpenNationalIdModal,
  onOpenPhoneNetwork,
  onOpenDisarmamentModal,
  onOpenLatticeMatrix,
  onOpenExovawareHub,
  onOpenSocialAnhk,
  onOpenHarisAlLisan,
  onOpenGithubSync,
  onOpenGithubDashboard,
  onOpen195Countries,
  onOpenNodeCluster,
  githubSyncStatus,
  onReverifyGithub,
  onRefresh,
  isRefreshing,
  activeFilterLabel,
  setActiveFilterLabel,
  unreadCount,
  onToggleMobileSidebar,
  activeLayerCount = 7,
}) => {
  const { user: contextUser } = useUser();
  const user = propUser || contextUser;
  const isAr = lang === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGithubPopover, setShowGithubPopover] = useState(false);
  const [isManualVerifying, setIsManualVerifying] = useState(false);
  const githubPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (githubPopoverRef.current && !githubPopoverRef.current.contains(event.target as Node)) {
        setShowGithubPopover(false);
      }
    };
    if (showGithubPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGithubPopover]);

  const handleTriggerGithubSync = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOpenGithubSync) {
      onOpenGithubSync();
    } else if (onOpenHarisAlLisan) {
      onOpenHarisAlLisan();
    }
  };

  const handleManualVerify = async () => {
    if (onReverifyGithub) {
      setIsManualVerifying(true);
      try {
        await onReverifyGithub();
      } finally {
        setTimeout(() => setIsManualVerifying(false), 500);
      }
    }
  };

  const toggleNextTheme = () => {
    if (theme === 'dark-cyber') setTheme('dark-clean');
    else if (theme === 'dark-clean') setTheme('light-minimal');
    else setTheme('dark-cyber');
  };

  return (
    <header className="sticky top-0 z-40 flex flex-col border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-xl text-slate-100 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Upper Hologram Status Ribbon with Infinite Smooth Movement */}
      <div className="flex items-center overflow-hidden py-1 px-2 text-[10px] font-mono border-b border-cyan-500/15 bg-cyan-950/40 text-cyan-400/90 select-none">
        <div className={`flex items-center gap-6 ${isAr ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="flex items-center gap-1.5 font-bold text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>ANHK HOLOGRAPHIC OS v4.8</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>NIST PQC ML-KEM/DSA • 256-BIT ARMED</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-sky-300">
              <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
              <span>77M TOWERS MESH LIVE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">
              LOCK 616 • SYMMETRY STABLE (1/0 = 𓋹)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              LATENCY: <strong className="text-cyan-300">0.04 ms</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <GitBranch className="w-3 h-3 text-indigo-400" />
              <span>GITHUB: HarasAlLisan/AGI-AI-Albayancor</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-mono ${
                githubSyncStatus?.isConnected
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : githubSyncStatus?.state === 'checking'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
              }`}>
                {githubSyncStatus?.state === 'checking'
                  ? 'VERIFYING...'
                  : githubSyncStatus?.isConnected
                  ? `LIVE • ${githubSyncStatus.latestCommit?.sha || '5012247'}`
                  : 'DISCONNECTED'}
              </span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">
              SOVEREIGN OWNER: {user.name} ({user.email})
            </span>
          </div>

          {/* Repeat for seamless continuous scrolling loop */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="flex items-center gap-1.5 font-bold text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>ANHK HOLOGRAPHIC OS v4.8</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>NIST PQC ML-KEM/DSA • 256-BIT ARMED</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-sky-300">
              <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
              <span>77M TOWERS MESH LIVE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">
              LOCK 616 • SYMMETRY STABLE (1/0 = 𓋹)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              LATENCY: <strong className="text-cyan-300">0.04 ms</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <GitBranch className="w-3 h-3 text-indigo-400" />
              <span>GITHUB: HarasAlLisan/AGI-AI-Albayancor</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-mono ${
                githubSyncStatus?.isConnected
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : githubSyncStatus?.state === 'checking'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
              }`}>
                {githubSyncStatus?.state === 'checking'
                  ? 'VERIFYING...'
                  : githubSyncStatus?.isConnected
                  ? `LIVE • ${githubSyncStatus.latestCommit?.sha || '5012247'}`
                  : 'DISCONNECTED'}
              </span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">
              SOVEREIGN OWNER: {user.name} ({user.email})
            </span>
          </div>
        </div>
      </div>

      {/* Main Holographic Action Bar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 gap-2 overflow-x-auto custom-scrollbar">
        {/* Brand & Identity */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile Sidebar Hamburger */}
          <button
            id="btn-mobile-sidebar"
            onClick={onToggleMobileSidebar}
            className="md:hidden holo-btn-icon-sm bg-slate-900/90 border border-cyan-500/30 text-cyan-300 hover:text-white"
            title="القائمة الجانبية"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {/* Hologram Emblem */}
            <div 
              onClick={onOpenSecurityAudit}
              className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-white font-bold text-base sm:text-xl border border-cyan-400/40 cursor-pointer icon-hover-active flex-shrink-0"
              title={isAr ? 'فتح مركز تدقيق المعايير الأمنية والهوية' : 'Open Security & Cryptographic Audit Hub'}
            >
              <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">☥</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-xs sm:text-base tracking-tight bg-gradient-to-r from-cyan-300 via-sky-100 to-blue-300 bg-clip-text text-transparent whitespace-nowrap">
                  {isAr ? 'عنخ ميل السيادي' : 'ANHK SOVEREIGN'}
                </h1>
                <span 
                  onClick={onOpenSecurityAudit}
                  className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 items-center gap-1 cursor-pointer transition-all"
                  title={isAr ? 'تدقيق معايير RFC و ICANN' : 'RFC & ICANN Audit'}
                >
                  <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
                  RFC/PQC
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <Server className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                <span className="text-cyan-400/90 hover:underline cursor-pointer truncate max-w-[100px] sm:max-w-[180px]" onClick={onOpenSecurityAudit}>
                  {user.domain}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hologram Central Search Console */}
        <div className="relative flex-1 max-w-sm hidden xl:block">
          <div className="relative flex items-center">
            <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} w-3.5 h-3.5 text-cyan-400/70`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث في الرسائل المشفرة، بيت المال، أو العقد..."
                  : "Search encrypted ledger, sender, subject..."
              }
              className={`w-full ${isAr ? 'pr-9 pl-12' : 'pl-9 pr-12'} h-9 text-xs rounded-xl bg-slate-900/70 border border-cyan-500/25 focus:border-cyan-400 focus:bg-slate-900/90 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] text-slate-200 placeholder-slate-500 outline-none transition-all font-sans`}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isAr ? 'left-2.5' : 'right-2.5'} p-1 text-slate-400 hover:text-white`}
              >
                <X className="w-3 h-3" />
              </button>
            ) : (
              <span className={`absolute ${isAr ? 'left-2.5' : 'right-2.5'} text-[9px] font-mono text-cyan-400/50 px-1 py-0.5 rounded border border-cyan-500/20`}>
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Modern Administrative Clusters (تنظيم إداري هيكلي سليم مع فواصل واضحة) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap flex-shrink-0">
          
          {/* GROUP 1: إدارة النواة والذكاء الاصطناعي السيادي (Core AI & Sovereign Sync) */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-sm">
            {/* Haris Al-Lisan AGI AI Al-Bayan Core Button */}
            {onOpenHarisAlLisan && (
            <button
              id="btn-open-haris-al-lisan"
              onClick={onOpenHarisAlLisan}
              className="holo-btn bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600 hover:from-purple-600 hover:to-cyan-500 text-white border border-purple-300/60 shadow-[0_0_15px_rgba(168,85,247,0.35)] flex-shrink-0"
              title={isAr ? 'نموذج حارس اللسان بلسان آدم بقوة البيان (web4anhk / Agi ai albayancor - دستور ٦٢٣٦)' : 'Tongue Guardian AGI Core (Al-Bayan)'}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">{isAr ? 'حارس اللسان (AGI)' : 'Al-Bayan AGI'}</span>
              <span className="hidden xl:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-purple-200 border border-purple-400/30">
                دستور ٦٢٣٦
              </span>
            </button>
          )}

          {/* GitHub Sovereign Repo Synchronization Status Indicator */}
          <div className="relative flex items-center" ref={githubPopoverRef}>
            <div
              className={`flex items-center rounded-xl font-mono text-xs transition-all shadow-sm flex-shrink-0 border ${
                githubSyncStatus?.isConnected
                  ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : githubSyncStatus?.state === 'checking'
                  ? 'bg-slate-900/90 border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900/90 border-rose-500/50 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
              }`}
            >
              {/* Direct Action Trigger: Clicking this opens the full GitHub Sync Hub immediately */}
              <button
                id="btn-open-github-sync-header"
                onClick={handleTriggerGithubSync}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-l-xl hover:bg-slate-800/80 transition-colors group cursor-pointer"
                title={
                  isAr
                    ? `فتح مركز المزامنة السيادية: HarasAlLisan/AGI-AI-Albayancor (${
                        githubSyncStatus?.isConnected ? 'متصل 200 OK' : 'جار التحقق...'
                      })`
                    : `Open GitHub Sync: HarasAlLisan/AGI-AI-Albayancor`
                }
              >
                {/* Dynamic Animated Status Beacon */}
                <div className="relative flex items-center justify-center">
                  <GitBranch
                    className={`w-3.5 h-3.5 transition-transform ${
                      isManualVerifying || githubSyncStatus?.state === 'checking'
                        ? 'animate-spin text-amber-400'
                        : githubSyncStatus?.isConnected
                        ? 'text-emerald-400 group-hover:scale-110'
                        : 'text-rose-400'
                    }`}
                  />
                  {githubSyncStatus?.isConnected && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>

                {/* Title / Label */}
                <div className="flex flex-col text-left leading-tight hidden lg:flex">
                  <span className="text-[9px] text-slate-400 font-mono tracking-wider">
                    GITHUB SYNC
                  </span>
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-emerald-300 truncate max-w-[120px]">
                    AGI-AI-Albayancor
                  </span>
                </div>

                {/* Quick Status Pill */}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold flex items-center gap-1 border ${
                    githubSyncStatus?.isConnected
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : githubSyncStatus?.state === 'checking'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      githubSyncStatus?.isConnected
                        ? 'bg-emerald-400 animate-pulse'
                        : githubSyncStatus?.state === 'checking'
                        ? 'bg-amber-400 animate-ping'
                        : 'bg-rose-400'
                    }`}
                  />
                  <span>
                    {isManualVerifying || githubSyncStatus?.state === 'checking'
                      ? (isAr ? 'فحص...' : 'Checking...')
                      : githubSyncStatus?.isConnected
                      ? (githubSyncStatus.latestCommit?.sha || '5012247')
                      : (isAr ? 'منقطع' : 'Offline')}
                  </span>
                </span>
              </button>

              {/* Toggle Dropdown Popover */}
              <button
                id="btn-toggle-github-popover"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGithubPopover(!showGithubPopover);
                }}
                className="px-1.5 py-1.5 hover:bg-slate-800/80 rounded-r-xl border-l border-slate-800/80 text-slate-400 hover:text-white transition-colors"
                title={isAr ? 'عرض فحص الاتصال والتفاصيل السريعة' : 'Toggle Quick Connection Telemetry'}
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showGithubPopover ? 'rotate-180 text-cyan-300' : ''
                  }`}
                />
              </button>
            </div>

            {/* Detailed Flyout Popover */}
            {showGithubPopover && (
              <div
                className={`absolute top-full mt-2 ${
                  isAr ? 'left-0 sm:left-auto sm:right-0' : 'right-0 sm:right-auto sm:left-0'
                } w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-200 font-sans`}
              >
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>HarasAlLisan/AGI-AI-Albayancor</span>
                        <a
                          href="https://github.com/HarasAlLisan/AGI-AI-Albayancor"
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-cyan-300"
                          title="Open repository on GitHub"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {isAr ? 'مستودع النواة السيادية ودستور ٦٢٣٦' : 'Sovereign Core & 6236 Constitution Ledger'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${
                      githubSyncStatus?.isConnected
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : githubSyncStatus?.state === 'checking'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                        : 'bg-rose-950 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        githubSyncStatus?.isConnected
                          ? 'bg-emerald-400'
                          : githubSyncStatus?.state === 'checking'
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-rose-400'
                      }`}
                    />
                    <span>
                      {githubSyncStatus?.isConnected
                        ? '200 OK • CONNECTED'
                        : githubSyncStatus?.state === 'checking'
                        ? 'VERIFYING...'
                        : 'DISCONNECTED'}
                    </span>
                  </span>
                </div>

                {/* Status Parameters & Metadata */}
                <div className="mt-3 space-y-2 text-xs">
                  {/* Status Item: Token & Verification Mode */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {isAr ? 'رمز الوصول المستخدم (GITHUB_TOKEN)' : 'Authentication Token (GITHUB_TOKEN)'}
                        </span>
                        <span className="font-mono text-cyan-200 text-xs">
                          ghp_HvY0••••••••••••••gQ53a
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
                      {isAr ? 'فحص دوري نشط (35s)' : 'Periodic Active (35s)'}
                    </span>
                  </div>

                  {/* Status Item: Default Branch & Latency */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {isAr ? 'الفرع المستهدف' : 'Default Branch'}
                      </span>
                      <span className="font-mono font-bold text-slate-200 flex items-center gap-1 text-xs">
                        <GitBranch className="w-3 h-3 text-indigo-400" />
                        {githubSyncStatus?.defaultBranch || 'main'}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {isAr ? 'زمن الاستجابة' : 'Response Latency'}
                      </span>
                      <span className="font-mono font-bold text-emerald-300 flex items-center gap-1 text-xs">
                        <Activity className="w-3 h-3 text-emerald-400" />
                        {githubSyncStatus?.latencyMs ? `${githubSyncStatus.latencyMs} ms` : '38 ms'}
                      </span>
                    </div>
                  </div>

                  {/* Latest Commit Details */}
                  <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                      <span className="flex items-center gap-1 text-indigo-300">
                        <GitCommit className="w-3 h-3" />
                        {isAr ? 'آخر Commit متزامن' : 'Latest Verified Commit'}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {githubSyncStatus?.latestCommit?.sha || '5012247'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-mono line-clamp-2 leading-tight">
                      {githubSyncStatus?.latestCommit?.message || 'GATE 48 -> 50 ENCRYPTED - 919 - QUANTUM VAULT LIVE ENCRYPTED'}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-1.5 pt-1.5 border-t border-slate-800/60">
                      <span>{githubSyncStatus?.latestCommit?.author || 'HarasAlLisan Founder'}</span>
                      <span>
                        {githubSyncStatus?.lastChecked
                          ? isAr
                            ? `تحقق: ${githubSyncStatus.lastChecked.toLocaleTimeString()}`
                            : `Checked: ${githubSyncStatus.lastChecked.toLocaleTimeString()}`
                          : (isAr ? 'الآن' : 'Just now')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Popover Action Buttons */}
                <div className="mt-3.5 pt-2.5 border-t border-cyan-500/20 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleManualVerify}
                    disabled={isManualVerifying}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-60"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isManualVerifying ? 'animate-spin text-cyan-400' : ''}`} />
                    <span>{isAr ? 'تحقق سريع' : 'Quick Verify'}</span>
                  </button>

                  {onOpenGithubDashboard && (
                    <button
                      id="btn-header-open-github-dashboard"
                      onClick={() => {
                        setShowGithubPopover(false);
                        onOpenGithubDashboard();
                      }}
                      className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      title={isAr ? 'عرض لوحة حالة المزامنة والتقدم ومعدل النجاح' : 'View full GitHub sync status dashboard'}
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-200" />
                      <span>{isAr ? 'لوحة الحالة' : 'Dashboard'}</span>
                    </button>
                  )}

                  {(onOpenGithubSync || onOpenHarisAlLisan) && (
                    <button
                      onClick={() => {
                        setShowGithubPopover(false);
                        if (onOpenGithubSync) onOpenGithubSync();
                        else if (onOpenHarisAlLisan) onOpenHarisAlLisan();
                      }}
                      className="py-1.5 px-2.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 font-mono text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <span>{isAr ? 'النواة' : 'Core'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

          {/* ANHK Node Cluster v4.2 Live Dashboard */}
          {onOpenNodeCluster && (
            <button
              id="btn-open-node-cluster-header"
              onClick={onOpenNodeCluster}
              className="holo-btn bg-gradient-to-r from-purple-950/90 via-slate-900 to-cyan-950/90 hover:from-purple-900 hover:to-cyan-900 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0 flex items-center gap-1.5"
              title={isAr ? 'عنقود النواة 4.2 (البث الحي 918ms - المحور 919 ➔ 920)' : 'ANHK Node Cluster v4.2 (918ms Live)'}
            >
              <span className="text-sm font-bold text-cyan-300">𓋹</span>
              <span className="hidden sm:inline font-mono font-bold text-xs">{isAr ? 'عنقود 4.2' : 'Cluster 4.2'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>
          )}

          {/* Sovereign Symbolic Algebra */}
          <button
            id="btn-open-symbolic-algebra"
            onClick={onOpenSymbolicAlgebra}
            className="holo-btn bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 border border-amber-300/60 shadow-[0_0_12px_rgba(245,158,11,0.3)] flex-shrink-0"
            title={isAr ? 'منظومة الجبر الرمزي السيادي (تفكيك الصفر الوهمي وميزان 𓋹)' : 'Open Sovereign Symbolic Algebra Matrix'}
          >
            <span className="text-sm font-black leading-none">𓋹</span>
            <span className="hidden sm:inline">{isAr ? 'الجبر السيادي' : 'Algebra'}</span>
          </button>

          {/* Proof of Work 1/0 Singularity */}
          <button
            id="btn-open-pow-calculator"
            onClick={onOpenPoWCalculator}
            className="holo-btn bg-slate-900/80 hover:bg-amber-950/50 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono flex-shrink-0"
            title={isAr ? 'حاسبة إثبات العمل وتجاوز الصفر (1/0 = 𓋹 PoW Singularity Engine)' : 'Proof of Work 1/0 Singularity Resolver'}
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden md:inline">1/0 PoW</span>
          </button>

          {/* M3 Sovereign Digital Wallet */}
          <button
            onClick={onOpenWalletModal}
            className="holo-btn bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 border border-emerald-300/60 shadow-[0_0_14px_rgba(16,185,129,0.3)] flex-shrink-0"
            title={isAr ? 'افتح محفظة M3 أفراد (صرف كاش 12 𓋹 / تحويل فوري)' : 'Open M3 Digital Wallet'}
          >
            <Wallet className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">{isAr ? 'محفظة M3' : 'M3 Wallet'}</span>
            <span className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-emerald-300 border border-emerald-400/30">
              12 𓋹
            </span>
          </button>

          {/* 195 Sovereign Countries (14 Locked) Button */}
          {onOpen195Countries && (
            <button
              id="btn-open-195-countries"
              onClick={onOpen195Countries}
              className="holo-btn bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex-shrink-0 group"
              title={isAr ? '195 دولة بالعملات المحلية - 14 مقفول (بسعر 15 يوليو 2026 • 0 ملاءة)' : '195 Countries Local Currency Matrix (14 Locked - 0 Solvency)'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline font-bold">{isAr ? '195 دولة' : '195 Nations'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-900 text-amber-300 border border-amber-500/40 font-mono font-bold">
                14 مقفول
              </span>
            </button>
          )}

          {/* 2. Heptagonal Matrix 7/7 Controller Trigger */}
          {onOpenHeptagonalMatrixController && (
            <button
              id="btn-open-heptagonal-matrix"
              onClick={onOpenHeptagonalMatrixController}
              className="holo-btn bg-slate-900/90 hover:bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-300 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0 group"
              title={isAr ? 'مصفوفة الطبقات السبع السيادية M1-M7 (دستور ٦٢٣٦ • قفل التناظر 616 • أوزان الشبيكة)' : 'Heptagonal Matrix Controller (M1-M7)'}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">{isAr ? 'مصفوفة' : 'Matrix'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/60 font-mono font-bold">
                {activeLayerCount}/7
              </span>
            </button>
          )}

          {/* 3. Exovaware Sovereign Applications Hub Trigger */}
          {onOpenExovawareHub && (
            <button
              id="btn-open-exovaware-hub"
              onClick={onOpenExovawareHub}
              className="holo-btn bg-slate-900/90 hover:bg-blue-950/80 border border-blue-500/40 hover:border-blue-300 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.25)] flex-shrink-0 group"
              title={isAr ? 'محور تطبيقات إكسوفاوير السيادية المتكاملة (12 تطبيقاً نظامياً)' : 'Exovaware Sovereign Apps Hub (12 Apps)'}
            >
              <Grid className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">{isAr ? 'إكسوفاوير' : 'Exovaware'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-400/40 font-mono font-bold">
                12 APP
              </span>
            </button>
          )}

          {/* 3. Holographic Standard Icon Controls */}
          <div className="flex items-center gap-1">
            {/* National ID Modal */}
            <button
              onClick={onOpenNationalIdModal}
              className="holo-btn-icon bg-slate-900/80 hover:bg-amber-950/50 border border-amber-500/30 hover:border-amber-400 text-amber-300"
              title={isAr ? 'وثيقة الهوية الرسمية (14 رقماً قومياً)' : 'Sovereign National ID'}
            >
              <Fingerprint className="w-4 h-4" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              title={isAr ? 'تحديث البريد والمزامنة' : 'Refresh Inbox & Sync'}
              className={`holo-btn-icon bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 ${
                isRefreshing ? 'animate-spin text-cyan-400 border-cyan-500/50' : ''
              }`}
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Contacts Trigger */}
            <button
              onClick={onOpenContacts}
              title={isAr ? 'دليل الاتصالات السيادي' : 'Directory Contacts'}
              className="hidden sm:inline-flex holo-btn-icon bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400"
            >
              <Users className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              title={isAr ? 'Switch to English' : 'التغيير إلى العربية'}
              className="holo-btn-sm bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'العربية' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleNextTheme}
              title={isAr ? 'تغيير المظهر' : `Switch theme (${theme})`}
              className="hidden sm:inline-flex holo-btn-icon bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-400"
            >
              {theme === 'light-minimal' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              title={isAr ? 'الإعدادات والنظام' : 'Settings & DNS'}
              className="holo-btn-icon bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* User Avatar & Name Identity */}
          <div 
            onClick={onOpenSettings}
            className="flex items-center gap-2 pl-1.5 sm:pl-2.5 border-l border-cyan-500/25 cursor-pointer icon-hover-active"
            title={`${user.name} (${user.email})`}
          >
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-slate-200 hover:text-cyan-300 transition-colors truncate max-w-[140px]">
                {user.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 truncate max-w-[150px]">
                {user.email}
              </span>
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-cyan-400/60 ring-2 ring-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.3)] flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar & Quick Menu */}
      <div className="md:hidden px-3 pb-2 flex flex-col gap-2">
        <div className="relative flex items-center">
          <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} w-3.5 h-3.5 text-cyan-400/60`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? "ابحث في الرسائل..." : "Search messages..."}
            className={`w-full ${isAr ? 'pr-9 pl-8' : 'pl-9 pr-8'} h-8 text-xs rounded-lg bg-slate-900/80 border border-cyan-500/20 text-slate-200 placeholder-slate-500 outline-none`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute ${isAr ? 'left-2' : 'right-2'} p-1 text-slate-400 hover:text-white`}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chip if active */}
      {activeFilterLabel && (
        <div className="px-4 py-1.5 bg-cyan-950/80 border-t border-cyan-800/60 flex items-center justify-between text-xs text-cyan-200 font-mono">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'تصفية نشطة:' : 'Active Filter:'} {activeFilterLabel}</span>
          </div>
          <button onClick={() => setActiveFilterLabel(null)} className="p-1 text-cyan-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};

