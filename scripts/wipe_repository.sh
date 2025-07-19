#!/usr/bin/env bash
set -euo pipefail

echo "=== CookieBot.ai FRONTEND WIPE SCRIPT ==="
echo "This will delete ALL tracked & untracked files except the .git directory and this script (and optional exclusions)."
read -p "Type YES (all caps) to proceed: " CONFIRM
if [[ "$CONFIRM" != "YES" ]]; then
  echo "Aborted."
  exit 1
fi

TS="$(date +%Y%m%dT%H%M%S)"
BACKUP="pre-wipe-${TS}.zip"

echo "Creating backup archive: ${BACKUP}"
# Create zip (exclude .git and the soon-to-exist backup itself)
zip -r "${BACKUP}" . \
  -x ".git/*" \
  -x "scripts/wipe_repository.sh" \
  -x "pre-wipe-*.zip" > /dev/null

echo "Backup created:"
ls -lh "${BACKUP}"

# List of items to preserve (top-level)
PRESERVE_LIST=(
  ".git"
  "scripts"
  "${BACKUP}"
)

echo "Deleting all other top-level files/directories..."
# Build exclusion test dynamically
for entry in .* *; do
  # Skip . and ..
  [[ "$entry" == "." || "$entry" == ".." ]] && continue
  preserve=false
  for keep in "${PRESERVE_LIST[@]}"; do
    if [[ "$entry" == "$keep" ]]; then
      preserve=true
      break
    fi
  done
  if [[ "$preserve" == false ]]; then
    rm -rf -- "$entry"
  fi
done

echo "Wipe complete."
echo "Preserved:"
printf '  - %s\n' "${PRESERVE_LIST[@]}"

echo
echo "Next steps:"
echo "  1. Add new project scaffold (e.g. npm create vite@latest .)"
echo "  2. git add ."
echo "  3. git commit -m 'feat: fresh scaffold'"
echo "  4. git push (force only if you rewrote history)."
