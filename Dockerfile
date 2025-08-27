# ---- deps stage: install dependencies ----
FROM node:24.6.0-alpine3.21 AS deps
WORKDIR /app


# Install system deps for building native modules
RUN apk add --no-cache libc6-compat python3 make g++


# Use Corepack to enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate


# Copy lockfile & package manifest only for better layer caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile


# ---- builder: build the Next app ----
FROM node:24.6.0-alpine3.21 AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
RUN corepack enable && corepack prepare pnpm@latest --activate


# copy installed node_modules to speed up build
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# run the Next build (will produce .next)
RUN pnpm build


# ---- runner: minimal image to run production server ----
FROM node:24.6.0-alpine3.21 AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate


# copy only what's needed at runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000


CMD ["pnpm", "start"]