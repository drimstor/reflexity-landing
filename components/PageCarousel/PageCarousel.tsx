import clsx from 'clsx'
import Planet from 'components/Planet/Planet'
import FifthScreen from 'components/Screens/FifthScreen/FifthScreen'
import FirstScreen from 'components/Screens/FirstScreen/FirstScreen'
import FourthScreen from 'components/Screens/FourthScreen/FourthScreen'
import SecondScreen from 'components/Screens/SecondScreen/SecondScreen'
import SeventhScreen from 'components/Screens/SeventhScreen/SeventhScreen'
import SixthScreen from 'components/Screens/SixthScreen/SixthScreen'
import ThirdScreen from 'components/Screens/ThirdScreen/ThirdScreen'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import dynamic from 'next/dynamic'
import {
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from 'react'
import PlansScreen from '../Screens/PlansScreen/PlansScreen'
import StartTodayScreen from '../Screens/StartTodayScreen/StartTodayScreen'
import { screensFromNav, scrollNextConfig, scrollPrevConfig } from './constants'
import styles from './PageCarousel.module.scss'

// Ленивая загрузка LastPlanet - загружается только когда screenNumber >= 6
const LastPlanet = dynamic(() => import('components/Planet/LastPlanet'), {
  ssr: false, // отключаем SSR для анимации
})

const PageCarousel = () => {
  const [disableAnimationScreens, setDisableAnimationScreens] = useState([''])
  const isMobile = useMediaQuery('(max-width: 768px)')
  const carouselRef = useRef<HTMLElement>(null)
  // ------------- Desktop ------------ //
  const [scrollToDirection, setScrollToDirection] = useState<number>(0)
  const [screenNumber, setScreenNumber] = useState('0')
  const [isScrollLock, setIsScrollLock] = useState(false)

  // Refs для актуальных значений в useEffect без пересрабатывания
  const isMobileRef = useRef(isMobile)
  const screenNumberRef = useRef(screenNumber)
  const isScrollLockRef = useRef(isScrollLock)

  const isLastScreen = useMemo(
    () => ['6', '7', '8'].includes(screenNumber),
    [screenNumber]
  )

  useEffect(() => {
    isMobileRef.current = isMobile
    screenNumberRef.current = screenNumber
    isScrollLockRef.current = isScrollLock
  }, [isMobile, screenNumber, isScrollLock])

  const clearScrollLock = useCallback(() => {
    setIsScrollLock(false)
  }, [])

  const scrollToNewScreen = useCallback((isNext = true) => {
    if (carouselRef.current?.dataset.scroll === 'enable') {
      setScrollToDirection(isNext ? 1 : -1)
      setTimeout(() => {
        setIsScrollLock(true)
        setScrollToDirection(0)
      }, 100)
    }
  }, [])

  const onScrollToScreenCallback = useCallback(
    (screen: string) => {
      document.body.classList.add('noTransition')
      if (!isMobile) setScreenNumber(screen)
      setTimeout(() => {
        setIsScrollLock(true)
        setScrollToDirection(0)
        document.body.classList.remove('noTransition')
      }, 100)
      setTimeout(clearScrollLock, 1000)

      setDisableAnimationScreens((prev) => {
        if (!prev.includes(screen)) {
          const screenIndex = screensFromNav.indexOf(screen)
          const array = screensFromNav.slice(
            0,
            screen === '2_1' ? screenIndex + 1 : screenIndex
          )
          return array
        }
        return prev
      })
    },
    [isMobile, clearScrollLock]
  )

  const onPageWheelHandler = useCallback(
    (e: WheelEvent<HTMLElement>) => {
      if (!isScrollLock && !isMobile) {
        if (e.nativeEvent.deltaY > 0) {
          scrollToNewScreen()
        } else {
          scrollToNewScreen(false)
        }
      }
    },
    [isScrollLock, isMobile, scrollToNewScreen]
  )

  // ------------- Mobile ------------ //
  const [isDragging, setIsDragging] = useState(false)
  const startPositionRef = useRef({ clientX: 0, clientY: 0 })

  const onMouseDownHandler = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    startPositionRef.current = {
      clientX: e.targetTouches[0].clientX,
      clientY: e.targetTouches[0].clientY,
    }
  }, [])

  const onMouseMoveHandler = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (isDragging) {
        const currentPositionY = e.targetTouches[0].clientY

        if (startPositionRef.current.clientY - currentPositionY >= 0) {
          scrollToNewScreen()
        } else {
          scrollToNewScreen(false)
        }
      }
    },
    [isDragging, scrollToNewScreen]
  )

  const onTouchEndHandler = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!isScrollLockRef.current) {
      if (scrollToDirection > 0) {
        scrollNextConfig.forEach((config) => {
          if (screenNumberRef.current === config.currentScreenNumber) {
            if (config.hasOwnProperty('isMobile')) {
              if (
                config.isMobile ? isMobileRef.current : !isMobileRef.current
              ) {
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
          if (screenNumberRef.current === config.currentScreenNumber) {
            setScreenNumber(config.setScreenNumber)
            setTimeout(clearScrollLock, config.clearTimeout ?? 1500)
          }
        })
      }
    }
  }, [scrollToDirection, clearScrollLock])

  const carouselClassName = useMemo(
    () => clsx(styles.globalBox, styles['screen' + screenNumber]),
    [screenNumber]
  )

  return (
    <>
      <Header
        screenNumber={screenNumber}
        isMobile={isMobile}
        onScrollToScreenCallback={onScrollToScreenCallback}
      />
      <Planet screenNumber={screenNumber} isPause={!isMobile && isScrollLock} />
      <section
        id='carousel'
        ref={carouselRef}
        data-scroll={'enable'}
        className={carouselClassName}
        onWheel={onPageWheelHandler}
        onTouchStart={onMouseDownHandler}
        onTouchMove={onMouseMoveHandler}
        onTouchEnd={onTouchEndHandler}
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
        <SeventhScreen // Why Reflexity?
          screenNumber={screenNumber}
          isMobile={isMobile}
          isNoAnimation={disableAnimationScreens}
        />
        <PlansScreen screenNumber={screenNumber} />
        <StartTodayScreen screenNumber={screenNumber} />
      </section>
      {isLastScreen && !isMobile && (
        <LastPlanet screenNumber={screenNumber} isPause={isScrollLock} />
      )}
    </>
  )
}

export default PageCarousel
