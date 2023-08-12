import React, { useEffect, useState } from 'react'
import styles from './ThirdScreen.module.scss'
import circle from '../../../public/icons/circle-vector.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import clsx from 'clsx'
import { animateFramesConfig, thirdScreenValues } from './constants'
import { useInView } from 'react-intersection-observer'
import mobileCircle from '../../../public/mobilePlanet.svg'

interface ThirdScreenProps {
  screenNumber: string
  isMobile: boolean
  onScrollToScreenCallback: (screen: string) => void
}

const ThirdScreen = ({
  screenNumber,
  isMobile,
  onScrollToScreenCallback,
}: ThirdScreenProps) => {
  const [frameChanged, setFrameChanged] = useState(false)
  const [animateItem, setAnimateItem] = useState(animateFramesConfig['2_1'])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!isMobile) {
      setFrameChanged(true)
      const timer = setTimeout(() => setFrameChanged(false), 1000)
      const timer2 = setTimeout(
        () => setAnimateItem(animateFramesConfig[screenNumber]),
        500
      )

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    }
  }, [screenNumber])

  return (
    <div
      ref={ref}
      id='whyAreWe'
      className={clsx(
        styles.contentBox,
        screenNumber.includes('2_') && styles.active,
        inView && styles.mobileActive
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <h2>Почему мы</h2>
      {animateItem && (
        <div
          className={clsx(
            styles.textBox,
            frameChanged && styles.hide,
            animateItem.reverse && styles.reverse,
            styles['screen' + screenNumber]
          )}
        >
          <h3>{animateItem.title}</h3>
          <div className={styles.circle}>
            <Image src={circle} alt='circle' />
          </div>
          <ul>
            <li>{animateItem.text1}</li>
            <li>{animateItem.text2}</li>
            {animateItem.text3 && <li>{animateItem.text3}</li>}
          </ul>
          {animateItem.button && (
            <Button
              variant='contained'
              size='large'
              onClick={() => onScrollToScreenCallback('7')}
            >
              Присоединиться
            </Button>
          )}
        </div>
      )}

      <div className={clsx(styles.mobileBox)}>
        {thirdScreenValues.map((item, index) => (
          <div className={styles.mobileItem} key={index}>
            <span>{item.title}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThirdScreen
