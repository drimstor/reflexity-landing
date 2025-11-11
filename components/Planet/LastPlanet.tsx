import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { memo, useMemo } from 'react'
import styles from './Planet.module.scss'

interface PlanetProps {
  viewedScreens: Set<string>
  screenNumber: string
}

const LastPlanet = ({ viewedScreens, screenNumber }: PlanetProps) => {
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
      pause={screenNumber !== '9'}
    />
  )
}

export default memo(LastPlanet)
