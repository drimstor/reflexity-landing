import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { memo, useMemo } from 'react'
import styles from './Planet.module.scss'

interface PlanetProps {
  viewedScreens: Set<string>
}

const LastPlanet = ({ viewedScreens }: PlanetProps) => {
  const isLastScreen = useMemo(() => viewedScreens.has('9'), [viewedScreens])

  const containerClassName = useMemo(
    () =>
      clsx(
        styles.lastScreenLottieAnimation,
        isLastScreen && styles.lastScreenActive
      ),
    [isLastScreen]
  )

  return (
    <LottieAnimation
      animationPath='/slow-spinner.json'
      className={containerClassName}
      pause={!isLastScreen}
    />
  )
}

export default memo(LastPlanet)
