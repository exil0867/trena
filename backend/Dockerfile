# =========================
# Build stage
# =========================
FROM node:24-bookworm-slim AS build

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest only (for cache)
COPY backend/package.json backend/

# Install ONLY backend deps from workspace
RUN pnpm install --filter trena-backend... --frozen-lockfile

# Copy backend source
COPY backend ./backend

# Build backend
RUN pnpm --filter trena-backend build


# =========================
# Runtime stage
# =========================
FROM node:24-bookworm-slim

WORKDIR /app

# Runtime deps
RUN apt-get update \
  && apt-get install -y --no-install-recommends postgresql-client \
  && rm -rf /var/lib/apt/lists/*

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest
COPY backend/package.json backend/

# Install prod deps only for backend
RUN pnpm install --filter trena-backend... --prod --frozen-lockfile

# Copy compiled app
COPY --from=build /app/backend/dist ./dist

# Migrations
COPY backend/db ./db
COPY backend/scripts/db-migrate.sh /usr/local/bin/db-migrate
RUN chmod +x /usr/local/bin/db-migrate

EXPOSE 3004

# Default behavior: start app
CMD ["node", "dist/index.js"]
