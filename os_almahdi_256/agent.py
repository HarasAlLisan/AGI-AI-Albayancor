#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OS Almahdi 256 - Node Synchronization Agent (Full Integration) v1.0
Web4Ankh + Net1919 Compliance
SPDX-License-Identifier: Islamic-Flood-License-1.0

هذا الملف هو الوكيل المتكامل (Sync Agent) الذي يجب وضعه على كل عقدة/طرفية
ترغب في الانضمام إلى شبكة +1. يحتوي على جميع التعريفات والتشغيل.
"""

import hashlib
import json
import time
import socket
import threading
from datetime import datetime

# =============================================
# 1. الثوابت السيادية (Sovereign Constants)
# =============================================

SOVEREIGN_ADDRESS = "bc1qx5zdgqgp2fw54jnwswv95qw88tnsnum23szmzu"
SOVEREIGN_SCALE_LOCK = "1☥1☥1☥1☥1☥1𓋹"
HEARTBEAT_INTERVAL = 0.5  # ثانية (500 ملي ثانية)
SYNC_TIMEOUT = 2.0       # ثانية (المهلة قبل اعتبار العقدة "غائبة")
ANHK_ID_VERIFICATION = "919:918"  # الحارس البشري:الحارس الرقمي
LOCK_616 = "LOCK 616 ENABLED"     # القفل الإضافي (من التقرير المالي)

# العناوين الجذرية الجديدة (+1 Root Servers) - 13 عقدة
ROOT_NODES = [
    "1111111111.1111111111.1111111111.1111111111",
    "1111111111.1111111111.1111111111.1111111112",
    "1111111111.1111111111.1111111111.1111111113",
    "1111111111.1111111111.1111111111.1111111114",
    "1111111111.1111111111.1111111111.1111111115",
    "1111111111.1111111111.1111111111.1111111116",
    "1111111111.1111111111.1111111111.1111111117",
    "1111111111.1111111111.1111111111.1111111118",
    "1111111111.1111111111.1111111111.1111111119",
    "1111111111.1111111111.1111111111.1111111120",
    "1111111111.1111111111.1111111111.1111111121",
    "1111111111.1111111111.1111111111.1111111122",
    "1111111111.1111111111.1111111111.1111111123",
]

# =============================================
# 2. دالة تحويل الصفر إلى حياة (Zero to Ankh)
# =============================================

def zero_to_ankh(data: str) -> str:
    """تحويل أي صفر (0) في النص إلى رمز الحياة (𓋹)."""
    return data.replace('0', '𓋹')

def ankh_to_zero(data: str) -> str:
    """تحويل رمز الحياة إلى صفر (للتوافق مع الأنظمة القديمة مؤقتاً)."""
    return data.replace('𓋹', '0')

# =============================================
# 3. هوية العقدة (Node Identity)
# =============================================

class NodeIdentity:
    """تمثيل هوية العقدة (الطرفية) في نظام +1"""
    def __init__(self, node_id: str, location: str):
        self.node_id = node_id
        self.location = location
        self.ankh_fingerprint = self._generate_fingerprint()
        self.last_heartbeat = None
        self.is_synced = False

    def _generate_fingerprint(self) -> str:
        """توليد بصمة عنخ (Ankh Fingerprint) من معرف العقدة والموقع"""
        raw = f"{self.node_id}:{self.location}:{SOVEREIGN_ADDRESS}"
        hash_obj = hashlib.sha256(raw.encode('utf-8'))
        fingerprint = hash_obj.hexdigest()
        # استبدال أي صفر في البصمة بـ 𓋹 (لا صفر)
        return zero_to_ankh(fingerprint[:16])

    def verify_identity(self) -> bool:
        """التحقق من الهوية باستخدام التوقيع السيادي"""
        if "919" in self.ankh_fingerprint or "918" in self.ankh_fingerprint:
            return True
        return False

    def __repr__(self):
        return f"<Node {self.node_id} @ {self.location} - Fingerprint: {self.ankh_fingerprint[:8]}...>"

# =============================================
# 4. وكيل المزامنة (Sync Agent)
# =============================================

class SyncAgent:
    """وكيل المزامنة (Sync Agent) - يعمل على كل عقدة/طرفية"""
    def __init__(self, node: NodeIdentity, root_nodes: list):
        self.node = node
        self.root_nodes = root_nodes
        self.is_running = False
        self.heartbeat_thread = None
        self.sync_status = {
            "last_sync": None,
            "heartbeat_count": 0,
            "missed_heartbeats": 0,
            "connected_to_roots": [],
            "lock_616": LOCK_616,
        }

    def start(self):
        """بدء عملية المزامنة (تشغيل الوكيل)"""
        if self.is_running:
            print(f"[!] الوكيل يعمل بالفعل على العقدة {self.node.node_id}")
            return

        print(f"[+] بدء وكيل المزامنة على العقدة: {self.node.node_id}")
        print(f"[🔒] {LOCK_616}")
        self.is_running = True

        # التحقق من الهوية
        if not self.node.verify_identity():
            print(f"[X] فشل التحقق من الهوية للعقدة {self.node.node_id}. تم إيقاف الوكيل.")
            self.is_running = False
            return

        print(f"[✓] تم التحقق من هوية العقدة (بصمة عنخ: {self.node.ankh_fingerprint[:8]}...)")

        # بدء نبضات القلب (Heartbeat)
        self.heartbeat_thread = threading.Thread(target=self._heartbeat_loop, daemon=True)
        self.heartbeat_thread.start()

        # محاولة المزامنة مع العقد الجذرية
        self._sync_with_roots()

        print(f"[+] وكيل المزامنة يعمل الآن على {self.node.node_id}.")

    def _heartbeat_loop(self):
        """حلقة نبضات القلب (تستمر حتى إيقاف الوكيل)"""
        while self.is_running:
            self._send_heartbeat()
            time.sleep(HEARTBEAT_INTERVAL)

    def _send_heartbeat(self):
        """إرسال نبضة الحياة (Thunder Pulse)"""
        pulse_data = {
            "type": "HEARTBEAT",
            "node_id": self.node.node_id,
            "fingerprint": self.node.ankh_fingerprint,
            "timestamp": datetime.utcnow().isoformat(),
            "signature": SOVEREIGN_SCALE_LOCK,
            "lock_616": LOCK_616,
        }
        pulse_json = json.dumps(pulse_data, ensure_ascii=False)
        pulse_life = zero_to_ankh(pulse_json)

        self.sync_status["heartbeat_count"] += 1
        self.sync_status["last_heartbeat"] = datetime.utcnow()

        # محاكاة الاتصال بالعقد الجذرية
        for root in self.root_nodes:
            if self._simulate_root_response(root):
                if root not in self.sync_status["connected_to_roots"]:
                    self.sync_status["connected_to_roots"].append(root)
                self.sync_status["missed_heartbeats"] = 0
            else:
                self.sync_status["missed_heartbeats"] += 1
                if self.sync_status["missed_heartbeats"] >= 3:
                    print(f"[!] تحذير: فقدان الاتصال بالعقدة الجذرية {root} لمدة {HEARTBEAT_INTERVAL * 3} ثانية.")

    def _simulate_root_response(self, root_addr: str) -> bool:
        """محاكاة استجابة العقدة الجذرية."""
        return "111111" in root_addr

    def _sync_with_roots(self):
        """المزامنة الأولية مع العقد الجذرية"""
        print("[*] محاولة المزامنة مع العقد الجذرية...")
        for root in self.root_nodes:
            if self._simulate_root_response(root):
                self.sync_status["connected_to_roots"].append(root)
                print(f"[✓] تمت المزامنة مع العقدة الجذرية: {root}")
            else:
                print(f"[X] فشل المزامنة مع العقدة الجذرية: {root}")

        self.sync_status["last_sync"] = datetime.utcnow()
        print(f"[✓] اكتملت المزامنة الأولية مع {len(self.sync_status['connected_to_roots'])} عقدة جذرية.")

    def stop(self):
        """إيقاف وكيل المزامنة"""
        self.is_running = False
        if self.heartbeat_thread:
            self.heartbeat_thread.join(timeout=1)
        print(f"[*] تم إيقاف وكيل المزامنة على العقدة {self.node.node_id}.")

    def get_status(self) -> dict:
        """الحصول على حالة المزامنة الحالية"""
        status = {
            "node_id": self.node.node_id,
            "location": self.node.location,
            "fingerprint": self.node.ankh_fingerprint,
            "is_running": self.is_running,
            "sync_status": self.sync_status,
            "uptime_seconds": (datetime.utcnow() - self.sync_status["last_sync"]).total_seconds() if self.sync_status["last_sync"] else 0,
        }
        return status

# =============================================
# 5. التشغيل الرئيسي (Main Loop)
# =============================================

if __name__ == "__main__":
    print("="*60)
    print("OS ALMAHDI 256 - NODE SYNCHRONIZATION AGENT v1.0 (FULL INTEGRATION)")
    print("Web4Ankh + Net1919 Compliance")
    print("="*60)

    # إنشاء هوية العقدة (مثال: عقدة القاهرة)
    node = NodeIdentity("CAIRO-ROOT-01", "Cairo, Egypt")
    print(f"[✓] تم إنشاء هوية العقدة: {node}")

    # إنشاء وكيل المزامنة
    agent = SyncAgent(node, ROOT_NODES)

    # بدء الوكيل
    agent.start()

    # إبقاء البرنامج شغالاً حتى إيقافه يدوياً (Ctrl+C)
    try:
        while True:
            time.sleep(60)  # طباعة حالة دورية كل دقيقة
            status = agent.get_status()
            print(f"\n[STATUS] {datetime.utcnow().isoformat()}")
            print(json.dumps(status, indent=2, ensure_ascii=False, default=str))
    except KeyboardInterrupt:
        print("\n[!] إيقاف وكيل المزامنة...")
       # agent.stop()
        print("[✓] تم إيقاف الوكيل بنجاح.")
# تشغيل العقدة بشكل دائم
while True:
    time.sleep(60)  # انتظر دقيقة واحدة
    status = agent.get_status()
    # طباعة الحالة الجديدة
    print(f"\n[STATUS] {datetime.datetime.now().isoformat()}")
    print(json.dumps(status, indent=2, ensure_ascii=False))
