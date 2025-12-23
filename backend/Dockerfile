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

# App
COPY --from=build /app/dist ./dist

# DB migrations + seeds
COPY backend/db ./db

# Migration runner
COPY backend/scripts/migrate.sh /usr/local/bin/migrate
RUN chmod +x /usr/local/bin/migrate

EXPOSE 3004

# Default: run app
CMD ["node", "dist/index.js"]
