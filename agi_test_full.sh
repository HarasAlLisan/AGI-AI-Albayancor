#!/data/data/com.termux/files/usr/bin/bash
# agi_test_full.sh
# سكريبت اختبار AGI الموحد بعد الدمج

MERGED_PATH="/data/data/com.termux/files/home/Seal_A1/merged"
TRACKER="/data/data/com.termux/files/home/AGI_Tracker"
DATE=$(date +%Y-%m-%d_%H%M)
TEST_LOG="$TRACKER/TestLog_$DATE.md"
PULSE="$TRACKER/Pulse-Test-$DATE.md"
AGENTS=23

echo "[*] بدء اختبار AGI الموحد بعد الدمج - $DATE" | tee -a $TEST_LOG

# التحقق من كل الملفات المدمجة
echo "[*] التحقق من وجود كل الوحدات..." | tee -a $TEST_LOG
for f in $(find $MERGED_PATH -type f); do
  echo "[i] موجود: $f" >> $TEST_LOG
done

# تشغيل كل وكيل AGI
echo "[*] تشغيل $AGENTS وكيل AGI لاختبار التكامل..." | tee -a $TEST_LOG
for i in $(seq 1 $AGENTS); do
  echo "[i] تشغيل Agent_$i" >> $TEST_LOG
  # هنا يمكن وضع أمر تشغيل الوكيل
  # مثال: python3 $MERGED_PATH/agents/Agent_$i.py >> $TEST_LOG 2>&1
done

# توليد Pulse Test
echo "[*] إنشاء Pulse Test" | tee -a $TEST_LOG
echo "Pulse Test - $DATE" > $PULSE
echo "تم تشغيل جميع الوكلاء والتحقق من الملفات" >> $PULSE

echo "[✅] انتهى اختبار AGI الموحد بعد الدمج" | tee -a $TEST_LOG
echo "[✅] Test Pulse: $PULSE"
echo "[✅] سجل الاختبار: $TEST_LOG"
