#!/bin/bash
set -euo pipefail

DATA_DIR="/var/lib/postgresql/data"
PG_BIN="/usr/lib/postgresql/15/bin"
# Some distros put binaries in PATH; fallback to calling postgres directly
if ! command -v pg_ctl >/dev/null 2>&1; then
  export PATH="$PATH:$PG_BIN"
fi

log(){ echo "[aio] $*"; }

# Ensure data directory ownership
mkdir -p "$DATA_DIR"
chown -R postgres:postgres "$DATA_DIR"

# Init database if empty (no PG_VERSION)
if [ ! -s "$DATA_DIR/PG_VERSION" ]; then
  log "Initializing PostgreSQL cluster at $DATA_DIR"
  su -s /bin/bash postgres -c "initdb -D '$DATA_DIR' -E UTF8" >/dev/null
fi

# Start postgres (listen only on localhost)
su -s /bin/bash postgres -c "pg_ctl -D '$DATA_DIR' -o \"-c listen_addresses=localhost -p 5432\" -w start" >/dev/null
trap 'log "Stopping PostgreSQL"; su -s /bin/bash postgres -c "pg_ctl -D '$DATA_DIR' -m fast stop" >/dev/null || true' EXIT

# Ensure user/database exist
psql_cmd(){ su -s /bin/bash postgres -c "psql -v ON_ERROR_STOP=1 -At -c \"$1\""; }

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
  npx prisma migrate deploy || { log "migrate deploy failed"; exit 1; }
  if [ "${STARTUP_SEED:-false}" = "true" ]; then
    log "Seeding database (STARTUP_SEED=true)"
    npx tsx prisma/seed.ts || true
  fi
fi

log "Starting Next.js on port ${PORT:-3000}"
exec node node_modules/next/dist/bin/next start -p "${PORT:-3000}"
