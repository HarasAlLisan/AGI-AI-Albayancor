import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Globe2, 
  Cpu, 
  CheckCircle2, 
  Server, 
  Key, 
  UserCheck, 
  FileText, 
  RefreshCw,
  Layers,
  ExternalLink,
  SlidersHorizontal,
  ArrowRight,
  Database,
  Terminal,
  Activity,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  lang: 'ar' | 'en';
}

export const SecurityAuditModal: React.FC<SecurityAuditModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'dns_records' | 'identity_mgmt' | 'pqc_tls' | 'routing_mesh'>('dns_records');
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(id);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const dnsRecords = [
    {
      id: 'mx-primary',
      type: 'MX',
      host: '@',
      value: '10 mail.anhk.network',
      ttl: '3600',
      status: 'Active',
      protocol: 'RFC 5321 (SMTP)'
    },
    {
      id: 'spf-txt',
      type: 'TXT (SPF)',
      host: '@',
      value: 'v=spf1 include:_spf.anhk.network ip4:185.190.14.0/24 -all',
      ttl: '3600',
      status: 'Verified',
      protocol: 'RFC 7208'
    },
    {
      id: 'dkim-txt',
      type: 'TXT (DKIM)',
      host: 'sovereign._domainkey',
      value: 'v=DKIM1; k=ed25519; p=MCowBQYDK2VwAyEAEk93QxR8L2jP81k...',
      ttl: '3600',
      status: 'Verified',
      protocol: 'RFC 6376'
    },
    {
      id: 'dmarc-txt',
      type: 'TXT (DMARC)',
      host: '_dmarc',
      value: 'v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:reports@anhk.network',
      ttl: '3600',
      status: 'Active',
      protocol: 'RFC 7489'
    },
    {
      id: 'mta-sts',
      type: 'TXT (MTA-STS)',
      host: '_mta-sts',
      value: 'v=STSv1; id=20260815T0300Z',
      ttl: '86400',
      status: 'Enforced',
      protocol: 'RFC 8461'
    },
    {
      id: 'tlsa-dane',
      type: 'TLSA (DANE)',
      host: '_25._tcp.mail',
      value: '3 1 1 5b84c845b4104c99e9841f3914a8412c19e5be02...',
      ttl: '3600',
      status: 'Active',
      protocol: 'RFC 6698'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Console Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-sm sm:text-base text-slate-100 font-mono">
                  {isAr ? 'لوحة إدارة النطاقات والتهيئة الأمنية' : 'Enterprise Domain & Security Console'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                  Zone: anhk.network
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-slate-400 mt-0.5">
                {isAr 
                  ? 'سجلات الـ DNS المعيارية، بروتوكولات المصادقة، وتشفير الاتصال الكمومي' 
                  : 'DNS Records Management, RFC Authentication Protocols & Post-Quantum TLS 1.3'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Navigation Bar */}
        <div className="shrink-0 px-3 sm:px-6 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 sm:gap-2 overflow-x-auto select-none no-scrollbar flex-nowrap">
          <button
            onClick={() => setActiveTab('dns_records')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'dns_records'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isAr ? 'سجلات DNS والمصادقة' : 'DNS Records & RFCs'}</span>
          </button>

          <button
            onClick={() => setActiveTab('identity_mgmt')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'identity_mgmt'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'إدارة الهوية وصندوق البريد' : 'Mailbox Identity'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pqc_tls')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'pqc_tls'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'التشفير الكمومي و TLS 1.3' : 'PQC Cryptography & TLS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('routing_mesh')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'routing_mesh'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'مسارات النطاق والشبكة' : 'Routing Topology'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar text-xs">
          
          {/* TAB 1: DNS RECORDS & RFC TABLE */}
          {activeTab === 'dns_records' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-mono font-bold text-sm text-slate-100">
                    {isAr ? 'سجلات نظام أسماء النطاقات (DNS Zone Configuration)' : 'DNS Zone Configuration'}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">
                    Zone: <span className="text-cyan-400">anhk.network</span> • Name Servers: ns1.anhk.network, ns2.anhk.network
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" /> DNSSEC: Active
                  </span>
                </div>
              </div>

              {/* Structured Records Table with horizontal scrolling */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[620px] text-left font-mono text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold whitespace-nowrap">Type</th>
                        <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Host / Name</th>
                        <th className="py-2.5 px-4 font-semibold whitespace-nowrap">Value / Target</th>
                        <th className="py-2.5 px-3 font-semibold whitespace-nowrap">TTL</th>
                        <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Status</th>
                        <th className="py-2.5 px-3 text-right font-semibold whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-[11px]">
                      {dnsRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-cyan-300 whitespace-nowrap">
                            {rec.type}
                            <span className="block text-[9.5px] text-slate-500 font-normal">{rec.protocol}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-300 whitespace-nowrap">{rec.host}</td>
                          <td className="py-3 px-4 text-slate-300 font-mono select-all break-words max-w-sm">
                            {rec.value}
                          </td>
                          <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{rec.ttl}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleCopy(rec.value, rec.id)}
                              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[10px] transition-colors inline-flex items-center gap-1"
                            >
                              {copiedRecord === rec.id ? <Check className="w-3 h-3 text-emerald-400 inline" /> : 'Copy'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAILBOX IDENTITY & PROFILES */}
          {activeTab === 'identity_mgmt' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-mono font-bold text-sm text-slate-100">
                  {isAr ? 'إعدادات الحساب وصندوق البريد' : 'Mailbox Identity Profile'}
                </h3>
                <p className="text-slate-400 text-xs font-mono mt-0.5">
                  {isAr ? 'إدارة الهوية البريدية وتعيين الحساب الأساسي' : 'Primary sender address, display name & outgoing identity configuration'}
                </p>
              </div>

              {/* Active Profile Details */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">
                      {isAr ? 'الاسم الظاهر للمستلمين (Display Name):' : 'Display Name:'}
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs">
                      {user.name}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">
                      {isAr ? 'عنوان البريد الأساسي (Primary Email Address):' : 'Primary Email Address:'}
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    {isAr ? 'عقدة الخادم المضيف (Host Server Node):' : 'Host Server Node:'}
                  </label>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-mono text-xs">
                    {user.domain}
                  </div>
                </div>
              </div>

              {/* Preset Enterprise Accounts */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-slate-400 block">
                  {isAr ? 'حسابات النظام المسجلة (Registered System Accounts):' : 'Registered System Accounts:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => {
                      onUpdateUser({
                        name: 'محمد صلاح',
                        email: 'mohamed.salah@anhk.network',
                        domain: 'gateway.anhk.net',
                        signature: '--\nمحمد صلاح\nSovereign Enterprise Lead\nmohamed.salah@anhk.network'
                      });
                    }}
                    className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-200">محمد صلاح</span>
                      <span className="text-[10px] font-mono text-cyan-400">Default Primary</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">mohamed.salah@anhk.network</p>
                  </div>

                  <div
                    onClick={() => {
                      onUpdateUser({
                        name: 'المهدي | Almahdi',
                        email: 'almahdi@anhkmail.anhk',
                        domain: 'gateway.anhk.net',
                        signature: '--\nAlmahdi\nSenior Sovereign Infrastructure Lead\nalmahdi@anhkmail.anhk'
                      });
                    }}
                    className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-200">المهدي | Almahdi</span>
                      <span className="text-[10px] font-mono text-cyan-400">Sovereign Kernel</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">almahdi@anhkmail.anhk</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CRYPTOGRAPHIC PROTOCOLS & TLS 1.3 */}
          {activeTab === 'pqc_tls' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-mono font-bold text-sm text-slate-100">
                  {isAr ? 'بروتوكولات التشفير والأمان المطبقة' : 'Cryptographic Security & Transport Specifications'}
                </h3>
                <p className="text-slate-400 text-xs font-mono mt-0.5">
                  NIST Post-Quantum Standards, TLS 1.3 Transport Security & End-to-End Payload Encryption
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200 text-xs">NIST FIPS 203 (ML-KEM)</span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      Kyber-768
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Lattice-based Key Encapsulation Mechanism for quantum-resistant asymmetric key exchange.
                  </p>
                  <span className="text-[10px] text-cyan-400 block font-semibold">Security Level: NIST Category 3</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200 text-xs">NIST FIPS 204 (ML-DSA)</span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      Dilithium-3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Module-Lattice Digital Signature Algorithm for digital certificate and envelope validation.
                  </p>
                  <span className="text-[10px] text-cyan-400 block font-semibold">Security Level: NIST Category 3</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
                <span className="font-bold text-slate-200 block">Transport Layer & Ciphers</span>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Protocol Version</span>
                    <span className="text-slate-200 font-bold">TLS 1.3 (RFC 8446) Strict</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Key Agreement</span>
                    <span className="text-slate-200 font-bold">X25519Kyber768Draft00 Hybrid</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Symmetric Cipher</span>
                    <span className="text-slate-200 font-bold">AES-256-GCM / ChaCha20-Poly1305</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>MTA-STS RFC 8461</span>
                    <span className="text-emerald-400 font-bold">Enforced (mode: enforce)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROUTING TOPOLOGY */}
          {activeTab === 'routing_mesh' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-mono font-bold text-sm text-slate-100">
                  {isAr ? 'مسارات النطاق وتوجيه الرسائل' : 'Network Routing Topology'}
                </h3>
                <p className="text-slate-400 text-xs font-mono mt-0.5">
                  Select outgoing route: Standard Internet ICANN Gateway vs. Isolated Sovereign Darknet Mesh
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div
                  onClick={() => {
                    const prefix = user.email.split('@')[0] || 'user';
                    onUpdateUser({
                      email: `${prefix}@anhk.network`,
                      domain: 'gateway.anhk.net',
                      signature: `--\n${user.name}\n${prefix}@anhk.network | gateway.anhk.net`
                    });
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    user.email.includes('@anhk.network')
                      ? 'bg-slate-900 border-cyan-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-cyan-300">1. Standard Internet Gateway</span>
                    <span className="px-2 py-0.5 text-[9.5px] rounded bg-slate-800 text-slate-300">
                      ICANN Zone
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Standard IANA root DNS compatible routing for global interoperability with Gmail, Outlook, Apple, etc.
                  </p>
                  <span className="text-[10.5px] text-slate-300 block font-semibold">@anhk.network • gateway.anhk.net</span>
                </div>

                <div
                  onClick={() => {
                    const prefix = user.email.split('@')[0] || 'user';
                    onUpdateUser({
                      email: `${prefix}@anhkmail.anhk`,
                      domain: 'mesh.anhk.sovereign',
                      signature: `--\n${user.name}\n${prefix}@anhkmail.anhk | mesh.anhk.sovereign`
                    });
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    user.email.includes('.anhk')
                      ? 'bg-slate-900 border-purple-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-purple-300">2. Sovereign Mesh Overlay</span>
                    <span className="px-2 py-0.5 text-[9.5px] rounded bg-slate-800 text-slate-300">
                      RFC 6761
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Encrypted isolated routing overlay for private sovereign clearing nodes and internal communications.
                  </p>
                  <span className="text-[10.5px] text-slate-300 block font-semibold">@anhkmail.anhk • mesh.anhk.sovereign</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Console Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Host Node: <span className="text-slate-200 font-bold">{user.domain}</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-semibold text-xs transition-colors"
          >
            {isAr ? 'إغلاق اللوحة' : 'Close Console'}
          </button>
        </div>

      </div>
    </div>
  );
};
