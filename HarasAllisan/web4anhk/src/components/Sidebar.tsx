import React, { useState } from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Archive, 
  AlertOctagon, 
  Trash2, 
  Briefcase, 
  Cpu, 
  Crown,
  Plus,
  HardDrive,
  ShieldAlert,
  Sparkles,
  Wallet,
  Smartphone,
  Radio,
  Scale,
  Binary,
  Grid,
  Zap,
  Activity,
  Bot,
  Layers,
  GitBranch,
  Globe,
  Folder,
  FolderPlus,
  FolderInput,
  FolderCheck,
  Check,
  X
} from 'lucide-react';
import { FolderType, UserProfile, CustomFolder } from '../types';

interface SidebarProps {
  currentFolder: FolderType;
  setCurrentFolder: (f: FolderType) => void;
  folderCounts: Record<string, { total: number; unread: number }>;
  user: UserProfile;
  customFolders?: CustomFolder[];
  onCreateCustomFolder?: (name: string, color?: string, emailIdToMove?: string | string[]) => string;
  onDeleteCustomFolder?: (folderId: string) => void;
  onMoveEmail?: (emailIds: string | string[], targetFolder: string) => void;
  lang?: 'ar' | 'en';
  onOpenComposer: () => void;
  onOpenAIComposer: () => void;
  onOpenWalletModal: () => void;
  onOpenPhoneNetwork?: () => void;
  onOpenDisarmamentModal?: () => void;
  onOpenLatticeMatrix?: () => void;
  onOpenHeptagonalMatrixController?: () => void;
  onOpenExovawareHub?: () => void;
  onOpenSocialAnhk?: () => void;
  onOpenHarisAlLisan?: () => void;
  onOpenGithubSync?: () => void;
  onOpenGithubDashboard?: () => void;
  onOpen195Countries?: () => void;
  onOpenSecurityAudit?: () => void;
  onOpenNodeCluster?: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentFolder,
  setCurrentFolder,
  folderCounts,
  user,
  customFolders = [],
  onCreateCustomFolder,
  onDeleteCustomFolder,
  onMoveEmail,
  lang = 'ar',
  onOpenComposer,
  onOpenAIComposer,
  onOpenWalletModal,
  onOpenPhoneNetwork,
  onOpenDisarmamentModal,
  onOpenLatticeMatrix,
  onOpenHeptagonalMatrixController,
  onOpenExovawareHub,
  onOpenSocialAnhk,
  onOpenHarisAlLisan,
  onOpenGithubSync,
  onOpenGithubDashboard,
  onOpen195Countries,
  onOpenSecurityAudit,
  onOpenNodeCluster,
  onCloseMobile,
}) => {
  const isAr = lang === 'ar';

  // Drag-and-Drop state
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [isDragOverCreateZone, setIsDragOverCreateZone] = useState(false);

  // New Folder Modal state
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#06b6d4');
  const [pendingEmailIds, setPendingEmailIds] = useState<string[]>([]);
  const [pendingEmailSubject, setPendingEmailSubject] = useState<string>('');

  const COLOR_PALETTES = [
    { hex: '#06b6d4', name: 'Cyan' },
    { hex: '#a855f7', name: 'Purple' },
    { hex: '#10b981', name: 'Emerald' },
    { hex: '#3b82f6', name: 'Blue' },
    { hex: '#f59e0b', name: 'Amber' },
    { hex: '#f43f5e', name: 'Rose' },
  ];

  const parseDroppedEmailData = (e: React.DragEvent) => {
    let emailIds: string[] = [];
    let subject = '';
    const raw = e.dataTransfer.getData('application/json');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        emailIds = parsed.selectedIds || (parsed.emailId ? [parsed.emailId] : []);
        subject = parsed.subject || '';
      } catch {}
    }
    if (emailIds.length === 0) {
      const text = e.dataTransfer.getData('text/plain');
      if (text) emailIds = [text];
    }
    return { emailIds, subject };
  };

  const handleFolderDrop = (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    setDragOverFolderId(null);
    const { emailIds } = parseDroppedEmailData(e);
    if (emailIds.length > 0 && onMoveEmail) {
      onMoveEmail(emailIds, targetFolderId);
    }
  };

  const handleCreateZoneDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCreateZone(false);
    const { emailIds, subject } = parseDroppedEmailData(e);
    if (emailIds.length > 0) {
      setPendingEmailIds(emailIds);
      setPendingEmailSubject(subject);
      const cleanSubject = subject.replace(/^(re:|fwd:|fw:)\s*/i, '').trim();
      setNewFolderName(cleanSubject.slice(0, 24) || (isAr ? 'مجلد جديد' : 'New Folder'));
      setIsNewFolderModalOpen(true);
    }
  };

  const handleSaveNewFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    if (onCreateCustomFolder) {
      const createdId = onCreateCustomFolder(
        newFolderName.trim(),
        newFolderColor,
        pendingEmailIds.length > 0 ? pendingEmailIds : undefined
      );
      setCurrentFolder(createdId);
      if (onCloseMobile) onCloseMobile();
    }
    setIsNewFolderModalOpen(false);
    setNewFolderName('');
    setPendingEmailIds([]);
    setPendingEmailSubject('');
  };

  const mainFolders: { id: FolderType; label: string; icon: React.ReactNode }[] = [
    { id: 'inbox', label: 'صندوق الوارد (Inbox)', icon: <Inbox className="w-4 h-4" /> },
    { id: 'starred', label: 'المميزة بنجمة (Starred)', icon: <Star className="w-4 h-4" /> },
    { id: 'sent', label: 'المرسل السيادي (Sent)', icon: <Send className="w-4 h-4" /> },
    { id: 'drafts', label: 'المسودات (Drafts)', icon: <FileText className="w-4 h-4" /> },
    { id: 'archive', label: 'الأرشيف المشفر (Archive)', icon: <Archive className="w-4 h-4" /> },
    { id: 'spam', label: 'الرسائل المشبوهة (Spam)', icon: <AlertOctagon className="w-4 h-4" /> },
    { id: 'trash', label: 'سلة المحذوفات (Trash)', icon: <Trash2 className="w-4 h-4" /> },
  ];

  const categoryFolders: { id: FolderType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'work', label: 'المعاملات والتنمية (Core)', icon: <Briefcase className="w-3.5 h-3.5" />, color: 'text-sky-400' },
    { id: 'quantum', label: 'العقد الكمومية (PQC AI)', icon: <Cpu className="w-3.5 h-3.5" />, color: 'text-purple-400' },
    { id: 'vips', label: 'الهيئات والجهات (VIP)', icon: <Crown className="w-3.5 h-3.5" />, color: 'text-amber-400' },
  ];

  const handleFolderClick = (id: FolderType) => {
    setCurrentFolder(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-72 flex-shrink-0 border-r border-cyan-500/15 bg-slate-950/95 text-slate-300 flex flex-col justify-between p-3.5 select-none overflow-y-auto custom-scrollbar h-full backdrop-blur-md">
      <div className="space-y-4">
        {/* Holographic Primary Compose Actions */}
        <div className="space-y-2">
          <button
            onClick={() => { onOpenComposer(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full h-10 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.35)] border border-cyan-300/40 transition-all icon-hover-active"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>رسالة مشفرة جديدة</span>
          </button>

          {/* Haris Al-Lisan Sovereign AGI Button */}
          {onOpenHarisAlLisan && (
            <button
              onClick={() => { onOpenHarisAlLisan(); if (onCloseMobile) onCloseMobile(); }}
              className="w-full h-9 px-3 rounded-xl bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-cyan-950/80 hover:from-purple-800 hover:to-cyan-900 text-purple-200 border border-purple-400/40 text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all group"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>حارس اللسان (AGI)</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                دستور ٦٢٣٦
              </span>
            </button>
          )}

          {/* ANHK Node Cluster v4.2 Live Dashboard Button */}
          {onOpenNodeCluster && (
            <button
              onClick={() => { onOpenNodeCluster(); if (onCloseMobile) onCloseMobile(); }}
              className="w-full h-9 px-3 rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 hover:from-cyan-900 hover:to-purple-900 text-cyan-200 border border-cyan-400/50 text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-cyan-300 font-bold group-hover:scale-125 transition-transform">𓋹</span>
                <span>عنقود النواة 4.2 (LIVE)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-emerald-300 border border-emerald-500/30 font-bold">
                  918ms
                </span>
              </div>
            </button>
          )}

          <button
            onClick={() => { onOpenAIComposer(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full h-8 px-3 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 border border-purple-500/30 text-[11px] font-mono font-medium flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>صياغة ذكية بالذكاء الاصطناعي</span>
          </button>
        </div>

        {/* Holographic Quick Matrix Launchers (Symmetric 2x2 Grid) */}
        <div className="space-y-1.5">
          <div className="px-1 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-cyan-400/80 uppercase">
            <span>المنظومات السيادية</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              4 NODES
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {/* M3 Wallet */}
            <button
              onClick={() => { onOpenWalletModal(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Wallet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-emerald-300 border border-emerald-500/30 font-bold">
                  12 𓋹
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-emerald-300">محفظة M3</div>
                <div className="text-[9px] text-slate-400 font-mono">صرف كاش ATM</div>
              </div>
            </button>

            {/* Social ANHK */}
            <button
              onClick={() => { if (onOpenSocialAnhk) onOpenSocialAnhk(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Smartphone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-cyan-300 border border-cyan-500/30 font-bold">
                  P2P
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-cyan-300">سوشيال عنخ</div>
                <div className="text-[9px] text-slate-400 font-mono">واتس • ريلز</div>
              </div>
            </button>

            {/* Exovaware Hub */}
            <button
              onClick={() => { if (onOpenExovawareHub) onOpenExovawareHub(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-950/70 text-blue-300 border border-blue-500/30 hover:border-blue-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Grid className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-blue-300 border border-blue-500/30 font-bold">
                  12 APP
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-blue-300">إكسوفاوير</div>
                <div className="text-[9px] text-slate-400 font-mono">الشبكة السيادية</div>
              </div>
            </button>

            {/* 77M Phone Mesh */}
            <button
              onClick={() => { if (onOpenPhoneNetwork) onOpenPhoneNetwork(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 text-cyan-300 border border-cyan-500/25 hover:border-cyan-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Radio className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-cyan-300 border border-cyan-500/30 font-bold">
                  77M
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-cyan-300">خادم الهاتف</div>
                <div className="text-[9px] text-slate-400 font-mono">عقدة الحَيّ P2P</div>
              </div>
            </button>

            {/* Disarmament & Bank Deficits Zeroing */}
            <button
              onClick={() => { if (onOpenDisarmamentModal) onOpenDisarmamentModal(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-500/30 hover:border-rose-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Scale className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-rose-300 border border-rose-500/30 font-bold">
                  LEDGER
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-rose-300">تحييد الصراع</div>
                <div className="text-[9px] text-slate-400 font-mono">تصفير سوالب البنوك</div>
              </div>
            </button>

            {/* Lattice Matrix & Weights */}
            <button
              onClick={() => { if (onOpenLatticeMatrix) onOpenLatticeMatrix(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-950/70 text-purple-300 border border-purple-500/30 hover:border-purple-400 flex flex-col justify-between text-left transition-all group"
            >
              <div className="flex items-center justify-between w-full">
                <Binary className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-purple-300 border border-purple-500/30 font-bold">
                  LATTICE
                </span>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-100 group-hover:text-purple-300">مصفوفة الشبيكة</div>
                <div className="text-[9px] text-slate-400 font-mono">أوزان التشفير الكمومي</div>
              </div>
            </button>

            {/* 7/7 Heptagonal Matrix Controller */}
            <button
              onClick={() => { if (onOpenHeptagonalMatrixController) onOpenHeptagonalMatrixController(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 hover:border-cyan-300 flex flex-col justify-between text-left transition-all group col-span-2"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-slate-100 group-hover:text-cyan-300">مصفوفة الطبقات 7/7 (M1-M7)</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-cyan-300 border border-cyan-500/40 font-bold">
                  7/7 ACTIVE
                </span>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1">
                قفل التناظر 616 • تشخيص AdamHash • دستور ٦٢٣٦
              </div>
            </button>

            {/* GitHub Sovereign Repo Sync (HarasAlLisan/AGI-AI-Albayancor) */}
            <button
              onClick={() => { if (onOpenGithubSync) onOpenGithubSync(); else if (onOpenHarisAlLisan) onOpenHarisAlLisan(); if (onCloseMobile) onCloseMobile(); }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-950/70 to-slate-900 hover:from-indigo-900/80 hover:to-slate-800 text-indigo-300 border border-indigo-500/40 hover:border-indigo-400 flex flex-col justify-between text-left transition-all group col-span-2 shadow-sm"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-slate-100 group-hover:text-indigo-300">مستودع GitHub (AGI-AI-Albayancor)</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>5012247</span>
                </span>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1 flex items-center justify-between">
                <span>الخزنة الكمومية • 50 هرم • Gate 48</span>
                <span className="text-indigo-400 font-bold">مزامنة 𓋹</span>
              </div>
            </button>

            {/* GitHub Status Dashboard (Progress, Success Rate, Last Synced) */}
            {onOpenGithubDashboard && (
              <button
                id="btn-sidebar-github-status-dashboard"
                onClick={() => { onOpenGithubDashboard(); if (onCloseMobile) onCloseMobile(); }}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 hover:from-cyan-900/70 hover:to-indigo-900/70 text-cyan-300 border border-cyan-500/40 hover:border-cyan-300 flex flex-col justify-between text-left transition-all group col-span-2 shadow-sm"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-slate-100 group-hover:text-cyan-300">لوحة حالة GitHub (Dashboard)</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>100% • 200 OK</span>
                  </span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-1 flex items-center justify-between">
                  <span>تقدم المزامنة • معدل النجاح • Re-sync</span>
                  <span className="text-cyan-400 font-bold group-hover:underline">فتح اللوحة 𓋹</span>
                </div>
              </button>
            )}

            {/* 195 Sovereign Countries - 14 Locked */}
            {onOpen195Countries && (
              <button
                onClick={() => { onOpen195Countries(); if (onCloseMobile) onCloseMobile(); }}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-slate-900 hover:from-emerald-900/80 hover:to-slate-800 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 flex flex-col justify-between text-left transition-all group col-span-2 shadow-sm"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-slate-100 group-hover:text-emerald-300">195 دولة بالعملات المحلية (14 مقفول)</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-amber-300 border border-amber-500/40 font-bold">
                    0 ملاءة
                  </span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-1 flex items-center justify-between">
                  <span>15 يوليو 2026 • 116B عنخ = 139.45T$</span>
                  <span className="text-emerald-400 font-bold">14 مقفول</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation Folders */}
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
            صناديق البريد المشفر
          </p>
          <div className="space-y-0.5">
            {mainFolders.map((item) => {
              const countObj = folderCounts[item.id] || { total: 0, unread: 0 };
              const isActive = currentFolder === item.id;
              const isDragTarget = dragOverFolderId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleFolderClick(item.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverFolderId(item.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverFolderId === item.id) setDragOverFolderId(null);
                  }}
                  onDrop={(e) => handleFolderDrop(e, item.id)}
                  className={`w-full h-9 flex items-center justify-between px-3 rounded-xl text-xs font-medium transition-all ${
                    isDragTarget
                      ? 'bg-cyan-950 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] text-cyan-200 ring-2 ring-cyan-400/40 scale-[1.01]'
                      : isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)] font-bold'
                      : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent'
                  } icon-hover-active`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={isActive || isDragTarget ? 'text-cyan-400' : 'text-slate-500'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isDragTarget ? (
                    <span className="text-[10px] font-mono text-cyan-300 animate-pulse font-bold">
                      {isAr ? 'إفلات للنقل' : 'Drop'}
                    </span>
                  ) : countObj.unread > 0 ? (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      {countObj.unread}
                    </span>
                  ) : countObj.total > 0 && item.id !== 'inbox' ? (
                    <span className="text-[10px] font-mono text-slate-500">{countObj.total}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Labels */}
        <div className="space-y-1 pt-2 border-t border-cyan-500/10">
          <p className="px-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
            التصنيفات الذكية
          </p>
          <div className="space-y-0.5">
            {categoryFolders.map((item) => {
              const countObj = folderCounts[item.id] || { total: 0, unread: 0 };
              const isActive = currentFolder === item.id;
              const isDragTarget = dragOverFolderId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleFolderClick(item.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverFolderId(item.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverFolderId === item.id) setDragOverFolderId(null);
                  }}
                  onDrop={(e) => handleFolderDrop(e, item.id)}
                  className={`w-full h-8 flex items-center justify-between px-3 rounded-lg text-xs font-medium transition-all ${
                    isDragTarget
                      ? 'bg-cyan-950 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] text-cyan-200 ring-2 ring-cyan-400/30'
                      : isActive
                      ? 'bg-slate-900 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={item.color}>{item.icon}</span>
                    <span className="truncate text-[11px]">{item.label}</span>
                  </div>
                  {isDragTarget ? (
                    <span className="text-[10px] font-mono text-cyan-300 animate-pulse">
                      {isAr ? 'إفلات' : 'Drop'}
                    </span>
                  ) : countObj.total > 0 ? (
                    <span className="text-[10px] font-mono text-slate-500">{countObj.total}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Folders with Drag & Drop Creation */}
        <div className="space-y-1.5 pt-2 border-t border-cyan-500/10">
          <div className="px-2 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Folder className="w-3.5 h-3.5" />
              <span>{isAr ? 'المجلدات المخصصة' : 'Custom Folders'}</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[9px]">
                {customFolders.length}
              </span>
            </div>
            <button
              onClick={() => {
                setPendingEmailIds([]);
                setPendingEmailSubject('');
                setNewFolderName('');
                setIsNewFolderModalOpen(true);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
              title={isAr ? 'إنشاء مجلد مخصص جديد' : 'Create new custom folder'}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Custom Folders List */}
          <div className="space-y-0.5">
            {customFolders.map((folder) => {
              const countObj = folderCounts[folder.id] || { total: 0, unread: 0 };
              const isActive = currentFolder === folder.id;
              const isDragTarget = dragOverFolderId === folder.id;

              return (
                <div
                  key={folder.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverFolderId(folder.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverFolderId === folder.id) setDragOverFolderId(null);
                  }}
                  onDrop={(e) => handleFolderDrop(e, folder.id)}
                  className={`group relative w-full h-8 flex items-center justify-between px-3 rounded-lg text-xs font-medium transition-all ${
                    isDragTarget
                      ? 'bg-cyan-950 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] text-cyan-200 ring-2 ring-cyan-400/40 scale-[1.01]'
                      : isActive
                      ? 'bg-slate-900 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => handleFolderClick(folder.id)}
                    className="flex-1 flex items-center gap-2 truncate text-left"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: folder.color || '#06b6d4' }}
                    />
                    <Folder className="w-3.5 h-3.5 flex-shrink-0" style={{ color: folder.color || '#06b6d4' }} />
                    <span className="truncate text-[11px]">{folder.name}</span>
                  </button>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isDragTarget ? (
                      <span className="text-[10px] font-mono text-cyan-300 animate-pulse font-bold">
                        {isAr ? 'نقل' : 'Drop'}
                      </span>
                    ) : countObj.unread > 0 ? (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full bg-cyan-400 text-slate-950">
                        {countObj.unread}
                      </span>
                    ) : countObj.total > 0 ? (
                      <span className="text-[10px] font-mono text-slate-500 group-hover:hidden">
                        {countObj.total}
                      </span>
                    ) : null}

                    {/* Delete Custom Folder Button on Hover */}
                    {onDeleteCustomFolder && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(isAr ? `هل تريد بالتأكيد حذف مجلد "${folder.name}"؟ ستتم إعادة رسائله إلى صندوق الوارد.` : `Delete folder "${folder.name}"? Emails will be moved back to Inbox.`)) {
                            onDeleteCustomFolder(folder.id);
                          }
                        }}
                        className="hidden group-hover:flex p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                        title={isAr ? 'حذف هذا المجلد' : 'Delete folder'}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dedicated Drag-and-Drop Target to Create New Custom Folder */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setIsDragOverCreateZone(true);
            }}
            onDragLeave={() => setIsDragOverCreateZone(false)}
            onDrop={handleCreateZoneDrop}
            onClick={() => {
              setPendingEmailIds([]);
              setPendingEmailSubject('');
              setNewFolderName('');
              setIsNewFolderModalOpen(true);
            }}
            className={`border border-dashed rounded-xl p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragOverCreateZone
                ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-[1.02]'
                : 'border-slate-800 hover:border-cyan-500/40 bg-slate-950/40 hover:bg-slate-900/40 text-slate-400 hover:text-cyan-300'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium">
              <FolderPlus className={`w-4 h-4 ${isDragOverCreateZone ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
              <span>
                {isDragOverCreateZone 
                  ? (isAr ? 'أفلت الرسالة هنا لإنشاء المجلد!' : 'Drop email here to create folder!')
                  : (isAr ? '+ اسحب رسالة لإنشاء مجلد' : '+ Drag email here to create folder')}
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-0.5">
              {isAr ? 'أو انقر هنا لإضافة مجلد جديد' : 'Or click to create a new folder'}
            </span>
          </div>
        </div>
      </div>

      {/* New Custom Folder Modal */}
      {isNewFolderModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setIsNewFolderModalOpen(false)}
        >
          <div 
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-cyan-500/40 p-5 text-slate-100 shadow-[0_0_30px_rgba(6,182,212,0.25)] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <FolderPlus className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'إنشاء مجلد مخصص جديد' : 'Create Custom Folder'}</span>
              </div>
              <button
                onClick={() => setIsNewFolderModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pendingEmailIds.length > 0 && (
              <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2">
                <FolderInput className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
                <div>
                  <span className="font-bold">
                    {isAr ? `سيتم نقل ${pendingEmailIds.length} رسالة تلقائياً:` : `Automatically moving ${pendingEmailIds.length} email(s):`}
                  </span>
                  {pendingEmailSubject && (
                    <p className="text-[11px] text-slate-300 truncate mt-0.5 italic">
                      "{pendingEmailSubject}"
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSaveNewFolder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {isAr ? 'اسم المجلد المخصص:' : 'Folder Name:'}
                </label>
                <input
                  type="text"
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder={isAr ? 'مثال: العقود السيادية، الفواتير...' : 'e.g. Sovereign Contracts, Bills...'}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {isAr ? 'لون المجلد الأمني:' : 'Folder Tag Color:'}
                </label>
                <div className="flex items-center gap-2.5 pt-1">
                  {COLOR_PALETTES.map((c) => (
                    <button
                      type="button"
                      key={c.hex}
                      onClick={() => setNewFolderColor(c.hex)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        newFolderColor === c.hex ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {newFolderColor === c.hex && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!newFolderName.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
                >
                  {pendingEmailIds.length > 0 
                    ? (isAr ? 'إنشاء المجلد ونقل الرسالة' : 'Create & Move Email')
                    : (isAr ? 'إنشاء المجلد' : 'Create Folder')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sovereign Hologram Node Telemetry Card */}
      <div className="pt-3 border-t border-cyan-500/15 space-y-2 mt-auto">
        <div 
          onClick={() => {
            if (onOpenSecurityAudit) onOpenSecurityAudit();
            if (onCloseMobile) onCloseMobile();
          }}
          className="p-2.5 rounded-xl hologram-glass border border-cyan-500/25 hover:border-cyan-400 text-xs space-y-1.5 cursor-pointer transition-all hover:bg-cyan-950/20 group"
          title="افتح مركز تدقيق المعايير الأمنية والهوية"
        >
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400 flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>ذاكرة خادم الحَيّ</span>
            </span>
            <span className="text-cyan-300 font-bold">{user.usedStorage} / {user.maxStorage}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-cyan-500/20">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 rounded-full w-[24%]" />
          </div>
          <div className="text-[9px] text-slate-400 font-mono flex items-center justify-between pt-0.5">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
              77M Mesh Active
            </span>
            <span className="text-cyan-400 group-hover:underline">PQC 256 • فحص 𓋹</span>
          </div>
        </div>

        <div 
          onClick={() => {
            if (onOpenSecurityAudit) onOpenSecurityAudit();
            if (onCloseMobile) onCloseMobile();
          }}
          className="flex items-center justify-between text-[9px] font-mono text-slate-500 hover:text-cyan-300 px-1 cursor-pointer transition-colors"
          title="عقدة الحَيّ السيادية"
        >
          <span className="text-slate-400">عقدة الحَيّ 28612030103352</span>
          <span className="text-cyan-400 font-bold">Web4 Sovereign</span>
        </div>
      </div>
    </aside>
  );
};
