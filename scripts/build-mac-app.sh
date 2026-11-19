#!/usr/bin/env bash
# Baut eine eigenständige macOS-App (dist/Vokabeltrainer.app).
# Enthält Next.js-Standalone-Server, Node.js-Runtime und eine Start-Datenbank.
# Voraussetzung: .env im Projektverzeichnis (wird als Standardkonfiguration eingebettet).
set -euo pipefail

cd "$(dirname "$0")/.."
APP_NAME="Vokabeltrainer"
APP="dist/${APP_NAME}.app"
RES="$APP/Contents/Resources"

[ -f .env ] || { echo "Fehlt: .env (siehe .env.example)" >&2; exit 1; }
[ -f prisma/dev.db ] || { echo "Fehlt: prisma/dev.db (npm run prisma:migrate && npm run seed)" >&2; exit 1; }

npx prisma generate
npm run build

rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$RES/app"

cp -R .next/standalone/. "$RES/app/"
mkdir -p "$RES/app/.next"
cp -R .next/static "$RES/app/.next/static"
cp -R public "$RES/app/public"

# Datenbank und Konfiguration werden erst beim ersten Start in
# ~/Library/Application Support/Vokabeltrainer abgelegt.
rm -f "$RES/app/prisma/dev.db" "$RES/app/prisma/dev.db-journal" "$RES/app/.env"
cp prisma/dev.db "$RES/initial.db"
{
  grep -Ev '^(DATABASE_URL|INSECURE_COOKIES|PORT)=' .env
  echo 'DATABASE_URL="file:dev.db"'
  echo 'INSECURE_COOKIES=true'
} > "$RES/default.env"

# Offizielle Node-Binary (Homebrew-Variante braucht libnode.dylib und ist nicht portabel).
NODE_VERSION="$(node -v)"
NODE_ARCH="$(uname -m | sed 's/x86_64/x64/')"
NODE_CACHE="dist/.cache/node-${NODE_VERSION}-darwin-${NODE_ARCH}"
if [ ! -x "$NODE_CACHE" ]; then
  mkdir -p dist/.cache
  curl -fsSL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-darwin-${NODE_ARCH}.tar.gz" \
    | tar -xz -C dist/.cache --strip-components=2 "node-${NODE_VERSION}-darwin-${NODE_ARCH}/bin/node"
  mv dist/.cache/node "$NODE_CACHE"
fi
cp "$NODE_CACHE" "$RES/node"

cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>${APP_NAME}</string>
  <key>CFBundleDisplayName</key><string>${APP_NAME}</string>
  <key>CFBundleIdentifier</key><string>de.vocabulary-learning-app</string>
  <key>CFBundleExecutable</key><string>launcher</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleVersion</key><string>1.0</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>LSMinimumSystemVersion</key><string>12.0</string>
</dict>
</plist>
PLIST

cat > "$APP/Contents/MacOS/launcher" <<'LAUNCHER'
#!/bin/bash
RES="$(cd "$(dirname "$0")/../Resources" && pwd)"
DATA="$HOME/Library/Application Support/Vokabeltrainer"
PORT=3456
URL="http://localhost:${PORT}"

mkdir -p "$DATA/prisma"
[ -f "$DATA/prisma/dev.db" ] || cp "$RES/initial.db" "$DATA/prisma/dev.db"
[ -f "$DATA/.env" ] || cp "$RES/default.env" "$DATA/.env"

# Läuft bereits ein Server auf dem Port, nur den Browser öffnen.
if lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi

set -a
. "$DATA/.env"
set +a
export NODE_ENV=production PORT HOSTNAME=127.0.0.1

# Der Server nutzt <cwd>/prisma/<DATABASE_URL> -> Datenverzeichnis als cwd.
for f in .next node_modules src public package.json server.js; do
  ln -sfn "$RES/app/$f" "$DATA/$f"
done
cd "$DATA"

(
  for _ in $(seq 1 60); do
    curl -s -o /dev/null "$URL" && { open "$URL"; exit 0; }
    sleep 0.5
  done
) &

exec "$RES/node" server.js >"$DATA/server.log" 2>&1
LAUNCHER
chmod +x "$APP/Contents/MacOS/launcher" "$RES/node"

codesign --force --deep --sign - "$APP" >/dev/null 2>&1 || true
echo "Fertig: $APP"
