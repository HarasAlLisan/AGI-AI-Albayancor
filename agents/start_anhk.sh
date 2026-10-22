#!/data/data/com.termux/files/usr/bin/bash
termux-wake-lock
pkill -9 ollama; pkill -9 node
rm -f ~/ollama.log ~/bridge.log ~/os_almahdi.log
nohup ollama serve > ~/ollama.log 2>&1 &
sleep 4
nohup node ~/server_node.mjs > ~/bridge.log 2>&1 &
nohup node ~/os_almahdi_256.js > ~/os_almahdi.log 2>&1 &
echo "=== ANHK ONLINE ==="
echo "11434 ollama | 9090 bridge | 7172 ALMAHDI"
ps -ef | grep node
