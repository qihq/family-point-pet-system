#!/bin/sh
set -eu

# If a command is provided (e.g., "npm run dev"), run it directly for dev compose
if [ "$#" -gt 0 ]; then
  echo "[entrypoint] Exec command: $@"
  exec "$@"
fi

# Otherwise, run in production start mode (no migrations to avoid dev volume conflicts)
PORT="${PORT:-3000}"
export NODE_ENV=production
export TZ="${TZ:-Asia/Shanghai}"
echo "[entrypoint] Starting Next.js on port ${PORT} (prod)"
exec node node_modules/next/dist/bin/next start -p "${PORT}"
