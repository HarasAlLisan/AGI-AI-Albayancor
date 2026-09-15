import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Share2,
  Heart,
  Send,
  ShieldCheck,
  Radio,
  Server,
  Sparkles,
  Coins,
  Lock,
  Camera,
  Mic,
  Play,
  Pause,
  Flame,
  Globe,
  Wifi,
  User,
  Plus,
  Search,
  X,
  CheckCircle2,
  Layers,
  Activity,
  Compass,
  Repeat,
  Smile,
  Paperclip,
  MoreVertical,
  Volume2,
  Maximize2,
  Minimize2,
  RefreshCw,
  HardDrive,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types';
import { HeptagonalMatrixState } from '../data/heptagonalMatrixEngine';

interface SocialAnhkNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  user: UserProfile;
  matrixState: HeptagonalMatrixState;
  onOpenWallet?: () => void;
}

type SocialAppTab = 'chat' | 'feed' | 'reels' | 'stories' | 'nodeServer';
type DeviceFrameMode = 'ios' | 'android' | 'desktop';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  type: 'text' | 'voice' | 'gold_transfer' | 'image';
  amountAnhk?: number;
  voiceDuration?: string;
  isDeliveredP2P: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  isOnlineP2P: boolean;
  nodeIp: string;
}

interface SocialPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorBadge: string;
  timeAgo: string;
  content: string;
  mediaType?: 'image' | 'video_preview' | 'none';
  mediaUrl?: string;
  likes: number;
  tipsAnhk: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  nodeSignature: string;
  tags: string[];
}

interface SocialReel {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  caption: string;
  likes: number;
  tipsAnhk: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  soundName: string;
  category: string;
  bgColor: string;
  videoTitle: string;
  tags: string[];
}

interface SocialStory {
  id: string;
  userName: string;
  userAvatar: string;
  hasUnseen: boolean;
  storyImage: string;
  caption: string;
  time: string;
}

export const SocialAnhkNetworkModal: React.FC<SocialAnhkNetworkModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  user,
  matrixState,
  onOpenWallet
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<SocialAppTab>('chat');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameMode>('ios');
  
  // Real-time Phone-as-a-Server State
  const [nodeStorageUsed, setNodeStorageUsed] = useState<number>(3.42); // GB
  const [p2pActivePeers, setP2pActivePeers] = useState<number>(142);
  const [bandwidthShared, setBandwidthShared] = useState<number>(18.6); // MB/s
  const [whiteDataBlocks, setWhiteDataBlocks] = useState<number>(918420);

  // Chat State
  const [activeChatContactId, setActiveChatContactId] = useState<string>('c1');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    c1: [
      {
        id: 'm1',
        senderId: 'c1',
        senderName: 'م. مصطفى الشامي (حراسة M6)',
        senderAvatar: '🛡️',
        text: 'السلام عليكم ورحمة الله، تم تفعيل ربط الهاتف كخادم لامركزي وحظر التتبع الرأسمالي بالكامل.',
        timestamp: '10:42 ص',
        isMe: false,
        type: 'text',
        isDeliveredP2P: true
      },
      {
        id: 'm2',
        senderId: 'me',
        senderName: user.name,
        senderAvatar: '👤',
        text: 'وعليكم السلام، ممتاز! هل البيانات البيضاء مشفرة بـ Ring-LWE 256 مع التخزين المحلي فقط؟',
        timestamp: '10:43 ص',
        isMe: true,
        type: 'text',
        isDeliveredP2P: true
      },
      {
        id: 'm3',
        senderId: 'c1',
        senderName: 'م. مصطفى الشامي (حراسة M6)',
        senderAvatar: '🛡️',
        text: 'نعم بالتأكيد! لا يوجد أي خادم وسيط يجمع بياناتك أو يبيع إعلانات. أرسلت لك تحويلاً سيادياً عبر الشبكة.',
        timestamp: '10:45 ص',
        isMe: false,
        type: 'gold_transfer',
        amountAnhk: 2.5,
        isDeliveredP2P: true
      }
    ],
    c2: [
      {
        id: 'm4',
        senderId: 'c2',
        senderName: 'د. كريم رضوان (شبكة 77M)',
        senderAvatar: '📡',
        text: 'أهلاً بك! عقدتك متصلة الآن مع 142 برجاً لاسلكياً ضمن حوض النيل والشرق الأوسط بسرعة فائقة.',
        timestamp: '09:15 ص',
        isMe: false,
        type: 'text',
        isDeliveredP2P: true
      }
    ]
  });

  const chatContacts: ChatContact[] = [
    {
      id: 'c1',
      name: 'م. مصطفى الشامي (حراسة M6)',
      avatar: '🛡️',
      status: 'متصل كخادم P2P • مشفر',
      lastMessage: 'أرسل تحويلاً سيادياً (2.5 ☥)',
      lastTime: '10:45 ص',
      unread: 0,
      isOnlineP2P: true,
      nodeIp: '192.168.4.118:918'
    },
    {
      id: 'c2',
      name: 'د. كريم رضوان (شبكة 77M)',
      avatar: '📡',
      status: 'عقدة نشطة • بدون سيرفر مركزي',
      lastMessage: 'عقدتك متصلة الآن مع 142 برجاً...',
      lastTime: '09:15 ص',
      unread: 1,
      isOnlineP2P: true,
      nodeIp: '10.240.18.5:918'
    },
    {
      id: 'c3',
      name: 'فاطمة الزهراء (مقاصة الذهب)',
      avatar: '⚖️',
      status: 'توثيق صك بيت المال 24T',
      lastMessage: 'تمت مصادقة حصة الـ 12 جنيه عنخ للحَيّ.',
      lastTime: 'أمس',
      unread: 0,
      isOnlineP2P: true,
      nodeIp: '172.16.88.9:918'
    },
    {
      id: 'c4',
      name: 'غرفة العمليات المركزية (M1-M7)',
      avatar: '🌐',
      status: 'نبض AdamHash 918ms مستقر',
      lastMessage: 'جميع الطبقات السبع تعمل بكفاءة 100%.',
      lastTime: 'أمس',
      unread: 0,
      isOnlineP2P: true,
      nodeIp: '127.0.0.1:616'
    }
  ];

  // Feed Posts
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: 'p1',
      authorName: 'مجلس السيادة والرقيم الحر',
      authorHandle: '@sovereign_council',
      authorAvatar: '🏛️',
      authorBadge: 'مؤسس البروتوكول',
      timeAgo: 'منذ ساعتين',
      content: 'نعلن رسمياً إطلاق مبدأ "البيانات البيضاء (White Data)" في شبكة سوشيال عنخ. هاتفك الذكي هو خادمك الشخصي الموثق، لا خوادم تجسس، لا خوارزميات إدمان، ولا بيع للخصوصية لشركات الإعلانات الاحتكارية. 🕊️✨',
      mediaType: 'image',
      likes: 1842,
      tipsAnhk: 340.5,
      commentsCount: 219,
      sharesCount: 512,
      isLiked: true,
      nodeSignature: 'SIG_918_NODE_ALPHA_256',
      tags: ['#الهاتف_خادم', '#البيانات_البيضاء', '#سوشيال_عنخ', '#Web4Ankh']
    },
    {
      id: 'p2',
      authorName: 'المهندس أحمد الهواري',
      authorHandle: '@ahmed_mesh',
      authorAvatar: '⚡',
      authorBadge: 'مطور شبكات كوانتية',
      timeAgo: 'منذ 4 ساعات',
      content: 'قمت بتشغيل عقدة البث P2P على هاتفي المتواضع، والآن أشارك المحتوى مع جيراني في نطاق 5 كم مباشرة وبسرعة 1.2 Gbps بدون الحاجة لأي اشتراك إنترنت احتكاري وبكلفة 0.00$ تماماً! 📶📲',
      mediaType: 'none',
      likes: 954,
      tipsAnhk: 120.0,
      commentsCount: 88,
      sharesCount: 145,
      isLiked: false,
      nodeSignature: 'SIG_212_CAIRO_MESH_01',
      tags: ['#اتصالات_مجانية', '#أبراج_77M', '#السيادة_الرقمية']
    }
  ]);

  const [newPostText, setNewPostText] = useState('');

  // Reels
  const [reels, setReels] = useState<SocialReel[]>([
    {
      id: 'r1',
      creatorName: 'سوشيال عنخ الرسمية',
      creatorHandle: '@anhk_social',
      creatorAvatar: '☥',
      caption: 'كيف يعمل مبدأ "الهاتف خادم"؟ في 30 ثانية تعرف على ثورة البيانات البيضاء واللامركزية الحقيقية 📱🛡️',
      likes: 8420,
      tipsAnhk: 412.0,
      comments: 630,
      shares: 1204,
      isLiked: true,
      soundName: 'صوت التناظر والنبض 918ms الأصلي',
      category: 'تعليمي سيادي',
      bgColor: 'from-cyan-950 via-slate-900 to-slate-950',
      videoTitle: 'ثورة الهاتف كخادم سيادي',
      tags: ['#الهاتف_خادم', '#Reels_عنخ']
    },
    {
      id: 'r2',
      creatorName: 'د. سلمى النجار',
      creatorHandle: '@salma_eco',
      creatorAvatar: '🌱',
      caption: 'من مشاريع تفكيك السلاح إلى مزارع النخيل والقمح في وادي النيل.. معادلة 1:1 للإعمار 🌾🚜',
      likes: 6190,
      tipsAnhk: 890.5,
      comments: 410,
      shares: 980,
      isLiked: false,
      soundName: 'نشيد الإعمار والتنمية الحرة',
      category: 'إعمار وتنمية',
      bgColor: 'from-emerald-950 via-slate-900 to-slate-950',
      videoTitle: 'تحويل السلاح إلى إعمار حقيقي',
      tags: ['#صك_الإعمار', '#مشاريع_السيادة']
    }
  ]);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isReelPlaying, setIsReelPlaying] = useState(true);

  // Stories
  const stories: SocialStory[] = [
    { id: 's1', userName: 'أنت', userAvatar: '👤', hasUnseen: false, storyImage: '', caption: 'أضف قصة سيادية', time: 'الآن' },
    { id: 's2', userName: 'حراسة M6', userAvatar: '🛡️', hasUnseen: true, storyImage: '', caption: 'تطهير المعاملات 616', time: 'منذ 15 د' },
    { id: 's3', userName: 'صك الذهب', userAvatar: '⚖️', hasUnseen: true, storyImage: '', caption: '24 تريليون مصادق', time: 'منذ 40 د' },
    { id: 's4', userName: 'شبكة 77M', userAvatar: '📡', hasUnseen: true, storyImage: '', caption: 'أبراج آسيا متصلة', time: 'منذ ساعة' },
    { id: 's5', userName: 'الرقم القومي', userAvatar: '🪪', hasUnseen: true, storyImage: '', caption: 'وثيقة الكرامة 14', time: 'منذ ساعتين' }
  ];

  // Send message handler
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: user.name,
      senderAvatar: '👤',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text',
      isDeliveredP2P: true
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeChatContactId]: [...(prev[activeChatContactId] || []), newMsg]
    }));
    setChatInput('');

    // Simulate instant P2P Node Ack
    setWhiteDataBlocks((n) => n + 1);
    setBandwidthShared((b) => parseFloat((b + 0.1).toFixed(1)));
  };

  // Create post handler
  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorHandle: `@${user.email.split('@')[0]}`,
      authorAvatar: '👤',
      authorBadge: 'عقدة هاتف نشطة',
      timeAgo: 'الآن',
      content: newPostText.trim(),
      mediaType: 'none',
      likes: 1,
      tipsAnhk: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      nodeSignature: `SIG_LOCAL_NODE_${Math.floor(Math.random() * 9000 + 1000)}`,
      tags: ['#الهاتف_خادم', '#سوشيال_عنخ']
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNodeStorageUsed((s) => parseFloat((s + 0.02).toFixed(2)));
  };

  // Toggle post like
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1
            }
          : p
      )
    );
  };

  // Tip post with ANHK
  const handleTipPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              tipsAnhk: parseFloat((p.tipsAnhk + 1.0).toFixed(1))
            }
          : p
      )
    );
  };

  if (!isOpen) return null;

  const currentMessages = chatMessages[activeChatContactId] || [];
  const currentContact = chatContacts.find((c) => c.id === activeChatContactId);
  const currentReel = reels[activeReelIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn font-sans select-none">
      {/* Outer Shell Wrapper */}
      <div className={`relative w-full transition-all duration-300 flex flex-col items-center justify-center ${
        deviceFrame === 'desktop' ? 'max-w-6xl h-[94vh]' : 'max-w-md h-[92vh]'
      }`}>

        {/* Floating Top Control Bar (Device Frame Switcher & Close) */}
        <div className="w-full flex items-center justify-between pb-2 px-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-lg">
            <span className="text-slate-400 text-[11px] px-2 font-bold flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              {isAr ? 'واجهة الجهاز:' : 'Device View:'}
            </span>
            <button
              onClick={() => setDeviceFrame('ios')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors ${
                deviceFrame === 'ios' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              iPhone (iOS)
            </button>
            <button
              onClick={() => setDeviceFrame('android')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors ${
                deviceFrame === 'android' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pixel (Android)
            </button>
            <button
              onClick={() => setDeviceFrame('desktop')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors ${
                deviceFrame === 'desktop' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'شاشة كاملة' : 'Expanded'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 text-[10px] text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>الهاتف خادم: 127.0.0.1:918</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Phone / Desktop Device Canvas Container */}
        <div className={`relative w-full h-full rounded-[32px] sm:rounded-[40px] bg-slate-950 border-4 border-slate-800 shadow-2xl flex flex-col overflow-hidden ${
          deviceFrame === 'ios'
            ? 'ring-2 ring-cyan-500/40 shadow-cyan-950/60'
            : deviceFrame === 'android'
            ? 'ring-2 ring-emerald-500/40 shadow-emerald-950/60'
            : 'ring-2 ring-purple-500/40 shadow-purple-950/60'
        }`}>

          {/* Smartphone Status Bar (Top Notch & Signals) */}
          <div className="h-9 px-5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0 z-20">
            {/* Left: Time */}
            <span className="font-bold text-slate-200">
              {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
            </span>

            {/* Center Dynamic Island / Notch */}
            {deviceFrame === 'ios' ? (
              <div className="px-3 py-0.5 rounded-full bg-black border border-slate-800 flex items-center gap-1.5 text-[9px] text-cyan-300 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold">Social ANHK Node 918</span>
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-black border border-slate-800" />
            )}

            {/* Right: Network & Battery Icons */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-emerald-400 font-bold">5G MESH</span>
              <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              <div className="w-5 h-2.5 rounded-sm border border-slate-600 p-0.5 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* App Header Banner */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20 text-base">
                ☥
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-cyan-100">
                    {isAr ? 'سوشيال عنخ (Social ANHK)' : 'Social ANHK Network'}
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">
                    البيانات بيضاء
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-mono block">
                  {isAr ? 'الهاتف خادم P2P • صفر تتبع إعلاني' : 'Phone-as-Server • Zero Ad Surveillance'}
                </span>
              </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('nodeServer')}
                className={`p-1.5 rounded-lg border font-mono text-[10px] flex items-center gap-1 transition-colors ${
                  activeTab === 'nodeServer'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-900 text-cyan-300 border-slate-700 hover:border-cyan-400'
                }`}
                title={isAr ? 'إحصائيات خادم الهاتف' : 'Phone Node Specs'}
              >
                <Server className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{p2pActivePeers} peer</span>
              </button>

              {onOpenWallet && (
                <button
                  onClick={onOpenWallet}
                  className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 text-[10px] font-bold font-mono flex items-center gap-1 hover:bg-amber-500/20"
                >
                  <Coins className="w-3 h-3 text-amber-400" />
                  <span>12.0 ☥</span>
                </button>
              )}
            </div>
          </div>

          {/* Stories Bar (Instagram Style) */}
          <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-3 overflow-x-auto scrollbar-none shrink-0">
            {stories.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
                <div className={`w-11 h-11 rounded-full p-0.5 border-2 transition-transform group-hover:scale-105 ${
                  s.hasUnseen
                    ? 'border-cyan-400 shadow-md shadow-cyan-500/30'
                    : 'border-slate-700'
                }`}>
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-lg">
                    {s.userAvatar}
                  </div>
                </div>
                <span className="text-[9px] text-slate-300 font-mono truncate max-w-[54px] text-center">
                  {s.userName}
                </span>
              </div>
            ))}
          </div>

          {/* Main Social Content Body */}
          <div className="flex-1 overflow-y-auto bg-slate-950 p-2 sm:p-3 relative">
            
            {/* 1. CHAT TAB (WhatsApp / Telegram P2P Style) */}
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col justify-between space-y-2">
                {/* Contact Selector Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
                  {chatContacts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChatContactId(c.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all ${
                        activeChatContactId === c.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-inner'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{c.avatar}</span>
                      <span className="font-bold text-[11px]">{c.name.split(' ')[0]}</span>
                      {c.isOnlineP2P && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  ))}
                </div>

                {/* Active Chat Header */}
                {currentContact && (
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{currentContact.avatar}</span>
                      <div>
                        <h4 className="font-bold text-slate-200 text-xs">{currentContact.name}</h4>
                        <span className="text-[9px] text-emerald-400 font-mono block">
                          ● {currentContact.status} ({currentContact.nodeIp})
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-black border border-slate-700 text-cyan-300 font-mono">
                      E2EE 256-bit P2P
                    </span>
                  </div>
                )}

                {/* Messages Stream */}
                <div className="flex-1 overflow-y-auto space-y-2.5 p-2 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-2.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                          msg.isMe
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                        }`}
                      >
                        {msg.type === 'gold_transfer' ? (
                          <div className="space-y-1.5 font-mono">
                            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                              <Coins className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                              <span>تحويل سيادي مباشر: {msg.amountAnhk} ☥ عنخ ذهب</span>
                            </div>
                            <p className="text-[11px] text-slate-200">{msg.text}</p>
                            <span className="inline-block text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-emerald-300">
                              ✓ مقاصة P2P فورية بدون عمولة
                            </span>
                          </div>
                        ) : (
                          <p>{msg.text}</p>
                        )}

                        <div className="flex items-center justify-end gap-1 mt-1 text-[8px] opacity-75 font-mono">
                          <span>{msg.timestamp}</span>
                          {msg.isMe && <span>✓✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Box */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                  <button
                    onClick={() => {
                      setChatInput((prev) => `${prev} ☥ 1.0 ANHK `);
                    }}
                    className="p-1.5 rounded-xl text-amber-400 hover:bg-amber-400/10 transition-colors"
                    title={isAr ? 'إرسال ذهب عنخ' : 'Tip ANHK'}
                  >
                    <Coins className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isAr ? 'اكتب رسالة مشفرة P2P بدون وسيط...' : 'Type P2P encrypted message...'}
                    className="flex-1 bg-transparent px-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. FEED TAB (Facebook / Threads Sovereign Wall Style) */}
            {activeTab === 'feed' && (
              <div className="space-y-3">
                {/* Create Post Input Card */}
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
                      👤
                    </div>
                    <input
                      type="text"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
                      placeholder={isAr ? 'ماذا يدور في عقلك السيادي؟ انشر على شبكة البيانات البيضاء...' : 'Share a verified thought on the White Data mesh...'}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isAr ? 'تخزين مشفر محلياً على هاتفك' : 'Stored locally on phone'}
                      </span>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      className="px-3 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                    >
                      <span>{isAr ? 'نشر سيادي' : 'Publish'}</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Posts Timeline Stream */}
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-lg"
                  >
                    {/* Post Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-lg">
                          {post.authorAvatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-slate-200">{post.authorName}</h4>
                            <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-[8px] text-cyan-300 font-mono">
                              {post.authorBadge}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {post.authorHandle} • {post.timeAgo}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">{post.nodeSignature}</span>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-cyan-400">
                      {post.tags.map((t, idx) => (
                        <span key={idx}>{t}</span>
                      ))}
                    </div>

                    {/* Post Interactions */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                          post.isLiked ? 'text-rose-400 bg-rose-500/10' : 'hover:text-slate-200'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-400' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={() => handleTipPost(post.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-amber-300 hover:bg-amber-400/10 transition-colors"
                        title={isAr ? 'إهداء جنيهات عنخ ذهبية' : 'Tip ANHK Gold'}
                      >
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>{post.tipsAnhk} ☥</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.commentsCount}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{post.sharesCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. REELS TAB (TikTok / Sovereign Shorts Style) */}
            {activeTab === 'reels' && currentReel && (
              <div className="h-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-800 flex flex-col justify-between p-4 text-white shadow-2xl">
                {/* Reel Header */}
                <div className="flex items-center justify-between text-xs z-10 font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 border border-cyan-500/40 text-cyan-300 text-[10px]">
                    {currentReel.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>P2P Stream 1080p</span>
                  </div>
                </div>

                {/* Center Visual Mock */}
                <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 z-10 py-6">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center text-4xl shadow-2xl shadow-cyan-500/40 animate-pulse">
                    ☥
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-cyan-100 max-w-xs">
                    {currentReel.videoTitle}
                  </h3>
                  <button
                    onClick={() => setIsReelPlaying(!isReelPlaying)}
                    className="p-3 rounded-full bg-cyan-500 text-slate-950 shadow-lg hover:scale-105 transition-transform"
                  >
                    {isReelPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                </div>

                {/* Right Side Action Bar */}
                <div className="absolute right-3 bottom-20 flex flex-col items-center gap-3 z-10 text-xs font-mono">
                  <button
                    onClick={() => {
                      setReels((prev) =>
                        prev.map((r, i) =>
                          i === activeReelIndex
                            ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
                            : r
                        )
                      );
                    }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <div className={`p-2 rounded-full ${currentReel.isLiked ? 'bg-rose-600 text-white' : 'bg-black/60 border border-slate-700'}`}>
                      <Heart className={`w-4 h-4 ${currentReel.isLiked ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px]">{currentReel.likes}</span>
                  </button>

                  <button
                    onClick={() => {
                      setReels((prev) =>
                        prev.map((r, i) =>
                          i === activeReelIndex
                            ? { ...r, tipsAnhk: parseFloat((r.tipsAnhk + 5.0).toFixed(1)) }
                            : r
                        )
                      );
                    }}
                    className="flex flex-col items-center gap-0.5 text-amber-300"
                  >
                    <div className="p-2 rounded-full bg-amber-500/20 border border-amber-500/50">
                      <Coins className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-[10px]">{currentReel.tipsAnhk} ☥</span>
                  </button>

                  <div className="flex flex-col items-center gap-0.5">
                    <div className="p-2 rounded-full bg-black/60 border border-slate-700">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{currentReel.comments}</span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5">
                    <div className="p-2 rounded-full bg-black/60 border border-slate-700">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{currentReel.shares}</span>
                  </div>
                </div>

                {/* Reel Bottom Details & Audio Track */}
                <div className="space-y-1 z-10 pr-12">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{currentReel.creatorAvatar}</span>
                    <h4 className="font-bold text-xs">{currentReel.creatorName}</h4>
                    <span className="text-[10px] text-slate-400">{currentReel.creatorHandle}</span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2">{currentReel.caption}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono pt-1">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span className="truncate">{currentReel.soundName}</span>
                  </div>
                </div>

                {/* Next Reel Switcher */}
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={() => setActiveReelIndex((prev) => (prev + 1) % reels.length)}
                    className="px-2 py-1 rounded-lg bg-black/70 border border-slate-700 text-[10px] font-mono text-cyan-300 flex items-center gap-1"
                  >
                    <span>{isAr ? 'الفيديو التالي' : 'Next'}</span>
                    <Repeat className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* 4. STORIES TAB (Moments & Ephemeral) */}
            {activeTab === 'stories' && (
              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {isAr ? 'القصص واليوميات السيادية (24 ساعة زائلة بدون أثر)' : 'Sovereign 24-Hour Ephemeral Stories'}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isAr
                      ? 'يتم تخزين القصص مشفرة على جهازك فقط وتنتهي صلاحيتها وتُمسح تلقائياً بدون حفظ أي نسخ في خوادم سحابية مركزية.'
                      : 'Stories are stored locally on your device only and auto-destruct in 24 hours without server retention.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {stories.slice(1).map((story) => (
                    <div
                      key={story.id}
                      className="relative h-44 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-black p-3 flex flex-col justify-between overflow-hidden shadow-lg group hover:border-cyan-400 transition-colors"
                    >
                      <div className="flex items-center gap-2 z-10">
                        <div className="w-7 h-7 rounded-full bg-slate-950 border border-cyan-400 flex items-center justify-center text-sm">
                          {story.userAvatar}
                        </div>
                        <span className="text-[10px] font-bold text-slate-200">{story.userName}</span>
                      </div>

                      <div className="text-center z-10">
                        <span className="text-2xl block mb-1">✨</span>
                        <p className="text-xs font-bold text-cyan-200">{story.caption}</p>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-400 z-10">
                        <span>{story.time}</span>
                        <span className="text-emerald-400">P2P Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PHONE-AS-A-SERVER & WHITE DATA DASHBOARD TAB */}
            {activeTab === 'nodeServer' && (
              <div className="space-y-3 font-mono text-xs">
                {/* Top Architecture Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                        <Server className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cyan-200 text-xs sm:text-sm">
                          {isAr ? 'بنية الهاتف كخادم سيادي (Phone-as-a-Server)' : 'Phone-as-a-Server Node Architecture'}
                        </h4>
                        <span className="text-[10px] text-emerald-400">
                          {isAr ? 'حالة العقدة: خادم محلي 100% مستقل' : 'Node Status: 100% Autonomous Local Server'}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-black border border-slate-700 text-cyan-300 font-bold text-[10px]">
                      Port 918
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-slate-800">
                    {isAr
                      ? 'البيانات البيضاء تعني أن بياناتك لا تُباع، ولا تُحلل بالذكاء الاصطناعي التجاري لغرض الإعلانات. هاتفك يخزن بياناتك في قاعدة بيانات مشفرة محلية ويتواصل مع أقرانه عبر شبكة الـ 77 مليون برج بحرية كاملة.'
                      : 'White Data ensures zero corporate telemetry, zero ad profiling. Your mobile operates as a standalone server broadcasting over P2P mesh.'}
                  </p>
                </div>

                {/* Node Vitals Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">{isAr ? 'الأقران المتصلين (P2P Peers):' : 'Active Peers:'}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-cyan-300">{p2pActivePeers} عقدة</span>
                      <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">{isAr ? 'عرض النطاق الترددي المشترك:' : 'Mesh Bandwidth:'}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-emerald-300">{bandwidthShared} MB/s</span>
                      <Activity className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">{isAr ? 'كتل البيانات البيضاء الموثقة:' : 'White Data Blocks:'}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-purple-300">{whiteDataBlocks.toLocaleString()}</span>
                      <Layers className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">{isAr ? 'المساحة المحلية المخصصة:' : 'Local Node Storage:'}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-amber-300">{nodeStorageUsed} GB</span>
                      <HardDrive className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Cryptographic Proof Card */}
                <div className="p-3 rounded-xl bg-black/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{isAr ? 'خوارزمية الأمان والتشفير:' : 'Quantum Encryption:'}</span>
                    <span className="text-cyan-300 font-bold">Ring-LWE Lattice 256</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{isAr ? 'تزامن نبض القلب AdamHash:' : 'Heartbeat Parity:'}</span>
                    <span className="text-emerald-400 font-bold">{matrixState.adamHashIntegrity.slice(0, 20)}...</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{isAr ? 'حالة قفل التناظر السبعي:' : 'Heptagonal Locks:'}</span>
                    <span className="text-cyan-300 font-bold">{matrixState.activeLayerCount}/7 طبقات نشطة</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Smartphone Bottom Navigation Bar (WhatsApp + Facebook + Reels + Server) */}
          <div className="h-16 px-2 bg-slate-950 border-t border-slate-800 flex items-center justify-around shrink-0 z-20">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                activeTab === 'chat' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-[9px] font-mono">{isAr ? 'مراسلة واتس' : 'Chat'}</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                activeTab === 'feed' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="text-[9px] font-mono">{isAr ? 'حائط فيسبوك' : 'Feed'}</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                activeTab === 'reels' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="text-[9px] font-mono">{isAr ? 'ريلز تيك توك' : 'Reels'}</span>
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                activeTab === 'stories' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-[9px] font-mono">{isAr ? 'ستوري انستا' : 'Stories'}</span>
            </button>

            <button
              onClick={() => setActiveTab('nodeServer')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                activeTab === 'nodeServer' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Server className="w-5 h-5" />
              <span className="text-[9px] font-mono">{isAr ? 'الهاتف خادم' : 'Node'}</span>
            </button>
          </div>

          {/* Smartphone Home Indicator Bar */}
          <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
            <div className="w-28 h-1 bg-slate-700 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
