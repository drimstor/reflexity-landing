import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { centralPhrases, painElements } from './constants'
import styles from './SecondScreen.module.scss'

interface SecondScreenProps {
  screenNumber: string
  isNoAnimation: string[]
  viewedScreens: Set<string>
}

interface ElementPosition {
  x: number
  y: number
}

// Функция распределения элементов по периметру
const calculatePositions = (
  count: number,
  isMobile: boolean,
  containerWidth: number,
  containerHeight: number
): ElementPosition[] => {
  if (isMobile) {
    const leftCount = Math.ceil(count / 2)
    const rightCount = count - leftCount
    const verticalSpacing = containerHeight / Math.max(leftCount, rightCount, 1)
    const positions: ElementPosition[] = []

    for (let i = 0; i < leftCount; i++) {
      positions.push({
        x: -30,
        y: (i + 0.5) * verticalSpacing + containerHeight * 0.1,
      })
    }

    for (let i = 0; i < rightCount; i++) {
      positions.push({
        x: containerWidth + 30,
        y: (i + 0.5) * verticalSpacing + containerHeight * 0.1,
      })
    }

    return positions
  }

  // Десктоп: распределение по овалу с небольшим случайным смещением
  const centerX = containerWidth / 2
  const centerY = containerHeight / 2
  const radiusX = Math.max(containerWidth * 0.6, 400)
  const radiusY = Math.max(containerHeight * 0.3, 200)
  const angleStep = (2 * Math.PI) / count
  const positions: ElementPosition[] = []

  // Параметры для хаотичности (можно настроить)
  const radialChaos = 0.15 // Смещение по радиусу (15% от радиуса)
  const angleChaos = 0.2 // Смещение по углу (20% от шага угла)

  for (let i = 0; i < count; i++) {
    const baseAngle = i * angleStep - Math.PI / 2

    // Добавляем небольшое случайное смещение угла
    const angleOffset = (Math.random() - 0.9) * angleStep * angleChaos
    const angle = baseAngle + angleOffset

    // Добавляем небольшое случайное смещение радиуса
    const radialOffsetX = (Math.random() - 0.3) * radiusX * radialChaos
    const radialOffsetY = (Math.random() - 0.3) * radiusY * radialChaos

    positions.push({
      x: centerX + radiusX * Math.cos(angle) + radialOffsetX,
      y: centerY + radiusY * Math.sin(angle) + radialOffsetY,
    })
  }

  return positions
}

const SecondScreen = ({
  screenNumber,
  isNoAnimation,
  viewedScreens,
}: SecondScreenProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const noAnimation = isNoAnimation.includes('1')
  const isViewed = useMemo(() => viewedScreens.has('1'), [viewedScreens])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [mounted, setMounted] = useState(false)
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const [phrasesShown, setPhrasesShown] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [positions, setPositions] = useState<ElementPosition[]>([])

  // Вычисляем позиции элементов только на клиенте
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return

    const headerHeight = isMobile ? 72 : 88
    const containerWidth = isMobile ? window.innerWidth : 1100
    const containerHeight = window.innerHeight - headerHeight
    const calculatedPositions = calculatePositions(
      painElements.length,
      isMobile,
      containerWidth,
      containerHeight
    )
    setPositions(calculatedPositions)
  }, [isMobile])

  // Анимация появления элементов
  useEffect(() => {
    if (!isViewed) {
      setVisibleIndices(new Set())
      setPhrasesShown(false)
      setAnimationComplete(false)
      return
    }

    if (animationComplete) {
      setVisibleIndices(
        new Set(Array.from({ length: painElements.length }, (_, i) => i))
      )
      setPhrasesShown(true)
      return
    }

    // Мобилка или без анимации - показываем все сразу
    if (isMobile || noAnimation) {
      setVisibleIndices(
        new Set(Array.from({ length: painElements.length }, (_, i) => i))
      )
      setPhrasesShown(true)
      setAnimationComplete(true)
      return
    }

    // Десктоп анимация - только когда экран активен
    if (screenNumber !== '1') return

    const indices = Array.from({ length: painElements.length }, (_, i) => i)
    // Перемешиваем массив
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }

    // Показываем элементы болей
    const initialDelay = 0 // Убрана задержка для мгновенного старта
    const delayBetweenPains = 600

    indices.forEach((index, orderIndex) => {
      setTimeout(() => {
        setVisibleIndices((prev) => {
          const newSet = new Set(prev)
          newSet.add(index)
          return newSet
        })
      }, initialDelay + orderIndex * delayBetweenPains)
    })

    // Показываем фразы после всех болей
    const totalDelay = initialDelay + indices.length * delayBetweenPains
    const delayBeforePhrases = 800
    const delayBetweenPhrases = 2000

    setTimeout(() => {
      setPhrasesShown(true)
      setTimeout(() => {
        setAnimationComplete(true)
      }, delayBetweenPhrases)
    }, totalDelay + delayBeforePhrases)
  }, [screenNumber, isMobile, noAnimation, isViewed, animationComplete])

  const shouldShowAll = isMobile && (inView || noAnimation || isViewed)
  const allElementsVisible =
    isMobile ||
    noAnimation ||
    animationComplete ||
    visibleIndices.size === painElements.length

  return (
    <div
      ref={ref}
      className={clsx(
        styles.contentBox,
        isViewed && styles.active,
        noAnimation && styles.noAnimation,
        shouldShowAll && styles.mobileActive,
        phrasesShown && styles.showCentralPhrases
      )}
    >
      <div className={styles.wrapper} suppressHydrationWarning>
        {painElements.map((element, index) => {
          const position = positions[index]
          if (!mounted || !position) return null

          const isVisible =
            isViewed && (allElementsVisible || visibleIndices.has(index))

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

        <div className={styles.centralPhrases} suppressHydrationWarning>
          {centralPhrases.map((phrase, index) => {
            if (!mounted) return null

            const isVisible =
              isViewed &&
              (isMobile || noAnimation ? shouldShowAll : phrasesShown)

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
      </div>
    </div>
  )
}

export default SecondScreen
