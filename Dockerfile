FROM node:20-alpine3.18 AS builder
WORKDIR /app

# System deps for Prisma on Alpine
RUN apk add --no-cache openssl1.1-compat

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
FROM node:20-alpine3.18 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Runtime deps for Prisma on Alpine
RUN apk add --no-cache openssl1.1-compat

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


