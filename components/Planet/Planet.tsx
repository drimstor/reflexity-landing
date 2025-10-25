import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { useEffect, useState } from 'react'
import styles from './Planet.module.scss'

interface PlanetProps {
  screenNumber: string
}

const Planet = ({ screenNumber }: PlanetProps) => {
  const [transitionOn, setTransitionOn] = useState(false)

  useEffect(() => {
    setTimeout(() => setTransitionOn(true), 300)
  }, [])

  return (
    <div className={styles.circleBox}>
      <LottieAnimation
        animationPath='/slow-spinner.json'
        className={clsx(
          styles.lottieAnimation,
          styles['screen' + screenNumber],
          transitionOn && styles.transition
        )}
      />
    </div>
  )
}

export default Planet
