#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: db:migration <name>"
  exit 1
fi

NAME="$1"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
DIR="backend/db/migrations"
FILE="$DIR/${TIMESTAMP}_$NAME.sql"

mkdir -p "$DIR"

if [ -e "$FILE" ]; then
  echo "Migration already exists: $FILE"
  exit 1
fi

cat > "$FILE" <<EOF
-- Migration: $NAME
-- Created at: $TIMESTAMP

BEGIN;

-- write your SQL here

COMMIT;
EOF

echo "Created migration: $FILE"
