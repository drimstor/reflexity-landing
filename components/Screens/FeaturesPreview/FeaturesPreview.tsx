import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import mobileCircle from '../../../public/mobilePlanet.svg'
import styles from './FeaturesPreview.module.scss'

interface FeaturesPreviewProps {
  screenNumber: string
  isMobile: boolean
  isNoAnimation: string[]
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

// Функция сравнения для оптимизации ре-рендеров
const areEqual = (
  prevProps: FeaturesPreviewProps,
  nextProps: FeaturesPreviewProps
) => {
  // Сравниваем только критичные пропсы
  return (
    prevProps.screenNumber === nextProps.screenNumber &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.targetScreenNumber === nextProps.targetScreenNumber &&
    prevProps.videoSrc === nextProps.videoSrc &&
    prevProps.videoPoster === nextProps.videoPoster &&
    prevProps.title === nextProps.title &&
    prevProps.text === nextProps.text &&
    prevProps.reverseLayout === nextProps.reverseLayout &&
    // Для isNoAnimation сравниваем длину и содержимое
    prevProps.isNoAnimation.length === nextProps.isNoAnimation.length &&
    prevProps.isNoAnimation.every(
      (screen, index) => screen === nextProps.isNoAnimation[index]
    )
  )
}

const FeaturesPreview = memo(
  ({
    screenNumber,
    isMobile,
    isNoAnimation,
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
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: '50px', // Начинаем загрузку немного раньше
    })

    // Мемоизация вычисляемых значений
    const activeScreenNumber = useMemo(
      () => targetScreenNumber || screenNumber,
      [targetScreenNumber, screenNumber]
    )

    const noAnimation = useMemo(
      () => isNoAnimation.includes(activeScreenNumber),
      [isNoAnimation, activeScreenNumber]
    )

    const isShow = useMemo(
      () => screenNumber === activeScreenNumber || inView || noAnimation,
      [screenNumber, activeScreenNumber, inView, noAnimation]
    )

    const isActive = useMemo(
      () => screenNumber === activeScreenNumber,
      [screenNumber, activeScreenNumber]
    )

    // Рендерить видео только если экран был показан хотя бы раз
    const shouldRenderVideo = useMemo(() => isShow || inView, [isShow, inView])

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
      const shouldPlay = isActive || (isMobile && (isShow || inView))

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
    }, [isActive, shouldRenderVideo, isMobile, isShow, inView, playVideo])

    // Мемоизация классов для оптимизации
    const mobilePlanetClassName = useMemo(
      () => (reverseLayout ? styles.mobilePlanetReverse : styles.mobilePlanet),
      [reverseLayout]
    )

    const containerClassName = useMemo(
      () =>
        clsx(
          styles.container,
          !isMobile && screenNumber !== activeScreenNumber && styles.hide,
          reverseLayout && styles.reverseLayout
        ),
      [isMobile, screenNumber, activeScreenNumber, reverseLayout]
    )

    return (
      <div
        className={clsx(styles.contentBox, isShow && styles.active)}
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
                autoPlay={isMobile && (isShow || inView)}
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
  },
  areEqual
)

FeaturesPreview.displayName = 'FeaturesPreview'

export default FeaturesPreview
