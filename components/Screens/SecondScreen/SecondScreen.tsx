import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { blockTextContent } from './constants'
import styles from './SecondScreen.module.scss'

interface SecondScreenProps {
  screenNumber: string
  isNoAnimation: string[]
}

const SecondScreen = ({ screenNumber, isNoAnimation }: SecondScreenProps) => {
  const [isActive, setIsActive] = useState(false)
  const noAnimation = isNoAnimation.includes('2_1')

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
        noAnimation && styles.noAnimation,
        (screenNumber === 'start' || noAnimation) && styles.mobileActive
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
                (viewData[index].view || noAnimation) && styles.mobileActiveItem
              )}
            >
              <div
                className={clsx(
                  styles.icon,
                  (screenNumber === 'start' || isActive || noAnimation) &&
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
    </div>
  )
}

export default SecondScreen
