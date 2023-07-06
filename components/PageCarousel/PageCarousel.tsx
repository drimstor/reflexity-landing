import React, { TouchEvent, useEffect, useState, WheelEvent } from 'react'
import styles from './PageCarousel.module.scss'
import FirstScreen from 'components/FirstScreen/FirstScreen'
import Planet from 'components/Planet/Planet'
import clsx from 'clsx'
import SecondScreen from 'components/SecondScreen/SecondScreen'
import ThirdScreen from 'components/ThirdScreen/ThirdScreen'
import useDebounce from 'hooks/useDebounce'
import useDebounceCallback from 'hooks/useDebounceCallback'

const PageCarousel = () => {
  // ------------- Desktop ------------ //
  const [scrollToDirection, setScrollToDirection] = useState<number>(0)
  const [screenNumber, setScreenNumber] = useState('0')
  const [isScrollLock, setIsScrollLock] = useState(false)

  const clearScrollLock = () => {
    setIsScrollLock(false)
  }

  const scrollToNewScreen = (isNext = true) => {
    setScrollToDirection(isNext ? 1 : -1)
    setTimeout(() => {
      setIsScrollLock(true)
      setScrollToDirection(0)
    }, 100)
  }

  const onPageWheelHandler = (e: WheelEvent<HTMLElement>) => {
    if (!isScrollLock) {
      if (e.nativeEvent.deltaY > 0) {
        scrollToNewScreen()
      } else {
        scrollToNewScreen(false)
      }
    }
  }

  // ------------- Mobile ------------ //
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ clientX: 0, clientY: 0 })
  const [currentPosition, setCurrentPosition] = useState({
    clientX: 0,
    clientY: 0,
  })
  const [translateDirection, setTranslateDirection] = useState(false)

  const onMouseDownHandler = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartPosition({
      clientX: e.targetTouches[0].clientX,
      clientY: e.targetTouches[0].clientY,
    })
  }

  const onMouseMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const currentPositionX = e.targetTouches[0].clientX
      const currentPositionY = e.targetTouches[0].clientY
      setCurrentPosition({
        clientX: currentPositionX,
        clientY: currentPositionY,
      })
      setTranslateDirection(startPosition.clientY - currentPositionY >= 0)
    }
  }

  const onMouseUpHandler = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(false)
    if (
      Math.round(e.changedTouches[0].pageY) !==
        Math.round(startPosition.clientY) &&
      Math.round(e.changedTouches[0].pageX) !==
        Math.round(startPosition.clientX) &&
      currentPosition.clientX - startPosition.clientX < 50 &&
      startPosition.clientX - currentPosition.clientX < 50
    ) {
      if (translateDirection) {
        scrollToNewScreen()
      } else {
        scrollToNewScreen(false)
      }
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
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_1') {
          setScreenNumber('2_2')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_2') {
          setScreenNumber('2_3')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_3') {
          setScreenNumber('2_4')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_4') {
          setScreenNumber('2_5')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_5') {
          setScreenNumber('2_6')
          setTimeout(clearScrollLock, 1500)
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
          setTimeout(clearScrollLock, 1300)
        }
        if (screenNumber === '2_3') {
          setScreenNumber('2_2')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_4') {
          setScreenNumber('2_3')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_5') {
          setScreenNumber('2_4')
          setTimeout(clearScrollLock, 1500)
        }
        if (screenNumber === '2_6') {
          setScreenNumber('2_5')
          setTimeout(clearScrollLock, 1500)
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
        onTouchStart={onMouseDownHandler}
        onTouchMove={onMouseMoveHandler}
        onTouchEnd={onMouseUpHandler}
      >
        <FirstScreen />
        <SecondScreen isActiveScreen={screenNumber === '1'} />
        <ThirdScreen screenNumber={screenNumber} isScrollLock={isScrollLock} />
      </section>
    </>
  )
}

export default PageCarousel
