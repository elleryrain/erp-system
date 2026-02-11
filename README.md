# ERP System Starter

Stack:
- Node.js
- TypeScript
- NestJS + Fastify
- PostgreSQL + Drizzle ORM
- JWT auth (`@nestjs/jwt`, `passport-jwt`)

## Quick start

```bash
yarn install
cp .env.example .env
yarn drizzle:generate
yarn drizzle:migrate
yarn start:dev
```

Server: `http://localhost:3000/api`

## Auth

Login:

```bash
POST /api/auth/login
{
  "email": "admin@erp.local",
  "password": "secret123"
}
```

Use token in protected routes:

```text
Authorization: Bearer <token>
```

## Migrations (PostgreSQL)

Create migration files from schema:

```bash
yarn drizzle:generate
```

Apply migrations:

```bash
yarn drizzle:migrate
```
