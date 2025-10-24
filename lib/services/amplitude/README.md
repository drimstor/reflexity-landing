# Amplitude для лендинга

## Установка

1. Установлен пакет `@amplitude/unified`
2. Создана структура сервиса в `lib/services/amplitude/`
3. Интегрирован в `_app.tsx` для автоматической инициализации

## Конфигурация

Добавьте API ключ в `.env.local`:

```env
NEXT_PUBLIC_AMPLITUDE_KEY=your_amplitude_api_key_here
```

## Использование

### Автоматический трекинг

- **Просмотры страниц**: отслеживаются автоматически при навигации
- **Клики, скроллы и другие взаимодействия**: включены через `autocapture: true`

### Ручной трекинг событий

#### В компонентах (через хук)

```typescript
import { useAmplitude } from '@/hooks/useAmplitude';

function MyComponent() {
  const { trackButtonClick, trackModalOpen } = useAmplitude();

  const handleClick = () => {
    trackButtonClick('Начать работу', 'hero_section', '/signup');
  };

  const handleModalOpen = () => {
    trackModalOpen('contact_modal', 'button_click');
  };

  return (
    <>
      <button onClick={handleClick}>Начать работу</button>
      <button onClick={handleModalOpen}>Связаться</button>
    </>
  );
}
```

#### Напрямую через сервис

```typescript
import { amplitudeService } from '@/lib/services/amplitude';

// Отправка кастомного события
amplitudeService.track('landing_button_click', {
  button_text: 'Скачать',
  button_location: 'footer',
});

// Установка пользователя
amplitudeService.setUser('user_123', {
  email: 'user@example.com',
  plan: 'premium',
});

// Установка свойств пользователя
amplitudeService.setUserProperties({
  language: 'ru',
  theme: 'dark',
});
```

## Доступные методы хука

```typescript
const {
  track,                  // Общий метод для любого события
  trackButtonClick,       // Клик по кнопке
  trackLinkClick,        // Клик по ссылке
  trackFormSubmit,       // Отправка формы
  trackFormError,        // Ошибка формы
  trackModalOpen,        // Открытие модалки
  trackModalClose,       // Закрытие модалки
  trackScrollToSection,  // Скролл к секции
} = useAmplitude();
```

## Типы событий

Все события типизированы в `AmplitudeTypes.ts`:

- `landing_page_view` - просмотр страницы
- `landing_button_click` - клик по кнопке
- `landing_form_submit` - отправка формы
- `landing_form_error` - ошибка формы
- `landing_modal_open` - открытие модалки
- `landing_modal_close` - закрытие модалки
- `landing_link_click` - клик по ссылке
- `landing_scroll_to_section` - скролл к секции
- `landing_contact_form_submit` - отправка контактной формы
- `landing_payment_*` - события платежей

## Добавление новых событий

1. Добавьте тип события в `EventName` в `AmplitudeTypes.ts`
2. Добавьте свойства события в `EventProperties`
3. (Опционально) Добавьте метод в хук `useAmplitude.ts`

## Отличия от мобильного приложения

- Используется `@amplitude/unified` вместо `@amplitude/analytics-react-native`
- Нет Session Replay (только для мобильных)
- Добавлена проверка на SSR (код выполняется только в браузере)
- Автоматический трекинг роутера Next.js
- Добавлены свойства `platform: 'web'` и `source: 'landing'` для различения данных

## Разделение данных с мобильным приложением

Используются **разные API ключи** для лендинга и мобильного приложения, поэтому данные автоматически разделены по проектам в Amplitude.

Дополнительно, каждое событие помечается свойствами:
- `platform: 'web'` (для лендинга) / `platform: 'mobile'` (для приложения)
- `source: 'landing'` (для лендинга) / `source: 'app'` (для приложения)

