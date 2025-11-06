import clsx from 'clsx'
import Image from 'next/image'
import mobileCircle from 'public/mobilePlanet.svg'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { LottieAnimation } from '../../UI-kit/LottieAnimation/LottieAnimation'
import { PLANS_CONFIG } from './const/plansConfig'
import styles from './PlansScreen.module.scss'
import PlanCard from './ui/PlanCard/PlanCard'

interface PlansScreenProps {
  screenNumber: string
  onScrollToScreenCallback?: (screen: string) => void
}

const PlansScreen = ({
  screenNumber,
  onScrollToScreenCallback,
}: PlansScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleButtonClick = () => {
    if (isMobile) {
      // На мобильных устройствах скроллим до конца страницы
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    } else {
      // На десктопе симулируем скролл вниз через событие wheel
      const carousel = document.getElementById('carousel')
      if (carousel) {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: 100,
          bubbles: true,
          cancelable: true,
        })
        carousel.dispatchEvent(wheelEvent)
      }
    }
  }

  const handleScroll = () => {
    if (cardsContainerRef.current && cardRefs.current.length > 0) {
      const container = cardsContainerRef.current
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      // Находим карточку, которая ближе всего к центру контейнера
      let closestIndex = 0
      let minDistance = Infinity

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const distance = Math.abs(containerCenter - cardCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestIndex = index
          }
        }
      })

      setCurrentSlide(closestIndex)
    }
  }

  // Инициализация при монтировании и при изменении inView
  useEffect(() => {
    // Небольшая задержка для того, чтобы DOM успел отрендериться
    const timer = setTimeout(() => {
      if (cardsContainerRef.current) {
        // Устанавливаем начальную позицию на первую карточку
        cardsContainerRef.current.scrollLeft = 0
        setCurrentSlide(0)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [inView])

  // Дополнительная проверка при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (cardsContainerRef.current) {
        // При изменении размера окна сбрасываем позицию на первую карточку
        cardsContainerRef.current.scrollLeft = 0
        setCurrentSlide(0)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      id='plans'
      ref={ref}
      className={clsx(
        styles.contentBox,
        screenNumber === '7' && styles.active,
        inView && styles.mobileActive
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Выберите план</h2>
          <p className={styles.description}>
            Начните бесплатно и откройте мощные возможности ИИ, когда будете
            готовы.
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className={styles.cardsContainer}
          onScroll={handleScroll}
        >
          <div className={styles.lottieContainer}>
            <LottieAnimation animationPath='/slow-spinner.json' />
          </div>

          <div
            ref={(el) => {
              cardRefs.current[0] = el
            }}
          >
            <PlanCard
              plan={PLANS_CONFIG.free}
              billingPeriod='monthly'
              onButtonClick={handleButtonClick}
            />
          </div>
          <div
            ref={(el) => {
              cardRefs.current[1] = el
            }}
          >
            <PlanCard
              plan={PLANS_CONFIG.pro}
              billingPeriod='monthly'
              onButtonClick={handleButtonClick}
            />
          </div>
          <div
            ref={(el) => {
              cardRefs.current[2] = el
            }}
          >
            <PlanCard
              plan={PLANS_CONFIG.unlimited}
              billingPeriod='yearly'
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>

        <div className={styles.indicators}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={clsx(
                styles.indicator,
                currentSlide === index && styles.indicatorActive
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlansScreen
