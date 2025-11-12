import Planet from 'components/Planet/Planet'
import FirstScreen from 'components/Screens/FirstScreen/FirstScreen'
import SecondScreen from 'components/Screens/SecondScreen/SecondScreen'
import SeventhScreen from 'components/Screens/SeventhScreen/SeventhScreen'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import FeaturesPreview from '../Screens/FeaturesPreview/FeaturesPreview'
import PlansScreen from '../Screens/PlansScreen/PlansScreen'
import StartTodayScreen from '../Screens/StartTodayScreen/StartTodayScreen'
import Footer from '../UI-kit/Footer/Footer'
import styles from './PageCarousel.module.scss'

// Ленивая загрузка LastPlanet - загружается только когда screenNumber >= 6
const LastPlanet = dynamic(() => import('components/Planet/LastPlanet'), {
  ssr: false, // отключаем SSR для анимации
})

const PageCarousel = () => {
  const [viewedScreens, setViewedScreens] = useState<Set<string>>(
    new Set(['0'])
  )
  const isMobile = useMediaQuery('(max-width: 768px)')
  const lenisRef = useRef<Lenis | null>(null)
  const [screenNumber, setScreenNumber] = useState('0')
  const screenRefs = useRef<Map<string, HTMLElement>>(new Map())

  const isScreenWithPlanet = ['7', '8', '9'].includes(screenNumber)

  // Инициализация Lenis для плавного скролла
  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 2,
      lerp: 0.05, // Скорость интерполяции (меньше = медленнее, по умолчанию ~0.1)
      wheelMultiplier: 0.3, // Чувствительность к колесу мыши (меньше = медленнее, по умолчанию 1)
    })

    lenisRef.current = lenis

    // Обновление активного экрана при скролле
    const updateActiveScreen = () => {
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2
      let closestScreen = '0'
      let minDistance = Infinity

      screenRefs.current.forEach((element, screenId) => {
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        if (rect.bottom > 0 && rect.top < viewportHeight) {
          if (distance < minDistance) {
            minDistance = distance
            closestScreen = screenId
          }
        }
      })

      setScreenNumber((prev) => {
        return prev !== closestScreen ? closestScreen : prev
      })
    }

    lenis.on('scroll', updateActiveScreen)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Добавляем экран в просмотренные при первом появлении
  useEffect(() => {
    setViewedScreens((prev) => {
      if (!prev.has(screenNumber)) {
        const newSet = new Set(prev)
        newSet.add(screenNumber)
        return newSet
      }
      return prev
    })
  }, [screenNumber])

  // Регистрация ref для экрана
  const registerScreenRef = (screenId: string, element: HTMLElement | null) => {
    if (element) {
      screenRefs.current.set(screenId, element)
    } else {
      screenRefs.current.delete(screenId)
    }
  }

  const onScrollToScreenCallback = (screen: string) => {
    const targetElement = screenRefs.current.get(screen)
    if (targetElement && lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: isMobile ? -72 : -88,
        duration: 2,
      })
    }
  }

  const featuresPreviewConfigs = [
    {
      targetScreenNumber: '2',
      videoSrc: '/assets/SimulatorJournal.webm',
      videoPoster: '/assets/SimulatorJournalPoster.png',
      title: 'Reflexity - это не просто дневник',
      text: 'Это интеллектуальная система саморефлексии, которая анализирует твои записи, эмоции и действия, чтобы показать, что действительно влияет на твою жизнь',
    },
    {
      targetScreenNumber: '3',
      videoSrc: '/assets/SimulatorOverview.webm',
      videoPoster: '/assets/SimulatorOverviewPoster.png',
      title: 'Визуализируй сферы своей жизни',
      reverseLayout: true,
      text: 'Каждая запись, цель или эмоция становится частью твоей когнитивной карты — живой модели твоей личности. Чем больше пишете — тем точнее Reflexity понимает вас.',
    },
    {
      targetScreenNumber: '4',
      videoSrc: '/assets/SimulatorChat.webm',
      videoPoster: '/assets/SimulatorChatPoster.png',
      title: 'Чаты и ассистент',
      text: 'Вся магия начинается когда приложение достаточно познакомится с вами. Это не просто "чат с ботом", а системный интеллект, который обучается на ваших данных и адаптируется под вас, ищет самый комфортный и эффективный подход, так же есть ручная конфигурация ассистента.',
    },
    {
      targetScreenNumber: '5',
      videoSrc: '/assets/SimulatorGoal.webm',
      videoPoster: '/assets/SimulatorGoalPoster.png',
      title: 'Создавайте цели',
      reverseLayout: true,
      text: 'Reflexity поможет определить цели с индивидуальным подходом и сгенерирует пошаговый план для достижения этой цели, с учетом ваших потребностей и обстоятельств. ',
    },
    {
      targetScreenNumber: '6',
      videoSrc: '/assets/SimulatorSummary.webm',
      videoPoster: '/assets/SimulatorSummaryPoster.png',
      title: 'Подводите итоги',
      text: 'Вы так же можете сформировать саммари, для подведения итогов за определенный период или для анализа определенной темы с возможностью кастомных инструкций.',
    },
  ]

  return (
    <>
      <Header
        screenNumber={screenNumber}
        isMobile={isMobile}
        onScrollToScreenCallback={onScrollToScreenCallback}
      />
      <Planet screenNumber={screenNumber} isPause={isScreenWithPlanet} />
      <section id='carousel' className={styles.globalBox}>
        <div ref={(el) => registerScreenRef('0', el)} data-screen='0'>
          <FirstScreen />
        </div>
        <div ref={(el) => registerScreenRef('1', el)} data-screen='1'>
          <SecondScreen
            screenNumber={screenNumber}
            isNoAnimation={[]}
            viewedScreens={viewedScreens}
          />
        </div>
        {featuresPreviewConfigs.map((config) => (
          <div
            key={config.targetScreenNumber}
            ref={(el) => registerScreenRef(config.targetScreenNumber, el)}
            data-screen={config.targetScreenNumber}
          >
            <FeaturesPreview
              screenNumber={screenNumber}
              isNoAnimation={[]}
              viewedScreens={viewedScreens}
              targetScreenNumber={config.targetScreenNumber}
              videoSrc={config.videoSrc}
              videoPoster={config.videoPoster}
              title={config.title}
              text={config.text}
              reverseLayout={config.reverseLayout}
            />
          </div>
        ))}
        <div ref={(el) => registerScreenRef('7', el)} data-screen='7'>
          <SeventhScreen isNoAnimation={[]} viewedScreens={viewedScreens} />
        </div>
        <div ref={(el) => registerScreenRef('8', el)} data-screen='8'>
          <PlansScreen
            screenNumber={screenNumber}
            viewedScreens={viewedScreens}
          />
        </div>
        <div ref={(el) => registerScreenRef('9', el)} data-screen='9'>
          <StartTodayScreen viewedScreens={viewedScreens} />
        </div>
        {!isMobile && (
          <LastPlanet
            viewedScreens={viewedScreens}
            screenNumber={screenNumber}
          />
        )}
        <Footer />
      </section>
    </>
  )
}

export default PageCarousel
