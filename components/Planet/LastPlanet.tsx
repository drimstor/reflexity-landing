import React, { useEffect, useState } from 'react'
import styles from './Planet.module.scss'
import Image from 'next/image'
import mainCircle from '../../public/mainCircle.svg'
import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'

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
        <Image src={mainCircle} alt='circle' />
        <LottieAnimation
          animationPath='/slow-spinner.json'
          loop={true}
          autoplay={true}
          width='100%'
          height='100%'
          className={styles.lottieAnimation}
        />
        <div className={clsx(styles.shadow)} />
      </div>
    </div>
  )
}

export default LastPlanet
