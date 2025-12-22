FROM node:24-bookworm-slim

WORKDIR /app

# Install deps first (better cache)
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm install --frozen-lockfile --prod

# Copy source and build
COPY backend ./
RUN pnpm run build

EXPOSE 3004

CMD ["node", "dist/index.js"]
