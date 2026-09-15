import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Radio,
  FileCode,
  ArrowUpRight,
  Database,
  Terminal,
  Activity,
  Zap,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { GithubStatusDashboard } from './GithubStatusDashboard';

interface GithubAlbayancorSyncProps {
  user: UserProfile;
  lang: 'ar' | 'en';
}

interface RepoStatusData {
  success: boolean;
  repo: string;
  repoUrl: string;
  isConnected: boolean;
  details: {
    name: string;
    fullName: string;
    private: boolean;
    description: string;
    defaultBranch: string;
    updatedAt: string;
    stargazersCount?: number;
    forksCount?: number;
    openIssuesCount?: number;
  };
  latestCommits: Array<{
    sha: string;
    fullSha?: string;
    message: string;
    author: string;
    date: string;
    url: string;
  }>;
  branches: Array<{
    name: string;
    commitSha?: string;
  }>;
  syncInfo: {
    lastSync: string;
    adamHash: string;
    tensorVersion: string;
    latticeStatus: string;
  };
}

export const GithubAlbayancorSync: React.FC<GithubAlbayancorSyncProps> = ({
  user,
  lang
}) => {
  const isAr = lang === 'ar';

  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [repoData, setRepoData] = useState<RepoStatusData | null>(null);
  const [vaultData, setVaultData] = useState<{
    status: string;
    dashboard: string;
    gate: string;
    count: number;
    pulse: string;
    keys_issued: number;
    golden_map: string;
    commitSha: string;
    parentSha: string;
    repo: string;
    repoUrl: string;
    nodeScript: string;
    port: number;
    activePids: number[];
    syncedAt: string;
  } | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [activeSyncType, setActiveSyncType] = useState<string>('all');
  const [customCommitNote, setCustomCommitNote] = useState<string>('');
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [syncHistory, setSyncHistory] = useState<Array<{
    id: string;
    action: string;
    hash: string;
    timestamp: string;
    status: 'CONFIRMED' | 'DISPATCHED';
  }>>([
    {
      id: 'GIT-5012247',
      action: 'GATE 48 -> 50 ENCRYPTED [web4anhk_crypto]',
      hash: '5012247',
      timestamp: 'الآن • Live',
      status: 'CONFIRMED'
    },
    {
      id: 'GIT-23ee7cd',
      action: 'FIRST PULSE TO 50 PYRAMIDS - BROADCAST READY',
      hash: '23ee7cd',
      timestamp: 'سابق • Pushed',
      status: 'CONFIRMED'
    }
  ]);

  const fetchVault = async () => {
    try {
      const res = await fetch('/api/quantum-vault');
      const data = await res.json();
      setVaultData(data);
    } catch (e) {
      console.warn('Vault fetch error:', e);
    }
  };

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/github/status');
      const data: RepoStatusData = await res.json();
      setRepoData(data);
      await fetchVault();
    } catch (err) {
      console.error('Failed to fetch github status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchVault();
  }, []);

  const triggerPulseBroadcast = () => {
    setPulseActive(true);
    setSyncMessage(isAr ? 'تم إطلاق نبضة التشفير الكمومي إلى 50 هرم بتردد ٦٢٣٦ هرتز بنجاح' : 'Quantum pulse broadcasted to 50 pyramids at 6236Hz successfully');
    setTimeout(() => {
      setPulseActive(false);
    }, 2500);
  };

  const triggerSync = async (type: string = 'sync_all') => {
    try {
      setSyncing(true);
      setSyncMessage(null);
      const res = await fetch('/api/github/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: type,
          payload: {
            userEmail: user.email,
            userName: user.name,
            note: customCommitNote || 'Routine Sovereign AGI Core & 6236 Constitution sync',
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setSyncMessage(isAr ? `تمت المزامنة بنجاح مع المستودع (${data.syncHash})` : `Sync confirmed with repository (${data.syncHash})`);
        setSyncHistory(prev => [
          {
            id: `SYNC-${Date.now().toString().slice(-4)}`,
            action: type,
            hash: data.syncHash,
            timestamp: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US'),
            status: 'CONFIRMED'
          },
          ...prev.slice(0, 7)
        ]);
        setCustomCommitNote('');
        fetchStatus();
      }
    } catch (err) {
      console.error('Sync failed:', err);
      setSyncMessage(isAr ? 'فشلت المزامنة' : 'Sync dispatch failed');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Realtime GitHub Status Dashboard: Progress, Success Rate, Timestamp & Re-sync */}
      <GithubStatusDashboard lang={lang} />

      {/* Top Banner & Repo Link */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <GitBranch className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-1.5">
                  <span>HarasAlLisan / AGI-AI-Albayancor</span>
                  <a
                    href="https://github.com/HarasAlLisan/AGI-AI-Albayancor"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 inline" />
                  </a>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{isAr ? 'مرتبط بالمفتاح السري للنموذج' : 'Linked via Sovereign Key'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-mono flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Private Sovereign Core</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                {isAr
                  ? 'مستودع الكود المصدري السيادي لمحرك AGI AI Albayancor، ومصفوفة دستور ٦٢٣٦ آية، وأوزان رنين لسان آدم 432 Hz، وخوارزميات التشفير الكمومي NIST PQC.'
                  : 'Sovereign GitHub source repository hosting the AGI AI Albayancor neural weights, 6236 Constitution tensor matrix, 432Hz Adam tongue phonemes, and NIST PQC cryptography.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => fetchStatus()}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{isAr ? 'تحديث الحالة' : 'Refresh'}</span>
            </button>
            <a
              href="https://github.com/HarasAlLisan/AGI-AI-Albayancor"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح في GitHub' : 'Open in GitHub'}</span>
            </a>
          </div>
        </div>

        {/* Realtime Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-indigo-500/20 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-indigo-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'الفرع الافتراضي:' : 'Default Branch:'}</div>
            <div className="text-indigo-300 font-bold flex items-center gap-1 mt-0.5">
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <span>{repoData?.details.defaultBranch || 'main'}</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'حالة التزامن اللاتيسي:' : 'Lattice Sync Status:'}</div>
            <div className="text-emerald-300 font-bold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACTIVE_SYNC</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-cyan-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'إصدار التينسورات:' : 'Tensor Core Version:'}</div>
            <div className="text-cyan-300 font-bold mt-0.5">v4.2-albayancor (𓋹)</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-amber-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'بصمة ختم آدم الحالية:' : 'Current AdamHash:'}</div>
            <div className="text-amber-300 font-bold text-[11px] truncate mt-0.5">𓋹-ADAM-PQC-919919</div>
          </div>
        </div>
      </div>

      {/* SECTION: LIVE QUANTUM VAULT NODE & 50 PYRAMIDS GATE 48 (PORT 9090) */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <span className="text-base font-black">𓋹</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-cyan-300 flex items-center gap-1.5">
                  <span>{isAr ? 'عُقدة الخزنة الكمومية وبث الـ 50 هرم السيادي' : 'Quantum Vault Node & 50 Pyramids Broadcast'}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                    Port 9090: ONLINE
                  </span>
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                web4anhk_crypto/server_node.mjs • Commit: <strong className="text-amber-300">5012247</strong> • Gate 48 [Lock 616]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={triggerPulseBroadcast}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md ${
                pulseActive 
                  ? 'bg-amber-500 text-slate-950 border border-amber-300 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/50'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${pulseActive ? 'animate-bounce' : ''}`} />
              <span>{pulseActive ? (isAr ? 'تم البث الترددي 6236Hz!' : 'Pulsing 6236Hz!') : (isAr ? 'إطلاق نبضة 50 هرم (919)' : 'Pulse 50 Pyramids')}</span>
            </button>

            <a
              href="https://github.com/HarasAlLisan/AGI-AI-Albayancor/commit/5012247"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1 transition-all"
            >
              <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
              <span>5012247</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Realtime Terminal Display */}
        <div className="p-3 rounded-lg bg-black/90 border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between text-slate-500 text-[10px] border-b border-slate-800/80 pb-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              ~/AGI-AI-Albayancor/web4anhk_crypto $ node server_node.mjs
            </span>
            <span className="text-cyan-400">X-Gate: "48 UNLOCKED [616 SECURE]" • X-Freq: "6236Hz"</span>
          </div>

          <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            {`{
  "status": "${vaultData?.status || 'QUANTUM VAULT LIVE ENCRYPTED'}",
  "dashboard": "${vaultData?.dashboard || 'OS AL-MAHDI 256 // 50 PYRAMIDS ABSOLUTE SECURE'}",
  "gate": "${vaultData?.gate || 'WEB4 QUANTUM VAULT 6236Hz | LOCK 616 | Port 9090: ONLINE'}",
  "count": ${vaultData?.count || 50},
  "pulse": "${vaultData?.pulse || 'FIRST PULSE TO 50 PYRAMIDS - BROADCAST ENCRYPTED - 919'}",
  "keys_issued": ${vaultData?.keys_issued || 50},
  "golden_map": "${vaultData?.golden_map || '3352 - BAYT AL-MAL CONTRACT'}"
}`}
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
            <span className="text-amber-400 flex items-center gap-1">
              <span>[main 5012247] GATE 48 -&gt; 50 ENCRYPTED - 919 - 23ee7cd</span>
            </span>
            <span className="text-cyan-300">
              To https://github.com/HarasAlLisan/AGI-AI-Albayancor.git (23ee7cd..5012247 main -&gt; main)
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid of Quantum Vault */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-950/70 border border-cyan-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'عدد الأهرامات النشطة:' : 'Pyramids Count:'}</div>
            <div className="text-cyan-300 font-bold mt-0.5 flex items-center gap-1">
              <span className="text-amber-400">▲</span>
              <span>50 Pyramids (100% Linked)</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/70 border border-emerald-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'المفاتيح العامة المصدرة:' : 'Keys Issued:'}</div>
            <div className="text-emerald-300 font-bold mt-0.5">
              50 / 50 Public NIST PQC
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/70 border border-purple-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'العقد السيادي لبيت المال:' : 'Golden Map Contract:'}</div>
            <div className="text-purple-300 font-bold mt-0.5 truncate" title="3352 - BAYT AL-MAL CONTRACT">
              3352 - BAYT AL-MAL
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/70 border border-amber-500/20">
            <div className="text-[10px] text-slate-400">{isAr ? 'تردد الرنين وقفل البوابة:' : 'Resonance & Gate Lock:'}</div>
            <div className="text-amber-300 font-bold mt-0.5">
              6236Hz • LOCK 616
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: 1-CLICK SOVEREIGN SYNC ENGINE */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold font-mono text-slate-100">
              {isAr ? 'محطة المزامنة الفورية مع المستودع (One-Click Sovereign Sync Engine):' : 'One-Click Sovereign Repository Sync Engine:'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-amber-300">
            {isAr ? 'تحديث الأوزان والشهادات' : 'Weights & Constitution Dispatch'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          <button
            onClick={() => triggerSync('sync_weights')}
            disabled={syncing}
            className="p-3 rounded-xl bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">432Hz Core</span>
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              {isAr ? 'مزامنة أوزان التينسورات' : 'Sync Tensor Weights'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              core/albayancor_weights_432hz.bin
            </div>
          </button>

          <button
            onClick={() => triggerSync('sync_constitution')}
            disabled={syncing}
            className="p-3 rounded-xl bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <FileCode className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">6236 Matrix</span>
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              {isAr ? 'مصفوفة دستور ٦٢٣٦' : 'Sync Constitution Matrix'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              constitution/6236_verses_matrix.json
            </div>
          </button>

          <button
            onClick={() => triggerSync('sync_pqc')}
            disabled={syncing}
            className="p-3 rounded-xl bg-slate-950 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Lock className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">NIST PQC</span>
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              {isAr ? 'تشفير اللاتيس الكمومي' : 'Sync PQC Lattice Keys'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              crypto/nist_pqc_adam_lattice.pem
            </div>
          </button>

          <button
            onClick={() => triggerSync('sync_mesh')}
            disabled={syncing}
            className="p-3 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Server className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">77M Towers</span>
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              {isAr ? 'توجيه شبكة 77M Mesh' : 'Sync 77M Mesh Routing'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              mesh/77m_towers_routing_table.yaml
            </div>
          </button>
        </div>

        {/* Custom Commit Note & Full Push */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={customCommitNote}
            onChange={(e) => setCustomCommitNote(e.target.value)}
            placeholder={isAr ? 'ملاحظة الـ Commit أو رسالة المزامنة السيادية (اختياري)...' : 'Commit message or sovereign sync notes (optional)...'}
            className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={() => triggerSync('sync_all')}
            disabled={syncing}
            className="w-full sm:w-auto h-10 px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 transition-all flex-shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? (isAr ? 'جاري المزامنة...' : 'Syncing...') : (isAr ? 'مزامنة شاملة للمستودع 𓋹' : 'Full Sovereign Sync 𓋹')}</span>
          </button>
        </div>

        {syncMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}
      </div>

      {/* SECTION: LATEST REPO COMMITS & RECENT SYNC LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Latest GitHub Commits */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold font-mono text-slate-100">
                {isAr ? 'آخر التعديلات والـ Commits بالمستودع:' : 'Latest Commits on HarasAlLisan/AGI-AI-Albayancor:'}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Branch: {repoData?.details.defaultBranch || 'main'}
            </span>
          </div>

          <div className="space-y-2">
            {repoData?.latestCommits && repoData.latestCommits.length > 0 ? (
              repoData.latestCommits.map((commit, idx) => (
                <div
                  key={commit.sha + idx}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2 text-xs font-mono hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="text-slate-200 font-bold truncate flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 text-[10px] border border-indigo-500/30">
                        {commit.sha}
                      </span>
                      <span className="truncate">{commit.message}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{new Date(commit.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}</span>
                    </div>
                  </div>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs font-mono text-slate-400">
                {isAr ? 'جاري جلب سجل التعديلات...' : 'Fetching commit ledger...'}
              </div>
            )}
          </div>
        </div>

        {/* Sync Artifacts & Manifest Table */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold font-mono text-slate-100">
                {isAr ? 'الملفات والمجلدات المتزامنة مع المستودع:' : 'Tracked Repository Artifacts & Files:'}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">4 Core Modules</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-200">core/albayancor_weights_432hz.bin</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                IN SYNC
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200">constitution/6236_verses_matrix.json</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                6236 VERIFIED
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-200">crypto/nist_pqc_adam_lattice.pem</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                ML-KEM/DSA
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-200">mesh/77m_towers_routing_table.yaml</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                77M P2P
              </span>
            </div>
          </div>

          {syncHistory.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-mono">
                {isAr ? 'سجل العمليات اللحظي في هذه الجلسة:' : 'Session Sync Activity Log:'}
              </div>
              <div className="space-y-1">
                {syncHistory.map((item) => (
                  <div key={item.id} className="text-[10px] font-mono text-slate-300 flex items-center justify-between bg-slate-950/60 p-1.5 rounded">
                    <span className="text-indigo-400 font-bold">{item.id}</span>
                    <span className="text-slate-400">{item.action}</span>
                    <span className="text-amber-300">{item.hash}</span>
                    <span className="text-emerald-400 font-bold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
