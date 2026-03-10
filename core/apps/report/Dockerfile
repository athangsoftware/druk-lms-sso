# syntax=docker/dockerfile:1.4
# Build stage
FROM node:22-slim AS builder

ARG NPM_TOKEN
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci \
         && rm -f .npmrc'

COPY tsconfig.json tsconfig.build.json nest-cli.json webpack.config.js prisma.config.ts ./
COPY apps ./apps
COPY libs ./libs

# Generate Prisma client (dummy URL for build — real one comes from .env at runtime)
RUN echo 'DATABASE_URL="mysql://localhost:3306/placeholder"' > apps/report/.env \
    && PRISMA_SCHEMA=report npx prisma generate \
    && rm apps/report/.env
RUN npm run build:report

# Production stage
FROM node:22-slim AS production

ARG NPM_TOKEN
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 1001 nodejs \
    && useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nestjs

COPY package.json package-lock.json* ./

RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci --omit=dev \
         && rm -f .npmrc'

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/report/prisma/schema ./apps/report/prisma/schema
COPY --from=builder /app/apps/report/prisma/generated ./apps/report/prisma/generated

RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>process.exit(r.statusCode===200?0:1)); }).on('error',()=>process.exit(1))" || exit 1

CMD ["node", "dist/apps/report/main.js"]
