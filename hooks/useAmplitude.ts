import { useCallback } from 'react'
import { amplitudeService } from '../lib/services/amplitude/AmplitudeService'
import {
  EventName,
  EventProperties,
} from '../lib/services/amplitude/AmplitudeTypes'

// Хук для удобной работы с Amplitude
export const useAmplitude = () => {
  // Отправка события
  const track = useCallback(
    <T extends EventName>(
      eventName: T,
      eventProperties?: EventProperties<T>
    ) => {
      amplitudeService.track(eventName, eventProperties)
    },
    []
  )

  // Трек клика по кнопке
  const trackButtonClick = useCallback(
    (buttonText: string, buttonLocation: string, destination?: string) => {
      amplitudeService.track('landing_button_click', {
        button_text: buttonText,
        button_location: buttonLocation,
        destination,
      })
    },
    []
  )

  // Трек клика по ссылке
  const trackLinkClick = useCallback(
    (linkUrl: string, linkText: string, linkLocation: string) => {
      amplitudeService.track('landing_link_click', {
        link_url: linkUrl,
        link_text: linkText,
        link_location: linkLocation,
      })
    },
    []
  )

  // Трек отправки формы
  const trackFormSubmit = useCallback(
    (formName: string, formLocation: string) => {
      amplitudeService.track('landing_form_submit', {
        form_name: formName,
        form_location: formLocation,
      })
    },
    []
  )

  // Трек ошибки формы
  const trackFormError = useCallback(
    (formName: string, formLocation: string, errorMessage: string) => {
      amplitudeService.track('landing_form_error', {
        form_name: formName,
        form_location: formLocation,
        error_message: errorMessage,
      })
    },
    []
  )

  // Трек открытия/закрытия модалки
  const trackModalOpen = useCallback((modalName: string, trigger?: string) => {
    amplitudeService.track('landing_modal_open', {
      modal_name: modalName,
      trigger,
    })
  }, [])

  const trackModalClose = useCallback((modalName: string) => {
    amplitudeService.track('landing_modal_close', {
      modal_name: modalName,
    })
  }, [])

  // Трек скролла к секции
  const trackScrollToSection = useCallback(
    (sectionName: string, scrollDepth?: number) => {
      amplitudeService.track('landing_scroll_to_section', {
        section_name: sectionName,
        scroll_depth: scrollDepth,
      })
    },
    []
  )

  return {
    track,
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackFormError,
    trackModalOpen,
    trackModalClose,
    trackScrollToSection,
  }
}
