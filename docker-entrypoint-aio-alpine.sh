#!/bin/sh
set -eux

DATA_DIR="/var/lib/postgresql/data"
export PATH="/usr/local/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/lib:${LD_LIBRARY_PATH:-}"

log(){ echo "[aio] $*"; }

mkdir -p "$DATA_DIR"
chown -R postgres:postgres /var/lib/postgresql
mkdir -p /var/run/postgresql
chown -R postgres:postgres /var/run/postgresql

# Strip UTF-8 BOM if present in prisma SQL/schema to avoid P3018
for f in /app/prisma/migrations/*/migration.sql; do
  if [ -f "$f" ]; then
    sig=$(head -c 3 "$f" 2>/dev/null | od -An -tx1 | tr -d ' \n') || true
    if [ "$sig" = "efbbbf" ]; then
      log "Stripping BOM from $f"
      tail -c +4 "$f" > "$f.tmp" && mv "$f.tmp" "$f"
    fi
  fi
done
if [ -f /app/prisma/schema.prisma ]; then
  sig=$(head -c 3 /app/prisma/schema.prisma 2>/dev/null | od -An -tx1 | tr -d ' \n') || true
  if [ "$sig" = "efbbbf" ]; then
    log "Stripping BOM from prisma/schema.prisma"
    tail -c +4 /app/prisma/schema.prisma > /app/prisma/schema.prisma.tmp && mv /app/prisma/schema.prisma.tmp /app/prisma/schema.prisma
  fi
fi

if [ ! -s "$DATA_DIR/PG_VERSION" ]; then
  log "Initializing PostgreSQL cluster at $DATA_DIR"
  su-exec postgres initdb -D "$DATA_DIR" -E UTF8 >/dev/null
fi

su-exec postgres pg_ctl -D "$DATA_DIR" -o "-c listen_addresses=localhost -p 5432" -w start >/dev/null
trap 'log "Stopping PostgreSQL"; su-exec postgres pg_ctl -D "$DATA_DIR" -m fast stop >/dev/null || true' EXIT

psql_cmd(){ su-exec postgres psql -v ON_ERROR_STOP=1 -At -c "$1"; }

EXISTS_USER=$(psql_cmd "SELECT 1 FROM pg_roles WHERE rolname='${POSTGRES_USER}'" || true)
if [ -z "$EXISTS_USER" ]; then
  log "Creating role ${POSTGRES_USER}"
  psql_cmd "CREATE ROLE ${POSTGRES_USER} WITH LOGIN PASSWORD '${POSTGRES_PASSWORD}';"
fi
EXISTS_DB=$(psql_cmd "SELECT 1 FROM pg_database WHERE datname='${POSTGRES_DB}'" || true)
if [ -z "$EXISTS_DB" ]; then
  log "Creating database ${POSTGRES_DB} owned by ${POSTGRES_USER}"
  psql_cmd "CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};"
fi

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:5432/${POSTGRES_DB}"

log "Running Prisma migrate deploy"
npx prisma migrate deploy || { log "migrate deploy failed"; log "Falling back to prisma db push"; npx prisma db push --accept-data-loss || { log "db push failed"; exit 1; }; }
if [ "${STARTUP_SEED:-false}" = "true" ]; then
  log "Seeding database (STARTUP_SEED=true)"
  npx tsx prisma/seed.ts || true
fi

log "Starting Next.js on port ${PORT:-3000}"
exec node node_modules/next/dist/bin/next start -p "${PORT:-3000}"
