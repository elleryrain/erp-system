# ERP System Starter

Stack:
- Node.js
- TypeScript
- NestJS + Fastify
- NestJS Microservices + NATS
- PostgreSQL + Drizzle ORM
- JWT auth (`@nestjs/jwt`, `passport-jwt`)
- RBAC (`admin`, `manager`, `warehouse_keeper` / `кладовщик`)

## Quick start

```bash
yarn install
cp .env.example .env
yarn drizzle:generate
yarn drizzle:migrate
yarn start:dev:identity
yarn start:dev:catalog
yarn start:dev:crm
yarn start:dev:inventory
yarn start:dev:orders
yarn start:dev:gateway
```

Server: `http://localhost:3000/api`
NATS: `nats://127.0.0.1:4222`

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

## Roles

- `admin`: full access, including user management
- `manager`: sales, purchases, catalog, clients, suppliers
- `warehouse_keeper` / `кладовщик`: warehouse, stock, batches, inventory read access

## Migrations (PostgreSQL)

Create migration files from schema:

```bash
yarn drizzle:generate
```

Apply migrations:

```bash
yarn drizzle:migrate
```
