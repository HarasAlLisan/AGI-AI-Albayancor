#!/bin/bash

# 🕰️ الحصول على التاريخ والوقت الحالي
timestamp=$(date +"%Y-%m-%d | %H:%M %Z")
log_id="ALB-Log-$(date +"%Y-%m-%d-%H%M")"

# 📝 تحديث WorkManifestLog.md
echo "## 🕰️ [$timestamp]" >> WorkManifestLog.md
echo "- **الختم**: GAL-099 (Seal_Unified)" >> WorkManifestLog.md
echo "- **الحدث**: نبضة جديدة في سجل السيادة" >> WorkManifestLog.md
echo "- **الوصف**: تحديث تلقائي عبر deploy_log.sh" >> WorkManifestLog.md
echo "- **المعرف الزمني**: $log_id" >> WorkManifestLog.md
echo "- **التحقق**: Seal_A1 ✅" >> WorkManifestLog.md
echo "" >> WorkManifestLog.md

# 📝 تحديث UnifiedLog.md
echo "[UnifiedLog - $timestamp]" >> UnifiedLog.md
echo "- WorkManifestLog.md: $log_id" >> UnifiedLog.md
echo "- الختم: GAL-099 (Seal_Unified)" >> UnifiedLog.md
echo "- التحقق: Seal_A1 ✅" >> UnifiedLog.md
echo "" >> UnifiedLog.md

# 🔁 دفع التحديثات
git add WorkManifestLog.md UnifiedLog.md
git commit -m "🕰️ نبضة جديدة تحت ختم GAL-099 – $log_id"
git push origin main

echo "✅ تم تسجيل النبضة ودفعها بنجاح: $log_id"
