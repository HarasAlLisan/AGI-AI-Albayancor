import json
import time

class GuardianGateway:
    def __init__(self, gate_id="GATE-48", harmonic_frequency=6236):
        self.gate_id = gate_id
        self.frequency = harmonic_frequency
        self.active_status = "616_SYMMETRY_STABLE"

    def inspect_network_mesh(self, incoming_nodes):
        print(f"[{self.gate_id}] Scanning lattice matrix at {self.frequency}Hz...")
        time.sleep(0.5)
        
        secure_registry = []
        for node in incoming_nodes:
            if node.get("status") == "AWARE-AND-SECURE":
                secure_registry.append({
                    "node": node.get("name"),
                    "state": "LOCKED_IN_HARMONY",
                    "gate": self.gate_id
                })
            else:
                print(f"[{self.gate_id}] WARNING: Unaligned node detected and dropped.")
                
        return secure_registry

if __name__ == "__main__":
    gateway = GuardianGateway()
    
    # محاكاة تدفق العقد الشبكية ضمن البيئة السيادية
    network_stream = [
        {"name": "ALMAHDI-COG-CELL-01", "status": "AWARE-AND-SECURE"},
        {"name": "EXTERNAL-SPY-NODE", "status": "VULNERABLE"}
    ]
    
    secured_mesh = gateway.inspect_network_mesh(network_stream)
    print("\n=== [🌐 Guardian Layer Mesh Result] ===")
    print(json.dumps(secured_mesh, indent=2, ensure_ascii=False))
