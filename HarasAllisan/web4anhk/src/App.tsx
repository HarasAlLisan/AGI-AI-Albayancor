import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { ComposerModal } from './components/ComposerModal';
import { ContactsModal } from './components/ContactsModal';
import { SettingsModal } from './components/SettingsModal';
import { AnhkProtocolModal } from './components/AnhkProtocolModal';
import { M3WalletModal } from './components/M3WalletModal';
import { SecurityAuditModal } from './components/SecurityAuditModal';
import { SymbolicAlgebraModal } from './components/SymbolicAlgebraModal';
import { SovereignNationalIdModal } from './components/SovereignNationalIdModal';
import { PhoneServerNetworkModal } from './components/PhoneServerNetworkModal';
import { GlobalDisarmamentLedgerModal } from './components/GlobalDisarmamentLedgerModal';
import { LatticeMatrixVisualizerModal } from './components/LatticeMatrixVisualizerModal';
import { ProofOfWorkCalculator } from './components/ProofOfWorkCalculator';
import { M6InterconnectGuardModal } from './components/M6InterconnectGuardModal';
import { HeptagonalMatrixControllerModal } from './components/HeptagonalMatrixControllerModal';
import { ExovawareNetworkHubModal, ExovawareAppItem } from './components/ExovawareNetworkHubModal';
import { SocialAnhkNetworkModal } from './components/SocialAnhkNetworkModal';
import { HarisAlLisanModal } from './components/HarisAlLisanModal';
import { Sovereign195CountriesModal } from './components/Sovereign195CountriesModal';
import { AnhkNodeClusterLiveDashboard } from './components/AnhkNodeClusterLiveDashboard';
import {
  verifyGithubRepoConnection,
  startGithubPeriodicSync,
  GithubSyncStatus,
  GITHUB_TARGET_REPO,
  DEFAULT_GITHUB_TOKEN
} from './utils/githubSync';
import {
  INITIAL_HEPTAGONAL_LAYERS,
  computeGlobalSecurityFromMatrix,
  HeptagonalMatrixState,
  LayerLevel
} from './data/heptagonalMatrixEngine';
import { INITIAL_EMAILS, INITIAL_CONTACTS } from './data/mockEmails';
import { Email, FolderType, Contact, UserProfile, ThemeMode } from './types';
import { useUser } from './context/UserContext';

export default function App() {
  // Global User Profile Context
  const { user, updateUser } = useUser();

  // Persistence in LocalStorage
  const [emails, setEmails] = useState<Email[]>(() => {
    const saved = localStorage.getItem('anhk_webmail_emails');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('anhk_webmail_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const saved = localStorage.getItem('anhk_webmail_lang');
    return (saved as 'ar' | 'en') || 'ar';
  });

  const [theme, setTheme] = useState<ThemeMode>('dark-cyber');
  const [currentFolder, setCurrentFolder] = useState<FolderType>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>('email-201');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterLabel, setActiveFilterLabel] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerPrefill, setComposerPrefill] = useState({ to: '', subject: '', body: '' });
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAnhkProtocolOpen, setIsAnhkProtocolOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSecurityAuditOpen, setIsSecurityAuditOpen] = useState(false);
  const [isSymbolicAlgebraOpen, setIsSymbolicAlgebraOpen] = useState(false);
  const [isPoWCalculatorOpen, setIsPoWCalculatorOpen] = useState(false);
  const [isNationalIdModalOpen, setIsNationalIdModalOpen] = useState(false);
  const [isPhoneNetworkOpen, setIsPhoneNetworkOpen] = useState(false);
  const [isDisarmamentOpen, setIsDisarmamentOpen] = useState(false);
  const [isLatticeMatrixOpen, setIsLatticeMatrixOpen] = useState(false);
  const [isM6GuardOpen, setIsM6GuardOpen] = useState(false);
  const [isHeptagonalMatrixControllerOpen, setIsHeptagonalMatrixControllerOpen] = useState(false);
  const [isExovawareHubOpen, setIsExovawareHubOpen] = useState(false);
  const [isSocialAnhkOpen, setIsSocialAnhkOpen] = useState(false);
  const [isHarisAlLisanOpen, setIsHarisAlLisanOpen] = useState(false);
  const [harisAlLisanInitialTab, setHarisAlLisanInitialTab] = useState<string | undefined>(undefined);
  const [is195CountriesOpen, setIs195CountriesOpen] = useState(false);
  const [isNodeClusterOpen, setIsNodeClusterOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleOpenGithubSync = () => {
    setHarisAlLisanInitialTab('github_albayancor_sync');
    setIsHarisAlLisanOpen(true);
  };

  const setIsGithubStatusDashboardOpen = (open: boolean) => {
    if (open) {
      handleOpenGithubSync();
    }
  };

  // Synchronization Utility: Periodically verifies connection status with 'HarasAlLisan/AGI-AI-Albayancor'
  const [githubSyncStatus, setGithubSyncStatus] = useState<GithubSyncStatus>({
    repo: GITHUB_TARGET_REPO,
    repoUrl: `https://github.com/${GITHUB_TARGET_REPO}`,
    isConnected: false,
    state: 'checking',
    lastChecked: null,
  });

  const handleReverifyGithub = async () => {
    setGithubSyncStatus((prev) => ({ ...prev, state: 'checking' }));
    try {
      const updated = await verifyGithubRepoConnection(DEFAULT_GITHUB_TOKEN, GITHUB_TARGET_REPO);
      setGithubSyncStatus(updated);
    } catch (e) {
      console.warn('Manual GitHub verification encountered error:', e);
      setGithubSyncStatus((prev) => ({ ...prev, state: 'error' }));
    }
  };

  useEffect(() => {
    // Periodically verify connection with 'HarasAlLisan/AGI-AI-Albayancor' every 35 seconds
    const stopPeriodicSync = startGithubPeriodicSync({
      intervalMs: 35000,
      token: DEFAULT_GITHUB_TOKEN,
      repo: GITHUB_TARGET_REPO,
      onStatusChange: (status) => {
        setGithubSyncStatus(status);
      },
    });

    return () => {
      stopPeriodicSync();
    };
  }, []);

  // Heptagonal Matrix (M1-M7) State with LocalStorage Persistence
  const [matrixState, setMatrixState] = useState<HeptagonalMatrixState>(() => {
    const saved = localStorage.getItem('anhk_heptagonal_matrix_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch {
        return computeGlobalSecurityFromMatrix({
          M1: true,
          M2: true,
          M3: true,
          M4: true,
          M5: true,
          M6: true,
          M7: true
        });
      }
    }
    return computeGlobalSecurityFromMatrix({
      M1: true,
      M2: true,
      M3: true,
      M4: true,
      M5: true,
      M6: true,
      M7: true
    });
  });

  const handleToggleLayer = (level: LayerLevel) => {
    setMatrixState((prev) => {
      const newLayers = {
        ...prev.layers,
        [level]: !prev.layers[level]
      };
      const updated = computeGlobalSecurityFromMatrix(newLayers);
      localStorage.setItem('anhk_heptagonal_matrix_state', JSON.stringify(updated));
      return updated;
    });
  };

  const handleArmAllLayers = () => {
    const allArmed: Record<LayerLevel, boolean> = {
      M1: true,
      M2: true,
      M3: true,
      M4: true,
      M5: true,
      M6: true,
      M7: true
    };
    const updated = computeGlobalSecurityFromMatrix(allArmed);
    localStorage.setItem('anhk_heptagonal_matrix_state', JSON.stringify(updated));
    setMatrixState(updated);
  };

  const handleDisarmAllLayers = () => {
    const allDisarmed: Record<LayerLevel, boolean> = {
      M1: false,
      M2: false,
      M3: false,
      M4: false,
      M5: false,
      M6: false,
      M7: false
    };
    const updated = computeGlobalSecurityFromMatrix(allDisarmed);
    localStorage.setItem('anhk_heptagonal_matrix_state', JSON.stringify(updated));
    setMatrixState(updated);
  };

  const handleOpenExovawareAppAction = (actionKey: ExovawareAppItem['openActionKey']) => {
    setIsExovawareHubOpen(false);
    switch (actionKey) {
      case 'anhk_modal':
        setIsAnhkProtocolOpen(true);
        break;
      case 'wallet_modal':
        setIsWalletOpen(true);
        break;
      case 'symbolic_algebra':
        setIsSymbolicAlgebraOpen(true);
        break;
      case 'pow_calc':
        setIsPoWCalculatorOpen(true);
        break;
      case 'national_id':
        setIsNationalIdModalOpen(true);
        break;
      case 'phone_network':
        setIsPhoneNetworkOpen(true);
        break;
      case 'disarmament':
        setIsDisarmamentOpen(true);
        break;
      case 'lattice_matrix':
        setIsLatticeMatrixOpen(true);
        break;
      case 'm6_guard':
        setIsM6GuardOpen(true);
        break;
      case 'heptagonal_controller':
        setIsHeptagonalMatrixControllerOpen(true);
        break;
      case 'social_anhk':
        setIsSocialAnhkOpen(true);
        break;
      case 'security_audit':
        setIsSecurityAuditOpen(true);
        break;
      case 'haris_al_lisan':
        setIsHarisAlLisanOpen(true);
        break;
      default:
        break;
    }
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('anhk_webmail_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('anhk_webmail_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('anhk_webmail_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('anhk_webmail_lang', lang);
  }, [lang]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"], input[placeholder*="ابحث"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
      if (e.key.toLowerCase() === 'c' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        handleOpenComposer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter emails by current folder, search query & label filters
  const displayedEmails = useMemo(() => {
    return emails.filter((email) => {
      // Folder matching logic
      if (currentFolder === 'starred') {
        if (!email.isStarred) return false;
      } else if (currentFolder === 'archive') {
        if (!email.isArchived) return false;
      } else if (currentFolder === 'work') {
        if (!email.labels.includes('Work') && !email.labels.includes('DevOps') && !email.labels.includes('بيت-المال')) return false;
      } else if (currentFolder === 'quantum') {
        if (!email.labels.includes('ANHK-Core') && !email.labels.includes('AI-Powered') && !email.labels.includes('سيادي')) return false;
      } else if (currentFolder === 'vips') {
        if (!email.isStarred && !email.securityStatus?.isVerifiedDomain) return false;
      } else {
        if (email.folder !== currentFolder) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSender = email.senderName.toLowerCase().includes(q) || email.senderEmail.toLowerCase().includes(q);
        const matchesSubject = email.subject.toLowerCase().includes(q);
        const matchesBody = email.body.toLowerCase().includes(q);
        if (!matchesSender && !matchesSubject && !matchesBody) return false;
      }

      return true;
    });
  }, [emails, currentFolder, searchQuery]);

  // Compute folder counts
  const folderCounts = useMemo(() => {
    const counts: Record<string, { total: number; unread: number }> = {};
    const folders: FolderType[] = ['inbox', 'starred', 'sent', 'drafts', 'archive', 'spam', 'trash', 'work', 'quantum', 'vips'];

    folders.forEach((f) => {
      const match = emails.filter((email) => {
        if (f === 'starred') return email.isStarred;
        if (f === 'archive') return email.isArchived;
        if (f === 'work') return email.labels.includes('Work') || email.labels.includes('DevOps') || email.labels.includes('بيت-المال');
        if (f === 'quantum') return email.labels.includes('ANHK-Core') || email.labels.includes('AI-Powered') || email.labels.includes('سيادي');
        if (f === 'vips') return email.isStarred || email.securityStatus?.isVerifiedDomain;
        return email.folder === f;
      });
      counts[f] = {
        total: match.length,
        unread: match.filter((e) => !e.isRead).length,
      };
    });

    return counts;
  }, [emails]);

  // Get currently selected email
  const selectedEmail = useMemo(() => {
    return emails.find((e) => e.id === selectedEmailId) || null;
  }, [emails, selectedEmailId]);

  // Handlers
  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    // Mark as read when selected
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
    );
  };

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isStarred: !item.isStarred } : item))
    );
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: !item.isRead } : item))
    );
  };

  const handleDeleteEmail = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.folder === 'trash') {
            return null; // Permanently remove
          }
          return { ...item, folder: 'trash' };
        }
        return item;
      }).filter(Boolean) as Email[]
    );
    if (selectedEmailId === id) setSelectedEmailId(null);
  };

  const handleArchiveEmail = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isArchived: true, folder: 'archive' } : item))
    );
    if (selectedEmailId === id) setSelectedEmailId(null);
  };

  const handleMarkSpam = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, folder: 'spam' } : item))
    );
    if (selectedEmailId === id) setSelectedEmailId(null);
  };

  const handleSendEmail = (newEmailData: { recipientEmail: string; subject: string; body: string; attachments: any[] }) => {
    const isInternalAnhk = newEmailData.recipientEmail.includes('@anhkmail.anhk');
    const newMail: Email = {
      id: 'email-' + Date.now(),
      senderName: user.name,
      senderEmail: user.email,
      senderAvatar: user.avatar,
      recipientName: newEmailData.recipientEmail.split('@')[0],
      recipientEmail: newEmailData.recipientEmail,
      subject: newEmailData.subject,
      body: newEmailData.body,
      timestamp: 'الآن',
      dateStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      folder: 'sent',
      isRead: true,
      isStarred: false,
      isArchived: false,
      isEncrypted: true,
      labels: ['Sent', 'Web4-Outbound'],
      attachments: newEmailData.attachments,
      securityStatus: {
        isVerifiedDomain: isInternalAnhk,
        threatScore: 0,
        riskLevel: 'Verified Safe',
        encryption: 'Web4Ankh 256 / Almahdi 256',
      },
    };

    setEmails([newMail, ...emails]);
    setSelectedEmailId(newMail.id);
  };

  const handleSendReply = (emailId: string, replyText: string) => {
    setEmails((prev) =>
      prev.map((item) => {
        if (item.id === emailId) {
          const newReply = {
            id: 'rep-' + Date.now(),
            senderName: user.name,
            senderEmail: user.email,
            senderAvatar: user.avatar,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            body: replyText,
          };
          return {
            ...item,
            replies: [...(item.replies || []), newReply],
          };
        }
        return item;
      })
    );
  };

  const handleOpenComposer = (to = '', subject = '', body = '') => {
    setComposerPrefill({ to, subject, body });
    setIsComposerOpen(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    updateUser(updated);

    // Synchronize sender credentials in all outbound sent emails
    if (updated.name || updated.email || updated.avatar) {
      setEmails((prevEmails) => {
        const nextEmails = prevEmails.map((email) => {
          if (email.folder === 'sent' || email.senderEmail === user.email) {
            return {
              ...email,
              senderName: updated.name || email.senderName,
              senderEmail: updated.email || email.senderEmail,
              senderAvatar: updated.avatar || email.senderAvatar,
            };
          }
          return email;
        });
        try {
          localStorage.setItem('anhk_webmail_emails', JSON.stringify(nextEmails));
        } catch {
          // ignore
        }
        return nextEmails;
      });
    }
  };

  const unreadCount = folderCounts.inbox?.unread || 0;

  // Theme styling wrapper
  const themeClass =
    theme === 'dark-cyber'
      ? 'bg-slate-950 text-slate-100 dark'
      : theme === 'dark-clean'
      ? 'bg-zinc-950 text-zinc-100 dark'
      : 'bg-slate-100 text-slate-900';

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`w-screen h-screen flex flex-col font-sans overflow-hidden select-none ${themeClass}`}
    >
      {/* Top Header Navigation */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
        onOpenComposer={() => handleOpenComposer()}
        onOpenContacts={() => setIsContactsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAnhkModal={() => setIsAnhkProtocolOpen(true)}
        onOpenWalletModal={() => setIsWalletOpen(true)}
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
        onOpenSymbolicAlgebra={() => setIsSymbolicAlgebraOpen(true)}
        onOpenPoWCalculator={() => setIsPoWCalculatorOpen(true)}
        onOpenNationalIdModal={() => setIsNationalIdModalOpen(true)}
        onOpenPhoneNetwork={() => setIsPhoneNetworkOpen(true)}
        onOpenDisarmamentModal={() => setIsDisarmamentOpen(true)}
        onOpenM6GuardModal={() => setIsM6GuardOpen(true)}
        onOpenHeptagonalMatrixController={() => setIsHeptagonalMatrixControllerOpen(true)}
        onOpenExovawareHub={() => setIsExovawareHubOpen(true)}
        onOpenSocialAnhk={() => setIsSocialAnhkOpen(true)}
        onOpenHarisAlLisan={() => setIsHarisAlLisanOpen(true)}
        onOpenGithubSync={handleOpenGithubSync}
        onOpenGithubDashboard={() => setIsGithubStatusDashboardOpen(true)}
        onOpen195Countries={() => setIs195CountriesOpen(true)}
        onOpenNodeCluster={() => setIsNodeClusterOpen(true)}
        githubSyncStatus={githubSyncStatus}
        onReverifyGithub={handleReverifyGithub}
        activeLayerCount={matrixState.activeLayerCount}
        onOpenLatticeMatrix={() => setIsLatticeMatrixOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        activeFilterLabel={activeFilterLabel}
        setActiveFilterLabel={setActiveFilterLabel}
        unreadCount={unreadCount}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Left Sidebar */}
        <div className="hidden md:flex">
          <Sidebar
            currentFolder={currentFolder}
            setCurrentFolder={(f) => {
              setCurrentFolder(f);
              setSelectedIds([]);
            }}
            folderCounts={folderCounts}
            user={user}
            onOpenComposer={() => handleOpenComposer()}
            onOpenAIComposer={() => handleOpenComposer('', '', '')}
            onOpenWalletModal={() => setIsWalletOpen(true)}
            onOpenPhoneNetwork={() => setIsPhoneNetworkOpen(true)}
            onOpenDisarmamentModal={() => setIsDisarmamentOpen(true)}
            onOpenLatticeMatrix={() => setIsLatticeMatrixOpen(true)}
            onOpenHeptagonalMatrixController={() => setIsHeptagonalMatrixControllerOpen(true)}
            onOpenExovawareHub={() => setIsExovawareHubOpen(true)}
            onOpenSocialAnhk={() => setIsSocialAnhkOpen(true)}
            onOpenHarisAlLisan={() => setIsHarisAlLisanOpen(true)}
            onOpenGithubSync={handleOpenGithubSync}
            onOpenGithubDashboard={() => setIsGithubStatusDashboardOpen(true)}
            onOpen195Countries={() => setIs195CountriesOpen(true)}
            onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
            onOpenNodeCluster={() => setIsNodeClusterOpen(true)}
          />
        </div>

        {/* Mobile Left Sidebar Drawer Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative z-50 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-right duration-200">
              <Sidebar
                currentFolder={currentFolder}
                setCurrentFolder={(f) => {
                  setCurrentFolder(f);
                  setSelectedIds([]);
                  setIsMobileSidebarOpen(false);
                }}
                folderCounts={folderCounts}
                user={user}
                onOpenComposer={() => {
                  handleOpenComposer();
                  setIsMobileSidebarOpen(false);
                }}
                onOpenAIComposer={() => {
                  handleOpenComposer('', '', '');
                  setIsMobileSidebarOpen(false);
                }}
                onOpenWalletModal={() => {
                  setIsWalletOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenPhoneNetwork={() => {
                  setIsPhoneNetworkOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenDisarmamentModal={() => {
                  setIsDisarmamentOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenLatticeMatrix={() => {
                  setIsLatticeMatrixOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenHeptagonalMatrixController={() => {
                  setIsHeptagonalMatrixControllerOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenExovawareHub={() => {
                  setIsExovawareHubOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenSocialAnhk={() => {
                  setIsSocialAnhkOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenHarisAlLisan={() => {
                  setIsHarisAlLisanOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenGithubSync={() => {
                  handleOpenGithubSync();
                  setIsMobileSidebarOpen(false);
                }}
                onOpenGithubDashboard={() => {
                  setIsGithubStatusDashboardOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpen195Countries={() => {
                  setIs195CountriesOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenSecurityAudit={() => {
                  setIsSecurityAuditOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onOpenNodeCluster={() => {
                  setIsNodeClusterOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Email List View (Adaptive on mobile: shows email list by default, hides only when an email is actively opened) */}
        <div className={`w-full md:w-96 flex-shrink-0 flex flex-col ${selectedEmail && selectedEmailId ? 'hidden md:flex' : 'flex'}`}>
          <EmailList
            emails={displayedEmails}
            selectedEmailId={selectedEmailId}
            onSelectEmail={handleSelectEmail}
            onToggleStar={handleToggleStar}
            onToggleRead={handleToggleRead}
            onDeleteEmail={handleDeleteEmail}
            onArchiveEmail={handleArchiveEmail}
            onMarkSpam={handleMarkSpam}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            folderName={currentFolder}
            lang={lang}
          />
        </div>

        {/* Email Conversation Detail Reader (Adaptive on mobile: full screen only when selected) */}
        <div className={`flex-1 flex-col ${selectedEmail && selectedEmailId ? 'flex' : 'hidden md:flex'}`}>
          <EmailDetail
            email={selectedEmail}
            user={user}
            onClose={() => setSelectedEmailId(null)}
            onToggleStar={handleToggleStar}
            onDeleteEmail={handleDeleteEmail}
            onArchiveEmail={handleArchiveEmail}
            onSendReply={handleSendReply}
            onOpenComposerWithDraft={(to, sub, body) => handleOpenComposer(to, sub, body)}
            lang={lang}
          />
        </div>
      </div>


      {/* Composer Modal */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSendEmail={handleSendEmail}
        contacts={contacts}
        user={user}
        initialTo={composerPrefill.to}
        initialSubject={composerPrefill.subject}
        initialBody={composerPrefill.body}
      />

      {/* Contacts Modal */}
      <ContactsModal
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
        contacts={contacts}
        onAddContact={handleAddContact}
        onComposeTo={(email) => handleOpenComposer(email)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        theme={theme}
        setTheme={setTheme}
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
        lang={lang}
      />

      {/* ANHK Sovereign Protocol Modal */}
      <AnhkProtocolModal
        isOpen={isAnhkProtocolOpen}
        onClose={() => setIsAnhkProtocolOpen(false)}
        lang={lang}
        onOpen195Countries={() => {
          setIsAnhkProtocolOpen(false);
          setIs195CountriesOpen(true);
        }}
      />

      {/* M3 Sovereign Digital Wallet Modal */}
      <M3WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        lang={lang}
        user={user}
        onOpen195Countries={() => {
          setIsWalletOpen(false);
          setIs195CountriesOpen(true);
        }}
      />

      {/* Security, Identity & Cryptographic Audit Modal */}
      <SecurityAuditModal
        isOpen={isSecurityAuditOpen}
        onClose={() => setIsSecurityAuditOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        lang={lang}
      />

      {/* Sovereign Symbolic Algebra Engine Modal */}
      <SymbolicAlgebraModal
        isOpen={isSymbolicAlgebraOpen}
        onClose={() => setIsSymbolicAlgebraOpen(false)}
      />

      {/* Proof of Work Singularity & Zero-Trap Calculator Modal */}
      <ProofOfWorkCalculator
        isOpen={isPoWCalculatorOpen}
        onClose={() => setIsPoWCalculatorOpen(false)}
        lang={lang}
      />

      {/* Sovereign 14-Digit Biometric National ID Document Modal */}
      <SovereignNationalIdModal
        isOpen={isNationalIdModalOpen}
        onClose={() => setIsNationalIdModalOpen(false)}
        lang={lang}
      />

      {/* Living Human Phone-As-Server & Global Telecom Towers Authentication Modal */}
      <PhoneServerNetworkModal
        isOpen={isPhoneNetworkOpen}
        onClose={() => setIsPhoneNetworkOpen(false)}
        lang={lang}
        user={user}
      />

      {/* Global Reverse Engineering, Military Neutralization & Bank Deficits Ledger Modal */}
      <GlobalDisarmamentLedgerModal
        isOpen={isDisarmamentOpen}
        onClose={() => setIsDisarmamentOpen(false)}
        lang={lang}
        user={user}
      />

      {/* Sovereign Lattice Matrix, Symbolic Weights & Ring-LWE Visualizer Modal */}
      <LatticeMatrixVisualizerModal
        isOpen={isLatticeMatrixOpen}
        onClose={() => setIsLatticeMatrixOpen(false)}
        lang={lang}
      />

      {/* M6 Interconnect Guard & Heptagonal Matrix Modal */}
      <M6InterconnectGuardModal
        isOpen={isM6GuardOpen}
        onClose={() => setIsM6GuardOpen(false)}
        lang={lang}
        matrixState={matrixState}
        onToggleLayer={handleToggleLayer}
        onOpenController={() => setIsHeptagonalMatrixControllerOpen(true)}
      />

      {/* Heptagonal Matrix (M1-M7) Sovereign Security Controller Modal */}
      <HeptagonalMatrixControllerModal
        isOpen={isHeptagonalMatrixControllerOpen}
        onClose={() => setIsHeptagonalMatrixControllerOpen(false)}
        matrixState={matrixState}
        onToggleLayer={handleToggleLayer}
        onArmAllLayers={handleArmAllLayers}
        onDisarmAllLayers={handleDisarmAllLayers}
        onOpenM6Guard={() => setIsM6GuardOpen(true)}
        lang={lang}
      />

      {/* Exovaware Sovereign Applications Network Hub Modal */}
      <ExovawareNetworkHubModal
        isOpen={isExovawareHubOpen}
        onClose={() => setIsExovawareHubOpen(false)}
        lang={lang}
        matrixState={matrixState}
        onOpenAppAction={handleOpenExovawareAppAction}
      />

      {/* Social ANHK Sovereign Multi-Platform Network (WhatsApp / FB / Reels / Phone-as-Server) */}
      <SocialAnhkNetworkModal
        isOpen={isSocialAnhkOpen}
        onClose={() => setIsSocialAnhkOpen(false)}
        lang={lang}
        user={user}
        matrixState={matrixState}
        onOpenWallet={() => {
          setIsSocialAnhkOpen(false);
          setIsWalletOpen(true);
        }}
      />

      {/* Haris Al-Lisan (Tongue Guardian via Adam's Tongue) AGI AI Al-Bayan Core Modal */}
      <HarisAlLisanModal
        isOpen={isHarisAlLisanOpen}
        onClose={() => {
          setIsHarisAlLisanOpen(false);
          setHarisAlLisanInitialTab(undefined);
        }}
        lang={lang}
        user={user}
        initialTab={harisAlLisanInitialTab}
        onOpenWallet={() => {
          setIsHarisAlLisanOpen(false);
          setIsWalletOpen(true);
        }}
        onOpenNationalId={() => {
          setIsHarisAlLisanOpen(false);
          setIsNationalIdModalOpen(true);
        }}
        onOpenComposerWithDraft={(to, subject, body) => {
          setIsHarisAlLisanOpen(false);
          handleOpenComposer(to, subject, body);
        }}
      />

      {/* 195 Sovereign Countries (14 Locked - 0 Solvency - 15 July 2026 FX Rates) Modal */}
      <Sovereign195CountriesModal
        isOpen={is195CountriesOpen}
        onClose={() => setIs195CountriesOpen(false)}
        lang={lang}
      />

      {/* ANHK Node Cluster v4.2 Live Sovereign Dashboard (+1) Modal */}
      <AnhkNodeClusterLiveDashboard
        isOpen={isNodeClusterOpen}
        onClose={() => setIsNodeClusterOpen(false)}
        lang={lang}
      />
    </div>
  );
}

