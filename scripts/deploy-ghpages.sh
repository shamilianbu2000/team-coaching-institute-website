#!/usr/bin/env bash
# Builds a static export and publishes it to the `gh-pages` branch (GitHub Pages: Settings → Pages → Deploy from branch → gh-pages / root).
# Usage: NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxx ./scripts/deploy-ghpages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OWNER="${GH_OWNER:-shamilianbu2000}"
REPO="${GH_REPO:-team-coaching-institute-website}"
export STATIC_EXPORT=1
export NEXT_PUBLIC_BASE_PATH="/${REPO}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://${OWNER}.github.io/${REPO}}"

rm -rf .next out
npm run build
touch out/.nojekyll

TMP="$(mktemp -d)"
cp -R out/. "$TMP/"
cd "$TMP"
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-$(git -C - config user.name 2>/dev/null || echo deploy)}" -c user.email="${GIT_AUTHOR_EMAIL:-deploy@example.invalid}" commit -qm "Deploy static export"
git push -f "https://github.com/${OWNER}/${REPO}.git" gh-pages
echo "Published. Site URL: ${NEXT_PUBLIC_SITE_URL}"
