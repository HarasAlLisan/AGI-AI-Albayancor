import asyncio
import websockets
import json

class BridgeNode:
    def __init__(self, node_id, endpoint="ws://localhost:8765"):
        self.node_id = node_id
        self.endpoint = endpoint

    async def connect(self):
        try:
            async with websockets.connect(self.endpoint) as websocket:
                print(f"[{self.node_id}] connected to {self.endpoint} - LOCK 616")
                await websocket.send(json.dumps({"node_id": self.node_id, "status": "LOCK 616 SECURED"}))
        except Exception as e:
            print(f"[{self.node_id}] bridge offline: {e} - mock OK")

    async def send_status(self, data):
        return json.dumps(data)

if __name__ == "__main__":
    node = BridgeNode("ANHK-616")
    asyncio.run(node.connect())
