import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../../hooks/useMediaQuery'
import mobileCircle from '../../../public/mobilePlanet.svg'
import { cardsContent, contentType, mobileCardsContent } from './constants'
import styles from './SeventhScreen.module.scss'

interface SeventhScreenProps {
  isNoAnimation: string[]
  viewedScreens: Set<string>
}

const SeventhScreen = ({
  isNoAnimation,
  viewedScreens,
}: SeventhScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [content, setContent] = useState<contentType>([])
  const isViewed = useMemo(() => viewedScreens.has('7'), [viewedScreens])
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setContent(isMobile ? mobileCardsContent : cardsContent)
  }, [isMobile])

  return (
    <div
      ref={ref}
      id='howItWork'
      className={clsx(
        styles.contentBox,
        isViewed && styles.active,
        inView && styles.mobileActive,
        isNoAnimation.includes('7') && styles.isNoAnimation
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <h2>Почему Reflexity?</h2>
      <div className={styles.cardsBox}>
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
