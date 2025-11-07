# Генерация иконок сайта

Этот скрипт создает все необходимые размеры иконок из `logo.png` для различных браузеров и платформ.

## Установка зависимостей

```bash
pip install -r requirements.txt
```

Или напрямую:

```bash
pip install Pillow
```

## Использование

Запустите скрипт из директории `landing`:

```bash
python scripts/generate-favicons.py
```

Скрипт автоматически:
- Найдет `public/logo.png`
- Создаст все необходимые размеры иконок
- Сохранит их в директорию `public/`

## Создаваемые файлы

Скрипт создает следующие иконки:

### Стандартные favicon
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`

### Apple Touch Icons (iOS)
- `apple-touch-icon.png` (180x180)
- `apple-touch-icon-57x57.png`
- `apple-touch-icon-60x60.png`
- `apple-touch-icon-72x72.png`
- `apple-touch-icon-76x76.png`
- `apple-touch-icon-114x114.png`
- `apple-touch-icon-120x120.png`
- `apple-touch-icon-144x144.png`
- `apple-touch-icon-152x152.png`
- `apple-touch-icon-180x180.png`

### Android/Chrome
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## Примечания

- Исходный файл `logo.png` должен находиться в `public/logo.png`
- Все иконки создаются с прозрачным фоном (RGBA)
- Используется высококачественный алгоритм ресамплинга (LANCZOS)
- Для Safari pinned tab требуется SVG файл, который нужно создать отдельно

