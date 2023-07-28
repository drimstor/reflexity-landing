import React, { useEffect, useState } from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import { blockTextContent } from './constants'
import clsx from 'clsx'

interface SecondScreenProps {
  screenNumber: string
  isMobile: boolean
}

const SecondScreen = ({ screenNumber, isMobile }: SecondScreenProps) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (screenNumber === '1') {
      setIsActive(true)
    }
  }, [screenNumber])

  return (
    <div
      className={clsx(
        styles.contentBox,
        isActive && styles.active,
        screenNumber === 'start' && styles.mobileActive
      )}
    >
      <h2 className={clsx(screenNumber !== '1' && styles.hide)}>
        Без чарджбеков, холда и роллинга
      </h2>
      <div
        className={clsx(
          styles.blockBox,
          styles['screen' + screenNumber],
          screenNumber !== '1' && styles.hide
        )}
      >
        {blockTextContent.map((item, index) => (
          <div key={index} className={clsx(styles.blockItem)}>
            <div
              className={clsx(
                styles.icon,
                (screenNumber === 'start' || isActive) && styles.active
              )}
            >
              <Image src={item.icon} alt='icon' />
            </div>
            <span>{item.title}</span>
            <p>{item.text}</p>
          </div>
        ))}
        <div className={clsx(styles.verticalLine)} />
        <div className={clsx(styles.horizontalLine)} />
      </div>
    </div>
  )
}

export default SecondScreen
