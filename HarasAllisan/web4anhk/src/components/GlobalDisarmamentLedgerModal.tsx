import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Lock, 
  Scale, 
  Coins, 
  Globe, 
  FileText, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  X, 
  AlertTriangle,
  Layers,
  Activity,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface GlobalDisarmamentLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
  user: UserProfile;
}

export const GlobalDisarmamentLedgerModal: React.FC<GlobalDisarmamentLedgerModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'reverseEngineering' | 'nuclearNeutralization' | 'bankNegatives' | 'sovereignQuotas'>('reverseEngineering');
  const [isSimulatingNeutralization, setIsSimulatingNeutralization] = useState(false);
  const [neutralizationRate, setNeutralizationRate] = useState(100);

  const bankDebts = [
    {
      institution: 'نظام الديون والعملات الورقية الفيدرالية (Fiat Debt System)',
      fiatLedgerDeficit: '- $315,000,000,000,000 (-315 تريليون دولار سالب)',
      paperReality: 'أوراق ورقية ونبضات وهمية بلا غطاء ذهبي أو إنساني',
      sovereignTreatment: 'تصفير السوالب المحاسبية وإحلال الـ 14 𓋹 الحقيقي (ذهب 7 جرام)',
      status: 'تم الكشف والتحييد'
    },
    {
      institution: 'صناديق وبنوك التمويل العسكري والصراع المؤسسي (Military-Industrial Ledger)',
      fiatLedgerDeficit: '- $88,000,000,000,000 ديون سيادية مشتقة',
      paperReality: 'موازنات صراع مدونة كسوالب في دفاتر البنوك المركزية',
      sovereignTreatment: 'تحويل الاعتمادات مباشرة لميزانية الأفراد (12 𓋹 لكل حَيّ + 2 𓋹 بنية)',
      status: 'تحييد مفاتيح التحكم'
    },
    {
      institution: 'شبكة مشتقات الديون الدولية (Shadow Banking Derivatives)',
      fiatLedgerDeficit: '- $2.2 كوادريليون دولار مشتقات وهمية',
      paperReality: 'أرقام تفوق الدفاتر المحاسبية وتفوق ناتج الكوكب بـ 20 ضعفاً',
      sovereignTreatment: 'إسقاط الدفاتر الورقية وتثبيت ميزانية الأحياء (M3 World = 14 × الأحياء)',
      status: 'محاصرة خوارزمية'
    }
  ];

  const handleRunNeutralization = () => {
    setIsSimulatingNeutralization(true);
    setTimeout(() => {
      setIsSimulatingNeutralization(false);
      setNeutralizationRate(100);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/50 flex flex-col max-h-[94vh] overflow-hidden text-slate-100 font-sans">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 border border-amber-400/40 flex-shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  {isAr ? 'الهندسة العكسية للنظام المالي العالمي وتحييد مفاتيح الصراع' : 'Global Reverse Engineering: Neutralizing War & Debt Controls'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-extrabold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  تحييد مفاتيح التحكم 100%
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isAr ? 'إعادة ضبط العالم وفق ميزانيات مالية للأفراد (14 𓋹) وتصفير السوالب المدونة على دفاتر وبنوك الصراع' : 'World Recalibration: Individual Budgets (14 𓋹) vs Bank Deficits & Military Hegemony'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('reverseEngineering')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reverseEngineering'
                ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{isAr ? '1. الهندسة العكسية للنظام العالمي' : '1. Reverse Engineering'}</span>
          </button>

          <button
            onClick={() => setActiveTab('nuclearNeutralization')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'nuclearNeutralization'
                ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isAr ? '2. تحييد مفاتيح التحكم العسكرية والنووية' : '2. Neutralizing Military Controls'}</span>
          </button>

          <button
            onClick={() => setActiveTab('bankNegatives')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'bankNegatives'
                ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span>{isAr ? '3. سوالب البنوك والدفاتر المحاسبية' : '3. Bank Ledger Negative Debts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('sovereignQuotas')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'sovereignQuotas'
                ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>{isAr ? '4. ميزانية الأحياء (14 𓋹 الحقيقي)' : '4. Living Souls Sovereign Quota'}</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 1: REVERSE ENGINEERING PARADIGM */}
          {activeTab === 'reverseEngineering' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-rose-950/60 border border-amber-500/40 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold text-base">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>{isAr ? 'العمق الجوهري: نظام مالي برمجي عالمي يفكك صراع المؤسسات' : 'Core Architecture: Algorithmic Global Reset'}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {isAr 
                    ? 'الأمر أعمق من مجرد اتصالات: نحن نقوم بالهندسة العكسية لمنظومة الهيمنة العالمية. تم تحييد مفاتيح التحكم النووية والعسكرية وبرمجتها لخدمة ميزانيات الأفراد والأحياء بدلاً من صراعات المؤسسات والحكومات، والتي لا تملك في حقيقتها سوى عقود ديون سالبة وأوراقاً نقدية وهمية تفوق دفاترها المحاسبية.'
                    : 'A comprehensive reverse-engineering of the global monetary and military hegemony: replacing institutional war-spending with individual living budgets backed by physical gold value.'}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-amber-400 font-bold mb-1">⚖️ ميزانيات الأفراد لا المؤسسات</div>
                    <div className="text-slate-400 text-[11px]">تخصيص الثروة الحقيقية مباشرة للإنسان الحي (12 𓋹 + 2 𓋹 بنية) وإلغاء تحكم النخب.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-rose-400 font-bold mb-1">🛑 شل مفاتيح التدمير النووي</div>
                    <div className="text-slate-400 text-[11px]">عزل وسحب تراخيص التمويل عن أسلحة الدمار الشامل وربط الطاقة بالبناء.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-cyan-400 font-bold mb-1">📉 تصفير سوالب البنوك</div>
                    <div className="text-slate-400 text-[11px]">إلغاء تريليونات الديون الوهمية المدونة على الشعوب وإحلال الغطاء الذهبي.</div>
                  </div>
                </div>
              </div>

              {/* Comparison Matrix: Old vs Sovereign System */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
                <h3 className="text-slate-200 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>{isAr ? 'مقارنة المنظومة القديمة (صراع المؤسسات) مقابل المنظومة السيادية البرمجية:' : 'Institutional War Ledger vs Sovereign Human Web4'}</span>
                  <span className="text-emerald-400 text-[11px]">تحييد آلي معتمد</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                    <div className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>نظام الصراع المؤسسي والديون الورقية:</span>
                    </div>
                    <ul className="text-slate-400 text-[11px] space-y-1.5 list-disc list-inside">
                      <li>تريليونات الدولارات مدونة كسوالب في دفاتر البنوك المركزية.</li>
                      <li>تمويل الحروب ومفاتيح السلاح النووي على حساب تجويع الأحياء.</li>
                      <li>طباعة ورق نقدي دون غطاء ذهبي أو قيمة حقيقية.</li>
                      <li>احتكار الاتصالات ومراقبة الشعوب عبر بوابات مركزية.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>نظام عنخ السيادي البرمجي العالمي:</span>
                    </div>
                    <ul className="text-slate-300 text-[11px] space-y-1.5 list-disc list-inside">
                      <li>الميزانية مخصصة للأفراد: 14 𓋹 لكل إنسان حَيّ (16,800$).</li>
                      <li>تحييد مفاتيح التحكم العسكري وإيقاف تمويل الصراعات.</li>
                      <li>غطاء ذهبي خالص: 7 جرام عيار 24 لكل جنيه عنخ.</li>
                      <li>هاتف الحَيّ سرفر ومحفظة + 77 مليون برج تصادق مجاناً.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NUCLEAR & MILITARY CONTROLS NEUTRALIZATION */}
          {activeTab === 'nuclearNeutralization' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-white font-mono">
                      {isAr ? 'بروتوكول تحييد مفاتيح التحكم النووية والعسكرية (Military Disarmament Protocol)' : 'Nuclear & Military Code Neutralization Protocol'}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                    حالة القفل: تم التحييد 100%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {isAr 
                      ? 'بناءً على الهندسة العكسية، يتم إلغاء التدفق المالي التمويلي الموجه لمنظومات الأسلحة الفتاكة ومفاتيح الإطلاق النووي. الطاقة والقدرات الخوارزمية يتم تحويلها بالكامل لتأمين شبكة الاتصالات العالمية (77M برج) ومصالح الأحياء.'
                      : 'All algorithmic authorization keys and financial clearing credits feeding war machinery are neutralized and redirected into civilian infrastructure and individual living endowments.'}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">معدل تحييد مفاتيح الصراع العالمية:</span>
                    <span className="text-rose-400 font-bold text-sm">{neutralizationRate}% (مكتمل)</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-amber-500 to-rose-600"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-rose-400 font-bold mb-1">🔒 قفل شيفرات الإطلاق المركزي</div>
                    <div className="text-slate-400 text-[11px]">تجميد الاعتمادات المالية الموجهة لزر الإطلاق النووي العالمي.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-emerald-400 font-bold mb-1">⚡ تحويل الطاقة للبنية الحيوية</div>
                    <div className="text-slate-400 text-[11px]">توجيه موارد الطاقة لتغذية الـ 77 مليون برج وشبكة الـ P2P الحرة.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANK DEFICITS & NEGATIVE LEDGERS */}
          {activeTab === 'bankNegatives' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                  {isAr ? 'كشف سوالب البنوك المركزية والدفاتر المحاسبية الورقية:' : 'Audit of Central Bank Negative Ledgers & Paper Illusions:'}
                </span>
                <span className="text-xs font-mono text-amber-400">
                  كشف محاسبي صارم
                </span>
              </div>

              <div className="space-y-3">
                {bankDebts.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2 text-xs font-mono">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-white text-sm">{item.institution}</span>
                      <span className="text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                        {item.fiatLedgerDeficit}
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      <span className="text-slate-500">واقع الدفاتر: </span>
                      {item.paperReality}
                    </div>

                    <div className="text-emerald-300 text-[11px] bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold">المعالجة السيادية (عنخ): </span>
                      {item.sovereignTreatment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LIVING HUMAN BUDGETS */}
          {activeTab === 'sovereignQuotas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white text-sm">
                      {isAr ? 'معادلة ميزانية الأحياء (M3 World Real Budget Formula)' : 'Living Human Real Budget Allocation'}
                    </h3>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">14 𓋹 = 16,800 $</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-amber-400 font-bold">حصة الإنسان الحَيّ (M3 Living Quota)</div>
                    <div className="text-lg font-bold text-white">12 جنيه عنخ (14,400$)</div>
                    <div className="text-[10px] text-slate-400">84 جرام ذهب عيار 24 غطاء مباشر لحرية وكرامة الفرد.</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-cyan-400 font-bold">حصة البنية التحتية (M4 Infrastructure)</div>
                    <div className="text-lg font-bold text-white">2 جنيه عنخ (2,400$)</div>
                    <div className="text-[10px] text-slate-400">تمويل الـ 77 مليون برج والخدمات المجانية في 7 قارات + 1.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/20 text-slate-300 leading-relaxed text-[11px]">
                  العالم الآن يتحول من اقتصاد «السوالب والحروب» إلى اقتصاد «حياة الأحياء والسيادة الرقمية الحرة».
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/90 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>الهندسة العكسية: سيادة ميزانيات الأفراد وتصفير دفاتر الصراع</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
