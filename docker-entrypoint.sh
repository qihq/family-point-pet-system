#!/bin/sh
set -eu

if [ -n "${DATABASE_URL:-}" ]; then
  echo "[entrypoint] Running Prisma migrate deploy..."
  npx prisma migrate deploy
  if [ "${STARTUP_SEED:-false}" = "true" ]; then
    echo "[entrypoint] Seeding database (STARTUP_SEED=true)..."
    npx tsx prisma/seed.ts || echo "[entrypoint] Seed finished (ignore if already seeded)"
  fi
else
  echo "[entrypoint] DATABASE_URL not set; skipping migrations/seeding"
fi

PORT="${PORT:-3000}"
export NODE_ENV=production

echo "[entrypoint] Starting Next.js on port ${PORT}"
exec node node_modules/next/dist/bin/next start -p "${PORT}"
