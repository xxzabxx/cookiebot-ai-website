#!/usr/bin/env bash
set -euo pipefail

# -------- CONFIG --------
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
API_HELPER_PATH="src/lib/api.js"            # Path to your new centralized helper
LEGACY_HELPER_GLOBS=("src/**/apiCall*.js" "src/**/apiCall*.ts" "src/**/api.js") # Likely old helper names (edit if needed)
RAILWAY_DOMAIN="cookiebot-ai-backend-production.up.railway.app"
API_BASE_ENV_VAR="import.meta.env.VITE_API_BASE"

# Patterns to search (add more if you had other hard coded URLs)
SEARCH_PATTERNS=(
  "apiCall("
  "API_BASE_URL"
  "${RAILWAY_DOMAIN}"
  "fetch('https://${RAILWAY_DOMAIN}"
  "fetch(\"https://${RAILWAY_DOMAIN}"
)

DRY_RUN=true   # default; can be overridden with --apply

usage() {
  cat <<EOF
Usage: $0 [--apply]

Actions (dry-run by default):
  * Create a safety commit (only once).
  * List files containing legacy patterns.
  * (Apply mode) Rewrite those files:
      - Ensure "import { api } from '../lib/api';" (path auto-calculated) if not present.
      - Replace 'apiCall(' => 'api('
      - Replace hard-coded Railway fetch() URLs with \`\${${API_BASE_ENV_VAR}}\`
      - Replace 'API_BASE_URL' variable references with \`${API_BASE_ENV_VAR}\`
  * Remove obsolete helper files (apply mode only) when confidently replaced.
  * Show a git diff for review.

Run with --apply to execute modifications.
EOF
}

if [[ "${1:-}" == "--help" ]]; then
  usage; exit 0
fi
if [[ "${1:-}" == "--apply" ]]; then
  DRY_RUN=false
fi

echo "==> Mode: $([[ "$DRY_RUN" == true ]] && echo 'DRY RUN' || echo 'APPLY')"
echo "==> Project root: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

# 1. Safety commit (only if working tree clean)
if git diff --quiet && git diff --cached --quiet; then
  echo "==> Creating safety commit (working tree clean)."
  git commit --allow-empty -m "chore(refactor): safety checkpoint before API helper unification"
else
  echo "==> Skipping safety commit (uncommitted changes present). Please commit or stash first for best safety."
fi

echo "==> Checking that new helper exists at $API_HELPER_PATH"
[[ -f "$API_HELPER_PATH" ]] || { echo "ERROR: $API_HELPER_PATH not found. Aborting."; exit 1; }

echo "==> Searching for legacy patterns..."
MATCHED_FILES=()
for pattern in "${SEARCH_PATTERNS[@]}"; do
  while IFS= read -r file; do
    # Avoid duplicates
    [[ -n "$file" ]] && MATCHED_FILES+=("$file")
  done < <(grep -RIl --exclude-dir=node_modules --exclude-dir=.git -- "${pattern}" src || true)
done

# Unique list
IFS=$'\n' MATCHED_FILES=($(printf "%s\n" "${MATCHED_FILES[@]}" | sort -u))
unset IFS

if [[ ${#MATCHED_FILES[@]} -eq 0 ]]; then
  echo "==> No files matched legacy patterns. Exiting."
  exit 0
fi

echo "==> Files containing legacy usage (${#MATCHED_FILES[@]}):"
printf '   %s\n' "${MATCHED_FILES[@]}"

if [[ "$DRY_RUN" == true ]]; then
  echo
  echo "Dry run finished. Re-run with --apply to modify these files."
  exit 0
fi

echo "==> APPLY MODE: beginning in-place rewrites..."

for file in "${MATCHED_FILES[@]}"; do
  # Skip binary or non-text
  file "$file" | grep -qi text || continue

  echo "---- Processing $file"

  # Compute relative path depth to decide import path for api helper
  depth="$(dirname "$file" | awk -F'/' '{print NF}')"
  # Rough heuristic to build a relative path to src/lib/api.js
  # Get path from file dir to project root, then append API_HELPER_PATH without leading src/
  rel_to_root="$(realpath --relative-to="$(dirname "$file")" "$PROJECT_ROOT")"
  helper_rel="$rel_to_root/$API_HELPER_PATH"
  # Normalize redundant path parts like ./
  helper_rel=$(python3 - <<PY
import os,sys
print(os.path.normpath("$helper_rel"))
PY
)
  # Convert potential leading ./ removal
  helper_rel=${helper_rel#./}

  # If file already imports { api } skip adding
  if ! grep -q "import { *api" "$file"; then
    # Insert after first import line
    awk -v helper="$helper_rel" '
      NR==1 && /^import/ {
        print $0;
        print "import { api } from \x27" helper.replace(/\.js$/,"") "\x27;";
        next
      }
      !inserted && /^import/ {
        print $0;
        next
      }
      !inserted && !/^import/ {
        print "import { api } from \x27" helper.replace(/\.js$/,"") "\x27;";
        inserted=1
        print $0;
        next
      }
      { print $0 }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi

  # Replace apiCall( with api(
  sed -i "s/\bapiCall(/api(/g" "$file"

  # Replace API_BASE_URL occurrences with ${import.meta.env.VITE_API_BASE} (template literal)
  # If not already inside a template string, wrap fetch URL creation.
  # Simple heuristic: just replace standalone occurrences.
  sed -i "s/API_BASE_URL/${API_BASE_ENV_VAR}/g" "$file"

  # Replace hard-coded Railway fetch base with template usage (two quote styles)
  sed -i "s#https://${RAILWAY_DOMAIN}/api#${API_BASE_ENV_VAR}#g" "$file"
  sed -i "s#https://${RAILWAY_DOMAIN}#${API_BASE_ENV_VAR}#g" "$file"

  # If we now have fetch(${import.meta.env.VITE_API_BASE} append / if needed (heuristic)
  sed -i "s#fetch(${API_BASE_ENV_VAR}\"#/fetch(${API_BASE_ENV_VAR} + \"#g" "$file"

done

#  Remove legacy helper files that exactly match known patterns and are NOT the new helper
echo "==> Scanning for removable legacy helper files..."
for glob in "${LEGACY_HELPER_GLOBS[@]}"; do
  for candidate in $(compgen -G "$glob" || true); do
    # Skip our new canonical helper
    [[ "$candidate" == "$API_HELPER_PATH" ]] && continue
    # Inspect if file still contains apiCall; if empty or only exports apiCall, remove
    if grep -q "apiCall" "$candidate"; then
      echo "   Retaining $candidate (still contains apiCall symbol)"
    else
      echo "   Removing stale helper: $candidate"
      git rm "$candidate"
    fi
  done
done

echo "==> Staging modified files..."
git add "${MATCHED_FILES[@]}" || true

echo "==> Displaying diff (review before committing):"
git --no-pager diff --cached --color

echo
echo "If everything looks good, commit with:"
echo "   git commit -m 'refactor: unify API calls to central api helper'"
echo
echo "Rollback anytime with:"
echo "   git reset --hard HEAD~1   # (if safety commit was created)"
