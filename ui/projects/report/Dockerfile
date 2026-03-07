# syntax=docker/dockerfile:1.4
# Stage 1: Build the Angular application
FROM node:22 AS build

ARG NPM_TOKEN
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Note: Build this from the 'ui' folder:
#   docker build -f projects/report/Dockerfile -t report .
COPY package.json package-lock.json ./

RUN --mount=type=secret,id=npm_token \
  sh -c 'TOKEN="$(if [ -f /run/secrets/npm_token ]; then cat /run/secrets/npm_token; else echo "$NPM_TOKEN"; fi)"; printf "@athangsoftware:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=${TOKEN}\n" > .npmrc \
         && npm ci --legacy-peer-deps \
         && rm -f .npmrc'

COPY . .

RUN npm run build -- @projects/report-app --configuration=production

# Stage 2: Serve with nginx
FROM nginx:alpine AS production

COPY --from=build /app/dist/@projects/report-app/browser /usr/share/nginx/html

RUN printf 'server {\n\
    listen 4001;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 4001

CMD ["nginx", "-g", "daemon off;"]
