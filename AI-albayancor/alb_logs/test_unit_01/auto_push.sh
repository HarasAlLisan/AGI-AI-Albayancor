#!/bin/bash

# 🕒 زمن النبضة
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
pulse_id="AUTO-$(date -u +"%Y%m%d%H%M%S")"

# 🧾 توثيق النبضة
echo "$timestamp - دفع تلقائي: $pulse_id" >> UnitLog.md

# 🔐 ربط بختم Seal 1
echo "| $pulse_id | $timestamp | Seal 1 | auto_push.sh |" >> SealIndex.md

# 🚀 تنفيذ الدفع
git add .
git commit -m "🔁 دفع تلقائي: $pulse_id تحت Seal 1"
git push

# ✅ إعلان النبضة
echo "✅ تم دفع $pulse_id تلقائيًا تحت Seal 1 في $timestamp"
