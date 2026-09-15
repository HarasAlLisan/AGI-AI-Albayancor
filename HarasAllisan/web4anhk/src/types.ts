export interface CustomFolder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt?: string;
}

export type FolderType = 
  | 'inbox' 
  | 'starred' 
  | 'sent' 
  | 'drafts' 
  | 'archive' 
  | 'spam' 
  | 'trash'
  | 'work'
  | 'quantum'
  | 'vips'
  | (string & {});

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'code' | 'zip' | 'doc';
  url?: string;
}

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  senderAvatar?: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  timestamp: string;
  dateStr: string;
  folder: FolderType;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isEncrypted?: boolean;
  labels: string[];
  attachments?: Attachment[];
  securityStatus?: {
    isVerifiedDomain: boolean;
    threatScore: number; // 0-100
    riskLevel: 'Verified Safe' | 'Low Risk' | 'Low Risk External' | 'Moderate Risk' | 'High Threat' | string;
    encryption: 'Quantum-Key AES-256' | 'TLS 1.3' | 'Unencrypted' | string;
  };
  replies?: EmailReply[];
}

export interface EmailReply {
  id: string;
  senderName: string;
  senderEmail: string;
  senderAvatar?: string;
  timestamp: string;
  body: string;
  requestReadReceipt?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  domainVerified: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  domain: string;
  avatar: string;
  signature: string;
  usedStorage: string; // e.g., "3.8 GB"
  maxStorage: string;  // e.g., "15 GB"
  language?: 'ar' | 'en';
  instanceId?: string;
  establishedAt?: string;
  avatarSource?: 'phone' | 'url' | 'preset' | 'default';
}

export interface AnhkProtocolStatus {
  sovereignBlock: string; // 24,000,000,000,000 ☥
  stabilizationValue: string; // 1 ANKH Pound = 516.3636363 Hejazi Riyal
  operatingSystem: string; // Web4Ankh 256 / Almahdi 256
  hashProof: string; // AdamHash Golden Block
  nodeDistribution: string; // 2,666.66 ☥ per 9B node
  signatureM5: string; // M5 28612030103352
  centralBankName: string; // مصرف بيت المال المركزي - المملكة الحجازية
  continentsScope: string; // 7 قارات + 1
  clearingEngine: string; // يسيل وفق مقاصة مظبوطة
  m3Formula: string; // M3 = 14 - 2 (12 جنيه عنخ للحَيّ)
  m4Ratio: string; // M4 = 2 / 8 (ثابت محسوب مخصص على 8 قطاعات)
  m3WorldFormula: string; // M3 world = 14 * عدد الأحياء = عدد جنيهات عنخ * 1200$
  dollarValuation: string; // 1 جنيه عنخ = 1,200 $
  livingHumanQuota: string; // 12 ☥ للحَيّ
  infrastructureQuota: string; // 2 ☥ للبنية (أنت + نقاط العتاد المادي في 7 قارات + 1)
  nanoAnhkUnit: string; // 1 جنيه عنخ = 1,000,000 نانو عنخ
  goldWeightSpec: string; // 7 جرام ذهب عيار 24
  exchangeBasketSpec: string; // 1,200$ أو (3 × 400$ + استرليني + يورو)
  bankGeographicNode: string; // عقدة البنك الجغرافية لكل M3 لدولة العملة الورقية المركزية
  paperPrintingLimit: string; // حد طباعة الورق المكسيموم
  vaultPhysicalInventory: string; // جرد الصناديق بالورق
  nodeDeficitReconciliation: string; // مطابقة العجز على العقدة
  clearingAuditEngine: string; // محرك المقاصة والجرد اللحظي
}

export interface SmartReplyResponse {
  replies: string[];
}

export interface AISummaryResponse {
  summary: string;
  keyTakeaways: string[];
  actionItems: string[];
}

export interface SpamCheckResponse {
  isSuspicious: boolean;
  threatScore: number;
  riskLevel: string;
  highlights: string[];
  reasoning: string;
}

export interface AIComposeResponse {
  subject: string;
  body: string;
}

export type ThemeMode = 'dark-cyber' | 'dark-clean' | 'light-minimal';

export interface SovereignAlgebraState {
  matrix18Active: boolean;
  matrix28Active: boolean;
  selectedLetter?: string;
  repunitSequence?: string;
  clearing14: {
    livingSouls: number;
    m3PerPerson: number;
    m4PerPerson: number;
    totalAnhk: number;
  };
}
