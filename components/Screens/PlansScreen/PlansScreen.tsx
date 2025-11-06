import clsx from 'clsx'
import Image from 'next/image'
import mobileCircle from 'public/mobilePlanet.svg'
import { useInView } from 'react-intersection-observer'
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

  const handleButtonClick = () => {
    if (onScrollToScreenCallback) {
      onScrollToScreenCallback('8')
    }
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
        </div>
      </div>
    </div>
  )
}

export default PlansScreen
