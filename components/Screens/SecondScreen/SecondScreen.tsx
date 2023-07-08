import React, { useEffect, useState } from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import { blockTextContent } from './constants'
import clsx from 'clsx'

interface SecondScreenProps {
  screenNumber: string
}

const SecondScreen = ({ screenNumber }: SecondScreenProps) => {
  const [animateBlock, setAnimateBlock] = useState<number[]>([])

  useEffect(() => {
    if (screenNumber === '1') {
      setTimeout(() => {
        blockTextContent.forEach((item, index) => {
          addAnimateBlock(index)
        })
      }, 1000)
    } else {
      setAnimateBlock([])
    }
  }, [screenNumber])

  const addAnimateBlock = (number: number) => {
    setTimeout(() => {
      setAnimateBlock((prev) => [...prev, number])
    }, 1000 * number)
  }

  return (
    <div
      className={clsx(
        styles.contentBox,
        (screenNumber.includes('1_') || screenNumber === '1') && styles.active
      )}
    >
      <h2>Без чарджбеков, холда и роллинга</h2>
      <div className={clsx(styles.blockBox, styles['screen' + screenNumber])}>
        {blockTextContent.map((item, index) => (
          <div
            key={index}
            className={clsx(
              styles.blockItem,
              (animateBlock.includes(index) ||
                screenNumber === `1_${index + 1}`) &&
                styles.active
            )}
          >
            <div
              className={clsx(
                styles.icon,
                (animateBlock.includes(3) ||
                  screenNumber === `1_${index + 1}`) &&
                  styles.active
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
