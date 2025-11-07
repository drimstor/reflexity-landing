#!/usr/bin/env python3
"""
Скрипт для генерации иконок сайта из logo.png
Создает все необходимые размеры для Safari, iOS, Android и других браузеров
"""

import os
import sys
import base64
from pathlib import Path
from PIL import Image

# Размеры иконок для разных платформ
ICON_SIZES = {
    # Стандартные favicon размеры
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    
    # Apple Touch Icons (iOS)
    'apple-touch-icon.png': 180,
    'apple-touch-icon-57x57.png': 57,
    'apple-touch-icon-60x60.png': 60,
    'apple-touch-icon-72x72.png': 72,
    'apple-touch-icon-76x76.png': 76,
    'apple-touch-icon-114x114.png': 114,
    'apple-touch-icon-120x120.png': 120,
    'apple-touch-icon-144x144.png': 144,
    'apple-touch-icon-152x152.png': 152,
    'apple-touch-icon-180x180.png': 180,
    
    # Android/Chrome
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
    
    # Safari pinned tab (mask-icon)
    'safari-pinned-tab.svg': None,  # SVG обрабатывается отдельно
}

def create_icon(input_path: Path, output_path: Path, size: int):
    """Создает иконку указанного размера из исходного изображения"""
    try:
        # Открываем исходное изображение
        img = Image.open(input_path)
        
        # Конвертируем в RGBA если нужно
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Создаем квадратное изображение с прозрачным фоном
        # Используем высококачественный ресамплинг
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Сохраняем
        resized.save(output_path, 'PNG', optimize=True)
        print(f"✓ Создан {output_path.name} ({size}x{size})")
        
    except Exception as e:
        print(f"✗ Ошибка при создании {output_path.name}: {e}", file=sys.stderr)
        return False
    
    return True

def create_favicon_ico(input_path: Path, output_path: Path):
    """Создает favicon.ico с несколькими размерами"""
    try:
        img = Image.open(input_path)
        
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Создаем иконки разных размеров для .ico файла
        sizes = [16, 32, 48]
        icons = []
        
        for size in sizes:
            resized = img.resize((size, size), Image.Resampling.LANCZOS)
            icons.append(resized)
        
        # Сохраняем как ICO с несколькими размерами
        icons[0].save(
            output_path,
            format='ICO',
            sizes=[(s, s) for s in sizes],
            append_images=icons[1:] if len(icons) > 1 else []
        )
        print(f"✓ Создан {output_path.name} (16x16, 32x32, 48x48)")
        
    except Exception as e:
        print(f"✗ Ошибка при создании {output_path.name}: {e}", file=sys.stderr)
        return False
    
    return True

def create_svg_from_png(input_path: Path, output_path: Path):
    """Создает SVG файл из PNG для Safari pinned tab"""
    try:
        # Открываем изображение
        img = Image.open(input_path)
        
        # Получаем размеры
        width, height = img.size
        
        # Конвертируем в RGBA если нужно
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Создаем временный файл для base64 кодирования
        from io import BytesIO
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        img_data = buffer.getvalue()
        
        # Кодируем в base64
        img_base64 = base64.b64encode(img_data).decode('utf-8')
        
        # Создаем SVG с встроенным изображением
        svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{img_base64}"/>
</svg>'''
        
        # Сохраняем SVG
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        print(f"✓ Создан {output_path.name} ({width}x{height})")
        
    except Exception as e:
        print(f"✗ Ошибка при создании {output_path.name}: {e}", file=sys.stderr)
        return False
    
    return True

def main():
    # Определяем пути
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    public_dir = project_root / 'public'
    logo_path = public_dir / 'logo.png'
    
    # Проверяем наличие исходного файла
    if not logo_path.exists():
        print(f"✗ Файл {logo_path} не найден!", file=sys.stderr)
        sys.exit(1)
    
    print(f"Исходный файл: {logo_path}")
    print(f"Выходная директория: {public_dir}")
    print()
    
    # Создаем все иконки
    success_count = 0
    total_count = len([s for s in ICON_SIZES.values() if s is not None]) + 1  # +1 для favicon.ico
    
    # Создаем PNG иконки
    for filename, size in ICON_SIZES.items():
        if size is None:  # Пропускаем SVG
            continue
        
        output_path = public_dir / filename
        if create_icon(logo_path, output_path, size):
            success_count += 1
    
    # Создаем favicon.ico
    favicon_path = public_dir / 'favicon.ico'
    if create_favicon_ico(logo_path, favicon_path):
        success_count += 1
    
    # Создаем SVG для Safari pinned tab
    svg_path = public_dir / 'safari-pinned-tab.svg'
    if create_svg_from_png(logo_path, svg_path):
        success_count += 1
        total_count += 1
    
    print()
    print(f"Готово! Создано {success_count} из {total_count} иконок")
    
    if success_count == total_count:
        print("✓ Все иконки успешно созданы!")
        return 0
    else:
        print("⚠ Некоторые иконки не были созданы", file=sys.stderr)
        return 1

if __name__ == '__main__':
    sys.exit(main())

