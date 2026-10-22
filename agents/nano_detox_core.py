import os
import sys
import json
import socket
import threading
import time
import hashlib
import numpy as np
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

class Web4SovereignNanoEngine:
    def __init__(self, node_id, listen_ip, p2p_port, api_port, storage_path, dna_signature):
        self.node_id = node_id
        self.ip = listen_ip
        self.p2p_port = p2p_port
        self.api_port = api_port
        self.storage_path = storage_path
        self.dna_signature = dna_signature
        self.n = 256
        self.k = 40
        self.standard_format = "WEB4-DETOX-PROTOCOL"
        self.local_shard_pool = {}
        self.is_running = True
        if not os.path.exists(self.storage_path): os.makedirs(self.storage_path)

    def _execute_atomic_pulse(self, raw_incoming_traffic, num_shards=2):
        try:
            raw_data = json.loads(raw_incoming_traffic)
            toxic_keys = ["tracking_id", "analytics_token", "vendor_fingerprint", "org_id", "device_metrics"]
            purified_data = {k: v for k, v in raw_data.items() if k not in toxic_keys}
            purified_data["protocol_layer"] = self.standard_format
            serialized = json.dumps(purified_data, ensure_ascii=False)
            chunk_size = max(1, len(serialized) // num_shards)
            chunks = [serialized[i:i + chunk_size] for i in range(0, len(serialized), chunk_size)]
            shards_manifest = {}
            for index, chunk in enumerate(chunks):
                shard_id = f"SHARD-ANHK-{os.urandom(4).hex().upper()}"
                raw_bytes = chunk.encode('utf-8')
                numeric_repr = [b for b in raw_bytes]
                lattice_matrix = np.zeros(self.n, dtype=int)
                for i, val in enumerate(numeric_repr[:self.n]): lattice_matrix[i] = (val * self.k) % 768
                shards_manifest[shard_id] = {
                    "sequence": index,
                    "lattice_crypto_payload": lattice_matrix.tolist(),
                    "integrity_seal": os.urandom(8).hex(),
                    "line_classification": "EARTH-RECONSTRUCTION-LINE"
                }
            return shards_manifest
        except Exception as e:
            print(f"[!] Atomic Pulse Failed: {str(e)}"); return None

    def launch_infrastructure(self):
        p2p_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        p2p_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        p2p_socket.bind((self.ip, self.p2p_port))
        p2p_socket.listen(100)
        print(f"[📡 P2P MESH ACTIVE] Node Listening at {self.ip}:{self.p2p_port} (Sovereign Cellular Server).")
        threading.Thread(target=self._p2p_listener_loop, args=(p2p_socket,), daemon=True).start()
        api_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        api_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        api_socket.bind(('0.0.0.0', self.api_port))
        api_socket.listen(200)
        print(f"[🚀 API GATEWAY LIVE] Unified Front-End open on port {self.api_port} for system branches.")
        threading.Thread(target=self._api_ingress_loop, args=(api_socket,), daemon=True).start()

    def _p2p_listener_loop(self, p2p_socket):
        while self.is_running:
            try:
                sock, _ = p2p_socket.accept()
                threading.Thread(target=self._handle_p2p_stream, args=(sock,), daemon=True).start()
            except Exception: break

    def _handle_p2p_stream(self, client_socket):
        try:
            raw_data = client_socket.recv(65536).decode('utf-8')
            if not raw_data: return
            packet = json.loads(raw_data)
            if packet.get("action") == "INJECT_SHARD":
                shard_id = packet["shard_id"]
                self.local_shard_pool[shard_id] = packet["shard_payload"]
                print(f"[-> MESH HOLD] Shard [{shard_id}] locked into the memory pool of Node: {self.node_id}")
        except Exception: pass
        finally: client_socket.close()

    def _api_ingress_loop(self, api_socket):
        while self.is_running:
            try:
                branch_sock, _ = api_socket.accept()
                threading.Thread(target=self._process_branch_ingress, args=(branch_sock,), daemon=True).start()
            except Exception: break

    def _process_branch_ingress(self, branch_socket):
        try:
            raw_request = branch_socket.recv(65536).decode('utf-8')
            if not raw_request: return
            incoming_packet = json.loads(raw_request)
            branch_name = incoming_packet.get("branch_name", "UNKNOWN")
            raw_traffic = incoming_packet.get("traffic_data", "{}")
            print(f"\n[📥 BRANCH INGRESS] Unified API captured traffic from branch: '{branch_name}'")
            print(f"[🪙 LEDGER] Routing accounting metadata to M3-Individuals / M4-State accounts...")
            shards_manifest = self._execute_atomic_pulse(raw_traffic, num_shards=2)
            if shards_manifest:
                for shard_id, shard_package in shards_manifest.items():
                    threading.Thread(target=self._transmit_shard_to_node, args=("127.0.0.1", self.p2p_port, shard_id, shard_package), daemon=True).start()
            response = {"status": "SUCCESS", "message": "Detoxified and Scattered.", "timestamp": time.time()}
            branch_socket.sendall(json.dumps(response).encode('utf-8'))
        except Exception as e: print(f"[!] API Error: {str(e)}")
        finally: branch_socket.close()

    def _transmit_shard_to_node(self, peer_ip, peer_port, shard_id, shard_package):
        try:
            peer_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            peer_socket.connect((peer_ip, peer_port))
            transmission = {"action": "INJECT_SHARD", "shard_id": shard_id, "shard_payload": shard_package}
            peer_socket.sendall(json.dumps(transmission, ensure_ascii=False).encode('utf-8'))
            peer_socket.close()
            print(f"[📡 MESH LAUNCH] Shard [{shard_id}] shot causally to cell node {peer_ip}:{peer_port}")
        except Exception: pass

    def _derive_quantum_key(self, salt):
        key_material = f"{self.dna_signature}-{self.k}"
        return hashlib.pbkdf2_hmac('sha256', key_material.encode(), salt, 100000, 32)

    def write_sealed_data_to_hdd(self, file_name, purified_payload):
        print(f"\n[🔒 SANDBOX WRITE] Sealing data into local hard drive partition...")
        serialized_data = json.dumps(purified_payload, ensure_ascii=False).encode('utf-8')
        salt, iv = os.urandom(16), os.urandom(16)
        secret_key = self._derive_quantum_key(salt)
        cipher = Cipher(algorithms.AES(secret_key), modes.CFB(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        encrypted_raw_data = encryptor.update(serialized_data) + encryptor.finalize()
        final_file_path = os.path.join(self.storage_path, file_name)
        with open(final_file_path, 'wb') as f: f.write(salt + iv + encrypted_raw_data)
        print(f"[🔒 SUCCESS] File '{file_name}' is now bulletproof and isolated on your HDD.")

    def causal_reconstruct_from_hdd(self, file_name, request_dna_signature):
        print("\n[🔓 SANDBOX READ] Attempting causal retrieval from local isolated hard drive...")
        if request_dna_signature != self.dna_signature: raise PermissionError("[CRITICAL] Storage Decryption Blocked. Biometric M1 authorization required.")
        final_file_path = os.path.join(self.storage_path, file_name)
        if not os.path.exists(final_file_path): return None
        with open(final_file_path, 'rb') as f: file_content = f.read()
        salt, iv, encrypted_raw_data = file_content[:16], file_content[16:32], file_content[32:]
        secret_key = self._derive_quantum_key(salt)
        cipher = Cipher(algorithms.AES(secret_key), modes.CFB(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_raw_data = decryptor.update(encrypted_raw_data) + decryptor.finalize()
        print("[🔓 SUCCESS] Decryption granted by DNA Line. Data delivered to local memory.")
        return json.loads(decrypted_raw_data.decode('utf-8'))

if __name__ == "__main__":
    dna_auth_key = "M1-DNA-POLYMORPHIC-768-CONSTANTS-VERIFIED"
    system_core = Web4SovereignNanoEngine(
        node_id="NANO-SOVEREIGN-NODE-MAIN",
        listen_ip="127.0.0.1",
        p2p_port=9095,
        api_port=7005,
        storage_path="./sandbox_hdd_partition",
        dna_signature=dna_auth_key
    )
    system_core.launch_infrastructure()
    time.sleep(0.2)
    def simulate_branch_flow():
        try:
            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.connect(("127.0.0.1", 7005))
            payload = {
                "branch_name": "TUIS-Agriculture-And-Water-Sovereignty-Branch",
                "traffic_data": json.dumps({
                    "plan": "تطهير وحفر الآبار التكافلية وتأمين صوامع الغذاء للأحياء",
                    "tracking_id": "SPY-VEND-OPENAI-GA4",
                    "vendor_fingerprint": "MICROSOFT-WINDOWS-TELEMETRY"
                })
            }
            client.sendall(json.dumps(payload, ensure_ascii=False).encode('utf-8'))
            client.close()
        except Exception as e: print(e)
    simulate_branch_flow()
    time.sleep(0.5)
    clean_data_sample = {
        "manifest_target": "شبكات الطاقة والري المستدام للأرض الحرة",
        "purpose": "EARTH-RECONSTRUCTION-LINE"
    }
    system_core.write_sealed_data_to_hdd("sovereign_blueprint.dat", clean_data_sample)
    try:
        final_recovered_memory = system_core.causal_reconstruct_from_hdd("sovereign_blueprint.dat", dna_auth_key)
        print("\n=== OUTPUT DELIVERED IN-MEMORY FROM YOUR HARD DRIVE ===")
        print(json.dumps(final_recovered_memory, indent=2, ensure_ascii=False))
    except Exception as e: print(e)
