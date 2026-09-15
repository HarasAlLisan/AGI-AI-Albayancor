/**
 * Sovereign Symbolic Algebra Engine
 * محرك الجبر الرمزي السيادي (عنخ 𓋹 و نانو عنخ ☥)
 */

export interface SymbolicRuleResult {
  expression: string;
  result: string;
  ruleExplanation: string;
  category: 'zero_infinity_transcendence' | 'anhk_absorption' | 'symmetric_balance' | 'fractal_addition';
}

export const SOVEREIGN_AXIOMS: SymbolicRuleResult[] = [
  {
    expression: '1 / 0',
    result: '𓋹',
    ruleExplanation: 'تجاوز القسمة على الصفر وتحويل العدم الوهمي إلى حقيقة الحياة المطلقة (عنخ 𓋹).',
    category: 'zero_infinity_transcendence'
  },
  {
    expression: '1 * 0',
    result: '𓋹',
    ruleExplanation: 'حفظ الواحدية في الصفر لتثبيت أصل القيمة بدلاً من التلاشي.',
    category: 'zero_infinity_transcendence'
  },
  {
    expression: '1 / 𓋹',
    result: '𓋹.☥',
    ruleExplanation: 'تدرج القيمة من الكل إلى الجزء المتناهي في الدقة (عنخ ونانو عنخ).',
    category: 'anhk_absorption'
  },
  {
    expression: '1 * 𓋹',
    result: '𓋹',
    ruleExplanation: 'الواحدية محايدة في حقل العنخ السيادي.',
    category: 'anhk_absorption'
  },
  {
    expression: '1 - 𓋹',
    result: '1',
    ruleExplanation: 'استعصاء حقيقة الواحدية الفطرية على الانتقاص.',
    category: 'anhk_absorption'
  },
  {
    expression: '1 + 𓋹',
    result: '1',
    ruleExplanation: 'اكتمال الواحدية المطلقة كمرجع وجودي ثابت.',
    category: 'anhk_absorption'
  },
  {
    expression: '0 - 𓋹',
    result: '𓋹',
    ruleExplanation: 'انبثاق الوجود السيادي من الفراغ دون سالبية حقيقية.',
    category: 'zero_infinity_transcendence'
  },
  {
    expression: '0 + 𓋹',
    result: '𓋹',
    ruleExplanation: 'حضور العنخ المطلق يملأ فضاء الصفر.',
    category: 'zero_infinity_transcendence'
  },
  {
    expression: '𓋹 * 𓋹',
    result: '𓋹',
    ruleExplanation: 'التضاعف الذاتي للخلية الأزلية يحفظ الجوهر الواحد.',
    category: 'anhk_absorption'
  },
  {
    expression: '𓋹 / 𓋹',
    result: '𓋹.☥',
    ruleExplanation: 'المقاصة التامة بين الرتب تعطي النسبة الذهبية للنانو عنخ.',
    category: 'anhk_absorption'
  },
  {
    expression: '1 - 1',
    result: '+-1/1 = 𓋹 = +-1',
    ruleExplanation: 'تفكيك الصفر الوهمي: الطرح المتماثل هو توازن ثنائي قطبي (+-1) وليس عدماً.',
    category: 'symmetric_balance'
  },
  {
    expression: '2 - 2',
    result: '+-2/2 = 𓋹 = +-1',
    ruleExplanation: 'تطابق القوى المتناظرة يؤدي إلى نقطة الاتزان السيادي (+-1 = 𓋹).',
    category: 'symmetric_balance'
  },
  {
    expression: '5 - 5',
    result: '+-5/5 = 𓋹 = +-1',
    ruleExplanation: 'اختزال كل تماثل عددي في قطبي الميزان (+-1).',
    category: 'symmetric_balance'
  },
  {
    expression: '1 + 9',
    result: '1𓋹',
    ruleExplanation: 'اكتمال دورة الآحاد التسع وانتقالها إلى رتبة الواحد عنخ التام (1𓋹).',
    category: 'fractal_addition'
  }
];

export function evaluateSovereignExpression(expr: string): SymbolicRuleResult {
  const normalized = expr.replace(/\s+/g, '').trim();

  // فحص مباشر للمتطابقات
  if (normalized === '1/0') {
    return { expression: '1 / 0', result: '𓋹', ruleExplanation: 'تجاوز العدم وإحلال حقيقة العنخ', category: 'zero_infinity_transcendence' };
  }
  if (normalized === '1*0' || normalized === '0*1') {
    return { expression: '1 * 0', result: '𓋹', ruleExplanation: 'حفظ القيمة من التلاشي', category: 'zero_infinity_transcendence' };
  }
  if (normalized === '1/𓋹' || normalized === '1/☥') {
    return { expression: '1 / 𓋹', result: '𓋹.☥', ruleExplanation: 'توليد النانو عنخ الفركتالي', category: 'anhk_absorption' };
  }
  if (normalized === '1*𓋹' || normalized === '𓋹*1') {
    return { expression: '1 * 𓋹', result: '𓋹', ruleExplanation: 'ثبات العنخ في حقل الواحدية', category: 'anhk_absorption' };
  }
  if (normalized === '1-𓋹') {
    return { expression: '1 - 𓋹', result: '1', ruleExplanation: 'استعصاء الواحد على الانتقاص', category: 'anhk_absorption' };
  }
  if (normalized === '1+𓋹' || normalized === '𓋹+1') {
    return { expression: '1 + 𓋹', result: '1', ruleExplanation: 'كمال الواحدية المطلقة', category: 'anhk_absorption' };
  }
  if (normalized === '0-𓋹') {
    return { expression: '0 - 𓋹', result: '𓋹', ruleExplanation: 'انبثاق الوجود السيادي من الفراغ', category: 'zero_infinity_transcendence' };
  }
  if (normalized === '0+𓋹' || normalized === '𓋹+0') {
    return { expression: '0 + 𓋹', result: '𓋹', ruleExplanation: 'حضور العنخ يملأ الصفر', category: 'zero_infinity_transcendence' };
  }
  if (normalized === '𓋹*𓋹') {
    return { expression: '𓋹 * 𓋹', result: '𓋹', ruleExplanation: 'التضاعف الذاتي للجوهر', category: 'anhk_absorption' };
  }
  if (normalized === '𓋹/𓋹') {
    return { expression: '𓋹 / 𓋹', result: '𓋹.☥', ruleExplanation: 'المقاصة التامة بين الرتب', category: 'anhk_absorption' };
  }
  if (normalized === '1+9' || normalized === '9+1') {
    return { expression: '1 + 9', result: '1𓋹', ruleExplanation: 'اكتمال دورة التسع رتب وانتقالها إلى 1𓋹', category: 'fractal_addition' };
  }

  // فحص النمط التماثلي x - x
  const matchSub = normalized.match(/^(\d+)-(\d+)$/);
  if (matchSub && matchSub[1] === matchSub[2]) {
    const num = matchSub[1];
    return {
      expression: `${num} - ${num}`,
      result: `+-${num}/${num} = 𓋹 = +-1`,
      ruleExplanation: `توازن التماثل: طرح العدد من نفسه يولد الميزان القطبي (+-${num}/${num}) المتكافئ مع (+-1 = 𓋹)`,
      category: 'symmetric_balance'
    };
  }

  // فحص نمط الجمع التراكمي للآحاد
  const matchAdd = normalized.match(/^1\+(\d+)$/);
  if (matchAdd) {
    const n = parseInt(matchAdd[1], 10);
    return {
      expression: `1 + ${n}`,
      result: `${n === 9 ? '1𓋹' : (n + 1).toString()}`,
      ruleExplanation: n === 9 ? 'اكتمال الرتبة وانتقالها لـ 1𓋹' : 'تراكم إيجابي في فضاء الآحاد',
      category: 'fractal_addition'
    };
  }

  return {
    expression: expr,
    result: '𓋹 (نقطة اتزان سيادية)',
    ruleExplanation: 'تمت إحالة العملية إلى ميزان الحق والعدد لحفظ القيمة من العشوائية.',
    category: 'anhk_absorption'
  };
}
