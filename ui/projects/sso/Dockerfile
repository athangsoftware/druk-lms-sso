# syntax=docker/dockerfile:1.4
# Stage 1: Build the Angular application
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

# Build the sso project
# (shared-lib is compiled from source via tsconfig paths)
RUN npm run build -- @projects/sso-app --configuration=production

# Stage 2: Serve with nginx
FROM nginx:alpine AS production

# Copy the built browser bundle
COPY --from=build /app/dist/@projects/sso-app/browser /usr/share/nginx/html

# nginx config for SPA — redirect all routes to index.html
RUN printf 'server {\n\
    listen 4000;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]