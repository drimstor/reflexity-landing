# ====================================
# Этап 1: Установка зависимостей
# ====================================
FROM node:18-alpine AS deps

# Устанавливаем системные зависимости для native модулей
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# ====================================
# Этап 2: Сборка приложения
# ====================================
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules

# Копируем все файлы проекта
COPY . .

# Переменные окружения для сборки (опционально, если используются в коде)
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_TELEGRAM_BOT_NAME

ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_TELEGRAM_BOT_NAME=$NEXT_PUBLIC_TELEGRAM_BOT_NAME

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем приложение
RUN npm run build

# ====================================
# Этап 3: Production образ
# ====================================
FROM node:18-alpine AS runner

WORKDIR /app

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем только необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Переключаемся на непривилегированного пользователя
USER nextjs

# Указываем порт
EXPOSE 3000

# Переменные окружения
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]

