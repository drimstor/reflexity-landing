import React, { useEffect, useState } from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import { blockTextContent } from './constants'
import clsx from 'clsx'

interface SecondScreenProps {
  screenNumber: string
}

const SecondScreen = ({ screenNumber }: SecondScreenProps) => {
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
          <div key={index} className={clsx(styles.blockItem)}>
            <div
              className={clsx(
                styles.icon,
                (screenNumber.includes('1_') || screenNumber === '1') &&
                  styles.active
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
