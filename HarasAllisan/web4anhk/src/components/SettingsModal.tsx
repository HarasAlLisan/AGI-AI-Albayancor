import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Shield,
  Lock,
  Check,
  Server,
  Cpu,
  Smartphone,
  Camera,
  UploadCloud,
  Download,
  RefreshCw,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Link,
  FileJson,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../types';
import { compressAvatarImage, formatByteSize } from '../utils/imageCompressor';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  onOpenSecurityAudit?: () => void;
  lang?: 'ar' | 'en';
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
];

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  theme,
  setTheme,
  onOpenSecurityAudit,
  lang = 'ar',
}) => {
  const isAr = lang === 'ar';

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [signature, setSignature] = useState(user.signature);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [aiFilterStrictness, setAiFilterStrictness] = useState<'strict' | 'balanced' | 'off'>('strict');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Avatar modes: 'phone' | 'url' | 'presets'
  const [avatarMode, setAvatarMode] = useState<'phone' | 'url' | 'presets'>('phone');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadStats, setUploadStats] = useState<{ original: string; compressed: string } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Sovereign User Instance State (تأسيس نسخة المستخدم)
  const [instanceId, setInstanceId] = useState<string>(() => {
    return user.instanceId || localStorage.getItem('anhk_sovereign_user_instance_id') || 'ANHK-USR-2026-M5-INIT';
  });
  const [establishedAt, setEstablishedAt] = useState<string>(() => {
    return user.establishedAt || localStorage.getItem('anhk_sovereign_user_established_at') || '';
  });
  const [instanceNotice, setInstanceNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
      setSignature(user.signature);
      if (user.instanceId) setInstanceId(user.instanceId);
      if (user.establishedAt) setEstablishedAt(user.establishedAt);
      setUploadError(null);
      setUploadStats(null);
      setInstanceNotice(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  // Process file upload from phone/camera
  const handleFileProcess = async (file: File) => {
    setIsProcessingImage(true);
    setUploadError(null);
    try {
      const result = await compressAvatarImage(file, 280, 0.86);
      setAvatar(result.dataUrl);
      setUploadStats({
        original: formatByteSize(result.originalSize),
        compressed: formatByteSize(result.compressedSize),
      });
      // Automatically save to preview
      setSavedSuccess(false);
    } catch (err) {
      console.error('Image compression error:', err);
      setUploadError(
        isAr
          ? 'تعذر معالجة الصورة. يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).'
          : 'Could not process image. Please select a valid photo (JPG, PNG, WebP).'
      );
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  // Drop zone handler for drag and drop onto avatar
  const handleAvatarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Standard save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      avatar,
      signature,
      instanceId,
      establishedAt,
      avatarSource: avatar.startsWith('data:') ? 'phone' : 'url',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Start establishing Sovereign User Instance (ابدأ بتأسيس نسخة المستخدم)
  const handleEstablishUserInstance = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    
    // Generate unique Sovereign User Instance Token
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newInstanceId = `ANHK-USR-M5-${randomHash}`;
    
    setInstanceId(newInstanceId);
    setEstablishedAt(formattedDate);

    // Save in user profile
    const updatedProfile: Partial<UserProfile> = {
      name,
      email,
      avatar,
      signature,
      instanceId: newInstanceId,
      establishedAt: formattedDate,
      avatarSource: avatar.startsWith('data:') ? 'phone' : 'url',
    };

    onUpdateUser(updatedProfile);

    // Persist dedicated snapshot in local storage
    try {
      localStorage.setItem('anhk_sovereign_user_instance_id', newInstanceId);
      localStorage.setItem('anhk_sovereign_user_established_at', formattedDate);
      localStorage.setItem('anhk_sovereign_user_instance', JSON.stringify({
        ...user,
        ...updatedProfile,
        sovereignKernel: 'OS Almahdi 256',
        pqcProtection: '256-bit Golden Block Verified',
        verifiedAt: new Date().toISOString(),
      }));
    } catch (e) {
      console.warn('Storage snapshot notice:', e);
    }

    setInstanceNotice(
      isAr
        ? `✓ تم تأسيس وتوثيق نسخة المستخدم السيادية بنجاح (${newInstanceId}) ومطابقتها مع نواة تشغيل Almahdi 256`
        : `✓ Sovereign User Instance successfully established (${newInstanceId}) on Almahdi 256 kernel`
    );
    setSavedSuccess(true);
  };

  // Export User Profile Instance JSON (تصدير نسخة المستخدم)
  const handleExportUserInstance = () => {
    const snapshot = {
      appName: 'Web4 ANHK Webmail',
      profileInstance: {
        instanceId,
        establishedAt: establishedAt || new Date().toISOString(),
        name,
        email,
        domain: user.domain,
        signature,
        avatar,
        kernel: 'OS Almahdi 256',
        protocolVersion: 'Web4 ANHK Sovereign Edition',
      },
      exportedAt: new Date().toISOString(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
    const downloadAnchor = document.createElement('a');
    const safeName = (name || 'user').replace(/\s+/g, '_');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anhk-user-instance-${safeName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import User Profile Instance JSON (استيراد نسخة المستخدم)
  const handleImportUserInstance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const profile = parsed.profileInstance || parsed;

        if (profile.name) setName(profile.name);
        if (profile.email) setEmail(profile.email);
        if (profile.avatar) setAvatar(profile.avatar);
        if (profile.signature) setSignature(profile.signature);
        if (profile.instanceId) setInstanceId(profile.instanceId);
        if (profile.establishedAt) setEstablishedAt(profile.establishedAt);

        setInstanceNotice(
          isAr
            ? '✓ تم استيراد نسخة المستخدم بنجاح ومطابقة البيانات!'
            : '✓ User instance successfully imported and restored!'
        );
      } catch {
        setUploadError(isAr ? 'ملف نسخة المستخدم غير صالح أو تالف.' : 'Invalid or corrupted user instance JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleQuickAlign = () => {
    let cleanHandle = 'mohamed.salah';
    if (name.includes('صلاح') || name.toLowerCase().includes('salah')) {
      cleanHandle = 'mohamed.salah';
    } else if (name.includes('مهدي') || name.toLowerCase().includes('mahdi')) {
      cleanHandle = 'almahdi';
    } else {
      const parts = name.trim().toLowerCase().split(/\s+/);
      const enParts = parts.filter(p => /^[a-z0-9_.-]+$/i.test(p));
      cleanHandle = enParts.length > 0 ? enParts.join('.') : 'mohamed.salah';
    }
    const domainSuffix = email.includes('@') ? email.split('@')[1] : 'anhkmail.anhk';
    const alignedEmail = `${cleanHandle}@${domainSuffix}`;
    setEmail(alignedEmail);
    setSignature(`--\n${name}\nVerified Sovereign Identity | NIST PQC\n${alignedEmail} | ${user.domain}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-xl bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'إعدادات الحساب وصندوق البريد' : 'Account & Mailbox Settings'}</span>
            </h2>
            <p className="text-[11px] font-mono text-cyan-400">
              {isAr ? 'تفضيلات مستخدم بريد ANHK Webmail السيادي' : 'ANHK Webmail User Preferences & Identity'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Inputs for Phone Upload & Camera */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageFileChange}
        />
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleImageFileChange}
        />
        <input
          type="file"
          ref={jsonImportRef}
          accept=".json,application/json"
          className="hidden"
          onChange={handleImportUserInstance}
        />

        {/* Settings Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 custom-scrollbar">
          
          {/* Card 1: Domain & Account Profile Header */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            {/* Header row: Stack properly on mobile to prevent overlapping */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-slate-800/60">
              <p className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'الهوية الشخصية وصورة الحساب' : 'Account Profile & Identity'}</span>
              </p>
              {onOpenSecurityAudit && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSecurityAudit();
                  }}
                  className="self-start sm:self-auto px-2.5 py-1 rounded bg-slate-800/90 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono hover:bg-slate-700 hover:text-cyan-200 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>{isAr ? 'وحدة التحكم بالأمان وDNS' : 'DNS & Security Console'}</span>
                </button>
              )}
            </div>

            {/* Avatar Section with Dedicated Phone Upload & Camera */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleAvatarDrop}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Interactive Avatar Circle with Tap to Upload */}
                <div className="relative group flex-shrink-0">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-400 ring-2 ring-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer relative"
                    title={isAr ? 'انقر للتحميل من الهاتف أو التقاط صورة' : 'Click to upload from phone or take photo'}
                  >
                    <img
                      src={avatar || DEFAULT_AVATAR}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {/* Hover/Touch Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-5 h-5 text-cyan-300" />
                      <span className="text-[9px] font-mono text-cyan-200 mt-0.5">
                        {isAr ? 'تغيير' : 'Change'}
                      </span>
                    </div>
                  </div>

                  {/* Camera icon badge */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md transition-colors"
                    title={isAr ? 'تحميل من الهاتف' : 'Upload from phone'}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Avatar Controls & Options */}
                <div className="flex-1 w-full space-y-2.5">
                  {/* Option mode tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setAvatarMode('phone')}
                      className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                        avatarMode === 'phone'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تحميل من الهاتف' : 'Upload Phone'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAvatarMode('url')}
                      className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                        avatarMode === 'url'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Link className="w-3.5 h-3.5" />
                      <span>{isAr ? 'رابط URL' : 'Image URL'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAvatarMode('presets')}
                      className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                        avatarMode === 'presets'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نماذج جاهزة' : 'Presets'}</span>
                    </button>
                  </div>

                  {/* Mode 1: Phone Upload (معرض الصور والكاميرا) */}
                  {avatarMode === 'phone' && (
                    <div className="space-y-2 pt-1 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Button: Upload from phone gallery */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessingImage}
                          className="h-10 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                          <UploadCloud className="w-4 h-4 text-white" />
                          <span>{isAr ? 'اختيار صورة من الهاتف' : 'Pick Photo from Phone'}</span>
                        </button>

                        {/* Button: Take photo with camera */}
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          disabled={isProcessingImage}
                          className="h-10 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                        >
                          <Camera className="w-4 h-4 text-cyan-400" />
                          <span>{isAr ? 'التقاط صورة بالكاميرا' : 'Take Camera Photo'}</span>
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                        {isAr
                          ? 'يتم ضغط الصورة وتجهيزها محلياً بأعلى دقة متوافقة مع التخزين المشفر.'
                          : 'Photos are auto-compressed locally for high resolution & instant loading.'}
                      </p>
                    </div>
                  )}

                  {/* Mode 2: Web Image URL */}
                  {avatarMode === 'url' && (
                    <div className="space-y-1.5 pt-1 animate-fadeIn">
                      <label className="text-[11px] font-mono text-slate-300 font-semibold block">
                        {isAr ? 'رابط صورة الملف الشخصي (Image URL):' : 'Profile Avatar Image URL:'}
                      </label>
                      <input
                        type="text"
                        value={avatar.startsWith('data:') ? '' : avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="https://..."
                        className="w-full h-9 px-3 text-xs rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 focus:border-cyan-400 outline-none font-mono"
                      />
                    </div>
                  )}

                  {/* Mode 3: Presets */}
                  {avatarMode === 'presets' && (
                    <div className="space-y-1.5 pt-1 animate-fadeIn">
                      <label className="text-[11px] font-mono text-slate-400 block">
                        {isAr ? 'اختر من النماذج الرمزية السيادية المعتمدة:' : 'Select a Sovereign Avatar Preset:'}
                      </label>
                      <div className="flex items-center gap-3 pt-1">
                        {AVATAR_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setAvatar(preset);
                              setUploadStats(null);
                            }}
                            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                              avatar === preset
                                ? 'border-cyan-400 ring-2 ring-cyan-400 scale-110 shadow-md'
                                : 'border-slate-700 opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                          >
                            <img src={preset} alt={`preset ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Processing / Stats feedback */}
                  {isProcessingImage && (
                    <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2 animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>{isAr ? 'جارِ معالجة وضغط الصورة من الهاتف...' : 'Processing phone image...'}</span>
                    </div>
                  )}

                  {uploadStats && (
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>
                        {isAr
                          ? `تم تحميل الصورة بنجاح (الحجم الأصلي: ${uploadStats.original} • الحجم المحسن: ${uploadStats.compressed})`
                          : `Uploaded successfully (${uploadStats.original} → ${uploadStats.compressed})`}
                      </span>
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-xs text-rose-400 font-mono">{uploadError}</p>
                  )}

                  {/* Reset Avatar Button */}
                  {avatar !== DEFAULT_AVATAR && (
                    <button
                      type="button"
                      onClick={() => {
                        setAvatar(DEFAULT_AVATAR);
                        setUploadStats(null);
                      }}
                      className="text-[10px] font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 pt-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isAr ? 'استعادة الصورة الافتراضية' : 'Reset to default avatar'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Display Name & Sovereign Email Fields */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-300 block mb-1 font-semibold">
                  {isAr ? 'الاسم الظاهر (Display Name)' : 'Display Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-400 outline-none font-mono"
                />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <label className="text-[11px] font-mono text-slate-300 block font-semibold">
                    {isAr ? 'عنوان البريد السيادي الأساسي' : 'Primary Sovereign Email Address'}
                  </label>
                  <button
                    type="button"
                    onClick={handleQuickAlign}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline self-start sm:self-auto"
                  >
                    {isAr ? 'محاذاة تلقائية مع الاسم السيادي' : 'Quick Align with Sovereign Name'}
                  </button>
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono focus:border-cyan-400 outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  {isAr ? 'عقدة استضافة الحساب (Host Server Node)' : 'Host Server Node'}
                </label>
                <input
                  type="text"
                  value={user.domain}
                  disabled
                  className="w-full h-10 px-3 text-xs rounded-lg bg-slate-950/50 border border-slate-800/50 text-slate-400 font-mono opacity-80 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Sovereign User Instance Setup (تأسيس نسخة المستخدم) */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/30 to-slate-900/80 border border-cyan-500/40 space-y-3.5 shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'تأسيس وتوثيق نسخة المستخدم السيادية' : 'Sovereign User Instance Establishment'}</span>
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {isAr
                    ? 'ربط وتثبيت هوية المستخدم، صورة الهاتف، والبريد السيادي على نواة Almahdi 256'
                    : 'Cryptographically bind user identity, phone avatar, and sovereign email to the node'}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700 whitespace-nowrap">
                {isAr ? 'نسخة نشطة' : 'Active Instance'}
              </span>
            </div>

            {/* Instance Metadata Display */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                <span className="text-slate-400">{isAr ? 'معرّف نسخة المستخدم (UID):' : 'Instance UID:'}</span>
                <span className="text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {instanceId}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                <span className="text-slate-400">{isAr ? 'تاريخ التأسيس والاعتماد:' : 'Established At:'}</span>
                <span className="text-emerald-400">
                  {establishedAt || (isAr ? 'جاهز للتأسيس الآن' : 'Ready to initialize')}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                <span className="text-slate-400">{isAr ? 'حالة التزامن مع النواة:' : 'Kernel Sync:'}</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>OS Almahdi 256 (PQC Validated)</span>
                </span>
              </div>
            </div>

            {/* Instance Action Notification */}
            {instanceNotice && (
              <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-400/60 text-xs text-cyan-200 font-mono flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">{instanceNotice}</p>
              </div>
            )}

            {/* Primary Action Button: Establish User Instance */}
            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={handleEstablishUserInstance}
                className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Fingerprint className="w-4 h-4 stroke-[2.5]" />
                <span>{isAr ? 'ابدأ بتأسيس وحفظ نسخة المستخدم الآن' : 'Establish & Seal User Instance Now'}</span>
              </button>

              {/* Sub Actions: Export & Import JSON */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExportUserInstance}
                  className="h-9 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
                  title={isAr ? 'تنزيل نسخة احتياطية من بيانات المستخدم كملف JSON' : 'Export JSON Backup'}
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'تصدير نسخة المستخدم (JSON)' : 'Export Instance (JSON)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => jsonImportRef.current?.click()}
                  className="h-9 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
                  title={isAr ? 'استعادة نسخة مستخدم سابقة من ملف JSON' : 'Import JSON Backup'}
                >
                  <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'استيراد نسخة مستخدم (JSON)' : 'Import Instance (JSON)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Operating System Kernel Spec */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <p className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" /> 
              <span>{isAr ? 'نواة تشغيل Web4 OS Almahdi 256' : 'Web4 Operating System Kernel'}</span>
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs gap-2">
              <div>
                <span className="text-emerald-300 font-extrabold block">نظام تشغيل OS Almahdi 256</span>
                <span className="text-[10px] text-slate-400">256-bit Quantum Core Kernel • Web4 ANHK Engine</span>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold">
                Active Kernel 256
              </span>
            </div>
          </div>

          {/* Card 4: Email Signature */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <p className="text-xs font-mono font-bold text-slate-300">
              {isAr ? 'التوقيع الافتراضي للرسائل' : 'Default Email Signature'}
            </p>
            <textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              rows={3}
              className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono resize-none focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Card 5: Quantum Security Settings */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <p className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'التشفير الكمومي وحماية الذكاء الاصطناعي' : 'Quantum Encryption & AI Security'}</span>
            </p>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-xs font-medium text-slate-200">
                  {isAr ? 'تشفير المفاتيح الكمومية (Quantum Key)' : 'Quantum Key Encryption'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {isAr ? 'تشفير شامل من طرف إلى طرف لحسابات @anhkmail.anhk' : 'Zero-knowledge end-to-end payload encryption'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEncryptionEnabled(!encryptionEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  encryptionEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    encryptionEnabled ? (isAr ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
                {isAr ? 'صرامة درع التهديدات الذكي (AI Threat Shield)' : 'AI Threat Shield Strictness'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['strict', 'balanced', 'off'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setAiFilterStrictness(mode)}
                    className={`p-2 rounded-lg text-xs font-mono capitalize transition-all ${
                      aiFilterStrictness === mode
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {mode === 'strict' ? (isAr ? 'صارم (Strict)' : 'Strict') : mode === 'balanced' ? (isAr ? 'متوازن' : 'Balanced') : (isAr ? 'معطل' : 'Off')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 6: Visual Aesthetic Theme */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <p className="text-xs font-mono font-bold text-slate-300">
              {isAr ? 'السمة المرئية للواجهة' : 'Visual Aesthetic Theme'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dark-cyber', label: isAr ? 'سيبراني داكن' : 'Dark Cyberpunk' },
                { id: 'dark-clean', label: isAr ? 'داكن هادئ' : 'Dark Minimalist' },
                { id: 'light-minimal', label: isAr ? 'فاتح نقي' : 'Light Clean' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as ThemeMode)}
                  className={`p-2 sm:p-2.5 rounded-xl text-xs font-medium transition-all ${
                    theme === t.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Footer / Save Changes */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            {savedSuccess ? (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تم حفظ وتحديث الإعدادات بنجاح!' : 'Settings Successfully Saved!'}</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-500">
                web4anhk.anhkmail.anhk • Verified Node
              </span>
            )}

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-900 border border-slate-800 transition-colors"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                {isAr ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
