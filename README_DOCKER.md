# Docker конфигурация - Landing Reflexity

## Обзор

Лендинг Reflexity на Next.js 13 с полной поддержкой Docker для изолированного деплоя на сервер.

```
┌─────────────────────────────────────────────────────┐
│              Docker Infrastructure                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│              ┌──────────────┐                       │
│              │   Landing    │                       │
│              │    :3000     │                       │
│              └──────┬───────┘                       │
│                     │                               │
│           landing-network (bridge)                  │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
          Bind Mount для SQLite
                   │
                   ▼
┌──────────────────────────────────────────────────────┐
│              Хост (твой компьютер/сервер)            │
│                                                      │
│  landing/                                            │
│  ├── data/                                           │
│  │   └── database.sqlite  ← SQLite БД               │
│  │                                                   │
│  ├── .next/                ← Build артефакты        │
│  └── node_modules/         ← Зависимости            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Технологический стек

- **Next.js 13.4.7** - React фреймворк
- **Node.js 18 Alpine** - Runtime окружение
- **SQLite** - База данных (для форм/заявок)
- **Docker** - Контейнеризация
- **Multi-stage build** - Оптимизированная сборка

## Быстрый старт

### 1. Настройка окружения

Создайте файл `.env` на основе примера:

```bash
cp .env.example .env
```

Содержимое `.env.example`:
```bash
# Порт приложения
PORT=3000

# Адрес API бекенда
NEXT_PUBLIC_API_URL=http://10.0.0.212:8000

# ReCAPTCHA (Google)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# Telegram Bot
NEXT_PUBLIC_TELEGRAM_BOT_NAME=@your_bot_name
```

### 2. Запуск в Docker

```bash
# Сборка и запуск
docker-compose up -d

# Или пересборка
docker-compose up -d --build
```

### 3. Проверка

```bash
# Проверить доступность
curl http://localhost:3000

# Или открыть в браузере
open http://localhost:3000
```

## Структура проекта

```
landing/
├── src/                      # Исходный код
│   ├── pages/                # Next.js страницы
│   └── styles/               # Стили (SCSS)
│
├── components/               # React компоненты
│   ├── Screens/             # Экраны лендинга
│   ├── UI-kit/              # UI компоненты
│   ├── Modals/              # Модальные окна
│   ├── Payments/            # Платёжные формы
│   └── ...
│
├── public/                   # Статические файлы
│   ├── icons/               # SVG иконки
│   ├── fonts/               # Шрифты
│   └── ...
│
├── data/                     # Данные (не в git)
│   └── database.sqlite      # SQLite БД
│
├── Dockerfile                # Docker образ
├── docker-compose.yml        # Docker конфигурация
├── .dockerignore            # Исключения для Docker
├── .env.example             # Пример переменных окружения
├── next.config.js           # Next.js конфигурация
├── package.json             # Зависимости
└── README.md                # Основная документация
```

## Docker конфигурация

### Dockerfile

Используется **multi-stage build** для оптимизации:

1. **deps** - установка зависимостей
2. **builder** - сборка Next.js приложения
3. **runner** - минимальный production образ

### docker-compose.yml

```yaml
services:
  landing:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data     # SQLite база
    environment:
      - NODE_ENV=production
    networks:
      - landing-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/"]
    restart: unless-stopped
```

### Переменные окружения

Переменные с префиксом `NEXT_PUBLIC_*` встраиваются в клиентский код при сборке:

```bash
# Build-time переменные (передаются при сборке)
NEXT_PUBLIC_API_URL           # Адрес бекенда
NEXT_PUBLIC_RECAPTCHA_SITE_KEY # ReCAPTCHA ключ
NEXT_PUBLIC_TELEGRAM_BOT_NAME  # Telegram бот

# Runtime переменные
PORT=3000                     # Порт приложения
NODE_ENV=production           # Окружение
```

⚠️ **Важно:** Изменение `NEXT_PUBLIC_*` переменных требует пересборки образа!

## Основные команды

### Запуск и остановка

```bash
# Запустить контейнер
docker-compose up -d

# Остановить контейнер
docker-compose down

# Остановить без удаления
docker-compose stop

# Перезапустить
docker-compose restart
```

### Сборка

```bash
# Пересобрать образ
docker-compose build

# Пересобрать без кеша
docker-compose build --no-cache

# Пересобрать и запустить
docker-compose up -d --build
```

### Мониторинг

```bash
# Статус контейнера
docker-compose ps

# Логи (последние строки)
docker-compose logs landing

# Логи (следить за новыми)
docker-compose logs -f landing

# Использование ресурсов
docker stats landing
```

### Debugging

```bash
# Войти в контейнер
docker-compose exec landing sh

# Проверить переменные окружения
docker-compose exec landing env

# Проверить структуру файлов
docker-compose exec landing ls -la
```

## База данных (SQLite)

### Структура

Лендинг использует SQLite для хранения данных из форм:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  site TEXT,
  email TEXT,
  nickname TEXT,
  description TEXT,
  date TEXT
);
```

### Персистентность

База данных хранится в `./data/database.sqlite` через **Bind Mount**:

```yaml
volumes:
  - ./data:/app/data
```

✅ **Данные сохраняются** при:
- `docker-compose down`
- `docker-compose build`
- Пересборке образа
- Перезагрузке сервера

❌ **Данные теряются** при:
- `rm -rf data/`
- Удалении директории data

### Бэкап

```bash
# Ручной бэкап
cp data/database.sqlite backups/database_$(date +%Y%m%d).sqlite

# Восстановление
cp backups/database_20241024.sqlite data/database.sqlite

# Остановить контейнер для консистентности
docker-compose stop
cp data/database.sqlite backups/
docker-compose start
```

## Производительность

### Multi-stage build

Размеры образов:
- **deps**: ~450MB (базовый образ + node_modules)
- **builder**: ~500MB (deps + исходники + build)
- **runner**: ~150MB (только production файлы) ✅

Итоговый образ содержит только:
- Минимальный Node.js runtime
- Скомпилированный Next.js код
- Необходимые зависимости

### Оптимизации

1. **Alpine Linux** - минимальный размер базового образа
2. **Standalone режим** - Next.js собирает только необходимые файлы
3. **SWC minification** - быстрая минификация кода
4. **Unprivileged user** - безопасность (nextjs:1001)
5. **.dockerignore** - исключение лишних файлов из контекста

### Healthcheck

```bash
# Проверка каждые 30 секунд
test: ["CMD", "wget", "--spider", "http://localhost:3000/"]
interval: 30s
timeout: 10s
retries: 3
```

## Окружения

### Development (localhost)

```bash
# .env
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=development
```

```bash
# Запуск локально (без Docker)
npm run dev
```

### Production (сервер)

```bash
# .env
PORT=3000
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

```bash
# Запуск в Docker
docker-compose up -d
```

## Безопасность

### 1. Unprivileged User

Контейнер запускается от непривилегированного пользователя:

```dockerfile
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs
```

### 2. Переменные окружения

⚠️ **Важно:**
- Файл `.env` не должен попадать в git!
- Используйте `.env.local` для локальной разработки
- Для production используйте секреты из CI/CD

### 3. Порты

По умолчанию открыт только порт `3000`:

```yaml
ports:
  - "3000:3000"  # Хост : Контейнер
```

Для production рекомендуется использовать reverse proxy (Nginx/Caddy).

### 4. База данных

SQLite файл доступен только внутри контейнера и через volume:

```bash
# Проверить права
ls -la data/
# Должно быть: nextjs:nodejs
```

## Деплой на сервер

### 1. Подготовка сервера

```bash
# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установить Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

### 2. Клонирование проекта

```bash
# Клонировать репозиторий
git clone <repo_url>
cd landing

# Создать .env файл
cp .env.example .env
nano .env  # Отредактировать переменные
```

### 3. Запуск

```bash
# Сборка и запуск
docker-compose up -d

# Проверить логи
docker-compose logs -f
```

### 4. Настройка reverse proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL (Let's Encrypt)

```bash
# Установить Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получить сертификат
sudo certbot --nginx -d yourdomain.com
```

## Обновление приложения

### 1. Обновление кода

```bash
# Остановить контейнер
docker-compose down

# Обновить код
git pull origin main

# Пересобрать и запустить
docker-compose up -d --build
```

### 2. Обновление зависимостей

```bash
# Обновить package.json
npm update

# Пересобрать образ
docker-compose build --no-cache

# Запустить
docker-compose up -d
```

### 3. Обновление переменных окружения

```bash
# Отредактировать .env
nano .env

# Если изменили NEXT_PUBLIC_* - нужна пересборка!
docker-compose up -d --build

# Если изменили обычные переменные - просто перезапуск
docker-compose restart
```

## Troubleshooting

### Контейнер не запускается

```bash
# Проверить логи
docker-compose logs landing

# Проверить порт (занят?)
lsof -i :3000

# Пересоздать контейнер
docker-compose up -d --force-recreate
```

### Ошибка сборки

```bash
# Очистить кеш Docker
docker builder prune -a

# Пересобрать без кеша
docker-compose build --no-cache
```

### База данных не сохраняется

```bash
# Проверить volume маппинг
docker inspect landing | grep Mounts -A 10

# Проверить права на директорию
ls -la data/

# Создать директорию вручную
mkdir -p data
chmod 755 data
```

### Приложение не отвечает

```bash
# Проверить healthcheck
docker-compose ps

# Проверить порт внутри контейнера
docker-compose exec landing wget -O- http://localhost:3000

# Проверить логи
docker-compose logs -f landing
```

### Изменения не применяются

```bash
# Для изменений кода - нужна пересборка
docker-compose up -d --build

# Для изменений NEXT_PUBLIC_* - обязательна пересборка
docker-compose build --no-cache
docker-compose up -d
```

## CI/CD интеграция

### GitHub Actions (пример)

```yaml
name: Deploy Landing

on:
  push:
    branches: [main]
    paths:
      - 'landing/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Copy files to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          source: "landing/*"
          target: "/app"
      
      - name: Deploy on server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app/landing
            docker-compose down
            docker-compose up -d --build
```

### Docker Hub (опционально)

```bash
# Собрать образ
docker build -t username/reflexity-landing:latest .

# Загрузить на Docker Hub
docker push username/reflexity-landing:latest

# На сервере скачать и запустить
docker pull username/reflexity-landing:latest
docker-compose up -d
```

## Мониторинг

### Метрики

```bash
# Размер образа
docker images reflexivity-landing

# Использование ресурсов
docker stats landing

# Размер данных
du -sh data/
```

### Логирование

```bash
# Все логи
docker-compose logs

# Только ошибки
docker-compose logs | grep -i error

# Последние 100 строк
docker-compose logs --tail=100

# Следить за новыми
docker-compose logs -f --tail=50
```

### Healthcheck статус

```bash
# Проверить статус
docker-compose ps

# Ручная проверка
curl -f http://localhost:3000 || echo "Service is down"
```

## Изоляция от бекенда

Лендинг и бекенд полностью изолированы:

```
┌──────────────────┐         ┌──────────────────┐
│     Landing      │         │     Backend      │
│     :3000        │◄────────┤     :8000        │
│   (отдельный)    │  HTTP   │   (отдельный)    │
│                  │         │                  │
│ landing-network  │         │  app-network     │
└──────────────────┘         └──────────────────┘
         │                            │
         │                            │
    data/sqlite            db/neo4j + db/qdrant
```

**Связь через HTTP API:**
- Лендинг делает запросы на `NEXT_PUBLIC_API_URL`
- Бекенд настроен с CORS для приёма запросов
- Можно деплоить на разные серверы

## Важные замечания

⚠️ **Регулярно делайте бэкапы SQLite базы!**  
⚠️ **Изменение NEXT_PUBLIC_* требует пересборки!**  
⚠️ **Файл .env не попадает в git!**  
⚠️ **Используйте reverse proxy в production!**  
⚠️ **Настройте SSL сертификаты!**  
⚠️ **Мониторьте логи приложения!**  

## Документация

- **Основной README**: [README.md](./README.md)
- **Next.js Documentation**: https://nextjs.org/docs
- **Docker Documentation**: https://docs.docker.com
- **Docker Compose**: https://docs.docker.com/compose/

## Контакты и поддержка

При возникновении проблем:
1. Проверьте раздел Troubleshooting
2. Изучите логи: `docker-compose logs`
3. Проверьте конфигурацию: `docker-compose config`
4. Проверьте healthcheck: `docker-compose ps`

