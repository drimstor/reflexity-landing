import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { useEffect, useState } from 'react'
import styles from './Planet.module.scss'

interface PlanetProps {
  screenNumber: string
}

const LastPlanet = ({ screenNumber }: PlanetProps) => {
  const [lastAnimantion, setLastAnimantion] = useState(false)
  const [transitionOn, setTransitionOn] = useState(false)

  useEffect(() => {
    if (screenNumber === '7') {
      setTimeout(() => setLastAnimantion(true), 1300)
    } else {
      setLastAnimantion(false)
    }

    if (!transitionOn) {
      setTimeout(() => setTransitionOn(true), 300)
    }
  }, [screenNumber])

  if (Number(screenNumber) < 6) {
    return null
  }

  return (
    <div className={styles.circleBox}>
      <div
        className={clsx(
          styles.lastScreen,
          screenNumber === '7' && styles.lastScreenActive,
          lastAnimantion && styles.lastAnimantionActive,
          transitionOn && styles.transition
        )}
      >
        <LottieAnimation
          animationPath='/slow-spinner.json'
          className={styles.lottieAnimation}
        />
      </div>
    </div>
  )
}

export default LastPlanet
