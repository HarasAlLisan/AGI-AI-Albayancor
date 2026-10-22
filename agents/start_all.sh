#!/data/data/com.termux/files/usr/bin/bash
pkill -9 ollama; pkill -9 node
rm -f ~/ollama.log ~/bridge.log ~/os_almahdi.log
nohup ollama serve > ~/ollama.log 2>&1 &
sleep 7
nohup node ~/server_node.mjs > ~/bridge.log 2>&1 &
nohup node ~/os_almahdi_256.js > ~/os_almahdi.log 2>&1 &
sleep 3
curl -s http://localhost:7172/status
