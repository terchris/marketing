# The marketing site as a UIS application: built once, served as static files.
#
# Follows the dev-templates contract (a Dockerfile, manifests/ for ArgoCD, an image at
# ghcr.io/<owner>/<repo>:<sha>-<time>), with three deliberate differences from
# designsystemet-basic-react-app, which it is closest to:
#   - Node 22, not 20: Node 20 reached end of life on 2026-04-30, and the tools/ scripts are
#     TypeScript run natively by Node 22.18+.
#   - nginx serving files, not `serve -s`: this is a multi-page site, and an SPA rewrite would
#     answer every missing page with the home page and a 200.
#   - package-lock.json is part of the build (npm ci), so a build is reproducible.

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# nginx-unprivileged runs as a non-root user and listens on 8080.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=build /app/website/dist /usr/share/nginx/html
COPY nginx/charset.conf /etc/nginx/conf.d/charset.conf
EXPOSE 8080
