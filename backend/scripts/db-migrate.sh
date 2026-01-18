#!/usr/bin/env bash
set -euo pipefail

: "${PGHOST:?}"
: "${PGPORT:?}"
: "${PGUSER:?}"
: "${PGPASSWORD:?}"
: "${PGDATABASE:?}"

MIGRATIONS_DIR="${MIGRATIONS_DIR:-$(cd "$(dirname "$0")/../db/migrations" && pwd)}"

echo "==> Running DB migrations on $PGHOST:$PGPORT/$PGDATABASE"
echo "==> Using migrations from $MIGRATIONS_DIR"

psql <<'SQL'
CREATE TABLE IF NOT EXISTS schema_migrations (
  filename text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
SQL

shopt -s nullglob

for f in "$MIGRATIONS_DIR"/*.sql; do
  name=$(basename "$f")

  applied=$(psql -tA -c \
    "SELECT 1 FROM schema_migrations WHERE filename='$name'")

  if [ -z "$applied" ]; then
    echo "Applying $name"
    psql -v ON_ERROR_STOP=1 -f "$f"
    psql -c \
      "INSERT INTO schema_migrations (filename) VALUES ('$name')"
  else
    echo "Skipping $name"
  fi
done

echo "==> Migrations complete"
