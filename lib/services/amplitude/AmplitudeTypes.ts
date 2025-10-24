// Типы событий для Amplitude

// Базовые события лендинга
export type EventName =
  | 'landing_page_view'
  | 'landing_button_click'
  | 'landing_form_submit'
  | 'landing_form_error'
  | 'landing_modal_open'
  | 'landing_modal_close'
  | 'landing_link_click'
  | 'landing_scroll_to_section'
  | 'landing_contact_form_submit'
  | 'landing_payment_initiated'
  | 'landing_payment_success'
  | 'landing_payment_error'

// Свойства для разных типов событий
export type EventProperties<T extends EventName> = T extends 'landing_page_view'
  ? {
      page_path: string
      page_title?: string
    }
  : T extends 'landing_button_click'
  ? {
      button_text: string
      button_location: string
      destination?: string
    }
  : T extends 'landing_form_submit' | 'landing_form_error'
  ? {
      form_name: string
      form_location: string
      error_message?: string
    }
  : T extends 'landing_modal_open' | 'landing_modal_close'
  ? {
      modal_name: string
      trigger?: string
    }
  : T extends 'landing_link_click'
  ? {
      link_url: string
      link_text: string
      link_location: string
    }
  : T extends 'landing_scroll_to_section'
  ? {
      section_name: string
      scroll_depth?: number
    }
  : T extends 'landing_contact_form_submit'
  ? {
      form_type: string
      has_recaptcha: boolean
    }
  : T extends
      | 'landing_payment_initiated'
      | 'landing_payment_success'
      | 'landing_payment_error'
  ? {
      payment_method?: string
      amount?: number
      currency?: string
      error_message?: string
    }
  : Record<string, any>
