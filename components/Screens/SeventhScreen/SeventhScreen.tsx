import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import mobileCircle from '../../../public/mobilePlanet.svg'
import { cardsContent, contentType, mobileCardsContent } from './constants'
import styles from './SeventhScreen.module.scss'

interface SeventhScreenProps {
  screenNumber: string
  isMobile: boolean
  isNoAnimation: string[]
}

const SeventhScreen = ({
  screenNumber,
  isMobile,
  isNoAnimation,
}: SeventhScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [content, setContent] = useState<contentType>([])

  useEffect(() => {
    setContent(isMobile ? mobileCardsContent : cardsContent)
  }, [isMobile])

  return (
    <div
      ref={ref}
      id='howItWork'
      className={clsx(
        styles.contentBox,
        screenNumber === '6' && styles.active,
        inView && styles.mobileActive,
        isNoAnimation.includes('6') && styles.isNoAnimation
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <h2>Почему Reflexity?</h2>
      <div
        className={clsx(styles.cardsBox, screenNumber !== '6' && styles.hide)}
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
