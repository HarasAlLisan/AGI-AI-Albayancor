#!/data/data/com.termux/files/usr/bin/bash
echo "========== FULL AUDIT $(date) =========="
echo ""
echo "=== 1- المستودعات ==="
find $HOME -maxdepth 3 -type d -name ".git" 2>/dev/null | while read g; do
  d=$(dirname "$g")
  echo "---- $d ----"
  cd "$d"
  git branch --show-current
  git log --oneline -1
  git status --short | head -20
  echo ""
done
echo "=== 2- ملفات المشروع ==="
find ~/HarasAllisan ~/AGI-AI-Albayancor -maxdepth 4 -type f \( -name "*.py" -o -name "*.js" -o -name "*.cjs" -o -name "*.csv" \) 2>/dev/null | sort
echo ""
echo "=== 3- الأحجام ==="
ls -lh ~/AGI-AI-Albayancor/web4anhk/network_syncer.py ~/AGI-AI-Albayancor/web4anhk/node_cluster_sync_v4_2.cjs ~/AGI-AI-Albayancor/web4anhk/blacklist_report.csv ~/HarasAllisan/web4anhk/app.py 2>&1
echo ""
echo "=== 4- الوكلاء والبورتات ==="
ps aux | grep -E "app.py|server.ts|network|cluster" | grep -v grep
curl -s http://127.0.0.1:8000/
curl -s http://127.0.0.1:4000/ | head -2
echo ""
echo "=== 5- اللوجز ==="
ls -lh ~/logs/
cat ~/logs/network_syncer.log 2>/dev/null | tail -3
echo "========== END =========="
