import React, { useEffect, useState } from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import { blockTextContent } from './constants'
import clsx from 'clsx'

interface SecondScreenProps {
  isActiveScreen: boolean
}

const SecondScreen = ({ isActiveScreen }: SecondScreenProps) => {
  const [animateBlock, setAnimateBlock] = useState<number[]>([])

  useEffect(() => {
    if (isActiveScreen) {
      const timer = setTimeout(() => {
        blockTextContent.forEach((item, index) => {
          addAnimateBlock(index)
        })
        clearTimeout(timer)
      }, 1000)
    } else {
      setAnimateBlock([])
    }
  }, [isActiveScreen])

  const addAnimateBlock = (number: number) => {
    const timer = setTimeout(() => {
      setAnimateBlock((prev) => [...prev, number])
      clearTimeout(timer)
    }, 1000 * number)
  }

  return (
    <div className={clsx(styles.contentBox, isActiveScreen && styles.active)}>
      <h2>Без чарджбеков, холда и роллинга</h2>
      <div className={styles.blockBox}>
        {blockTextContent.map((item, index) => (
          <div
            key={index}
            className={clsx(
              styles.blockItem,
              animateBlock.includes(index) && styles.active
            )}
          >
            <div
              className={clsx(
                styles.icon,
                animateBlock.includes(3) && styles.active
              )}
            >
              <Image src={item.icon} alt='icon' />
            </div>
            <span>{item.title}</span>
            <p>{item.text}</p>
          </div>
        ))}
        <div
          className={clsx(
            styles.verticalLine,
            animateBlock.includes(1) && styles.active
          )}
        />
        <div
          className={clsx(
            styles.horizontalLine,
            animateBlock.includes(2) && styles.active
          )}
        />
      </div>
    </div>
  )
}

export default SecondScreen
