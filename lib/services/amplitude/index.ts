// Экспорт всех частей Amplitude сервиса
export { AmplitudeService, amplitudeService } from './AmplitudeService'
export type { EventName, EventProperties } from './AmplitudeTypes'
export {
  getRuntimeInfo,
  isAmplitudeConfigured,
  isBrowser,
} from './AmplitudeUtils'
