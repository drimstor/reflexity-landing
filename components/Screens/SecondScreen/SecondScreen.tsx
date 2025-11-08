import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { centralPhrases, painElements } from './constants'
import styles from './SecondScreen.module.scss'

interface SecondScreenProps {
  screenNumber: string
  isNoAnimation: string[]
}

interface ElementPosition {
  x: number
  y: number
  angle: number
}

// Функция распределения элементов по периметру
const calculatePositions = (
  count: number,
  isMobile: boolean,
  containerWidth: number,
  containerHeight: number,
  headerHeight: number = 0
): ElementPosition[] => {
  const positions: ElementPosition[] = []

  if (isMobile) {
    // Для мобилки: распределение по вертикальным краям (слева/справа)
    const leftCount = Math.ceil(count / 2)
    const rightCount = count - leftCount
    const verticalSpacing = containerHeight / Math.max(leftCount, rightCount, 1)

    // Левая сторона
    for (let i = 0; i < leftCount; i++) {
      positions.push({
        x: -30, // Заезд на край экрана (отрицательное значение для выхода за границу)
        y: (i + 0.5) * verticalSpacing + containerHeight * 0.1, // Начинаем с 10% от верха
        angle: 0,
      })
    }

    // Правая сторона
    for (let i = 0; i < rightCount; i++) {
      positions.push({
        x: containerWidth + 30, // Заезд на край экрана
        y: (i + 0.5) * verticalSpacing + containerHeight * 0.1, // Начинаем с 10% от верха
        angle: 180,
      })
    }
  } else {
    // Для десктопа: равномерное распределение по овалу
    const centerX = containerWidth / 2
    // Центр по вертикали относительно области контента (учитывая хедер)
    // Элементы позиционируются относительно wrapper, который начинается после хедера
    const centerY = containerHeight / 2
    // Адаптивные радиусы для овала (больше по ширине, меньше по высоте)
    const baseRadiusX = containerWidth * 0.6 // Горизонтальный радиус (увеличен)
    const baseRadiusY = containerHeight * 0.3 // Вертикальный радиус (увеличен)
    const radiusX = Math.max(baseRadiusX, 400) // Минимальный горизонтальный радиус
    const radiusY = Math.max(baseRadiusY, 200) // Минимальный вертикальный радиус

    const angleStep = (2 * Math.PI) / count

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2 // Начинаем сверху
      // Формула для овала: разные радиусы для x и y
      const x = centerX + radiusX * Math.cos(angle)
      const y = centerY + radiusY * Math.sin(angle)

      positions.push({
        x,
        y,
        angle: (angle * 180) / Math.PI,
      })
    }
  }

  return positions
}

const SecondScreen = ({ screenNumber, isNoAnimation }: SecondScreenProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const noAnimation = isNoAnimation.includes('2')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Состояние для управления анимацией каждого элемента
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set())
  const [visiblePhrases, setVisiblePhrases] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [positions, setPositions] = useState<ElementPosition[]>([])

  // Вычисляем позиции элементов только на клиенте после монтирования
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') {
      return
    }

    const headerHeight = isMobile ? 72 : 88
    const containerWidth = isMobile
      ? window.innerWidth // На мобилке используем полную ширину экрана
      : 1100 // Максимальная ширина контейнера для десктопа
    // Высота контента = высота viewport минус хедер
    const containerHeight = window.innerHeight - headerHeight

    const calculatedPositions = calculatePositions(
      painElements.length,
      isMobile,
      containerWidth,
      containerHeight,
      headerHeight // Передаем высоту хедера для корректного позиционирования
    )

    setPositions(calculatedPositions)
  }, [mounted, isMobile])

  // Анимация для десктопа
  useEffect(() => {
    if (isMobile || noAnimation) return

    if (screenNumber === '1') {
      // Сбрасываем состояние
      setVisibleElements(new Set())
      setVisiblePhrases(new Set())

      // Создаем массив индексов и перемешиваем для рандомного порядка
      const indices = Array.from({ length: painElements.length }, (_, i) => i)
      // Перемешиваем массив (Fisher-Yates shuffle)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[indices[i], indices[j]] = [indices[j], indices[i]]
      }

      // Последовательно показываем элементы болей в рандомном порядке
      const initialDelay = 1000 // Задержка перед первым появлением (1 секунда)
      const delayBetweenPains = 600 // Интервал между появлениями болей (600ms)

      indices.forEach((index, orderIndex) => {
        setTimeout(() => {
          setVisibleElements((prev) => {
            const newSet = new Set(prev)
            newSet.add(index)
            return newSet
          })
        }, initialDelay + orderIndex * delayBetweenPains)
      })

      // После появления всех болей показываем центральные фразы
      const totalDelay = initialDelay + indices.length * delayBetweenPains
      const delayBeforePhrases = 800 // Задержка перед появлением первой фразы
      const delayBetweenPhrases = 2000 // Задержка между фразами (увеличена)

      setTimeout(() => {
        // Показываем первую фразу
        setVisiblePhrases((prev) => {
          const newSet = new Set(prev)
          newSet.add(0)
          return newSet
        })
        // Показываем вторую фразу через задержку
        setTimeout(() => {
          setVisiblePhrases((prev) => {
            const newSet = new Set(prev)
            newSet.add(1)
            return newSet
          })
        }, delayBetweenPhrases)
      }, totalDelay + delayBeforePhrases)
    } else {
      // Сбрасываем при смене экрана
      setVisibleElements(new Set())
      setVisiblePhrases(new Set())
    }
  }, [screenNumber, isMobile, noAnimation])

  // Для мобилки: показываем все сразу при появлении в viewport
  const shouldShowAll = isMobile && (inView || noAnimation)

  return (
    <div
      ref={ref}
      className={clsx(
        styles.contentBox,
        screenNumber === '1' && !isMobile && styles.active,
        noAnimation && styles.noAnimation,
        shouldShowAll && styles.mobileActive,
        visiblePhrases.size > 0 && styles.showCentralPhrases
      )}
    >
      <div className={styles.wrapper}>
        {/* Элементы болей */}
        {mounted &&
          positions.length > 0 &&
          painElements.map((element, index) => {
            const position = positions[index]
            const isVisible =
              isMobile || noAnimation
                ? shouldShowAll
                : visibleElements.has(index)

            if (!position) return null

            return (
              <div
                key={index}
                className={clsx(
                  styles.painElement,
                  styles[element.type],
                  isVisible && styles.visible
                )}
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                {element.content}
              </div>
            )
          })}

        {/* Центральные фразы */}
        {mounted && (
          <div className={styles.centralPhrases}>
            {centralPhrases.map((phrase, index) => {
              const isVisible =
                isMobile || noAnimation
                  ? shouldShowAll && index <= 1
                  : visiblePhrases.has(index)

              return (
                <div
                  key={index}
                  className={clsx(
                    styles.centralPhrase,
                    isVisible && styles.visible
                  )}
                >
                  {phrase.text}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SecondScreen
