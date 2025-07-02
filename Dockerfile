# --- BUILD STAGE ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Use npm ci for faster, reliable installs
RUN npm ci

# Copy all source files
COPY . .

# Build the Angular SSR app
RUN npm run build

# --- PRODUCTION STAGE ---
FROM node:22-alpine

WORKDIR /app

# Copy only built dist files and lockfile from builder
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

EXPOSE 4000

# Start the SSR server
CMD ["node", "dist/angularssr/server/server.mjs"]
