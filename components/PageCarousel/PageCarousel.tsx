import clsx from 'clsx'
import LastPlanet from 'components/Planet/LastPlanet'
import Planet from 'components/Planet/Planet'
import EighthScreen from 'components/Screens/EighthScreen/EighthScreen'
import FifthScreen from 'components/Screens/FifthScreen/FifthScreen'
import FirstScreen from 'components/Screens/FirstScreen/FirstScreen'
import FourthScreen from 'components/Screens/FourthScreen/FourthScreen'
import SecondScreen from 'components/Screens/SecondScreen/SecondScreen'
import SeventhScreen from 'components/Screens/SeventhScreen/SeventhScreen'
import SixthScreen from 'components/Screens/SixthScreen/SixthScreen'
import ThirdScreen from 'components/Screens/ThirdScreen/ThirdScreen'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import { TouchEvent, useEffect, useRef, useState, WheelEvent } from 'react'
import { screensFromNav, scrollNextConfig, scrollPrevConfig } from './constants'
import styles from './PageCarousel.module.scss'

const PageCarousel = () => {
  const [disableAnimationScreens, setDisableAnimationScreens] = useState([''])
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
    document.body.classList.add('noTransition')
    if (!isMobile) setScreenNumber(screen)
    setTimeout(() => {
      setIsScrollLock(true)
      setScrollToDirection(0)
      document.body.classList.remove('noTransition')
    }, 100)
    setTimeout(clearScrollLock, 1000)

    if (!disableAnimationScreens.includes(screen)) {
      const screenIndex = screensFromNav.indexOf(screen)
      const array = screensFromNav.slice(
        0,
        screen === '2_1' ? screenIndex + 1 : screenIndex
      )
      setDisableAnimationScreens(array)
    }
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
      <Planet screenNumber={screenNumber} />
      <section
        id='carousel'
        ref={carouselRef}
        data-scroll={'enable'}
        className={clsx(styles.globalBox, styles['screen' + screenNumber])}
        onWheel={onPageWheelHandler}
        onTouchStart={onMouseDownHandler}
        onTouchMove={onMouseMoveHandler}
      >
        <FirstScreen
          onScrollToScreenCallback={onScrollToScreenCallback}
          isMobile={isMobile}
        />
        <SecondScreen
          screenNumber={screenNumber}
          isNoAnimation={disableAnimationScreens}
        />
        <ThirdScreen
          screenNumber={screenNumber}
          isMobile={isMobile}
          onScrollToScreenCallback={onScrollToScreenCallback}
          isNoAnimation={disableAnimationScreens}
        />
        <FourthScreen
          screenNumber={screenNumber}
          isMobile={isMobile}
          isNoAnimation={disableAnimationScreens}
        />
        <FifthScreen
          screenNumber={screenNumber}
          isMobile={isMobile}
          isNoAnimation={disableAnimationScreens}
        />
        <SixthScreen
          screenNumber={screenNumber}
          isMobile={isMobile}
          onScrollToScreenCallback={onScrollToScreenCallback}
          isNoAnimation={disableAnimationScreens}
        />
        <SeventhScreen
          screenNumber={screenNumber}
          isMobile={isMobile}
          isNoAnimation={disableAnimationScreens}
        />
        <EighthScreen screenNumber={screenNumber} />
      </section>
      <LastPlanet screenNumber={screenNumber} />
    </>
  )
}

export default PageCarousel
