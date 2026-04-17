FROM node:20-bullseye-slim AS builder
WORKDIR /app

# System deps for Prisma on Alpine
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Install deps (cache-friendly)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Generate Prisma client for linux-musl
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build Next.js
COPY . .
RUN npm run build

# Runtime image
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    TZ=Asia/Shanghai

# Runtime deps for Prisma on Alpine
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates tzdata && rm -rf /var/lib/apt/lists/*

# Copy app artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/docker-entrypoint.sh"]



