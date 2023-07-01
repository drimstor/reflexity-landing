import React from 'react'
import styles from './Planet.module.scss'
import Image from 'next/image'
import mainCircle from '../../public/mainCircle.svg'
import clsx from 'clsx'

interface PlanetProps {
  screenNumber: number
}

const Planet = ({ screenNumber }: PlanetProps) => {
  return (
    <div className={styles.circleBox}>
      <div
        className={clsx(styles.shadowBox, screenNumber === 1 && styles.active)}
      >
        <Image
          className={clsx(styles.circleImg)}
          src={mainCircle}
          alt='circle'
        />
        <div className={clsx(styles.shadow)} />
      </div>
    </div>
  )
}

export default Planet
