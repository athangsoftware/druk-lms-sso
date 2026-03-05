# Vanilla SSO Monorepo

Identity & Access Management platform built with NestJS and Angular.

## Project Structure

```
venilaSSO/
├── core/                    # NestJS Backend Monorepo
│   ├── apps/
│   │   └── sso/            # Main SSO API application
│   └── libs/
│       ├── prisma/         # Prisma database library
│       └── shared/         # Shared utilities
├── ui/                      # Angular Frontend Monorepo
│   └── projects/
│       ├── sso/            # Main SSO UI application
│       └── shared/         # Shared Angular library
└── start-all.sh            # Script to start all applications
```

## Prerequisites

- Node.js 20+
- npm
- MariaDB / MySQL database
- Redis (for session management)

## Getting Started

### 1. Install Dependencies

```bash
# Install all dependencies at once
npm run install:all

# Or install individually
cd core && npm install
cd ../ui && npm install
```

### 2. Configure Environment

Create a `.env` file in the `core` directory:

```env
MODE=development
DATABASE_URL="mysql://user:password@localhost:3306/sso_db"
JWT_PRIVATE_KEY="your-base64-encoded-private-key"
JWT_PUBLIC_KEY="your-base64-encoded-public-key"
JWT_EXPIRE="1h"
API_SECRET_KEY="your-api-secret"
API_KEY_HEADER="x-api-key"
SSO_LOGIN_URL="http://localhost:7001/login"
SSO_CALLBACK_URL="http://localhost:3000/auth/callback"
```

### 3. Run Database Migrations

```bash
cd core
npx prisma generate --schema=libs/prisma/schema
npx prisma migrate dev --schema=libs/prisma/schema
```

### 4. Start All Applications

From the root directory:

```bash
chmod +x start-all.sh
./start-all.sh
```

This will start:
- SSO API at http://localhost:3000
- SSO UI at http://localhost:7001

## Development Commands

### Backend (Core)

```bash
cd core

# Start SSO API in development mode
npm run start:sso

# Start SSO API in watch mode
npm run start:dev:sso

# Start SSO API in debug mode
npm run start:debug:sso

# Build SSO API for production
npm run build:sso

# Run Prisma Studio
npm run prisma:studio

# Run database migrations
npm run prisma:migrate:dev

# Generate Prisma client
npm run prisma:generate

# Seed database
npm run prisma:seed

# Run tests
npm run test

# Run e2e tests
npm run test:e2e:sso

# Lint
npm run lint

# Format
npm run format
```

### Frontend (UI)

```bash
cd ui

# Start SSO app in development mode (port 7001)
npm run start:sso

# Build SSO app for production
npm run build:sso

# Build shared library
npm run build:shared
```

## Architecture

### Backend (NestJS)

- **apps/sso**: Main SSO API with authentication, user management, and client management
- **libs/prisma**: Database access layer with Prisma ORM (MariaDB)
- **libs/shared**: Shared utilities, validators, helpers, and mail services

### Frontend (Angular)

- **projects/sso**: Main SSO web application
- **projects/shared**: Shared components and services

## Features

- JWT-based authentication with RSA key pairs
- Google OAuth integration
- NDI (National Digital Identity) integration
- Multi-tenant client management
- Session management with Redis
- OCI Email service integration
- API key authentication
- Webhook support
- Audit logging
