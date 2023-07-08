import React, { useEffect, useState } from 'react'
import styles from './ThirdScreen.module.scss'
import circle from '../../../public/icons/circle-vector.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import clsx from 'clsx'
import { animateFramesConfig } from './constants'

interface ThirdScreenProps {
  screenNumber: string
  isScrollLock: boolean
}

const ThirdScreen = ({ screenNumber, isScrollLock }: ThirdScreenProps) => {
  const [frameChanged, setFrameChanged] = useState(false)
  const [animateItem, setAnimateItem] = useState(animateFramesConfig['2_1'])

  useEffect(() => {
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
  }, [screenNumber])

  return (
    <div
      className={clsx(
        styles.contentBox,
        screenNumber.includes('2_') && styles.active
      )}
    >
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
            <Button variant='contained' size='large'>
              Присоединиться
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ThirdScreen
