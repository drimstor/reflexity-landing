import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../../hooks/useMediaQuery'
import mobileCircle from '../../../public/mobilePlanet.svg'
import styles from './FeaturesPreview.module.scss'

interface FeaturesPreviewProps {
  screenNumber: string
  isNoAnimation: string[]
  viewedScreens: Set<string>
  videoSrc: string
  videoPoster: string
  title: string
  text: string
  reverseLayout?: boolean // true = текст слева, видео справа; false = видео слева, текст справа
  targetScreenNumber?: string // номер экрана, на котором компонент должен быть активен
  sectionId?: string
  mobilePlanetSrc?: string | StaticImageData
  iphoneBorderSrc?: string
  videoWidth?: number
  videoHeight?: number
}

const FeaturesPreview = memo(
  ({
    screenNumber,
    isNoAnimation,
    viewedScreens,
    videoSrc,
    videoPoster,
    title,
    text,
    reverseLayout = false,
    targetScreenNumber,
    sectionId = 'about',
    mobilePlanetSrc = mobileCircle,
    iphoneBorderSrc = '/assets/iphoneBorderNew.png',
    videoWidth = 1032,
    videoHeight = 2064,
  }: FeaturesPreviewProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: '50px', // Начинаем загрузку немного раньше
    })

    const isViewed = useMemo(
      () => viewedScreens.has(targetScreenNumber || ''),
      [viewedScreens, targetScreenNumber]
    )

    const isActive = useMemo(
      () => screenNumber === targetScreenNumber,
      [screenNumber, targetScreenNumber]
    )

    // Рендерить видео только если экран был показан хотя бы раз
    const shouldRenderVideo = useMemo(
      () => inView || isViewed,
      [inView, isViewed]
    )

    const videoRef = useRef<HTMLVideoElement>(null)
    const playTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Функция для запуска видео
    const playVideo = useCallback(() => {
      const video = videoRef.current
      if (!video) return

      // Ждем, пока видео будет готово к воспроизведению
      const attemptPlay = () => {
        if (video.readyState >= 2) {
          // HAVE_CURRENT_DATA или выше
          video.play().catch(() => {
            // Игнорируем ошибки автовоспроизведения
          })
        } else {
          // Ждем события canplay
          video.addEventListener('canplay', attemptPlay, { once: true })
        }
      }

      attemptPlay()
    }, [])

    // Оптимизированное управление видео
    useEffect(() => {
      const video = videoRef.current
      if (!video || !shouldRenderVideo) return

      // Очистка предыдущих таймеров
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = null
      }

      // На мобильных устройствах запускаем видео, если экран виден
      const shouldPlay = isMobile ? inView : isActive

      if (shouldPlay) {
        // Небольшая задержка для плавного перехода
        playTimeoutRef.current = setTimeout(() => {
          playVideo()
        }, 100)
      } else {
        // Пауза с задержкой для плавности
        pauseTimeoutRef.current = setTimeout(() => {
          video.pause()
          video.currentTime = 0
        }, 800)
      }

      return () => {
        if (playTimeoutRef.current) {
          clearTimeout(playTimeoutRef.current)
        }
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current)
        }
      }
    }, [isActive, shouldRenderVideo, isMobile, inView, playVideo])

    // Мемоизация классов для оптимизации
    const mobilePlanetClassName = useMemo(
      () => (reverseLayout ? styles.mobilePlanetReverse : styles.mobilePlanet),
      [reverseLayout]
    )

    const containerClassName = useMemo(
      () => clsx(styles.container, reverseLayout && styles.reverseLayout),
      [reverseLayout]
    )

    return (
      <div
        className={clsx(styles.contentBox, isViewed && styles.active)}
        id={sectionId}
        ref={ref}
      >
        <Image
          className={mobilePlanetClassName}
          src={mobilePlanetSrc}
          alt='circle'
          {...(isActive ? { priority: true } : { loading: 'lazy' })}
        />
        <div className={containerClassName}>
          <div className={styles.videoWrapper}>
            <Image
              className={styles.iphoneBorder}
              src={iphoneBorderSrc}
              alt='iPhone frame'
              width={310}
              height={640}
              {...(isActive ? { priority: true } : { loading: 'lazy' })}
            />
            {shouldRenderVideo && (
              <video
                className={styles.video}
                loop
                muted
                playsInline
                autoPlay={isMobile && inView}
                poster={videoPoster}
                width={278}
                height={601}
                preload={isActive || isMobile ? 'auto' : 'metadata'}
                ref={videoRef}
              >
                <source src={videoSrc} type='video/webm' />
              </video>
            )}
          </div>
          <div className={styles.textBox}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  }
)

FeaturesPreview.displayName = 'FeaturesPreview'

export default FeaturesPreview
