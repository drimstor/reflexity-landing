import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { memo, useEffect, useMemo, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import styles from './Planet.module.scss'

interface PlanetProps {
  screenNumber: string
  isPause?: boolean
}

const Planet = ({ screenNumber, isPause }: PlanetProps) => {
  const [transitionOn, setTransitionOn] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setTimeout(() => setTransitionOn(true), 300)
  }, [])

  const animationClassName = useMemo(
    () =>
      clsx(
        styles.lottieAnimation,
        styles['screen' + screenNumber],
        transitionOn && styles.transition
      ),
    [screenNumber, transitionOn]
  )

  return (
    <div className={styles.circleBox}>
      <div className={animationClassName}>
        <LottieAnimation
          animationPath='/slow-spinner.json'
          pause={isPause}
          // disableAnimationSpeed
        />
      </div>
    </div>
  )
}

export default memo(Planet)
