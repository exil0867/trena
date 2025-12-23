#!/usr/bin/env bash
set -euo pipefail

echo "Running DB migrations..."

psql "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" <<'SQL'
CREATE TABLE IF NOT EXISTS schema_migrations (
  filename text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
SQL

for f in /app/db/migrations/*.sql; do
  name=$(basename "$f")

  applied=$(psql -tA "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" \
    -c "SELECT 1 FROM schema_migrations WHERE filename='$name'")

  if [ -z "$applied" ]; then
    echo "Applying $name"
    psql "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" \
      -v ON_ERROR_STOP=1 -f "$f"

    psql "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" \
      -c "INSERT INTO schema_migrations (filename) VALUES ('$name')"
  else
    echo "Skipping $name (already applied)"
  fi
done

echo "Migrations complete."
