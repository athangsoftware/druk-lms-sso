# syntax=docker/dockerfile:1.4
# Stage 1: Build the Angular SSR application
FROM node:22 AS build

ARG NPM_TOKEN
WORKDIR /app

# Increase Node.js memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files from the ui root
# Note: Build this from the 'ui' folder:
#   docker build -f projects/sso/Dockerfile -t sso .
COPY package.json package-lock.json ./

# Install dependencies using ci for reproducible builds
RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci --legacy-peer-deps \
         && rm -f .npmrc' 

# Copy the entire ui folder
COPY . .

# Build the sso project with SSR
# (shared-lib is compiled from source via tsconfig paths)
RUN npm run build -- @projects/sso-app --configuration=production

# Stage 2: Run the SSR server
FROM node:22-alpine AS production

WORKDIR /app

# Copy the built application (browser and server bundles)
COPY --from=build /app/dist/@projects/sso-app ./dist/sso

# Copy package.json for any runtime dependencies
COPY --from=build /app/package.json ./

# Copy node_modules for server runtime
COPY --from=build /app/node_modules ./node_modules

# Expose the SSR server port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Start the SSR server
CMD ["node", "dist/sso/server/server.mjs"]