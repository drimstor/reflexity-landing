import React, { useEffect, useState } from 'react'
import styles from './Planet.module.scss'
import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'

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
        loop={true}
        autoplay={true}
        width='100%'
        height='100%'
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
