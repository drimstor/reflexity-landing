import React, { useEffect, useState } from 'react'
import styles from './SecondScreen.module.scss'
import Image from 'next/image'
import { blockTextContent } from './constants'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'

interface SecondScreenProps {
  screenNumber: string
}

const SecondScreen = ({ screenNumber }: SecondScreenProps) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (screenNumber === '1') {
      setIsActive(true)
    }
  }, [screenNumber])

  const [ref0, inView0] = useInView({ triggerOnce: true, threshold: 0.5 })
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.5 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.5 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.5 })

  const viewData = [
    { ref: ref0, view: inView0 },
    { ref: ref1, view: inView1 },
    { ref: ref2, view: inView2 },
    { ref: ref3, view: inView3 },
  ]

  return (
    <div
      className={clsx(
        styles.contentBox,
        isActive && styles.active,
        screenNumber === 'start' && styles.mobileActive
      )}
    >
      <div className={styles.wrapper}>
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
            <div
              ref={viewData[index].ref}
              key={index}
              className={clsx(
                styles.blockItem,
                viewData[index].view && styles.mobileActiveItem
              )}
            >
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
    </div>
  )
}

export default SecondScreen
