# Docker команды для лендинга

## Сборка образа

```bash
# Простая сборка (если переменные не нужны)
docker build -t reflexity-landing:latest .

# Или с переменными (если используются в коде)
docker build \
  --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_key_here \
  --build-arg NEXT_PUBLIC_TELEGRAM_BOT_NAME=@your_bot \
  -t reflexity-landing:latest .
```

### Запуск контейнера

```bash
# Запуск на порту 3000
docker run -d \
  --name reflexity-landing \
  --restart unless-stopped \
  -p 3000:3000 \
  reflexity-landing:latest
```

### Управление

```bash
# Остановить
docker stop reflexity-landing

# Запустить
docker start reflexity-landing

# Перезапустить
docker restart reflexity-landing

# Удалить
docker rm -f reflexity-landing

# Посмотреть логи
docker logs -f reflexity-landing

# Проверить статус
docker ps | grep reflexity-landing
```

## Примечание о docker-compose

**docker-compose для лендинга не нужен!** ❌

Причины:
- Лендинг = 1 контейнер
- Нет дополнительных сервисов (БД, кеш и т.д.)
- Нет сложных зависимостей
- Достаточно простого `docker run`

Используйте команды выше для управления контейнером.

## Важные заметки

### Переменные окружения

**Важно:** Лендинг **НЕ взаимодействует** с бекендом напрямую!

Роутинг происходит через Nginx:
- `/api/*` → Бекенд
- Всё остальное → Лендинг

Переменные `NEXT_PUBLIC_*` нужны **только если используются в коде**:
- ReCAPTCHA ключ
- Telegram bot имя
- И т.д.

Если меняете переменные - нужна **пересборка**:

```bash
# Пересборка
docker build --no-cache \
  --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=new_key \
  -t reflexity-landing:latest .

# Пересоздание контейнера
docker rm -f reflexity-landing
docker run -d --name reflexity-landing -p 3000:3000 reflexity-landing:latest
```

### Деплой на сервер

```bash
# 1. На локальной машине - сохранить образ
docker save reflexity-landing:latest | gzip > reflexity-landing.tar.gz

# 2. Скопировать на сервер
scp reflexity-landing.tar.gz user@server:/tmp/

# 3. На сервере - загрузить и запустить
ssh user@server
cd /tmp
docker load < reflexity-landing.tar.gz
docker run -d --name reflexity-landing -p 3000:3000 reflexity-landing:latest
```

### Production с Nginx (обязательно!)

Nginx роутит запросы между лендингом и бекендом:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # API → Backend (8000)
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Landing → Frontend (3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Полная конфигурация:** [nginx.conf.example](./nginx.conf.example)

### Размер образа

```bash
# Проверить размер
docker images reflexity-landing

# Должно быть ~150-200MB (Alpine + Next.js)
```

### Мониторинг

```bash
# Использование ресурсов
docker stats reflexity-landing

# Healthcheck (если нужно добавить)
curl http://localhost:3000

# Проверить что работает
docker ps | grep reflexity-landing
```

### Обновление приложения

```bash
# 1. Остановить старый контейнер
docker stop reflexity-landing

# 2. Удалить старый контейнер
docker rm reflexity-landing

# 3. Удалить старый образ (опционально)
docker rmi reflexity-landing:latest

# 4. Пересобрать
docker build -t reflexity-landing:latest .

# 5. Запустить новый
docker run -d --name reflexity-landing -p 3000:3000 reflexity-landing:latest
```

### Очистка

```bash
# Удалить контейнер
docker rm -f reflexity-landing

# Удалить образ
docker rmi reflexity-landing:latest

# Очистить неиспользуемые образы
docker image prune -a
```

## Почему без docker-compose?

**Для лендинга достаточно `docker run`:**
- ✅ Один контейнер (Next.js приложение)
- ✅ Нет дополнительных сервисов
- ✅ Нет прямого взаимодействия с бекендом
- ✅ Простота и скорость деплоя

**docker-compose нужен для бекенда:**
- 📦 Много контейнеров (API, Neo4j, Qdrant)
- 🔗 Сложные зависимости и связи
- 💾 Множество volumes и networks

## Рекомендации для CI/CD

Для автоматического деплоя рекомендуется:
1. Собирать образ в CI
2. Пушить в Docker Hub или Registry
3. На сервере: `docker pull` и `docker run`

Пример в **README_DOCKER.md**

