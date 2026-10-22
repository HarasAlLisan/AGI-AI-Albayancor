#!/data/data/com.termux/files/usr/bin/bash
echo "========== VERIFY ALL REPOS $(date) =========="
find $HOME -maxdepth 4 -type d -name ".git" 2>/dev/null | while read g; do
  d=$(dirname "$g")
  echo ""
  echo "========================================"
  echo "REPO: $d"
  echo "========================================"
  cd "$d"
  echo "-- Branch & Remote --"
  git branch --show-current
  git branch -vv | head -5
  git remote -v | head -5
  echo "-- Last 3 Commits --"
  git log --oneline -3
  echo "-- Sync with Origin --"
  git fetch --dry-run 2>&1 | head -10
  git status -sb | head -20
  echo "-- Untracked Count --"
  echo "Untracked files: $(git status --porcelain | grep '??' | wc -l)"
  echo "Modified files: $(git status --porcelain | grep ' M' | wc -l)"
  echo "-- Important Agent Files (should NOT disappear) --"
  git status --porcelain | grep -E "nano_|network|cluster|omega|blacklist" | head -20
  echo ""
done
echo "========== END VERIFY =========="
