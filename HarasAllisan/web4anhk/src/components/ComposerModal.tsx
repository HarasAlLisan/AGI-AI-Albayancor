import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  Sparkles, 
  Wand2, 
  Trash2, 
  Clock, 
  Check, 
  FileText,
  Lock,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Contact } from '../types';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (newEmail: {
    recipientEmail: string;
    subject: string;
    body: string;
    attachments: any[];
  }) => void;
  contacts: Contact[];
  user?: { name: string; email: string };
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
}

export const ComposerModal: React.FC<ComposerModalProps> = ({
  isOpen,
  onClose,
  onSendEmail,
  contacts,
  user,
  initialTo = '',
  initialSubject = '',
  initialBody = '',
}) => {
  const [to, setTo] = useState(initialTo);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [attachments, setAttachments] = useState<any[]>([]);

  // AI Drawer state
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState<'professional' | 'friendly' | 'concise' | 'persuasive' | 'formal'>('professional');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  if (!isOpen) return null;

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/gemini/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          tone: aiTone,
          currentSubject: subject,
          recipient: to,
        }),
      });
      const data = await res.json();
      if (data.subject && !subject) setSubject(data.subject);
      if (data.body) setBody(data.body);
    } catch (err) {
      console.error('AI Draft Error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const lower = file.name.toLowerCase();
      let type: 'pdf' | 'image' | 'code' | 'zip' | 'doc' = 'doc';
      if (lower.endsWith('.pdf')) type = 'pdf';
      else if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.svg')) type = 'image';
      else if (lower.endsWith('.zip') || lower.endsWith('.tar') || lower.endsWith('.gz')) type = 'zip';
      else if (lower.endsWith('.ts') || lower.endsWith('.js') || lower.endsWith('.json') || lower.endsWith('.py')) type = 'code';

      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / 1024 / 1024).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachments((prev) => [
          ...prev,
          {
            id: 'att-' + Date.now(),
            name: file.name,
            size: sizeStr,
            type,
            url: event.target?.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !body) {
      setFormError('Please fill in Recipient, Subject, and Body fields.');
      return;
    }
    setFormError(null);
    onSendEmail({
      recipientEmail: to,
      subject,
      body,
      attachments,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-950 border border-cyan-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-cyan-500/10 text-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="font-bold text-sm text-slate-100">رسالة مشفرة جديدة</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {user?.email || 'mohamed.salah@anhkmail.anhk'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiDrawer(!showAiDrawer)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                showAiDrawer
                  ? 'bg-purple-900 text-purple-200 border-purple-500'
                  : 'bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border-purple-500/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Smart Writer</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Assistant Drawer */}
        {showAiDrawer && (
          <div className="p-4 bg-purple-950/60 border-b border-purple-500/30 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-200">
              <span className="flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-purple-400" /> Draft Email with Gemini 3.6 AI
              </span>
              <span className="text-[10px] text-purple-400">Describe what you want to communicate</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., Invite team to Web4 roadmap review on Friday at 3pm UTC..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-purple-500/30 focus:border-purple-400 text-slate-100 placeholder-purple-300/50 outline-none"
              />
              <button
                onClick={handleAiGenerate}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs disabled:opacity-50 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGeneratingAi ? 'Writing...' : 'Generate Draft'}
              </button>
            </div>

            {/* Tone Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px]">Tone:</span>
              {(['professional', 'friendly', 'concise', 'persuasive', 'formal'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAiTone(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-colors ${
                    aiTone === t
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-slate-900 text-purple-300 hover:bg-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Fields Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
          {formError && (
            <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center justify-between animate-fadeIn">
              <span>{formError}</span>
              <button type="button" onClick={() => setFormError(null)} className="text-rose-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {/* Recipient Field */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400 w-12">To:</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="e.g. elena.rostova@anhkmail.anhk"
              className="flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder-slate-600 font-sans"
              required
            />
            {contacts.length > 0 && (
              <div className="relative group">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-cyan-400 text-[10px] font-mono flex items-center gap-1"
                >
                  <UserCheck className="w-3 h-3" /> Quick Contacts
                </button>
                <div className="absolute right-0 top-6 hidden group-hover:block w-56 p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-xl z-20 space-y-1">
                  <p className="text-[10px] font-mono text-slate-500 px-2">Click to select contact:</p>
                  {contacts.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setTo(c.email)}
                      className="w-full text-left px-2 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">@anhk</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowCcBcc(!showCcBcc)}
              className="text-[10px] font-mono text-slate-400 hover:text-cyan-400"
            >
              Cc/Bcc
            </button>
          </div>

          {/* CC / BCC inputs */}
          {showCcBcc && (
            <div className="space-y-2 pb-2 border-b border-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-12">Cc:</span>
                <input
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="CC recipient email"
                  className="flex-1 bg-transparent text-xs text-slate-100 outline-none font-sans"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-12">Bcc:</span>
                <input
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="BCC recipient email"
                  className="flex-1 bg-transparent text-xs text-slate-100 outline-none font-sans"
                />
              </div>
            </div>
          )}

          {/* Subject Line */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400 w-12">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="flex-1 bg-transparent text-xs text-slate-100 font-semibold outline-none placeholder-slate-600 font-sans"
              required
            />
          </div>

          {/* Body Area */}
          <div className="flex-1 min-h-[220px] flex flex-col">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email body here..."
              className="w-full flex-1 p-3 text-xs rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500 text-slate-100 placeholder-slate-600 outline-none font-sans resize-none leading-relaxed"
              required
            />
          </div>

          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                >
                  <Paperclip className="w-3 h-3 text-cyan-400" />
                  <span className="truncate max-w-[120px]">{att.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachments(attachments.filter((a) => a.id !== att.id))}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <label className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer transition-colors" title="Attach file">
                <Paperclip className="w-4 h-4" />
                <input type="file" onChange={handleAddAttachment} className="hidden" />
              </label>

              <button
                type="button"
                onClick={() => alert('Email saved to Drafts folder.')}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono"
              >
                Save Draft
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
