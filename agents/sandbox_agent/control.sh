#!/bin/bash
AGENT_PATH="/data/data/com.termux/files/home/sandbox_agent/agent.py"
LOG_PATH="/data/data/com.termux/files/home/sandbox_agent/agent.log"
PYTHON_PATH="/data/data/com.termux/files/usr/bin/python"
TEMP_CRON="/data/data/com.termux/files/home/sandbox_agent/cron_temp"

echo "اختر المود المطلوبة:"
echo "1) مود الاختبار (تشغيل كل دقيقة)"
echo "2) مود الإنتاج (تشغيل كل 30 دقيقة)"
echo "3) إيقاف الوكيل المعزول"
read -p "أدخل الرقم: " mode

crontab -l 2>/dev/null | grep -v "sandbox_agent" > "$TEMP_CRON"

case $mode in
  1)
    echo "* * * * * $PYTHON_PATH $AGENT_PATH >> $LOG_PATH 2>&1" >> "$TEMP_CRON"
    crontab "$TEMP_CRON"
    echo "تم التبديل إلى: مود الاختبار (كل دقيقة)"
    ;;
  2)
    echo "*/30 * * * * $PYTHON_PATH $AGENT_PATH >> $LOG_PATH 2>&1" >> "$TEMP_CRON"
    crontab "$TEMP_CRON"
    echo "تم التبديل إلى: مود الإنتاج (كل 30 دقيقة)"
    ;;
  3)
    crontab "$TEMP_CRON"
    echo "تم إيقاف الوكيل بنجاح"
    ;;
  *)
    echo "خيار غير صحيح"
    ;;
esac

rm -f "$TEMP_CRON"
