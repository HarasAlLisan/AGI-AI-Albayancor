#!/bin/bash

# 🧭 تعريف المتغيرات
REPO_PATH="/مسارك/إلى/المستودع"
DOCS_PATH="$REPO_PATH/docs"
COMMIT_MSG="📦 دفع المستندات الحية بتاريخ $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
SEAL_ID="SEAL-$(date -u +"%Y%m%d%H%M%S")"

# 🛠️ تنفيذ الدفع
cd "$REPO_PATH" || exit 1
git add "$DOCS_PATH"
git commit -m "$COMMIT_MSG [$SEAL_ID]"
git push origin main

# 🧾 توثيق العملية في سجل حيّ
echo "- دفع المستندات: $COMMIT_MSG [$SEAL_ID]" >> "$REPO_PATH/UnitLog.md"
