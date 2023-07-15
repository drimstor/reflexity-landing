import React from 'react'
import styles from './SeventhScreen.module.scss'
import clsx from 'clsx'
import { cardsContent } from './constants'

interface SeventhScreenProps {
  screenNumber: string
}

const SeventhScreen = ({ screenNumber }: SeventhScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '6' && styles.active)}
    >
      <h2>Как это работает</h2>
      <div className={styles.cardsBox}>
        {cardsContent.map((card, index) => (
          <div key={index} className={styles.cardBox}>
            <div className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
            <div className={styles.number}>{card.index}</div>
          </div>
        ))}
        <div className={clsx(styles.line, styles.active)} />
      </div>
    </div>
  )
}

export default SeventhScreen
