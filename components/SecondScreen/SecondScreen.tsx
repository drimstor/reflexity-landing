import React from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import mainCircle from '../../public/mainCircle.svg'
import clsx from 'clsx'

interface SecondScreenProps {
  screenNumber: number
}

const SecondScreen = ({ screenNumber }: SecondScreenProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circleBox}>
        <Image
          className={clsx(
            styles.circleImg,
            screenNumber === 1 && styles.active
          )}
          src={mainCircle}
          alt='circle'
        />
      </div>
    </div>
  )
}

export default SecondScreen
