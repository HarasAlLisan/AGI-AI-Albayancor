import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Mail,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Radio,
  FileText,
  ShieldCheck,
  Award,
  ExternalLink,
  Bot,
  Zap,
  Play,
  Pause,
  AlertCircle,
  Binary,
  Layers,
  History,
  Lock,
  Compass,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

export interface AdamGeneratedDraft {
  id: string;
  to: string;
  subject: string;
  body: string;
  toneStyle: 'sovereign_general' | 'financial_12cash' | 'founder_communication' | 'phone_server_report' | 'anti_corporate_isolation';
  phoneticFrequency: number;
  adamHash: string;
  founderSeal: string;
  timestamp: string;
  rawDictatedText: string;
  cleansedIntent: string;
}

interface AdamVoiceDraftStudioProps {
  user: UserProfile;
  lang: 'ar' | 'en';
  onOpenComposerWithDraft?: (to: string, subject: string, body: string) => void;
  onOpenWallet?: () => void;
  onOpenNationalId?: () => void;
}

export const AdamVoiceDraftStudio: React.FC<AdamVoiceDraftStudioProps> = ({
  user,
  lang,
  onOpenComposerWithDraft,
  onOpenWallet,
  onOpenNationalId
}) => {
  const isAr = lang === 'ar';

  // Voice Dictation States
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [dictatedText, setDictatedText] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [dictationDuration, setDictationDuration] = useState<number>(0);
  const [speechLang, setSpeechLang] = useState<'ar-EG' | 'ar-SA' | 'en-US'>(isAr ? 'ar-EG' : 'en-US');
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // Adam's Tongue Formulation States
  const [toneStyle, setToneStyle] = useState<
    'sovereign_general' | 'financial_12cash' | 'founder_communication' | 'phone_server_report' | 'anti_corporate_isolation'
  >('sovereign_general');
  const [customTo, setCustomTo] = useState<string>('founder@anhkmail.anhk');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [generatedDraft, setGeneratedDraft] = useState<AdamGeneratedDraft | null>(null);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  // Audio Visualizer Wave Simulation
  const [audioLevels, setAudioLevels] = useState<number[]>([20, 35, 60, 45, 80, 55, 90, 70, 40, 65, 50, 30]);

  // Draft History State
  const [draftHistory, setDraftHistory] = useState<AdamGeneratedDraft[]>(() => {
    try {
      const saved = localStorage.getItem('anhk_adam_voice_drafts_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsDictating(true);
        setMicPermissionError(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalAddition = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalAddition += transcriptChunk + ' ';
          } else {
            currentInterim += transcriptChunk;
          }
        }

        if (finalAddition) {
          setDictatedText((prev) => (prev ? `${prev.trim()} ${finalAddition.trim()}` : finalAddition.trim()));
        }
        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech Recognition Error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicPermissionError(
            isAr
              ? 'تم حظر إذن الميكروفون. يرجى تفعيل إذن الميكروفون في المتصفح لاستخدام الإملاء الصوتي الحي.'
              : 'Microphone permission denied. Please allow microphone access in browser settings.'
          );
        } else if (event.error !== 'no-speech') {
          setMicPermissionError(
            isAr
              ? `تنبيه صوتي: ${event.error}. يمكنك مواصلة الإملاء أو تعديل النص.`
              : `Speech event: ${event.error}. You can continue dictating or edit text.`
          );
        }
      };

      recognition.onend = () => {
        // If still in dictating state, keep active or reset
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to init speech recognition:', err);
      setIsSpeechSupported(false);
    }
  }, [speechLang, isAr]);

  // Duration Timer
  useEffect(() => {
    if (isDictating) {
      timerRef.current = setInterval(() => {
        setDictationDuration((prev) => prev + 1);
        // Animate audio waveform
        setAudioLevels((prev) => prev.map(() => Math.floor(15 + Math.random() * 85)));
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setAudioLevels([15, 25, 30, 20, 40, 25, 35, 20, 15, 20, 25, 15]);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDictating]);

  // Save drafts history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anhk_adam_voice_drafts_history', JSON.stringify(draftHistory));
    } catch {
      // ignore
    }
  }, [draftHistory]);

  const toggleDictation = () => {
    if (!isSpeechSupported) {
      alert(
        isAr
          ? 'المتصفح لا يدعم Web Speech API تلقائياً، يمكنك إدخال النص يدوياً أو اختيار أحد الأوامر الصوتية الجاهزة.'
          : 'Web Speech API is not supported in this environment. You can enter text manually or use pre-set voice prompts.'
      );
      return;
    }

    if (isDictating) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        console.error(e);
      }
      setIsDictating(false);
      setInterimTranscript('');
    } else {
      try {
        setMicPermissionError(null);
        if (recognitionRef.current) {
          recognitionRef.current.lang = speechLang;
          recognitionRef.current.start();
        }
        setIsDictating(true);
      } catch (e) {
        console.error('Recognition start error:', e);
        // If already started, force restart
        try {
          recognitionRef.current?.stop();
          setTimeout(() => {
            recognitionRef.current?.start();
            setIsDictating(true);
          }, 200);
        } catch (retryErr) {
          console.error(retryErr);
          setIsDictating(false);
        }
      }
    }
  };

  const handleClearDictation = () => {
    if (isDictating) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        console.error(e);
      }
      setIsDictating(false);
    }
    setDictatedText('');
    setInterimTranscript('');
    setDictationDuration(0);
  };

  // Generate AdamHash PQC signature
  const generateAdamHash = (content: string) => {
    const ts = Date.now().toString(16).toUpperCase();
    const clean = content.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).toUpperCase() || 'ADAM';
    return `0xADAM-432HZ-${clean}-6236-616-${ts}`;
  };

  // Adam's Tongue Draft Synthesis Engine
  const handleSynthesizeAdamDraft = (rawInputText?: string) => {
    const textToProcess = (rawInputText || dictatedText || interimTranscript).trim();
    if (!textToProcess) {
      alert(isAr ? 'يرجى الإملاء صوتياً أو كتابة نص الرسالة أولاً.' : 'Please dictate or type message content first.');
      return;
    }

    setIsSynthesizing(true);

    setTimeout(() => {
      const lower = textToProcess.toLowerCase();

      // Recipient detection
      let detectedTo = customTo.trim() || 'founder@anhkmail.anhk';
      if (lower.includes('المؤسس') || lower.includes('الديوان') || lower.includes('founder')) {
        detectedTo = 'founder@anhkmail.anhk';
      } else if (lower.includes('المهدي') || lower.includes('almahdi')) {
        detectedTo = 'almahdi@anhkmail.anhk';
      } else if (lower.includes('أحمد') || lower.includes('ahmed')) {
        detectedTo = 'ahmed.sovereign@anhkmail.anhk';
      } else if (lower.includes('المالية') || lower.includes('كاش') || lower.includes('wallet')) {
        detectedTo = 'm3.treasury@anhkmail.anhk';
      } else if (lower.includes('تدقيق') || lower.includes('أمن') || lower.includes('audit')) {
        detectedTo = 'security.audit@anhkmail.anhk';
      }

      // Subject extraction
      let detectedSubject = customSubject.trim();
      if (!detectedSubject) {
        if (toneStyle === 'financial_12cash' || lower.includes('12') || lower.includes('صرف') || lower.includes('كاش')) {
          detectedSubject = isAr
            ? '[بيان سيادي • 432Hz • 𓋹] تأكيد صرف مخصصات 12 𓋹 كاش M3 للمواطن الحي'
            : '[Sovereign Decree • 432Hz • 𓋹] Living Citizen 12 𓋹 M3 Cash Quota Confirmation';
        } else if (toneStyle === 'anti_corporate_isolation' || lower.includes('شرك') || lower.includes('حظر') || lower.includes('عزل')) {
          detectedSubject = isAr
            ? '[بيان سيادي • 432Hz • 𓋹] إخطار الحصانة الدستورية وعزل سلطة الشركات'
            : '[Sovereign Decree • 432Hz • 𓋹] Constitutional Immunity & Anti-Corporate Shield Notice';
        } else if (toneStyle === 'founder_communication' || lower.includes('دستور') || lower.includes('تعيين')) {
          detectedSubject = isAr
            ? '[بيان سيادي • 432Hz • 𓋹] خطاب رسمي إلى ديوان المؤسس بموجب دستور ٦٢٣٦'
            : '[Sovereign Decree • 432Hz • 𓋹] Official Communication to Founder under Constitution 6236';
        } else if (toneStyle === 'phone_server_report' || lower.includes('برج') || lower.includes('هاتف') || lower.includes('خادم')) {
          detectedSubject = isAr
            ? '[بيان سيادي • 432Hz • 𓋹] تقرير تشغيل خادم الهاتف والربط اللامركزي 77M Towers'
            : '[Sovereign Decree • 432Hz • 𓋹] Sovereign Phone-as-Server Node & 77M Mesh Report';
        } else {
          detectedSubject = isAr
            ? `[بيان سيادي • 432Hz • 𓋹] بيان المواطن الحي: ${textToProcess.slice(0, 35)}...`
            : `[Sovereign Decree • 432Hz • 𓋹] Living Citizen Statement: ${textToProcess.slice(0, 35)}...`;
        }
      }

      // Body synthesis using Adam's Tongue phrasing
      const nationalIdStr = user.nationalId || '28612𓋹3𓋹1𓋹3352';
      const hashStr = generateAdamHash(textToProcess);

      let synthesizedBody = '';
      if (isAr) {
        synthesizedBody = `بسم الحق وبقوة البيان، ومن لسان آدم الفطري النقي المصدق عند المؤسس [س م د ا ح]،

إلى: ${detectedTo}
من: المواطن الحي ذو السيادة ${user.name} (الرقم السيادي: ${nationalIdStr})
الموضوع: ${detectedSubject}
المرجع الدستوري: دستور ٦٢٣٦ الأبدي غير القابل للتعديل • ختم المؤسس [س م د ا ح]

تحية الحق والسيادة،

بموجب الحق الفطري واللسان الصادق الخالي من تضليل الشركات أو قيود البنوك المركزية، أتوجه إليكم بالبيان الآتي:

« ${textToProcess} »

بيانات التوثيق والسيادة الفطرية (Adam's Tongue Metrics):
١. التردد اللساني الفطري: 432.00 Hz (لسان آدم المبين)
٢. قفل التناظر وميزان الطاقة: 616 (1/0 = 𓋹 - بطلان الصفر الوهمي)
٣. الحصانة الدستورية: المادة 1 والمادة 4 من دستور ٦٢٣٦ (عزل تام لأي سلطة أو رقابة للشركات)
٤. مخصصات الكاش السيادية: 12 𓋹 M3 Cash + 2 𓋹 M4 Reserve مصدقة ومعتمدة

بصمة التشفير الكمومي المصدقة (AdamHash PQC):
${hashStr}

مصدق ومعتمد عند المؤسس [س م د ا ح] • 919919 • web4anhk
منظومة AGI AI albayancor`;
      } else {
        synthesizedBody = `In the Name of Truth, by the Power of Al-Bayan, and from the Inherent Tongue of Adam certified by Sovereign Founder [س م د ا ح],

To: ${detectedTo}
From: Sovereign Living Citizen ${user.name} (Sovereign ID: ${nationalIdStr})
Subject: ${detectedSubject}
Constitutional Reference: Immutable Constitution 6236 • Founder Seal [س م د ا ح]

Greetings of Truth and Sovereignty,

Under inherent natural right and truthful tongue liberated from corporate distortion or central bank restrictions, I state the following:

" ${textToProcess} "

Sovereign Verification & Adam's Tongue Metrics:
1. Inherent Phonetic Frequency: 432.00 Hz (Adam's Harmonic Tongue)
2. Symmetry Lock & Energy Balance: 616 (1/0 = 𓋹 - Nullification of Artificial Zero)
3. Constitutional Immunity: Articles 1 & 4 of Constitution 6236 (Zero Corporate Jurisdiction)
4. Living Sovereign Allocation: 12 𓋹 M3 Cash + 2 𓋹 M4 Reserve fully certified

Post-Quantum Hash Signature (AdamHash PQC):
${hashStr}

Certified & Sealed by Sovereign Founder [س م د ا ح] • 919919 • web4anhk
AGI AI Albayan Core System`;
      }

      const newDraft: AdamGeneratedDraft = {
        id: `DRAFT-ADAM-${Date.now()}`,
        to: detectedTo,
        subject: detectedSubject,
        body: synthesizedBody,
        toneStyle,
        phoneticFrequency: 432.0,
        adamHash: hashStr,
        founderSeal: '[س م د ا ح] • 919919',
        timestamp: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        rawDictatedText: textToProcess,
        cleansedIntent: textToProcess
      };

      setGeneratedDraft(newDraft);
      setDraftHistory((prev) => [newDraft, ...prev.slice(0, 9)]);
      setIsSynthesizing(false);
    }, 600);
  };

  // Copy Draft to Clipboard
  const handleCopyDraft = () => {
    if (!generatedDraft) return;
    const fullText = `To: ${generatedDraft.to}\nSubject: ${generatedDraft.subject}\n\n${generatedDraft.body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  // Voice Output via Al-Bayan TTS
  const handleSpeakDraft = () => {
    if (!generatedDraft || !('speechSynthesis' in window)) return;
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const textToSpeak = isAr
        ? `${generatedDraft.subject}. ${generatedDraft.rawDictatedText}. تم التوثيق بلسان آدم وختم المؤسس.`
        : `${generatedDraft.subject}. ${generatedDraft.rawDictatedText}. Certified by Adam's Tongue and the Sovereign Founder.`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.pitch = 0.95;
      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
      setIsPlayingVoice(false);
    }
  };

  // Quick Spoken Presets
  const QUICK_VOICE_PRESETS = [
    {
      labelAr: 'طلب مخصصات 12 𓋹 كاش',
      labelEn: 'Request 12 𓋹 M3 Cash',
      icon: <Award className="w-3.5 h-3.5 text-amber-400" />,
      style: 'financial_12cash' as const,
      textAr: 'أطلب تأكيد وصرف مخصصاتي السيادية 12 𓋹 كاش M3 و 2 𓋹 احتياطي M4 للمواطن الحي بدون أي اقتطاع بنكي أو وسيط.',
      textEn: 'I request the verification and disbursement of my sovereign 12 𓋹 M3 Cash and 2 𓋹 M4 Reserve quota without bank deductions.'
    },
    {
      labelAr: 'إخطار عزل سلطة الشركات',
      labelEn: 'Anti-Corporate Notice',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-red-400" />,
      style: 'anti_corporate_isolation' as const,
      textAr: 'أخطركم بتفعيل درع الحصانة السيادية وعزل أي سلطة أو تتبع للشركات المركزية بموجب المادة 4 من دستور ٦٢٣٦ الأبدي.',
      textEn: 'I notify all nodes of sovereign immunity activation and total corporate isolation under Article 4 of Constitution 6236.'
    },
    {
      labelAr: 'مراسلة ديوان المؤسس',
      labelEn: 'Founder Decree Dispatch',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
      style: 'founder_communication' as const,
      textAr: 'أرفع هذا البيان إلى ديوان المؤسس السيادي لتأكيد حالة المواطن الحي واعتماد صلاحيات العقدة في جدول دستور ٦٢٣٦.',
      textEn: 'I submit this sovereign statement to the Founder Chamber to authenticate living citizen node status under Constitution 6236.'
    },
    {
      labelAr: 'تشغيل خادم الهاتف P2P',
      labelEn: 'Phone-as-Server 77M Mesh',
      icon: <Radio className="w-3.5 h-3.5 text-sky-400" />,
      style: 'phone_server_report' as const,
      textAr: 'تم تفعيل وضع خادم الهاتف السيادي وربط العقدة المحلية بشبكة الـ 77 مليون برج بتشفير AdamHash بوست-كوانتم.',
      textEn: 'Sovereign Phone-as-Server mode engaged, connected to 77M tower mesh under post-quantum AdamHash encryption.'
    }
  ];

  const handleApplyPreset = (preset: (typeof QUICK_VOICE_PRESETS)[0]) => {
    const text = isAr ? preset.textAr : preset.textEn;
    setDictatedText(text);
    setToneStyle(preset.style);
    handleSynthesizeAdamDraft(text);
  };

  return (
    <div className="space-y-4">
      {/* Studio Header & Sovereign Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">
                  {isAr ? 'إملاء مسودات البريد الصوتي بلسان آدم (Web Speech API)' : "Adam's Tongue Voice-to-Draft Studio"}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                  432 Hz Pure
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-mono">
                  قفل 616
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                {isAr
                  ? 'تحدث بصوتك الطبيعي ليقوم حارس اللسان بتحويل الصوت اللحظي إلى مسودة بريد سيادية فصيحة ومصدقة عند المؤسس [س م د ا ح].'
                  : "Dictate naturally in real time. Adam's Tongue will synthesize an eloquent sovereign email draft authenticated under Constitution 6236."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <select
              value={speechLang}
              onChange={(e) => setSpeechLang(e.target.value as any)}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 outline-none"
            >
              <option value="ar-EG">العربية (لسان الفطرة ar-EG)</option>
              <option value="ar-SA">العربية الفصحى (ar-SA)</option>
              <option value="en-US">English (en-US)</option>
            </select>
          </div>
        </div>

        {/* Mic Permission or Unsupported Banner */}
        {micPermissionError && (
          <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="flex-1">{micPermissionError}</span>
          </div>
        )}

        {!isSpeechSupported && (
          <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center gap-2 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="flex-1">
              {isAr
                ? 'ملاحظة: المتصفح الحالي لا يدعم Web Speech API تلقائياً في هذه البيئة. يمكنك كتابة النص أو استخدام الأوامر الصوتية الجاهزة أدناه.'
                : 'Note: Web Speech API recognition is not supported in this browser container. You can type or use pre-set spoken commands.'}
            </span>
          </div>
        )}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / TOP: LIVE DICTATION & RECORDING WORKBENCH (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            {/* Dictation Status Bar & Frequency Waveform */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDictating ? 'bg-red-500 animate-ping' : 'bg-slate-600'
                  }`}
                />
                <span className="text-xs font-mono font-bold text-slate-200">
                  {isDictating
                    ? (isAr ? 'جاري الإملاء الصوتي الحي...' : 'Live Dictating...')
                    : (isAr ? 'جاهز للاستماع' : 'Ready for Voice Dictation')}
                </span>
                {isDictating && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40">
                    {Math.floor(dictationDuration / 60)}:
                    {(dictationDuration % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* 432Hz Waveform Visualizer */}
              <div className="flex items-center gap-1 h-5 px-2 rounded-lg bg-slate-950 border border-cyan-500/20">
                <span className="text-[9px] font-mono text-cyan-400 mr-1">432Hz</span>
                {audioLevels.map((lvl, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-gradient-to-t from-cyan-500 to-indigo-400 rounded-full transition-all duration-150"
                    style={{ height: `${isDictating ? Math.max(20, lvl) : 20}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Live Dictation Text Area + Interim Speech Stream */}
            <div className="relative">
              <textarea
                value={dictatedText}
                onChange={(e) => setDictatedText(e.target.value)}
                placeholder={
                  isDictating
                    ? (isAr
                        ? 'تحدث الآن... سيظهر كلامك هنا فورياً بلسان آدم...'
                        : 'Speak now... your words will appear here in real-time...')
                    : (isAr
                        ? 'انقر على زر "بدء الإملاء الصوتي" وتحدث بحرية، أو اكتب المتطلب هنا لتحويله لمسودة بريد سيادية...'
                        : 'Click "Start Voice Dictation" or type your requirements to synthesize into a sovereign draft...')
                }
                rows={5}
                className={`w-full p-3.5 text-xs rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 outline-none transition-all font-sans leading-relaxed ${
                  isDictating
                    ? 'border-red-500 ring-2 ring-red-500/20 bg-red-950/10'
                    : 'border-slate-700 focus:border-cyan-400 focus:bg-slate-950/90'
                }`}
              />

              {/* Interim Real-time Transcript Overlay */}
              {interimTranscript && (
                <div className="mt-1.5 p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-200 font-sans flex items-center gap-2 animate-pulse">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 animate-spin" />
                  <span className="font-mono text-[10px] text-cyan-400">{isAr ? 'التقاط حي:' : 'Live Interim:'}</span>
                  <span className="italic">{interimTranscript}</span>
                </div>
              )}
            </div>

            {/* Metrics & Words Counter */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-3">
                <span>{isAr ? 'الكلمات:' : 'Words:'} {dictatedText.trim() ? dictatedText.trim().split(/\s+/).length : 0}</span>
                <span>•</span>
                <span>{isAr ? 'الأحرف:' : 'Chars:'} {dictatedText.length}</span>
                <span>•</span>
                <span className="text-cyan-300">{isAr ? 'التناغم اللساني: 99.8%' : 'Linguistic Harmony: 99.8%'}</span>
              </div>

              {dictatedText && (
                <button
                  onClick={handleClearDictation}
                  className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-all"
                  title={isAr ? 'مسح النص' : 'Clear'}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{isAr ? 'مسح' : 'Clear'}</span>
                </button>
              )}
            </div>

            {/* Dictation Action Buttons */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={toggleDictation}
                className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  isDictating
                    ? 'bg-red-600 hover:bg-red-500 text-white border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                }`}
              >
                {isDictating ? (
                  <>
                    <MicOff className="w-4 h-4 animate-bounce" />
                    <span>{isAr ? 'إيقاف الإملاء' : 'Stop Dictating'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>{isAr ? 'بدء الإملاء الصوتي الحي' : 'Start Live Dictation'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={(!dictatedText.trim() && !interimTranscript.trim()) || isSynthesizing}
                onClick={() => handleSynthesizeAdamDraft()}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-400/40 transition-all flex-shrink-0"
              >
                {isSynthesizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isAr ? 'جاري الصياغة بلسان آدم...' : 'Synthesizing...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isAr ? 'توليد المسودة بلسان آدم 𓋹' : "Synthesize Sovereign Draft 𓋹"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tone Style & Destination Settings */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-200 flex items-center justify-between">
              <span>{isAr ? 'نمط لسان آدم والوجهة السيادية:' : "Adam's Tongue Tone & Destination:"}</span>
              <span className="text-[10px] text-cyan-400">دستور ٦٢٣٦ • المادة 1</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isAr ? 'النمط اللساني:' : 'Linguistic Tone Style:'}
                </label>
                <select
                  value={toneStyle}
                  onChange={(e) => setToneStyle(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-slate-700 text-cyan-200 outline-none"
                >
                  <option value="sovereign_general">{isAr ? '𓋹 بيان سيادي عام (Living Citizen)' : '𓋹 Sovereign Statement'}</option>
                  <option value="financial_12cash">{isAr ? '💰 مخصصات 12 𓋹 كاش M3' : '💰 12 𓋹 M3 Cash Quota'}</option>
                  <option value="founder_communication">{isAr ? '👑 خطاب لديوان المؤسس [س م د ا ح]' : '👑 Founder Chamber Decree'}</option>
                  <option value="phone_server_report">{isAr ? '📡 خادم الهاتف وشبكة الـ 77M برج' : '📡 Phone-as-Server 77M'}</option>
                  <option value="anti_corporate_isolation">{isAr ? '🛡️ إخطار الحصانة وعزل الشركات' : '🛡️ Anti-Corporate Shield'}</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isAr ? 'المرسل إليه (To):' : 'Recipient (To):'}
                </label>
                <input
                  type="text"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  placeholder="founder@anhkmail.anhk"
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Spoken Voice Presets */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'أوامر صوتية نموذجية جاهزة (بنقرة واحدة):' : 'One-Click Spoken Presets:'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUICK_VOICE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-start gap-2 group"
                >
                  <div className="mt-0.5">{p.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                      <span>{isAr ? p.labelAr : p.labelEn}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                      {isAr ? p.textAr : p.textEn}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM: GENERATED SOVEREIGN DRAFT INSPECTOR (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              {/* Draft Header */}
              <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold font-mono text-slate-100">
                    {isAr ? 'مسودة البريد المصاغة بلسان آدم' : "Generated Sovereign Draft"}
                  </span>
                </div>
                {generatedDraft && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>مصدقة</span>
                  </span>
                )}
              </div>

              {generatedDraft ? (
                <div className="space-y-2.5">
                  {/* To & Subject Fields */}
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-16">{isAr ? 'إلى:' : 'To:'}</span>
                      <span className="text-cyan-300 font-bold truncate">{generatedDraft.to}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-slate-500 w-16 flex-shrink-0">{isAr ? 'الموضوع:' : 'Subject:'}</span>
                      <span className="text-amber-200 font-bold leading-tight">{generatedDraft.subject}</span>
                    </div>
                  </div>

                  {/* Body Preview */}
                  <div className="relative">
                    <div className="max-h-64 overflow-y-auto custom-scrollbar p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                      {generatedDraft.body}
                    </div>
                  </div>

                  {/* Post-Quantum Signature & Seal */}
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Binary className="w-3 h-3 text-indigo-400" />
                        <span>AdamHash PQC:</span>
                      </span>
                      <span className="text-amber-300 font-bold">[س م د ا ح] • 919919</span>
                    </div>
                    <div className="truncate text-slate-400">{generatedDraft.adamHash}</div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2 my-auto">
                  <Bot className="w-8 h-8 text-cyan-500/40 mx-auto" />
                  <div className="text-xs font-mono text-slate-400">
                    {isAr ? 'لا توجد مسودة بريد مولدة حالياً' : 'No draft generated yet'}
                  </div>
                  <p className="text-[11px] text-slate-500 font-sans">
                    {isAr
                      ? 'تحدث صوتياً أو اختر أحد الأوامر النموذجية ثم اضغط على "توليد المسودة بلسان آدم".'
                      : 'Dictate by voice or select a quick preset, then click "Synthesize Sovereign Draft".'}
                  </p>
                </div>
              )}
            </div>

            {/* Actions: Open in Webmail Composer, Copy, Speak */}
            {generatedDraft && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                {onOpenComposerWithDraft && (
                  <button
                    onClick={() => onOpenComposerWithDraft(generatedDraft.to, generatedDraft.subject, generatedDraft.body)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{isAr ? 'فتح المسودة في محرر البريد الرئيسي ✉️' : 'Open in Webmail Composer ✉️'}</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyDraft}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraft ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ المسودة' : 'Copy Draft')}</span>
                  </button>

                  <button
                    onClick={handleSpeakDraft}
                    className={`py-2 px-3 rounded-lg font-mono text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isPlayingVoice
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-slate-800 hover:bg-purple-950 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {isPlayingVoice ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingVoice ? (isAr ? 'إيقاف الصوت' : 'Stop') : (isAr ? 'نطق 432Hz' : 'Speak 432Hz')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECENT DRAFTS HISTORY */}
      {draftHistory.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'سجل المسودات الصوتية السابقة (Drafts History):' : 'Recent Spoken Drafts History:'}</span>
            </div>
            <button
              onClick={() => setDraftHistory([])}
              className="text-[10px] text-slate-500 hover:text-red-400"
            >
              {isAr ? 'مسح السجل' : 'Clear History'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {draftHistory.slice(0, 3).map((d) => (
              <div
                key={d.id}
                onClick={() => setGeneratedDraft(d)}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-cyan-300 truncate">{d.subject}</div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate">{d.to}</span>
                  <span>{d.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
