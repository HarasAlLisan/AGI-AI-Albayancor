#!/bin/bash

echo "🏗️ بدء هيكلة وتنظيم ملفات منظومة OS ALMAHDI والدستور 6236..."

# 1. إنشاء المجلدات الهيكلية الرئيسية
mkdir -p core agents network web logs backups

# 2. نقل ملفات النواة والسيادة والحماية (Core & Kernel)
mv kalki_sovereign.py kalki_anti_tamper.py system_core.py nano_fortress_kernel.py core/ 2>/dev/null
mv kalki.py kalki_final.py kalki_real.py kalki_ultra.py kalki_v12.py core/ 2>/dev/null
mv kalki_deep_matrix.py kalki_global_matrix.py gcode_6236.py kalki_pow_6236.py core/ 2>/dev/null
mv chain_verify.py chain_viewer.py kalki_v12_expansion.py kalki_verify.py core/ 2>/dev/null
mv system.py core_py.py verify_fixed.py full_audit.sh core/ 2>/dev/null

# 3. نقل ملفات الوكلاء وعقول الإدراك والذكاء الحر (AI & Agents)
mv ai_albayancor.py nano_cognition_cell.py sovereign_synthesis.py agents/ 2>/dev/null
mv nano_detox_core.py nlp_cleaner.py script.py agents/ 2>/dev/null

# 4. نقل ملفات الشبكة والتردد والتزامن اللامركزي (Network & P2P)
mv node_cluster_sync_enforce.js node_cluster_sync_safe.js node_cluster_sync_v4_2.js network/ 2>/dev/null
mv network_syncer.py nano_frequency_hopper.py p2p.log network/ 2>/dev/null
mv test.js daemon_hook.py anti_botnet.py bridge.log network/ 2>/dev/null

# 5. نقل واجهات العرض والتحكم ولوحات القيادة (Web & Dashboards)
mv build_omega_dashboard.py build_v12_dashboard.py index_omega.html web/ 2>/dev/null
mv index_v12.html index_4000.html verify_omega.py web4.log web/ 2>/dev/null
mv blocks.html html/ 2>/dev/null

# 6. عزل ملفات السجلات والنبضات (Logs)
mv *.log logs/ 2>/dev/null
mv logs/auto_push.sh logs/master_sync_recovery.sh logs/fix_remote_and_push.sh ./ 2>/dev/null # استبقاء سكربتات الإدارة في الخارج

# 7. نقل ملفات الأرشيف الكبيرة لحماية مساحة الرفع المستقبلي (Backups)
mv *.tar.gz backups/ 2>/dev/null
mv *.zip backups/ 2>/dev/null

echo "✅ تم تنظيم وهيكلة أعمال المنظومة بنجاح فائق وتوزيعها على الخلايا المنسقة!"
