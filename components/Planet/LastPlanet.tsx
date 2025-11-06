import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { memo, useEffect, useMemo, useState } from 'react'
import styles from './Planet.module.scss'

interface PlanetProps {
  screenNumber: string
  isPause?: boolean
}

const LastPlanet = ({ screenNumber, isPause }: PlanetProps) => {
  const [lastAnimantion, setLastAnimantion] = useState(false)
  const [transitionOn, setTransitionOn] = useState(false)

  useEffect(() => {
    if (screenNumber === '8') {
      setTimeout(() => setLastAnimantion(true), 1300)
    } else {
      setLastAnimantion(false)
    }

    if (!transitionOn) {
      setTimeout(() => setTransitionOn(true), 300)
    }
  }, [screenNumber, transitionOn])

  const containerClassName = useMemo(
    () =>
      clsx(
        styles.lastScreen,
        screenNumber === '8' && styles.lastScreenActive,
        lastAnimantion && styles.lastAnimantionActive,
        transitionOn && styles.transition
      ),
    [screenNumber, lastAnimantion, transitionOn]
  )

  return (
    <div className={styles.circleBox} id='lastPlanet'>
      <div className={containerClassName}>
        <LottieAnimation
          animationPath='/slow-spinner.json'
          className={styles.lottieAnimation}
          pause={isPause}
        />
      </div>
    </div>
  )
}

export default memo(LastPlanet)
