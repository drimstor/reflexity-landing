import { ReactNode } from 'react'

/**
 * Функция для обработки текста и выделения слова "Reflexity"
 * @param text - текст для обработки
 * @param highlightClassName - класс для выделения
 * @returns обработанный текст с выделенным "Reflexity"
 */
export const highlightReflexity = (
  text: string,
  highlightClassName: string
): ReactNode => {
  const parts = text.split(/(Reflexity)/gi)
  return parts.map((part, index) => {
    if (part.toLowerCase() === 'reflexity') {
      return (
        <span key={index} className={highlightClassName}>
          {part}
        </span>
      )
    }
    return part
  })
}

