// Утилиты для Amplitude

// Проверка, что код выполняется в браузере
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

// Получение информации о среде выполнения
export const getRuntimeInfo = () => {
  if (!isBrowser()) {
    return {
      platform: 'server',
      environment: 'SSR',
    }
  }

  return {
    platform: 'web',
    environment: process.env.NODE_ENV,
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  }
}

// Проверка доступности API ключа
export const isAmplitudeConfigured = (): boolean => {
  return Boolean(process.env.NEXT_PUBLIC_AMPLITUDE_KEY)
}
