import React, { useEffect, useState } from 'react'
import styles from './Planet.module.scss'
import Image from 'next/image'
import mainCircle from '../../public/mainCircle.svg'
import clsx from 'clsx'

interface PlanetProps {
  screenNumber: string
}

const LastPlanet = ({ screenNumber }: PlanetProps) => {
  const [lastAnimantion, setLastAnimantion] = useState(false)

  useEffect(() => {
    if (screenNumber === '7') {
      setTimeout(() => setLastAnimantion(true), 1300)
    } else {
      setLastAnimantion(false)
    }
  }, [screenNumber])

  return (
    <div className={styles.circleBox}>
      <div
        className={clsx(
          styles.lastScreen,
          screenNumber === '7' && styles.lastScreenActive,
          lastAnimantion && styles.lastAnimantionActive
        )}
      >
        <Image src={mainCircle} alt='circle' />
        <div className={clsx(styles.shadow)} />
      </div>
    </div>
  )
}

export default LastPlanet
