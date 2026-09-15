import React, { useState, useMemo, useEffect } from 'react';
import { 
  Star, 
  Paperclip, 
  ShieldCheck, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Mail, 
  MailOpen, 
  Trash2, 
  Archive, 
  AlertOctagon, 
  CornerUpLeft,
  Tag,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  AlertCircle,
  User,
  Sparkles,
  AlignLeft,
  Folder,
  FolderPlus,
  FolderInput,
  FolderCheck,
  MoreVertical,
  GripVertical,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Cpu,
  Crown,
  X,
  Check
} from 'lucide-react';
import { Email, FolderType, CustomFolder } from '../types';

export type SortField = 'date' | 'importance' | 'sender';
export type SortDirection = 'asc' | 'desc';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleRead: (id: string, e: React.MouseEvent) => void;
  onDeleteEmail: (id: string, e: React.MouseEvent) => void;
  onArchiveEmail: (id: string, e: React.MouseEvent) => void;
  onMarkSpam: (id: string, e: React.MouseEvent) => void;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  folderName: FolderType;
  lang?: 'ar' | 'en';
  customFolders?: CustomFolder[];
  onMoveEmail?: (emailIds: string | string[], targetFolder: string) => void;
  onCreateCustomFolder?: (name: string, color?: string, emailIdToMove?: string | string[]) => string;
}

export const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmailId,
  onSelectEmail,
  onToggleStar,
  onToggleRead,
  onDeleteEmail,
  onArchiveEmail,
  onMarkSpam,
  selectedIds,
  setSelectedIds,
  folderName,
  lang = 'ar',
  customFolders = [],
  onMoveEmail,
  onCreateCustomFolder,
}) => {
  const isAr = lang === 'ar';
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'starred' | 'verified' | 'attachments'>('all');
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  // Condensed snippet view: defaults to 'snippet' (shows first 2 lines of email body)
  const [viewMode, setViewMode] = useState<'snippet' | 'compact'>('snippet');

  // Drag-and-drop state
  const [draggingEmailId, setDraggingEmailId] = useState<string | null>(null);

  // Context Menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    email: Email;
    showMoveSubmenu: boolean;
  } | null>(null);

  // Bulk Move Dropdown state
  const [isBulkMoveDropdownOpen, setIsBulkMoveDropdownOpen] = useState(false);

  // Quick New Folder Modal state from Context Menu / Bulk Move
  const [isQuickFolderModalOpen, setIsQuickFolderModalOpen] = useState(false);
  const [quickFolderTargetEmailIds, setQuickFolderTargetEmailIds] = useState<string[]>([]);
  const [quickFolderName, setQuickFolderName] = useState('');
  const [quickFolderColor, setQuickFolderColor] = useState('#06b6d4');

  const COLOR_PALETTES = [
    { hex: '#06b6d4', name: 'Cyan' },
    { hex: '#a855f7', name: 'Purple' },
    { hex: '#10b981', name: 'Emerald' },
    { hex: '#3b82f6', name: 'Blue' },
    { hex: '#f59e0b', name: 'Amber' },
    { hex: '#f43f5e', name: 'Rose' },
  ];

  // Close context menu & dropdown on outside click
  useEffect(() => {
    const handleWindowClick = () => {
      if (contextMenu) setContextMenu(null);
      if (isBulkMoveDropdownOpen) setIsBulkMoveDropdownOpen(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [contextMenu, isBulkMoveDropdownOpen]);

  // Helper: Extract clean 2-line snippet text from email body without raw HTML/markdown noise
  const getEmailSnippet = (body: string): string => {
    if (!body) return '';
    let text = body
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<br\s*[\/]?>/gi, ' ')
      .replace(/<\/p>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'");
    return text.replace(/\s+/g, ' ').trim();
  };

  // Helper: Extract a comparable numeric timestamp for sorting by date
  const getEmailTimeValue = (email: Email, fallbackIndex: number): number => {
    // If id has format email-<numeric epoch>
    const match = email.id.match(/^email-(\d{10,14})$/);
    if (match) {
      return parseInt(match[1], 10);
    }

    // Standard date parse (e.g. 'Jul 31, 2026')
    const parsed = Date.parse(email.dateStr);
    if (!isNaN(parsed)) {
      return parsed;
    }

    // Today / Recent Arabic or relative timestamps
    const today = new Date(2026, 8, 8).getTime();
    if (email.timestamp === 'الآن' || email.timestamp === 'Now') {
      return today + 86400000;
    }

    if (email.dateStr?.includes('اليوم') || email.timestamp?.includes('اليوم')) {
      const timeMatch = (email.dateStr + ' ' + email.timestamp).match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const isPm = email.dateStr.includes('م') || email.timestamp.includes('PM');
        const isAm = email.dateStr.includes('ص') || email.timestamp.includes('AM');
        if (isPm && hours < 12) hours += 12;
        if (isAm && hours === 12) hours = 0;
        return today + (hours * 3600 + minutes * 60) * 1000;
      }
      return today + (10000 - fallbackIndex * 10);
    }

    if (email.timestamp?.includes('Yesterday')) {
      return today - 86400000;
    }

    const timeOnly = email.timestamp?.match(/^(\d{1,2}):(\d{2})$/);
    if (timeOnly) {
      const hours = parseInt(timeOnly[1], 10);
      const minutes = parseInt(timeOnly[2], 10);
      return today + (hours * 3600 + minutes * 60) * 1000;
    }

    // Preserving relative array sequence
    return today - fallbackIndex * 100000;
  };

  // Helper: Compute importance score for sorting by importance
  const getImportanceScore = (email: Email): number => {
    let score = 0;
    // Starred emails get highest priority
    if (email.isStarred) score += 60;
    // Sovereign, Core, VIP, or Security Labels
    if (email.labels?.some((l) => /سيادي|sovereign|anhk-core|important|vip|urgent|security|عاجل|بيت-المال/i.test(l))) {
      score += 40;
    }
    // Urgent or Sovereign Subject
    if (/عاجل|urgent|إشعار سيادي|sovereign|أمني|security|تحذير|alert/i.test(email.subject)) {
      score += 30;
    }
    // Verified Domain or High Threat security detection
    if (email.securityStatus?.isVerifiedDomain) {
      score += 20;
    }
    if (email.securityStatus?.riskLevel === 'High Threat') {
      score += 25;
    }
    // Unread status
    if (!email.isRead) {
      score += 10;
    }
    // Encrypted emails
    if (email.isEncrypted) {
      score += 5;
    }
    return score;
  };

  const filteredEmails = emails.filter((email) => {
    if (filterTab === 'unread') return !email.isRead;
    if (filterTab === 'starred') return email.isStarred;
    if (filterTab === 'verified') return email.securityStatus?.isVerifiedDomain;
    if (filterTab === 'attachments') return (email.attachments?.length || 0) > 0;
    return true;
  });

  // Sort filtered emails according to selected sortBy and sortDirection
  const sortedEmails = useMemo(() => {
    return [...filteredEmails].sort((a, b) => {
      if (sortBy === 'date') {
        const timeA = getEmailTimeValue(a, emails.indexOf(a));
        const timeB = getEmailTimeValue(b, emails.indexOf(b));
        return sortDirection === 'desc' ? timeB - timeA : timeA - timeB;
      }

      if (sortBy === 'importance') {
        const scoreA = getImportanceScore(a);
        const scoreB = getImportanceScore(b);
        if (scoreA !== scoreB) {
          return sortDirection === 'desc' ? scoreB - scoreA : scoreA - scoreB;
        }
        // Tie breaker by date (newest first)
        const timeA = getEmailTimeValue(a, emails.indexOf(a));
        const timeB = getEmailTimeValue(b, emails.indexOf(b));
        return timeB - timeA;
      }

      if (sortBy === 'sender') {
        const cmp = a.senderName.localeCompare(b.senderName, isAr ? 'ar' : 'en', {
          sensitivity: 'base',
          numeric: true,
        });
        if (cmp !== 0) {
          return sortDirection === 'asc' ? cmp : -cmp;
        }
        // Tie breaker by date
        const timeA = getEmailTimeValue(a, emails.indexOf(a));
        const timeB = getEmailTimeValue(b, emails.indexOf(b));
        return timeB - timeA;
      }

      return 0;
    });
  }, [filteredEmails, sortBy, sortDirection, emails, isAr]);

  const allSelected = sortedEmails.length > 0 && selectedIds.length === sortedEmails.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedEmails.map((e) => e.id));
    }
  };

  const handleSortChange = (field: SortField) => {
    if (sortBy === field) {
      // Toggle direction if already active
      setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortBy(field);
      // Sensible default directions:
      // Date & Importance: desc (newest / most important first)
      // Sender: asc (A-Z / أ-ي)
      setSortDirection(field === 'sender' ? 'asc' : 'desc');
    }
  };

  const toggleDirection = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const getSortDirectionText = () => {
    if (sortBy === 'date') {
      return sortDirection === 'desc' 
        ? (isAr ? 'الأحدث أولاً' : 'Newest first') 
        : (isAr ? 'الأقدم أولاً' : 'Oldest first');
    }
    if (sortBy === 'importance') {
      return sortDirection === 'desc' 
        ? (isAr ? 'الأعلى أهمية' : 'Highest first') 
        : (isAr ? 'الأقل أهمية' : 'Lowest first');
    }
    if (sortBy === 'sender') {
      return sortDirection === 'asc' 
        ? (isAr ? 'أبجدياً (أ ➔ ي)' : 'Name (A ➔ Z)') 
        : (isAr ? 'أبجدياً (ي ➔ أ)' : 'Name (Z ➔ A)');
    }
    return '';
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 border-r border-slate-900/80 overflow-hidden">
      {/* Top Bar with Filter Tabs, Sorting Controls & Bulk Controls */}
      <div className="p-3 border-b border-slate-900 flex flex-col gap-2.5 bg-slate-950/90">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Select All Checkbox */}
            <button
              onClick={toggleSelectAll}
              className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
              title={allSelected ? (isAr ? 'إلغاء تحديد الكل' : 'Deselect all') : (isAr ? 'تحديد الكل' : 'Select all')}
            >
              {allSelected ? (
                <CheckSquare className="w-4 h-4 text-cyan-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>

            {/* Bulk Actions when selected */}
            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-1.5 animate-fadeIn">
                <span className="text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                  {selectedIds.length} {isAr ? 'محدد' : 'selected'}
                </span>
                <button
                  onClick={(e) => {
                    selectedIds.forEach((id) => onToggleRead(id, e));
                    setSelectedIds([]);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-cyan-400"
                  title={isAr ? 'تبديل مقروء / غير مقروء' : 'Toggle Read/Unread'}
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    selectedIds.forEach((id) => onArchiveEmail(id, e));
                    setSelectedIds([]);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-cyan-400"
                  title={isAr ? 'أرشفة' : 'Archive'}
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    selectedIds.forEach((id) => onDeleteEmail(id, e));
                    setSelectedIds([]);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-rose-400"
                  title={isAr ? 'حذف' : 'Delete'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Bulk Move To... Button & Dropdown */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setIsBulkMoveDropdownOpen(!isBulkMoveDropdownOpen)}
                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-1 text-xs transition-colors"
                    title={isAr ? 'نقل الرسائل المحددة إلى مجلد...' : 'Move selected to folder...'}
                  >
                    <FolderInput className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isAr ? 'نقل إلى...' : 'Move to...'}</span>
                  </button>

                  {isBulkMoveDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 w-60 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl z-50 p-2 text-xs space-y-1 backdrop-blur-md">
                      <p className="px-2 py-1 text-[10px] font-mono text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                        {isAr ? `نقل (${selectedIds.length}) إلى:` : `Move (${selectedIds.length}) to:`}
                      </p>
                      
                      {/* Standard Folders */}
                      <button
                        onClick={() => {
                          if (onMoveEmail) onMoveEmail(selectedIds, 'inbox');
                          setSelectedIds([]);
                          setIsBulkMoveDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isAr ? 'صندوق الوارد (Inbox)' : 'Inbox'}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onMoveEmail) onMoveEmail(selectedIds, 'archive');
                          setSelectedIds([]);
                          setIsBulkMoveDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                      >
                        <Archive className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isAr ? 'الأرشيف المشفر (Archive)' : 'Archive'}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onMoveEmail) onMoveEmail(selectedIds, 'work');
                          setSelectedIds([]);
                          setIsBulkMoveDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                        <span>{isAr ? 'المعاملات والتنمية (Core)' : 'Work (Core)'}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onMoveEmail) onMoveEmail(selectedIds, 'quantum');
                          setSelectedIds([]);
                          setIsBulkMoveDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                      >
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        <span>{isAr ? 'العقد الكمومية (PQC AI)' : 'Quantum'}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onMoveEmail) onMoveEmail(selectedIds, 'vips');
                          setSelectedIds([]);
                          setIsBulkMoveDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                      >
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isAr ? 'الهيئات والجهات (VIP)' : 'VIPs'}</span>
                      </button>

                      {/* Custom Folders */}
                      {customFolders.length > 0 && (
                        <div className="pt-1 border-t border-slate-800 space-y-0.5">
                          <p className="px-2 py-0.5 text-[9px] font-mono text-slate-500 uppercase">
                            {isAr ? 'المجلدات المخصصة' : 'Custom Folders'}
                          </p>
                          {customFolders.map((cf) => (
                            <button
                              key={cf.id}
                              onClick={() => {
                                if (onMoveEmail) onMoveEmail(selectedIds, cf.id);
                                setSelectedIds([]);
                                setIsBulkMoveDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                            >
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: cf.color || '#06b6d4' }}
                              />
                              <span className="truncate">{cf.name}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Create New Folder from selection */}
                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setQuickFolderTargetEmailIds(selectedIds);
                            setQuickFolderName('');
                            setIsQuickFolderModalOpen(true);
                            setIsBulkMoveDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-medium text-left transition-colors"
                        >
                          <FolderPlus className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{isAr ? '+ مجلد مخصص جديد...' : '+ New Custom Folder...'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  onClick={() => setFilterTab('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterTab === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
                <button
                  onClick={() => setFilterTab('unread')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterTab === 'unread'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {isAr ? 'غير مقروء' : 'Unread'}
                </button>
                <button
                  onClick={() => setFilterTab('starred')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterTab === 'starred'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {isAr ? 'مميز' : 'Starred'}
                </button>
                <button
                  onClick={() => setFilterTab('verified')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterTab === 'verified'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {isAr ? 'نطاق موثق' : 'Verified Domain'}
                </button>
              </div>
            )}
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            {sortedEmails.length} {isAr ? 'رسالة' : 'messages'}
          </span>
        </div>

        {/* Sorting Controls Bar: Date, Importance, Sender Name */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900/80 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'الترتيب حسب:' : 'Sort by:'}</span>
            </span>

            {/* Date Sort Toggle */}
            <button
              id="sort-btn-date"
              onClick={() => handleSortChange('date')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                sortBy === 'date'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
              title={
                isAr
                  ? `الترتيب حسب التاريخ (${sortDirection === 'desc' ? 'الأحدث أولاً' : 'الأقدم أولاً'}) - انقر للتبديل`
                  : `Sort by Date (${sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}) - Click to toggle`
              }
            >
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{isAr ? 'التاريخ' : 'Date'}</span>
              {sortBy === 'date' && (
                sortDirection === 'desc' ? (
                  <ArrowDown className="w-3 h-3 text-cyan-300" />
                ) : (
                  <ArrowUp className="w-3 h-3 text-cyan-300" />
                )
              )}
            </button>

            {/* Importance Sort Toggle */}
            <button
              id="sort-btn-importance"
              onClick={() => handleSortChange('importance')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                sortBy === 'importance'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
              title={
                isAr
                  ? `الترتيب حسب الأهمية (${sortDirection === 'desc' ? 'الأعلى أهمية أولاً' : 'الأقل أهمية أولاً'}) - انقر للتبديل`
                  : `Sort by Importance (${sortDirection === 'desc' ? 'Highest first' : 'Lowest first'}) - Click to toggle`
              }
            >
              <AlertCircle className="w-3 h-3 text-amber-400" />
              <span>{isAr ? 'الأهمية' : 'Importance'}</span>
              {sortBy === 'importance' && (
                sortDirection === 'desc' ? (
                  <ArrowDown className="w-3 h-3 text-amber-300" />
                ) : (
                  <ArrowUp className="w-3 h-3 text-amber-300" />
                )
              )}
            </button>

            {/* Sender Name Sort Toggle */}
            <button
              id="sort-btn-sender"
              onClick={() => handleSortChange('sender')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                sortBy === 'sender'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
              title={
                isAr
                  ? `الترتيب حسب اسم المرسل (${sortDirection === 'asc' ? 'أبجدياً أ-ي' : 'أبجدياً ي-أ'}) - انقر للتبديل`
                  : `Sort by Sender Name (${sortDirection === 'asc' ? 'A-Z' : 'Z-A'}) - Click to toggle`
              }
            >
              <User className="w-3 h-3 text-purple-400" />
              <span>{isAr ? 'اسم المرسل' : 'Sender'}</span>
              {sortBy === 'sender' && (
                sortDirection === 'asc' ? (
                  <ArrowDown className="w-3 h-3 text-purple-300" />
                ) : (
                  <ArrowUp className="w-3 h-3 text-purple-300" />
                )
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Mode Toggle: Condensed Snippet View (First 2 Lines) vs Compact */}
            <button
              id="toggle-snippet-view-btn"
              onClick={() => setViewMode((prev) => (prev === 'snippet' ? 'compact' : 'snippet'))}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono border transition-all ${
                viewMode === 'snippet'
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
              title={
                isAr
                  ? (viewMode === 'snippet' ? 'وضع المقتطفات (سطران) نشط - انقر للوضع المضغوط' : 'الوضع المضغوط نشط - انقر لعرض أول سطرين من الرسالة')
                  : (viewMode === 'snippet' ? 'Condensed Snippet View (2 lines) - Click for compact' : 'Compact View (1 line) - Click for 2-line snippets')
              }
            >
              <AlignLeft className="w-3 h-3 text-cyan-400" />
              <span>
                {viewMode === 'snippet' 
                  ? (isAr ? 'مقتطف (سطران)' : 'Snippet (2L)') 
                  : (isAr ? 'موجز (سطر)' : 'Compact (1L)')}
              </span>
            </button>

            {/* Sort Direction Indicator Button */}
            <button
              id="sort-btn-direction-toggle"
              onClick={toggleDirection}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition-colors"
              title={isAr ? 'عكس اتجاه الترتيب' : 'Toggle sort direction'}
            >
              <span>{getSortDirectionText()}</span>
              {sortDirection === 'desc' ? (
                <ArrowDown className="w-3 h-3 text-cyan-400" />
              ) : (
                <ArrowUp className="w-3 h-3 text-cyan-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Email List Items Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-900/60 custom-scrollbar">
        {sortedEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-3">
            <MailOpen className="w-12 h-12 text-slate-700 stroke-[1.5]" />
            <div>
              <p className="font-semibold text-slate-300">
                {isAr ? `لا توجد رسائل في ${folderName}` : `No emails in ${folderName}`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? 'جرّب مسح عوامل التصفية أو التحقق من مجلدات أخرى.' : 'Try clearing filters or checking other folders.'}
              </p>
            </div>
          </div>
        ) : (
          sortedEmails.map((email) => {
            const isSelected = selectedEmailId === email.id;
            const isChecked = selectedIds.includes(email.id);
            const isDragging = draggingEmailId === email.id;
            const customFolderObj = customFolders.find((cf) => cf.id === email.folder);

            return (
              <div
                key={email.id}
                draggable={true}
                onDragStart={(e) => {
                  const ids = selectedIds.includes(email.id) ? selectedIds : [email.id];
                  e.dataTransfer.setData('text/plain', email.id);
                  e.dataTransfer.setData(
                    'application/json',
                    JSON.stringify({
                      emailId: email.id,
                      subject: email.subject,
                      selectedIds: ids,
                    })
                  );
                  e.dataTransfer.effectAllowed = 'move';
                  setDraggingEmailId(email.id);
                }}
                onDragEnd={() => setDraggingEmailId(null)}
                onClick={() => onSelectEmail(email.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const x = Math.min(e.clientX, window.innerWidth - 260);
                  const y = Math.min(e.clientY, window.innerHeight - 380);
                  setContextMenu({
                    x,
                    y,
                    email,
                    showMoveSubmenu: true,
                  });
                }}
                className={`group relative flex items-start gap-2.5 p-3.5 cursor-pointer transition-all border-l-2 select-none ${
                  isDragging
                    ? 'opacity-40 border-dashed border-cyan-400 bg-cyan-950/20'
                    : isSelected
                    ? 'bg-cyan-950/40 border-l-cyan-400 text-slate-100'
                    : !email.isRead
                    ? 'bg-slate-900/60 border-l-blue-500 text-slate-100 font-medium'
                    : 'bg-slate-950 hover:bg-slate-900/40 border-l-transparent text-slate-300'
                }`}
              >
                {/* Drag Handle & Select Checkbox & Star */}
                <div className="flex items-center gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
                  <div 
                    className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 p-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                    title={isAr ? 'اسحب لنقل هذه الرسالة إلى أي مجلد' : 'Drag to move to any folder'}
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                  </div>
                  <button
                    onClick={(e) => toggleSelectOne(email.id, e)}
                    className="text-slate-600 hover:text-cyan-400"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => onToggleStar(email.id, e)}
                    className="text-slate-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        email.isStarred ? 'text-amber-400 fill-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Avatar */}
                <div className="relative flex-shrink-0 pt-0.5">
                  <img
                    src={
                      email.senderAvatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(email.senderName)}&background=0284c7&color=fff`
                    }
                    alt={email.senderName}
                    className="w-9 h-9 rounded-full object-cover border border-slate-800"
                  />
                  {email.securityStatus?.isVerifiedDomain && (
                    <span
                      title="Verified @anhkmail.anhk Domain"
                      className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950 text-cyan-400 border border-slate-800"
                    >
                      <ShieldCheck className="w-3 h-3 fill-cyan-950" />
                    </span>
                  )}
                </div>

                {/* Email Body Content Snippet */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`text-xs truncate ${!email.isRead ? 'font-bold text-slate-100' : 'text-slate-300'} ${sortBy === 'sender' ? 'text-purple-200 font-semibold' : ''}`}>
                        {email.senderName}
                      </span>
                      {sortBy === 'importance' && getImportanceScore(email) >= 50 && (
                        <span 
                          className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 flex items-center gap-0.5"
                          title={isAr ? 'رسالة ذات أولوية عليا' : 'High importance email'}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{isAr ? 'أولوية' : 'Priority'}</span>
                        </span>
                      )}
                      {email.securityStatus?.riskLevel === 'High Threat' && (
                        <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-0.5">
                          <ShieldAlert className="w-2.5 h-2.5" /> SPAM
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono flex-shrink-0 ${sortBy === 'date' ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                      {email.timestamp}
                    </span>
                  </div>

                  <h3 className={`text-xs truncate ${!email.isRead ? 'font-semibold text-slate-100' : 'text-slate-300'}`}>
                    {email.subject}
                  </h3>

                  {/* Condensed 'Snippet' View: Shows first 2 lines of the email body */}
                  <p 
                    className={`text-xs text-slate-400 font-sans leading-relaxed break-words ${
                      viewMode === 'snippet' ? 'line-clamp-2' : 'line-clamp-1'
                    }`}
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: viewMode === 'snippet' ? 2 : 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {getEmailSnippet(email.body)}
                  </p>

                  {/* Labels, Custom Folder Badges and Attachment Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {/* Custom Folder Chip */}
                    {customFolderObj && (
                      <span 
                        className="px-1.5 py-0.5 text-[9px] font-mono rounded flex items-center gap-1 border shadow-sm font-semibold"
                        style={{ 
                          borderColor: `${customFolderObj.color || '#06b6d4'}40`,
                          backgroundColor: `${customFolderObj.color || '#06b6d4'}18`,
                          color: customFolderObj.color || '#06b6d4' 
                        }}
                      >
                        <Folder className="w-2.5 h-2.5" />
                        <span>{customFolderObj.name}</span>
                      </span>
                    )}

                    {email.labels.map((label) => (
                      <span
                        key={label}
                        className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {label}
                      </span>
                    ))}

                    {(email.attachments?.length || 0) > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-blue-950/80 text-blue-300 border border-blue-800 flex items-center gap-1">
                        <Paperclip className="w-2.5 h-2.5" />
                        {email.attachments?.length} file
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Quick Action Buttons */}
                <div
                  className="absolute right-3 top-3 hidden sm:group-hover:flex items-center gap-1 p-1 rounded-lg bg-slate-900/95 border border-slate-800 shadow-md backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Move to... quick button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      setContextMenu({
                        x: Math.min(rect.left, window.innerWidth - 260),
                        y: Math.min(rect.bottom + 6, window.innerHeight - 380),
                        email,
                        showMoveSubmenu: true,
                      });
                    }}
                    title={isAr ? 'نقل إلى مجلد... (Move to...)' : 'Move to folder...'}
                    className="p-1 text-slate-400 hover:text-cyan-400 rounded icon-hover-active"
                  >
                    <FolderInput className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => onToggleRead(email.id, e)}
                    title={email.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    className="p-1 text-slate-400 hover:text-cyan-400 rounded icon-hover-active"
                  >
                    {email.isRead ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={(e) => onArchiveEmail(email.id, e)}
                    title="Archive"
                    className="p-1 text-slate-400 hover:text-cyan-400 rounded icon-hover-active"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onMarkSpam(email.id, e)}
                    title="Report Spam"
                    className="p-1 text-slate-400 hover:text-amber-400 rounded icon-hover-active"
                  >
                    <AlertOctagon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onDeleteEmail(email.id, e)}
                    title="Delete"
                    className="p-1 text-slate-400 hover:text-rose-400 rounded icon-hover-active"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Context Menu with "Move to..." Submenu */}
      {contextMenu && (
        <div
          className="fixed z-50 w-64 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-1.5 text-xs text-slate-200 animate-in fade-in zoom-in-95 backdrop-blur-md space-y-1"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2.5 py-1.5 border-b border-slate-800 flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-400 truncate max-w-[170px]">
              {contextMenu.email.subject || (isAr ? 'رسالة' : 'Email')}
            </span>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1 py-0.2 rounded border border-cyan-800">
              {isAr ? 'إجراءات' : 'Actions'}
            </span>
          </div>

          {/* Move to... Group Header */}
          <div className="px-2 py-1 flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
            <FolderInput className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'نقل إلى مجلد... (Move to...)' : 'Move to...'}</span>
          </div>

          {/* Move To Destinations */}
          <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-0.5">
            {/* Standard Folders */}
            <button
              onClick={() => {
                if (onMoveEmail) onMoveEmail(contextMenu.email.id, 'inbox');
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{isAr ? 'صندوق الوارد (Inbox)' : 'Inbox'}</span>
            </button>

            <button
              onClick={() => {
                if (onMoveEmail) onMoveEmail(contextMenu.email.id, 'archive');
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Archive className="w-3.5 h-3.5 text-slate-400" />
              <span>{isAr ? 'الأرشيف المشفر (Archive)' : 'Archive'}</span>
            </button>

            <button
              onClick={() => {
                if (onMoveEmail) onMoveEmail(contextMenu.email.id, 'work');
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>{isAr ? 'المعاملات والتنمية (Core)' : 'Work (Core)'}</span>
            </button>

            <button
              onClick={() => {
                if (onMoveEmail) onMoveEmail(contextMenu.email.id, 'quantum');
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAr ? 'العقد الكمومية (PQC AI)' : 'Quantum PQC'}</span>
            </button>

            <button
              onClick={() => {
                if (onMoveEmail) onMoveEmail(contextMenu.email.id, 'vips');
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'الهيئات والجهات (VIP)' : 'VIPs'}</span>
            </button>

            {/* Custom Folders in Context Menu */}
            {customFolders.length > 0 && (
              <div className="pt-1 border-t border-slate-800 space-y-0.5">
                <p className="px-2.5 py-0.5 text-[9px] font-mono text-slate-400 uppercase">
                  {isAr ? 'المجلدات المخصصة' : 'Custom Folders'}
                </p>
                {customFolders.map((cf) => (
                  <button
                    key={cf.id}
                    onClick={() => {
                      if (onMoveEmail) onMoveEmail(contextMenu.email.id, cf.id);
                      setContextMenu(null);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cf.color || '#06b6d4' }}
                    />
                    <Folder className="w-3.5 h-3.5" style={{ color: cf.color || '#06b6d4' }} />
                    <span className="truncate">{cf.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Create New Folder from Context Menu */}
            <div className="pt-1 border-t border-slate-800">
              <button
                onClick={() => {
                  setQuickFolderTargetEmailIds([contextMenu.email.id]);
                  const cleanSubject = contextMenu.email.subject.replace(/^(re:|fwd:|fw:)\s*/i, '').trim();
                  setQuickFolderName(cleanSubject.slice(0, 24) || (isAr ? 'مجلد جديد' : 'New Folder'));
                  setIsQuickFolderModalOpen(true);
                  setContextMenu(null);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-medium text-left transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAr ? '+ إنشاء مجلد جديد ونقل...' : '+ Create New Folder & Move...'}</span>
              </button>
            </div>
          </div>

          {/* Other Standard Actions */}
          <div className="pt-1 border-t border-slate-800 space-y-0.5">
            <button
              onClick={(e) => {
                onToggleStar(contextMenu.email.id, e);
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 text-left transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>{contextMenu.email.isStarred ? (isAr ? 'إزالة النجمة' : 'Unstar') : (isAr ? 'تمييز بنجمة' : 'Star')}</span>
            </button>
            <button
              onClick={(e) => {
                onToggleRead(contextMenu.email.id, e);
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              {contextMenu.email.isRead ? <Mail className="w-3.5 h-3.5 text-slate-400" /> : <MailOpen className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{contextMenu.email.isRead ? (isAr ? 'تحديد كغير مقروء' : 'Mark as unread') : (isAr ? 'تحديد كمقروء' : 'Mark as read')}</span>
            </button>
            <button
              onClick={(e) => {
                onArchiveEmail(contextMenu.email.id, e);
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left transition-colors"
            >
              <Archive className="w-3.5 h-3.5 text-slate-400" />
              <span>{isAr ? 'أرشفة الرسالة' : 'Archive email'}</span>
            </button>
            <button
              onClick={(e) => {
                onDeleteEmail(contextMenu.email.id, e);
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-rose-400 text-left transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>{isAr ? 'نقل إلى سلة المحذوفات' : 'Move to trash'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Create Custom Folder Modal from Context Menu or Toolbar */}
      {isQuickFolderModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setIsQuickFolderModalOpen(false)}
        >
          <div 
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-cyan-500/40 p-5 text-slate-100 shadow-[0_0_30px_rgba(6,182,212,0.25)] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <FolderPlus className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'إنشاء مجلد مخصص ونقل الرسائل' : 'Create Custom Folder & Move'}</span>
              </div>
              <button
                onClick={() => setIsQuickFolderModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {quickFolderTargetEmailIds.length > 0 && (
              <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2">
                <FolderInput className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
                <div>
                  <span className="font-bold">
                    {isAr ? `سيتم نقل ${quickFolderTargetEmailIds.length} رسالة إلى هذا المجلد فور إنشائه:` : `Moving ${quickFolderTargetEmailIds.length} email(s) into this new folder:`}
                  </span>
                </div>
              </div>
            )}

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!quickFolderName.trim()) return;
                if (onCreateCustomFolder) {
                  onCreateCustomFolder(
                    quickFolderName.trim(),
                    quickFolderColor,
                    quickFolderTargetEmailIds.length > 0 ? quickFolderTargetEmailIds : undefined
                  );
                }
                setIsQuickFolderModalOpen(false);
                setQuickFolderName('');
                setQuickFolderTargetEmailIds([]);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {isAr ? 'اسم المجلد المخصص:' : 'Folder Name:'}
                </label>
                <input
                  type="text"
                  autoFocus
                  value={quickFolderName}
                  onChange={(e) => setQuickFolderName(e.target.value)}
                  placeholder={isAr ? 'مثال: العقود السيادية، المعاملات، الفواتير...' : 'e.g. Contracts, Invoices...'}
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
                      onClick={() => setQuickFolderColor(c.hex)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        quickFolderColor === c.hex ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {quickFolderColor === c.hex && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsQuickFolderModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!quickFolderName.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
                >
                  {isAr ? 'إنشاء ونقل الرسائل' : 'Create & Move'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

