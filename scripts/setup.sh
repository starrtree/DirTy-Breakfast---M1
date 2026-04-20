#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -x "node_modules/.bin/next" ]; then
  echo "✅ Dependencies already installed (next binary found)."
  exit 0
fi

echo "Installing dependencies with npm..."
set +e
npm install
status=$?
set -e

if [ $status -eq 0 ]; then
  echo "✅ npm install completed."
  exit 0
fi

cat <<'MSG'

⚠️ npm install failed.

Common cause in this environment:
- outbound package downloads are blocked by proxy policy (HTTP 403 from registry).

What to check:
1) Ensure your proxy/network allows https://registry.npmjs.org
2) Ensure npm proxy vars are valid in this shell:
   - HTTPS_PROXY / HTTP_PROXY
   - npm_config_https_proxy / npm_config_http_proxy
3) Retry once network access is allowed:
   npm install

After install succeeds, start the app with:
   npm run dev
MSG

exit $status
