# Build stage
FROM node:24-bookworm-slim AS build

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# Install dependencies
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY backend ./
RUN pnpm run build


# Runtime stage
FROM node:24-bookworm-slim

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# Install prod deps
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy compiled output
COPY --from=build /app/dist ./dist

EXPOSE 3004

CMD ["node", "dist/index.js"]
