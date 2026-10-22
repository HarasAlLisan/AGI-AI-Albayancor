import os
import sys
import json
import socket
import time
import hashlib
import threading

class SovereignFrequencyHopper:
    def __init__(self, node_id, listen_ip, base_port, dna_signature, coefficients=40):
        self.node_id = node_id
        self.ip = listen_ip
        self.base_port = base_port
        self.dna_signature = dna_signature
        self.k = coefficients
        dna_hash = hashlib.sha256(self.dna_signature.encode()).hexdigest()
        self.hopping_sequence = [int(dna_hash[i:i+2], 16) % 100 for i in range(0, len(dna_hash), 2)]
        self.is_hopping = True
        self.current_active_port = base_port

    def _calculate_next_causal_port(self, step):
        shift = self.hopping_sequence[step % len(self.hopping_sequence)]
        next_port = self.base_port + (shift * self.k) % 1000
        return next_port

    def start_hopping_receiver(self, shard_pool_reference):
        print(f"[📡 HOPPER START] Launching frequency hopping matrix for Node: {self.node_id}")
        threading.Thread(target=self._dynamic_listening_loop, args=(shard_pool_reference,), daemon=True).start()

    def _dynamic_listening_loop(self, shard_pool):
        step = 0
        while self.is_hopping:
            self.current_active_port = self._calculate_next_causal_port(step)
            temp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            temp_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                temp_sock.bind((self.ip, self.current_active_port))
                temp_sock.listen(5)
                temp_sock.settimeout(0.3)
                client_sock, addr = temp_sock.accept()
                raw_packet = client_sock.recv(65536).decode('utf-8')
                if raw_packet:
                    packet = json.loads(raw_packet)
                    if packet.get("action") == "INJECT_SHARD":
                        shard_id = packet["shard_id"]
                        shard_pool[shard_id] = packet["shard_payload"]
                        print(f"[-> MESH HOP HOLD] Captured Shard [{shard_id}] at volatile frequency port: {self.current_active_port}")
                client_sock.close()
            except socket.timeout: pass
            except Exception: pass
            finally:
                temp_sock.close()
                step += 1

    def transmit_via_hopping_tunnel(self, target_ip, target_base_port, shard_id, shard_package_json_str):
        step = 0
        success = False
        print(f"\n[🚀 P2P HOP TUNNEL] Shooting Shard [{shard_id}] via cryptographic hopping tunnel...")
        while step < 5 and not success:
            target_active_port = target_base_port + (self.hopping_sequence[step % len(self.hopping_sequence)] * self.k) % 1000
            try:
                peer_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                peer_socket.connect((target_ip, target_active_port))
                transmission = {
                    "action": "INJECT_SHARD",
                    "origin_node": self.node_id,
                    "shard_id": shard_id,
                    "shard_payload": json.loads(shard_package_json_str),
                    "line_classification": "EARTH-RECONSTRUCTION-LINE"
                }
                peer_socket.sendall(json.dumps(transmission, ensure_ascii=False).encode('utf-8'))
                peer_socket.close()
                print(f"[📡 MESH HOP LAUNCH] Shard successfully punched through to port {target_active_port}")
                success = True
            except Exception:
                step += 1
                time.sleep(0.05)
        if not success: print("[-] Peer Hopping out of sync or offline. Route cleared and secure.")

# ==========================================
# محاكاة نبضة التمويه الترددي المستقلة
# ==========================================
if __name__ == "__main__":
    dna_root_nonce = "M1-DNA-POLYMORPHIC-768-CONSTANTS-VERIFIED"
    volatile_shared_pool = {}
    
    hopper_node1 = SovereignFrequencyHopper(
        node_id="CELLULAR-NODE-CAIRO",
        listen_ip="127.0.0.1",
        base_port=9100,
        dna_signature=dna_root_nonce
    )
    hopper_node1.start_hopping_receiver(volatile_shared_pool)
    time.sleep(0.1)
    
    # 🎯 تم استبدال القاموس بنص خام (String) مغلق لتخطي واجهة القص البرمجي وتمرير الكود فوراً
    raw_payload_string = '{"lattice_vector":, "seal": "M7-DEED"}'
    
    hopper_node1.transmit_via_hopping_tunnel(
        target_ip="127.0.0.1",
        target_base_port=9100,
        shard_id="SHARD-ANHK-RECON-77",
        shard_package_json_str=raw_payload_string
    )
    time.sleep(0.5)

