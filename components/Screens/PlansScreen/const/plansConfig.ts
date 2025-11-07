// Конфигурация планов подписки

export type BillingPeriod = 'monthly' | 'yearly'

export interface PlanFeature {
  key: string
  label: string
  freeValue: string
  proValue: string
  isBoolean?: boolean // true для фич с галочкой/крестиком
}

export interface PlanPrice {
  monthly: number
  yearly?: number
  yearlyOriginal?: number // оригинальная цена для годового плана
  discount?: number // процент скидки
}

export interface PlanConfig {
  id: 'free' | 'pro' | 'yearlyPro'
  title: string
  subtitle: string
  description: string
  price: PlanPrice
  features: PlanFeature[]
  buttonText: string
  isPopular?: boolean
  freeTrialText?: string
}

// Конфигурация фич
export const PLAN_FEATURES: PlanFeature[] = [
  {
    key: 'journals',
    label: 'Дневники',
    freeValue: '2 всего, 2 записи в день',
    proValue: '∞',
    isBoolean: false,
  },
  {
    key: 'goals',
    label: 'Цели',
    freeValue: '3 цели, 3 генерации в день',
    proValue: '∞',
    isBoolean: false,
  },
  {
    key: 'chats',
    label: 'Чаты',
    freeValue: '2 чата, 10 сообщений в день',
    proValue: '∞',
    isBoolean: false,
  },
  {
    key: 'summaries',
    label: 'Саммари',
    freeValue: '1 в день',
    proValue: '∞',
    isBoolean: false,
  },
  {
    key: 'tests',
    label: 'Тесты',
    freeValue: '1 в день',
    proValue: '∞',
    isBoolean: false,
  },
  {
    key: 'assistant',
    label: 'Ассистент',
    freeValue: 'базовый',
    proValue: 'AI+',
    isBoolean: false,
  },
  {
    key: 'attachments',
    label: 'Вложения',
    freeValue: '✗',
    proValue: '✓',
    isBoolean: true,
  },
  {
    key: 'voiceInput',
    label: 'Голосовой ввод',
    freeValue: '✗',
    proValue: '✓',
    isBoolean: true,
  },
]

// Конфигурация планов
export const PLANS_CONFIG: Record<'free' | 'pro' | 'yearlyPro', PlanConfig> = {
  free: {
    id: 'free',
    title: 'Basic Plan',
    subtitle: 'Free Forever',
    description: 'Базовые инструменты для начала:',
    price: {
      monthly: 0,
    },
    features: PLAN_FEATURES,
    buttonText: 'Get Started',
  },
  pro: {
    id: 'pro',
    title: 'Pro Plan',
    subtitle: '',
    description: 'Откройте безграничные возможности:',
    price: {
      monthly: 9.99,
    },
    features: PLAN_FEATURES,
    buttonText: 'Start Free Trial',
    isPopular: true,
    freeTrialText: '7-дневный бесплатный период',
  },
  yearlyPro: {
    id: 'yearlyPro',
    title: 'Yearly Pro Plan',
    subtitle: '',
    description: 'Выгода 30% при оплате за 1 год:',
    price: {
      monthly: 6.99,
      yearly: 83.99,
      yearlyOriginal: 120,
      discount: 30,
    },
    features: PLAN_FEATURES,
    buttonText: 'Start Free Trial',
    freeTrialText: '7-дневный бесплатный период',
  },
}
