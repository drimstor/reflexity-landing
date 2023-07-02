import React, { useEffect, useState, WheelEvent } from 'react'
import styles from './PageCarousel.module.scss'
import FirstScreen from 'components/FirstScreen/FirstScreen'
import Planet from 'components/Planet/Planet'
import clsx from 'clsx'
import SecondScreen from 'components/SecondScreen/SecondScreen'
import ThirdScreen from 'components/ThirdScreen/ThirdScreen'
import useDebounce from 'hooks/useDebounce'
import useDebounceCallback from 'hooks/useDebounceCallback'

const PageCarousel = () => {
  const [scrollToDirection, setScrollToDirection] = useState<number>(0)
  const [screenNumber, setScreenNumber] = useState('0')
  const [isScrollLock, setIsScrollLock] = useState(false)

  const clearScrollLock = () => {
    setIsScrollLock(false)
  }

  const onPageWheelHandler = (e: WheelEvent<HTMLElement>) => {
    if (!isScrollLock) {
      if (e.nativeEvent.deltaY > 0) {
        setScrollToDirection(1)
      } else {
        setScrollToDirection(-1)
      }

      setTimeout(() => {
        setIsScrollLock(true)
        setScrollToDirection(0)
      }, 100)
    }
  }

  // const scrollEventHandler = useDebounceCallback(onPageWheelHandler, 2000, true)

  // const scrollLock = useDebounce(scrollToDirection, 1300)

  console.log({
    isScrollLock,
    scrollToDirection,
    screenNumber,
  })

  useEffect(() => {
    if (!isScrollLock) {
      if (scrollToDirection > 0) {
        if (screenNumber === '0') {
          setScreenNumber('1')
          setTimeout(clearScrollLock, 5700)
        }
        if (screenNumber === '1') {
          setScreenNumber('2_1')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_1') {
          setScreenNumber('2_2')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_2') {
          setScreenNumber('2_3')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_3') {
          setScreenNumber('2_4')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_4') {
          setScreenNumber('2_5')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_5') {
          setScreenNumber('2_6')
          setTimeout(clearScrollLock, 1700)
        }
      }
      if (scrollToDirection < 0) {
        if (screenNumber === '0') {
          setTimeout(clearScrollLock, 500)
        }

        if (screenNumber === '1') {
          setScreenNumber('0')
          setTimeout(clearScrollLock, 1300)
        }

        if (screenNumber === '2_1') {
          setScreenNumber('1')
          setTimeout(clearScrollLock, 5700)
        }

        if (screenNumber === '2_2') {
          setScreenNumber('2_1')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_3') {
          setScreenNumber('2_2')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_4') {
          setScreenNumber('2_3')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_5') {
          setScreenNumber('2_4')
          setTimeout(clearScrollLock, 1700)
        }
        if (screenNumber === '2_6') {
          setScreenNumber('2_5')
          setTimeout(clearScrollLock, 1700)
        }
      }
    }
  }, [scrollToDirection])

  return (
    <>
      <Planet screenNumber={screenNumber} />
      <section
        className={clsx(styles.globalBox, styles['screen' + screenNumber])}
        onWheel={onPageWheelHandler}
      >
        <FirstScreen />
        <SecondScreen isActiveScreen={screenNumber === '1'} />
        <ThirdScreen screenNumber={screenNumber} isScrollLock={isScrollLock} />
      </section>
    </>
  )
}

export default PageCarousel
