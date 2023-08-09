import React, {
  TouchEvent,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react'
import styles from './PageCarousel.module.scss'
import FirstScreen from 'components/Screens/FirstScreen/FirstScreen'
import Planet from 'components/Planet/Planet'
import clsx from 'clsx'
import SecondScreen from 'components/Screens/SecondScreen/SecondScreen'
import ThirdScreen from 'components/Screens/ThirdScreen/ThirdScreen'
import { scrollNextConfig, scrollPrevConfig } from './constants'
import FourthScreen from 'components/Screens/FourthScreen/FourthScreen'
import FifthScreen from 'components/Screens/FifthScreen/FifthScreen'
import SixthScreen from 'components/Screens/SixthScreen/SixthScreen'
import SeventhScreen from 'components/Screens/SeventhScreen/SeventhScreen'
import EighthScreen from 'components/Screens/EighthScreen/EighthScreen'
import Header from 'components/UI-kit/Header/Header'
import LastPlanet from 'components/Planet/LastPlanet'
import useMediaQuery from 'hooks/useMediaQuery'

const PageCarousel = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const carouselRef = useRef<HTMLElement>(null)
  // ------------- Desktop ------------ //
  const [scrollToDirection, setScrollToDirection] = useState<number>(0)
  const [screenNumber, setScreenNumber] = useState('0')
  const [isScrollLock, setIsScrollLock] = useState(false)

  const clearScrollLock = () => {
    setIsScrollLock(false)
  }

  const scrollToNewScreen = (isNext = true) => {
    if (carouselRef.current?.dataset.scroll === 'enable') {
      setScrollToDirection(isNext ? 1 : -1)
      setTimeout(() => {
        setIsScrollLock(true)
        setScrollToDirection(0)
      }, 100)
    }
  }

  const onScrollToScreenCallback = (screen: string) => {
    setScreenNumber(screen)
    setTimeout(() => {
      setIsScrollLock(true)
      setScrollToDirection(0)
    }, 100)
    setTimeout(clearScrollLock, 1500)
  }

  const onPageWheelHandler = (e: WheelEvent<HTMLElement>) => {
    if (!isScrollLock && !isMobile) {
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

  const onMouseDownHandler = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartPosition({
      clientX: e.targetTouches[0].clientX,
      clientY: e.targetTouches[0].clientY,
    })
  }

  const onMouseMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const currentPositionY = e.targetTouches[0].clientY

      if (startPosition.clientY - currentPositionY >= 0) {
        scrollToNewScreen()
      } else {
        scrollToNewScreen(false)
      }
    }
  }

  useEffect(() => {
    if (!isScrollLock) {
      if (scrollToDirection > 0) {
        scrollNextConfig.forEach((config) => {
          if (screenNumber === config.currentScreenNumber) {
            if (config.hasOwnProperty('isMobile')) {
              if (config.isMobile ? isMobile : !isMobile) {
                setScreenNumber(config.setScreenNumber)
                setTimeout(clearScrollLock, config.clearTimeout ?? 1500)
              }
            } else {
              setScreenNumber(config.setScreenNumber)
              setTimeout(clearScrollLock, config.clearTimeout ?? 1500)
            }
          }
        })
      }
      if (scrollToDirection < 0) {
        scrollPrevConfig.forEach((config) => {
          if (screenNumber === config.currentScreenNumber) {
            setScreenNumber(config.setScreenNumber)
            setTimeout(clearScrollLock, config.clearTimeout ?? 1500)
          }
        })
      }
    }
  }, [scrollToDirection])

  return (
    <>
      <Header
        screenNumber={screenNumber}
        isMobile={isMobile}
        onScrollToScreenCallback={onScrollToScreenCallback}
      />
      <Planet screenNumber={screenNumber} isMobile={isMobile} />
      <section
        id='carousel'
        ref={carouselRef}
        data-scroll={'enable'}
        className={clsx(styles.globalBox, styles['screen' + screenNumber])}
        onWheel={onPageWheelHandler}
        onTouchStart={onMouseDownHandler}
        onTouchMove={onMouseMoveHandler}
      >
        <FirstScreen />
        <SecondScreen screenNumber={screenNumber} />
        <ThirdScreen screenNumber={screenNumber} isMobile={isMobile} />
        <FourthScreen screenNumber={screenNumber} isMobile={isMobile} />
        <FifthScreen screenNumber={screenNumber} isMobile={isMobile} />
        <SixthScreen screenNumber={screenNumber} isMobile={isMobile} />
        <SeventhScreen screenNumber={screenNumber} isMobile={isMobile} />
        <EighthScreen screenNumber={screenNumber} />
      </section>
      <LastPlanet screenNumber={screenNumber} />
    </>
  )
}

export default PageCarousel
