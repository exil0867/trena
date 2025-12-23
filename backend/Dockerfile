# =========================
# Build stage
# =========================
FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY backend ./
RUN pnpm run build


# =========================
# Runtime stage
# =========================
FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# App code
COPY --from=build /app/dist ./dist

# Migrations (read-only payload)
COPY backend/db ./db
COPY backend/scripts/db-migrate.sh /usr/local/bin/db-migrate
RUN chmod +x /usr/local/bin/db-migrate

EXPOSE 3004

# Default behavior: start app
CMD ["node", "dist/index.js"]
