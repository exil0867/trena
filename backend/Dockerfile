FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.base.json ./

COPY backend ./backend

COPY shared ./shared

RUN npm i

RUN npm run build:shared

RUN npm run build:backend


FROM node:26-alpine AS production

RUN apk add --no-cache postgresql-client

RUN addgroup -g 1001 -S nodejs && adduser -S trena -u 1001

WORKDIR /app

COPY package*.json ./

COPY backend ./backend

COPY shared ./shared

RUN npm ci --only=production

COPY --from=builder --chown=trena:nodejs /app/backend/dist ./backend/dist
COPY --from=builder --chown=trena:nodejs /app/shared/dist ./shared/dist

RUN ls -la backend/scripts

COPY backend/scripts/db-migrate.sh /usr/local/bin/db-migrate

RUN chmod +x /usr/local/bin/db-migrate

RUN ls -la backend

USER trena

WORKDIR /app/backend


EXPOSE 3004


CMD ["node", "./dist/index.js"]
