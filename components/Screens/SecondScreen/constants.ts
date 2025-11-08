export type PainElementType = 'text' | 'emoji'

export interface PainElement {
  type: PainElementType
  content: string
}

export interface CentralPhrase {
  text: string
}

// Боли пользователей: текст и эмодзи как отдельные элементы
export const painElements: PainElement[] = [
  { type: 'text', content: 'Прокрастинация 🫩' },
  { type: 'text', content: 'Дум-скроллинг 📱' },
  { type: 'text', content: 'Не можешь понять чем заняться? 🤔' },
  { type: 'text', content: 'Тревожность 😰' },
  { type: 'text', content: 'Стресс 🥲' },
  { type: 'text', content: 'Не можешь найти свой талант? 🤔' },
  { type: 'text', content: 'Чувство пустоты 😶' },
  { type: 'text', content: 'Выгорание 🔥' },
]

// Центральные фразы
export const centralPhrases: CentralPhrase[] = [
  { text: 'У всех этих проблем — один корень.' },
  { text: 'Reflexity поможет обрести ясность 😌' },
]
