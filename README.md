# Landing - Reflexity

Лендинг приложения Reflexity на Next.js 13 с поддержкой Docker для изолированного деплоя.

## Технологический стек

- **Next.js 13.4.7** - React фреймворк
- **TypeScript** - типизация
- **SCSS/Sass** - стилизация
- **SQLite** - база данных для форм
- **React** - UI библиотека
- **Lottie** - анимации

## Быстрый старт

### Вариант 1: Локальная разработка

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Открыть в браузере
open http://localhost:3000
```

### Вариант 2: Docker (Production)

```bash
# Собрать образ
docker build -t reflexity-landing .

# Запустить контейнер
docker run -d \
  --name reflexity-landing \
  --restart unless-stopped \
  -p 3000:3000 \
  reflexity-landing

# Проверить
curl http://localhost:3000
```

**Примечание:** Переменные окружения нужны только если используются в коде (ReCAPTCHA, Telegram и т.д.)

## Структура проекта

```
landing/
├── src/                      # Исходный код
│   ├── pages/                # Next.js страницы
│   │   ├── index.tsx         # Главная страница
│   │   └── api/              # API routes
│   └── styles/               # Глобальные стили
│
├── components/               # React компоненты
│   ├── Screens/             # Секции лендинга
│   ├── UI-kit/              # UI компоненты
│   ├── Modals/              # Модальные окна
│   ├── Payments/            # Платёжные формы
│   └── ...
│
├── public/                   # Статические файлы
│   ├── icons/               # SVG иконки
│   ├── fonts/               # Шрифты (ZonaPro)
│   └── images/              # Изображения
│
├── hooks/                    # Custom React hooks
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── ...
│
├── Dockerfile                # Docker образ
├── nginx.conf.example        # Пример Nginx конфигурации
├── DOCKER_COMMANDS.md        # Docker команды
└── README_DOCKER.md          # Docker документация
```

## Команды разработки

```bash
# Разработка
npm run dev          # Запустить dev сервер с hot reload

# Production сборка
npm run build        # Собрать оптимизированную версию
npm run start        # Запустить production сервер

# Линтер
npm run lint         # Проверить код на ошибки
```

## Docker

### Запуск

```bash
# Собрать образ
docker build -t reflexity-landing .

# Запустить
docker run -d \
  --name reflexity-landing \
  --restart unless-stopped \
  -p 3000:3000 \
  reflexity-landing

# Управление
docker stop reflexity-landing    # Остановить
docker start reflexity-landing   # Запустить
docker logs -f reflexity-landing # Логи
docker rm -f reflexity-landing   # Удалить
```

**Подробные команды:** [DOCKER_COMMANDS.md](./DOCKER_COMMANDS.md)

## Роутинг через Nginx

Лендинг **не взаимодействует** с бекендом напрямую.

Nginx роутит запросы:
- `/api/*` → Бекенд (порт 8000)
- Всё остальное → Лендинг (порт 3000)

Пример конфигурации: [nginx.conf.example](./nginx.conf.example)

## Архитектура

### Изоляция от бекенда

```
                    ┌─────────────┐
                    │    Nginx    │
                    │   :80/:443  │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌──────────────────┐      ┌──────────────────┐
    │     Landing      │      │     Backend      │
    │     :3000        │      │     :8000        │
    │   (Next.js)      │      │   (FastAPI)      │
    └──────────────────┘      └──────────────────┘
          docker run            docker-compose
```

- Лендинг и бекенд **полностью изолированы**
- Связь **только** через Nginx (роутинг)
- Можно деплоить на разные серверы
- Нет прямого взаимодействия

## Деплой на сервер

### 1. Подготовка

```bash
# Клонировать проект
git clone <repo_url>
cd landing

# Создать .env файл
cp .env.example .env
nano .env  # Отредактировать
```

### 2. Запуск

```bash
# Запустить в Docker
docker-compose up -d

# Проверить логи
docker-compose logs -f
```

### 3. Настройка Nginx (обязательно!)

```bash
# Скопировать конфигурацию
sudo cp nginx.conf.example /etc/nginx/sites-available/reflexity

# Отредактировать домен
sudo nano /etc/nginx/sites-available/reflexity

# Активировать
sudo ln -s /etc/nginx/sites-available/reflexity /etc/nginx/sites-enabled/

# Проверить конфигурацию
sudo nginx -t

# Перезапустить Nginx
sudo systemctl restart nginx
```

Конфигурация роутит:
- `/api/*` → Backend (8000)
- `/` → Landing (3000)

### 4. Запустить бекенд (на том же сервере)

```bash
# Перейти в бекенд
cd ../backend

# Запустить через docker-compose
docker-compose up -d
```

### 5. SSL сертификат

```bash
# Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

## Производительность

### Оптимизации

- ✅ Multi-stage Docker build (образ ~150MB)
- ✅ Next.js standalone режим
- ✅ SWC минификация
- ✅ Оптимизация шрифтов
- ✅ Lazy loading компонентов
- ✅ Image optimization

### Метрики

```bash
# Размер production сборки
npm run build
# ├ ✓ Static (9 KB)
# ├ ✓ First Load JS (85 KB)

# Размер Docker образа
docker images landing
# ~150MB (Alpine + Next.js)
```

## Мониторинг

```bash
# Статус контейнера
docker-compose ps

# Логи
docker-compose logs -f

# Использование ресурсов
docker stats landing

# Healthcheck
curl http://localhost:3000
```

## Troubleshooting

### Порт занят

```bash
# Проверить занятые порты
lsof -i :3000

# Изменить порт в .env
PORT=3001
```

### Ошибка при сборке

```bash
# Очистить кеш
docker builder prune -a

# Пересобрать
docker-compose build --no-cache
```

### Изменения не применяются

```bash
# Пересобрать без кеша
docker build --no-cache -t reflexity-landing .

# Пересоздать контейнер
docker rm -f reflexity-landing
docker run -d --name reflexity-landing -p 3000:3000 reflexity-landing
```

Полный список решений проблем в [README_DOCKER.md](./README_DOCKER.md#troubleshooting)

## CI/CD

Проект готов к автоматическому деплою через GitHub Actions, GitLab CI или другие CI/CD системы.

Пример конфигурации в [README_DOCKER.md](./README_DOCKER.md#cicd-интеграция)

## Ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com)
- [README_DOCKER.md](./README_DOCKER.md) - полная Docker документация

## Лицензия

Private project

## Контакты

При возникновении проблем:
1. Проверьте [README_DOCKER.md](./README_DOCKER.md#troubleshooting)
2. Изучите логи: `docker-compose logs`
3. Проверьте конфигурацию: `docker-compose config`
