<<<<<<< HEAD
# ===========================================================
# STAGE 1: BUILD STAGE — compiles the React/TypeScript app into static files
# ===========================================================
FROM node:16-alpine AS build
# Lightweight Node.js 16 image (alpine = minimal Linux distro, smaller size).
# Needed because package.json uses react-scripts-ts, requiring Node to build.

WORKDIR /app

COPY package.json yarn.lock ./
# Copy ONLY dependency manifests first (caching trick again —
# if these files don't change, "yarn install" layer is reused).

RUN yarn install --frozen-lockfile
# Installs exact dependency versions listed in yarn.lock.
# --frozen-lockfile ensures it fails instead of silently updating
# versions if yarn.lock and package.json are out of sync.

COPY . .
# Now copy everything else: src/, public/, tsconfig*.json, etc.

RUN yarn build
# Runs the "build" script from package.json:
#   "build": "react-scripts-ts build"
# This compiles TypeScript -> JavaScript, bundles everything,
# and outputs static files into the /app/build folder.

# ===========================================================
# STAGE 2: RUNTIME STAGE — serve the static files with Nginx
# ===========================================================
FROM nginx:alpine
# Nginx is a lightweight, production-grade web server — perfect for
# serving a React app's static HTML/CSS/JS files.

COPY --from=build /app/build /usr/share/nginx/html
# Copy only the final built static files from stage 1 into Nginx's
# default web root folder. Source code, node_modules, etc. are discarded.

EXPOSE 80
# Nginx listens on port 80 by default inside the container.

CMD ["nginx", "-g", "daemon off;"]
# Starts Nginx in the foreground ("daemon off") so the container
=======
# ===========================================================
# STAGE 1: BUILD STAGE — compiles the React/TypeScript app into static files
# ===========================================================
FROM node:16-alpine AS build
# Lightweight Node.js 16 image (alpine = minimal Linux distro, smaller size).
# Needed because package.json uses react-scripts-ts, requiring Node to build.

WORKDIR /app

COPY package.json yarn.lock ./
# Copy ONLY dependency manifests first (caching trick again —
# if these files don't change, "yarn install" layer is reused).

RUN yarn install --frozen-lockfile
# Installs exact dependency versions listed in yarn.lock.
# --frozen-lockfile ensures it fails instead of silently updating
# versions if yarn.lock and package.json are out of sync.

COPY . .
# Now copy everything else: src/, public/, tsconfig*.json, etc.

RUN yarn build
# Runs the "build" script from package.json:
#   "build": "react-scripts-ts build"
# This compiles TypeScript -> JavaScript, bundles everything,
# and outputs static files into the /app/build folder.

# ===========================================================
# STAGE 2: RUNTIME STAGE — serve the static files with Nginx
# ===========================================================
FROM nginx:alpine
# Nginx is a lightweight, production-grade web server — perfect for
# serving a React app's static HTML/CSS/JS files.

COPY --from=build /app/build /usr/share/nginx/html
# Copy only the final built static files from stage 1 into Nginx's
# default web root folder. Source code, node_modules, etc. are discarded.

EXPOSE 80
# Nginx listens on port 80 by default inside the container.

CMD ["nginx", "-g", "daemon off;"]
# Starts Nginx in the foreground ("daemon off") so the container
>>>>>>> 70579feeae459c314a95321de94e87ad07788bc0
# stays alive and doesn't exit immediately.