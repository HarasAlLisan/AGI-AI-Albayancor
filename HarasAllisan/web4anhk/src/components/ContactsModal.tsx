import React, { useState } from 'react';
import { X, Search, ShieldCheck, UserPlus, Mail, CheckCircle2 } from 'lucide-react';
import { Contact } from '../types';

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
  onComposeTo: (email: string) => void;
}

export const ContactsModal: React.FC<ContactsModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onAddContact,
  onComposeTo,
}) => {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');

  if (!isOpen) return null;

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    const isAnhk = newEmail.includes('@anhkmail.anhk');
    onAddContact({
      id: 'c-' + Date.now(),
      name: newName,
      email: newEmail,
      role: newRole || 'Team Member',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=0284c7&color=fff`,
      status: 'online',
      domainVerified: isAnhk,
    });
    setNewName('');
    setNewEmail('');
    setNewRole('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-slate-800">
          <div>
            <h2 className="font-bold text-base text-slate-100">ANHK Webmail Contact Directory</h2>
            <p className="text-xs font-mono text-cyan-400">web4anhk.anhkmail.anhk Domain Contacts</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Add Bar */}
        <div className="p-4 border-b border-slate-900 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts by name or email..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-200 placeholder-slate-600 outline-none"
              />
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono flex items-center gap-1 hover:bg-cyan-900"
            >
              <UserPlus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-fadeIn">
              <p className="text-xs font-mono font-bold text-cyan-400">Add New Contact</p>
              <input
                type="text"
                placeholder="Full Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                required
              />
              <input
                type="email"
                placeholder="Email Address (e.g. user@anhkmail.anhk)"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                required
              />
              <input
                type="text"
                placeholder="Role or Title"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Save Contact
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-900 space-y-2 custom-scrollbar">
          {filtered.map((contact) => (
            <div key={contact.id} className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-800"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${
                      contact.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-slate-200">{contact.name}</span>
                    {contact.domainVerified && (
                      <span className="text-[10px] text-cyan-400 flex items-center" title="Verified Domain">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-cyan-400/80">{contact.email}</p>
                  <p className="text-[10px] text-slate-500">{contact.role}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onComposeTo(contact.email);
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
