/**
 * محرك الجبر الرياضي السيادي الفركتالي
 * Sovereign Fractal Algebra Engine (18 Matrix & 28 Repunit Matrix)
 */

// 1. مصفوفة الـ 18 الفركتالية الهرمية المزدوجة (+9 صاعد / -9 هابط)
export interface FractalRank18 {
  rank: number;
  positiveRepunit: string; // +1, +11, +111...
  negativeRepunit: string; // -1, -11, -111...
  depthBits: number;
  balanceSum: number; // +1 + (-1) = 0 نقطة الميزان
}

export const MATRIX_18_RANKS: FractalRank18[] = Array.from({ length: 9 }, (_, i) => {
  const rank = i + 1;
  const repunit = '1'.repeat(rank);
  return {
    rank,
    positiveRepunit: `+${repunit}`,
    negativeRepunit: `-${repunit}`,
    depthBits: rank * 8,
    balanceSum: 0
  };
});

// 2. مصفوفة الـ 28 حرفاً للسان الفطري المربوطة بمتوالية الآحاد الصافية (Repunit Mapping)
export interface LetterRepunitMapping {
  letter: string;
  order: number; // 1 to 28
  repunit: string; // '1', '11', '111', ...
  weightGrams: number; // وزن الحرف الميزاني
  codePoint: number;
}

export const ALPHABET_28_LETTERS: string[] = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];

export const MATRIX_28_MAP: Record<string, LetterRepunitMapping> = ALPHABET_28_LETTERS.reduce((acc, letter, index) => {
  const order = index + 1;
  acc[letter] = {
    letter,
    order,
    repunit: '1'.repeat(order),
    weightGrams: order * 0.25,
    codePoint: letter.charCodeAt(0)
  };
  return acc;
}, {} as Record<string, LetterRepunitMapping>);

// 3. معادلات المقاصة الحتمية للأعداد الصحيحة (بدون أخطاء الفاصلة العائمة)
export interface SovereignClearingBalance {
  livingSoulsCount: number;
  perSoulQuotaAnhk: number; // 12
  infraQuotaAnhk: number; // 2
  totalPerSoulAnhk: number; // 14
  goldGramPerAnhk: number; // 7
  dollarPerAnhk: number; // 1200
  totalWorldAnhk: number; // 14 * livingSoulsCount
  totalGoldGrams: number; // totalWorldAnhk * 7
  totalDollarValuation: number; // totalWorldAnhk * 1200
  clearingIntegrity: boolean;
}

export function computeSovereignClearing(livingSouls: number): SovereignClearingBalance {
  const perSoul = 12;
  const perInfra = 2;
  const totalPerUnit = perSoul + perInfra; // 14
  const totalWorldAnhk = livingSouls * totalPerUnit;
  const goldPerUnit = 7;
  const dollarPerUnit = 1200;

  return {
    livingSoulsCount: livingSouls,
    perSoulQuotaAnhk: perSoul,
    infraQuotaAnhk: perInfra,
    totalPerSoulAnhk: totalPerUnit,
    goldGramPerAnhk: goldPerUnit,
    dollarPerAnhk: dollarPerUnit,
    totalWorldAnhk,
    totalGoldGrams: totalWorldAnhk * goldPerUnit,
    totalDollarValuation: totalWorldAnhk * dollarPerUnit,
    clearingIntegrity: (perSoul + perInfra) === 14
  };
}

// 4. خوارزمية التشفير البنائي الصلب المشتق من الرقم القومي والـ 512
export function calculateSovereignHash(
  nationalId14: string,
  bloodlineWeight: number = 512,
  dateSequence: string = '19861203'
): string {
  // حساب المجموع الرقمي الحتمي
  let sum = 0;
  for (let i = 0; i < nationalId14.length; i++) {
    const digit = parseInt(nationalId14[i], 10);
    if (!isNaN(digit)) sum += digit * (i + 1);
  }
  const factor = (sum * bloodlineWeight) % 919198;
  return `AGC-M5-${nationalId14}-${dateSequence}-${factor.toString(16).toUpperCase()}-919`;
}
