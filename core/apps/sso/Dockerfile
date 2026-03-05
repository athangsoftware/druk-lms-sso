# syntax=docker/dockerfile:1.4
# Build stage
FROM node:22-slim AS builder

ARG NPM_TOKEN
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci \
         && rm -f .npmrc' 

# Copy source code and configuration files
COPY tsconfig.json tsconfig.build.json nest-cli.json webpack.config.js ./
COPY apps ./apps
COPY libs ./libs

# Generate Prisma client
RUN npx prisma generate --schema=libs/prisma/schema

# Build the application
RUN npm run build:sso

# Production stage
FROM node:22-slim AS production

ARG NPM_TOKEN
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-fra \
    tesseract-ocr-deu \
    tesseract-ocr-spa \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd --gid 1001 nodejs \
    && useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nestjs

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci --omit=dev \
         && rm -f .npmrc' 

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy Prisma schema and generated client
COPY --from=builder /app/libs/prisma/schema ./libs/prisma/schema
COPY --from=builder /app/libs/prisma/generated ./libs/prisma/generated

# Create uploads directory
RUN mkdir -p uploads && chown -R nestjs:nodejs uploads

# Set ownership
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV TESSERACT_PATH=/usr/bin/tesseract

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# Start the application
CMD ["node", "dist/apps/sso/main.js"]
