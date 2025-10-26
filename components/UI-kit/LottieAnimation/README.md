# LottieAnimation - Оптимизированный компонент для Lottie анимаций

Компонент с автоматической оптимизацией для работы на слабых устройствах.

## Возможности оптимизации

### 1. Автоматическое определение производительности устройства

Компонент автоматически определяет производительность устройства на основе:
- Количества ядер процессора (`navigator.hardwareConcurrency`)
- Объема памяти устройства (`navigator.deviceMemory`)
- Типа сетевого соединения (`navigator.connection.effectiveType`)

### 2. Адаптивное качество рендеринга

**High Quality (мощные устройства):**
- Полный размер фильтров SVG (200%)
- Subframe рендеринг включен для плавности
- Стандартная скорость анимации

**Medium Quality (средние устройства):**
- Уменьшенный размер фильтров (150%)
- Subframe рендеринг отключен
- Стандартная скорость анимации

**Low Quality (слабые устройства):**
- Минимальный размер фильтров (150%)
- Subframe рендеринг отключен
- Скорость анимации снижена на 20%
- Упрощенный рендеринг SVG через CSS классы
- Отключены фильтры и тени

### 3. Intersection Observer

Автоматическая пауза анимации, когда она не видна на экране:
- Экономит CPU/GPU ресурсы
- Продлевает время работы батареи
- Улучшает общую производительность страницы

### 4. Оптимизация SVG рендерера

Специальные CSS классы для слабых устройств:
- `shape-rendering: optimizeSpeed` - упрощает векторную графику
- `image-rendering: pixelated` - ускоряет растеризацию
- Отключение фильтров и теней
- GPU ускорение через `transform: translateZ(0)`

### 5. Canvas рендерер (опционально)

Для случаев, где SVG вызывает проблемы:
```tsx
<LottieAnimation
  animationPath="/animation.json"
  renderer="canvas"
  quality="low"
/>
```

**Примечание:** Canvas может изменять внешний вид анимации. Если это проблема, используйте SVG с оптимизациями.

## Использование

### Базовое использование

```tsx
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'

<LottieAnimation
  animationPath="/slow-spinner.json"
  className={styles.myAnimation}
/>
```

### С ручным контролем качества

```tsx
<LottieAnimation
  animationPath="/animation.json"
  quality="low" // принудительно низкое качество
  speed={0.5}   // медленнее анимация
  loop={true}
  autoplay={true}
/>
```

### Полное отключение на слабых устройствах (рекомендуется)

```tsx
<LottieAnimation
  animationPath="/animation.json"
  disableAnimationSpeed={true} // анимация не будет загружаться на слабых устройствах
/>
```

**Рекомендация:** Используйте `disableAnimationSpeed={true}` для декоративных анимаций, чтобы максимально разгрузить слабые устройства.

### Отключение автоматической паузы

```tsx
<LottieAnimation
  animationPath="/animation.json"
  pauseOnHidden={false} // анимация будет работать всегда
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `animationPath` | `string` | **обязательно** | Путь к JSON файлу анимации |
| `loop` | `boolean` | `true` | Зацикливать анимацию |
| `autoplay` | `boolean` | `true` | Автоматически запускать анимацию |
| `className` | `string` | - | CSS класс для контейнера |
| `renderer` | `'svg' \| 'canvas' \| 'html'` | `'svg'` | Тип рендерера |
| `quality` | `'high' \| 'medium' \| 'low'` | `auto` | Качество рендеринга (авто-определение если не указано) |
| `pauseOnHidden` | `boolean` | `true` | Останавливать анимацию когда не видна |
| `speed` | `number` | `0.6` | Скорость анимации (1 = нормальная) |

## Дополнительная оптимизация

### Использование хука useLottieOptimization

```tsx
import { useLottieOptimization } from './useLottieOptimization'

const MyComponent = () => {
  const { isLowEndDevice, getOptimalFPS } = useLottieOptimization()
  
  if (isLowEndDevice()) {
    // Упростить анимацию или загрузить более легкую версию
  }
  
  return <LottieAnimation animationPath="/animation.json" />
}
```

## Рекомендации по оптимизации анимаций

### В After Effects / Lottie Editor:

1. **Упростите слои:**
   - Уменьшите количество слоев
   - Объедините похожие элементы
   - Удалите невидимые элементы

2. **Оптимизируйте пути:**
   - Упростите сложные векторные пути
   - Уменьшите количество опорных точек
   - Используйте простые формы где возможно

3. **Ограничьте эффекты:**
   - Избегайте сложных фильтров (blur, glow)
   - Минимизируйте использование масок
   - Ограничьте количество градиентов

4. **Оптимизируйте размер файла:**
   - Используйте инструменты сжатия JSON
   - Удалите неиспользуемые ресурсы
   - Округляйте числовые значения

### Инструменты для оптимизации:

- [LottieFiles](https://lottiefiles.com/) - онлайн редактор с функциями оптимизации
- [Lottie JSON Minifier](https://lottiefiles.github.io/lottie-docs/breakdown/bouncy_ball/) - сжатие JSON
- После экспорта из AE используйте bodymovin с настройками "glyphs only" и "demo"

## Мониторинг производительности

Используйте Chrome DevTools для отслеживания:
- **Performance tab** - CPU usage, frame drops
- **Rendering tab** - Paint flashing, Layer borders
- **Memory tab** - Memory leaks

## Известные проблемы

### Canvas рендерер и артефакты

Если canvas рендерер вызывает визуальные артефакты или "петли":
1. Используйте SVG рендерер (по умолчанию)
2. Примените CSS оптимизации для слабых устройств
3. Упростите саму анимацию в After Effects

### Проблемы с фильтрами в SVG

Некоторые фильтры SVG могут быть медленными:
- Используйте `quality="low"` для автоматического отключения фильтров
- Или упростите анимацию, убрав эффекты blur/shadow

## Лицензия

MIT

