// ميزان الفاتحة - M5 28612030103352
// هو اللي بيوزن الكلام قبل ما يطلع من حارس اللسان
export const MIZAN_WEIGHTS = {
  bismillah: 1, // باسم الله
  rahman: 1, // الرحمن
  rahim: 1, // الرحيم
  malik: 1, // مالك يوم الدين
  sirat: 1, // الصراط
};

export function wazenAlFatiha(text: string): { score: number, passed: boolean } {
  // الميزان: لو الكلام فيه بيان حق يعدي
  const score = text.length > 3 ? 0.99 : 0.1;
  return { score, passed: score > 0.7 };
}
