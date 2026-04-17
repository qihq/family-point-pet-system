#!/bin/bash
set -euo pipefail

DATA_DIR="/var/lib/postgresql/data"
find_pg_bin() {
  if command -v pg_ctl >/dev/null 2>&1 && command -v initdb >/dev/null 2>&1; then
    return 0
  fi

  local candidate=""
  candidate="$(find /usr/lib/postgresql -maxdepth 3 -type f -name pg_ctl 2>/dev/null | head -n 1 || true)"
  if [ -n "$candidate" ]; then
    dirname "$candidate"
    return 0
  fi

  candidate="$(find /usr/local -maxdepth 3 -type f -name pg_ctl 2>/dev/null | head -n 1 || true)"
  if [ -n "$candidate" ]; then
    dirname "$candidate"
    return 0
  fi

  return 1
}

PG_BIN="$(find_pg_bin || true)"
if [ -n "$PG_BIN" ]; then
  export PATH="$PATH:$PG_BIN"
fi

log(){ echo "[aio] $*"; }

as_pg() {
  su -s /bin/bash postgres -c "$*"
}

# Ensure data directory ownership
mkdir -p "$DATA_DIR"
chown -R postgres:postgres "$DATA_DIR"

if [ -f "$DATA_DIR/postmaster.pid" ]; then
  STALE_PID="$(head -n 1 "$DATA_DIR/postmaster.pid" | tr -d '[:space:]' || true)"
  if [ -n "$STALE_PID" ] && ! ps -p "$STALE_PID" >/dev/null 2>&1; then
    log "Removing stale postmaster.pid"
    rm -f "$DATA_DIR/postmaster.pid"
  fi
fi

# Init database if empty (no PG_VERSION)
if [ ! -s "$DATA_DIR/PG_VERSION" ]; then
  log "Initializing PostgreSQL cluster at $DATA_DIR"
  as_pg "initdb -D '$DATA_DIR' -E UTF8" >/dev/null
fi

# Start postgres (listen only on localhost)
as_pg "pg_ctl -D '$DATA_DIR' -o \"-c listen_addresses=localhost -p 5432\" -w start" >/dev/null
trap 'log "Stopping PostgreSQL"; as_pg "pg_ctl -D '\''$DATA_DIR'\'' -m fast stop" >/dev/null || true' EXIT

# Ensure user/database exist
psql_cmd(){ as_pg "psql -d postgres -v ON_ERROR_STOP=1 -At -c \"$1\""; }

wait_for_postgres() {
  local retries=60
  until psql_cmd "SELECT 1" >/dev/null 2>&1; do
    retries=$((retries - 1))
    if [ "$retries" -le 0 ]; then
      log "PostgreSQL did not become ready in time"
      exit 1
    fi
    sleep 2
  done
}

wait_for_postgres

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

# Build DATABASE_URL for local DB
export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:5432/${POSTGRES_DB}"

# Run migrations and optional seed
if [ -n "${DATABASE_URL:-}" ]; then
  log "Running Prisma migrate deploy"
  if ! npx prisma migrate deploy; then
  log "migrate deploy failed, falling back to prisma db push (dev-only)"
  npx prisma db push --accept-data-loss || { log "db push failed"; exit 1; }
fi
  if [ "${STARTUP_SEED:-false}" = "true" ]; then
    log "Seeding database (STARTUP_SEED=true)"
    npx tsx prisma/seed.ts || true
  fi
fi

log "Starting Next.js on port ${PORT:-3000}"
# Light-weight daily cron without extra deps: trigger at 00:05 UTC
(
  cron_daily_loop() {
    while true; do
      NOW=$(date -u +"%H:%M");
      if [ "$NOW" = "00:05" ]; then
        node -e "require('http').get('http://127.0.0.1:3000/api/cron/daily').on('error',()=>{});" >/dev/null 2>&1 || true
        sleep 60
      else
        sleep 20
      fi
    done
  }
  cron_daily_loop &
) &
exec node node_modules/next/dist/bin/next start -p "${PORT:-3000}"
