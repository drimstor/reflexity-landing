import React, { useEffect, useState } from 'react'
import styles from './Planet.module.scss'
import Image from 'next/image'
import mainCircle from '../../public/mainCircle.svg'
import mobileCircle from '../../public/mobilePlanet.svg'
import clsx from 'clsx'

interface PlanetProps {
  screenNumber: string
  isMobile: boolean
}

const Planet = ({ screenNumber, isMobile }: PlanetProps) => {
  const [content, setContent] = useState<any>(null)
  const [transitionOn, setTransitionOn] = useState(false)

  useEffect(() => {
    setContent(isMobile ? mobileCircle : mainCircle)
    setTimeout(() => setTransitionOn(true), 300)
  }, [])

  return (
    <div className={styles.circleBox}>
      <div
        className={clsx(
          styles.shadowBox,
          styles['screen' + screenNumber],
          screenNumber.includes('2_') && styles.noShadow,
          transitionOn && styles.transition
        )}
      >
        {content && <Image src={content} alt='circle' />}
        <div className={clsx(styles.shadow)} />
      </div>
    </div>
  )
}

export default Planet
