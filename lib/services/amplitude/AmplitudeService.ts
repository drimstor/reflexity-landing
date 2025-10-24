import { Identify } from '@amplitude/analytics-browser'
import * as amplitude from '@amplitude/unified'
import { EventName, EventProperties } from './AmplitudeTypes'
import {
  getRuntimeInfo,
  isAmplitudeConfigured,
  isBrowser,
} from './AmplitudeUtils'

// Конфигурация Amplitude
const AMPLITUDE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_KEY || '',
  options: {
    analytics: {
      autocapture: true, // Автоматический сбор событий (клики, скроллы и т.д.)
    },
  },
}

// Сервис для работы с Amplitude на лендинге
export class AmplitudeService {
  private static instance: AmplitudeService
  private isInitialized = false

  private constructor() {}

  public static getInstance(): AmplitudeService {
    if (!AmplitudeService.instance) {
      AmplitudeService.instance = new AmplitudeService()
    }
    return AmplitudeService.instance
  }

  // Инициализация Amplitude (только в браузере)
  public async init(): Promise<void> {
    // Проверка, что код выполняется в браузере
    if (!isBrowser()) {
      console.warn('Amplitude можно инициализировать только в браузере')
      return
    }

    // Проверка инициализации
    if (this.isInitialized) {
      return
    }

    // Проверка наличия API ключа
    if (!isAmplitudeConfigured()) {
      console.warn(
        'Amplitude API ключ не найден. Установите NEXT_PUBLIC_AMPLITUDE_KEY в .env.local'
      )
      return
    }

    try {
      // Инициализация Amplitude
      amplitude.initAll(AMPLITUDE_CONFIG.apiKey, AMPLITUDE_CONFIG.options)

      // Логирование информации о среде выполнения
      const runtimeInfo = getRuntimeInfo()
      console.log('Amplitude инициализирован успешно')
      console.log('Информация о среде:', runtimeInfo)

      // Установка свойств платформы
      const identifyObj = new Identify()
      identifyObj.set('platform', 'web')
      identifyObj.set('source', 'landing')
      identifyObj.set('environment', process.env.NODE_ENV || 'development')
      amplitude.identify(identifyObj)

      this.isInitialized = true
    } catch (error) {
      console.error('Ошибка инициализации Amplitude:', error)
    }
  }

  // Отправка события с типизацией
  public track<T extends EventName>(
    eventName: T,
    eventProperties?: EventProperties<T>
  ): void {
    if (!isBrowser()) {
      return
    }

    if (!this.isInitialized) {
      console.warn('Amplitude не инициализирован')
      return
    }

    try {
      amplitude.track(eventName, eventProperties)
    } catch (error) {
      console.error('Ошибка отправки события в Amplitude:', error)
    }
  }

  // Установка пользователя
  public setUser(userId: string, userProperties?: Record<string, any>): void {
    if (!isBrowser() || !this.isInitialized) {
      return
    }

    try {
      amplitude.setUserId(userId)

      if (userProperties) {
        const identifyObj = new Identify()
        Object.entries(userProperties).forEach(([key, value]) => {
          identifyObj.set(key, value)
        })
        amplitude.identify(identifyObj)
      }
    } catch (error) {
      console.error('Ошибка установки пользователя в Amplitude:', error)
    }
  }

  // Установка свойств пользователя
  public setUserProperties(properties: Record<string, any>): void {
    if (!isBrowser() || !this.isInitialized) {
      return
    }

    try {
      const identifyObj = new Identify()
      Object.entries(properties).forEach(([key, value]) => {
        identifyObj.set(key, value)
      })
      amplitude.identify(identifyObj)
    } catch (error) {
      console.error('Ошибка установки свойств пользователя в Amplitude:', error)
    }
  }

  // Трек просмотра страницы (для использования в useEffect или getInitialProps)
  public trackPageView(pagePath: string, pageTitle?: string): void {
    this.track('landing_page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }

  // Проверка инициализации
  public getIsInitialized(): boolean {
    return this.isInitialized
  }
}

// Экспорт экземпляра сервиса
export const amplitudeService = AmplitudeService.getInstance()
