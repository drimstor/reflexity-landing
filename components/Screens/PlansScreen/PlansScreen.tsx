import clsx from 'clsx'
import Image from 'next/image'
import mobileCircle from 'public/mobilePlanet.svg'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { LottieAnimation } from '../../UI-kit/LottieAnimation/LottieAnimation'
import { PLANS_CONFIG } from './const/plansConfig'
import styles from './PlansScreen.module.scss'
import PlanCard from './ui/PlanCard/PlanCard'

interface PlansScreenProps {
  screenNumber: string
}

const PlansScreen = ({ screenNumber }: PlansScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [currentSlide, setCurrentSlide] = useState(0)
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

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex)
  }

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

        <div className={styles.cardsContainer}>
          <div className={styles.lottieContainer}>
            <LottieAnimation animationPath='/slow-spinner.json' />
          </div>

          {isMobile ? (
            <Swiper
              onSlideChange={handleSlideChange}
              modules={[]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              className={styles.swiper}
              allowTouchMove={true}
              touchEventsTarget='container'
              touchStartPreventDefault={false}
              touchMoveStopPropagation={false}
              preventInteractionOnTransition={true}
              resistance={true}
              resistanceRatio={0.85}
              threshold={10}
              longSwipesRatio={0.5}
              followFinger={true}
              direction='horizontal'
              simulateTouch={true}
              allowSlideNext={true}
              allowSlidePrev={true}
            >
              <SwiperSlide>
                <PlanCard
                  plan={PLANS_CONFIG.free}
                  billingPeriod='monthly'
                  onButtonClick={handleButtonClick}
                />
              </SwiperSlide>
              <SwiperSlide>
                <PlanCard
                  plan={PLANS_CONFIG.pro}
                  billingPeriod='monthly'
                  onButtonClick={handleButtonClick}
                />
              </SwiperSlide>
              <SwiperSlide>
                <PlanCard
                  plan={PLANS_CONFIG.unlimited}
                  billingPeriod='yearly'
                  onButtonClick={handleButtonClick}
                />
              </SwiperSlide>
            </Swiper>
          ) : (
            <>
              <PlanCard
                plan={PLANS_CONFIG.free}
                billingPeriod='monthly'
                onButtonClick={handleButtonClick}
              />
              <PlanCard
                plan={PLANS_CONFIG.pro}
                billingPeriod='monthly'
                onButtonClick={handleButtonClick}
              />
              <PlanCard
                plan={PLANS_CONFIG.unlimited}
                billingPeriod='yearly'
                onButtonClick={handleButtonClick}
              />
            </>
          )}
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
