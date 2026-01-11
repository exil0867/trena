#!/usr/bin/env bash
set -euo pipefail

export PGHOST="${DB_HOST}"
export PGPORT="${DB_PORT}"
export PGUSER="${DB_USER}"
export PGPASSWORD="${DB_PASSWORD}"
export PGDATABASE="${DB_NAME}"

psql -v ON_ERROR_STOP=1 -f backend/db/seeds/dev.sql
