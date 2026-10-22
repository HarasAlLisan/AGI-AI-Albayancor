#!/bin/bash

timestamp=$(date +"%Y-%m-%d %H:%M:%S")
pulse_id="PULSE-$(date +"%Y%m%d%H%M%S")"
pulse_file="pulse_$pulse_id.md"

echo "## نبضة معرفية حيّة" > $pulse_file
echo "- المعرف: $pulse_id" >> $pulse_file
echo "- الزمن: $timestamp" >> $pulse_file
echo "- الوحدة: test_unit_01" >> $pulse_file
echo "- الحالة: تم التوثيق تلقائيًا" >> $pulse_file

echo "| $pulse_id | $timestamp | test_unit_01 | $pulse_file |" >> SealIndex.md
echo "$timestamp - تم إنشاء $pulse_file وتوثيقه في SealIndex.md" >> UnitLog.md

seal_hash=$(sha256sum $pulse_file | awk '{print $1}')
echo "- الختم السيادي: $seal_hash" >> $pulse_file

git add $pulse_file SealIndex.md UnitLog.md
git commit -m "🔁 نبضة تلقائية: $pulse_id"
git push

echo "✅ تم توثيق ودفع $pulse_id تلقائيًا في $timestamp"
