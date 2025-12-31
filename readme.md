# Trena

**Trena** is an open-source training application focused on structured workout tracking, long-term progression, and data correctness.

It is built for people who care about training volume, consistency, and measurable performance over time, not influencer content, social feeds, or gimmicks.

The project is under active development and evolving toward a production-ready architecture.

## Features (Planned)

- Resistance training tracking  
- Cardio tracking  
- Nutrition logging  
- Bodyweight tracking & progress history  
- Training statistics & insights  

## Tech Stack

### Backend
- Node.js (TypeScript)
- Hono
- PostgreSQL (Supabase-compatible)
- pnpm
- Docker (multi-stage build)

### Frontend
- Expo (React Native)

## Development Status

**In active development.**  
APIs, data models, and workflows are still changing. Breaking changes are expected.

## Getting Started

### Backend (Local)

Requirements:
- Node.js 20+
- pnpm
- PostgreSQL database

```sh
cd backend
pnpm install
pnpm build
pnpm start
````

For development with rebuilds:

```sh
pnpm build --watch
pnpm dev
```

### Backend (Docker)

```sh
docker build -t trena-backend .
docker run -p 3004:3004 trena-backend
```

The container expects a PostgreSQL database to be available.
Database migrations live in `backend/db` and can be applied using the bundled `db-migrate` script.

### Frontend

```sh
cd frontend
pnpm install
pnpm expo start
```

## License

See the [license](./license) file for details.
