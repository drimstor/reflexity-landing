import React from 'react'
import styles from './SeventhScreen.module.scss'
import clsx from 'clsx'
import { cardsContent, mobileCardsContent } from './constants'
import useMediaQuery from 'hooks/useMediaQuery'
import { useInView } from 'react-intersection-observer'

interface SeventhScreenProps {
  screenNumber: string
  isMobile: boolean
}

const SeventhScreen = ({ screenNumber, isMobile }: SeventhScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  const content = isMobile ? mobileCardsContent : cardsContent
  return (
    <div
      ref={ref}
      className={clsx(
        styles.contentBox,
        (screenNumber === '6' || inView) && styles.active
      )}
    >
      <h2 className={clsx(!isMobile && screenNumber !== '6' && styles.hide)}>
        Как это работает
      </h2>
      <div
        className={clsx(
          styles.cardsBox,
          !isMobile && screenNumber !== '6' && styles.hide
        )}
      >
        {content.map((card, index) => (
          <div key={index} className={styles.cardBox}>
            <div className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
            <div className={styles.number}>{card.index}</div>
          </div>
        ))}
        <div className={clsx(styles.line, styles.active)} />
        <div className={clsx(styles.mobileLine)} />
      </div>
    </div>
  )
}

export default SeventhScreen
