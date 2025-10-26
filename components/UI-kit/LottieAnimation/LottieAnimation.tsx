import clsx from 'clsx'
import lottie, { AnimationItem, RendererType } from 'lottie-web'
import { memo, useEffect, useRef, useState } from 'react'
import styles from './LottieAnimation.module.scss'

type Props = {
  animationPath: string
  loop?: boolean
  autoplay?: boolean
  className?: string
  // Настройки оптимизации
  renderer?: RendererType // 'svg' | 'canvas' | 'html'
  quality?: 'high' | 'medium' | 'low' // влияет на rendererSettings
  pauseOnHidden?: boolean // останавливать анимацию когда не видна
  speed?: number // скорость анимации (1 = нормальная, 0.5 = медленнее, 2 = быстрее)
  disableAnimationSpeed?: boolean // полностью отключить анимацию на слабых устройствах
}

// Определение производительности устройства
const getDevicePerformance = () => {
  if (typeof window === 'undefined') return 'high'

  // Проверяем hardware concurrency (количество ядер процессора)
  const cores = navigator.hardwareConcurrency || 4

  // Проверяем тип соединения
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection
  const effectiveType = connection?.effectiveType || '4g'

  // Проверяем память устройства (если доступно)
  const deviceMemory = (navigator as any).deviceMemory || 8 // GB

  // Определяем производительность на основе метрик
  // if (
  //   cores <= 2 ||
  //   deviceMemory <= 2 ||
  //   effectiveType === 'slow-2g' ||
  //   effectiveType === '2g'
  // ) {
  //   return 'low'
  // } else if (cores <= 4 || deviceMemory < 8 || effectiveType === '3g') {
  //   return 'medium'
  // }

  if (
    cores < 4 ||
    deviceMemory < 8 ||
    ['slow-2g', '2g', '3g'].includes(effectiveType)
  ) {
    return 'low'
  }

  return 'high'
}

const LottieAnimationComponent: React.FC<Props> = ({
  animationPath,
  loop = true,
  autoplay = true,
  className,
  renderer = 'svg',
  quality,
  pauseOnHidden = true,
  speed = 0.4,
  disableAnimationSpeed = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Автоопределение качества на основе производительности устройства
  const effectiveQuality = quality || getDevicePerformance()

  // Для устройств с низкой производительностью отключаем autoplay
  const effectiveAutoplay =
    autoplay && !(effectiveQuality === 'low' || disableAnimationSpeed)

  const [isVisible, setIsVisible] = useState(effectiveAutoplay)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Настройки рендерера для оптимизации
    const rendererSettings: Record<string, any> = {
      preserveAspectRatio: 'xMidYMid meet',
      progressiveLoad: true, // загрузка по частям
      hideOnTransparent: true,
    }

    // Оптимизация для SVG рендерера
    if (renderer === 'svg') {
      rendererSettings.filterSize = {
        width: effectiveQuality === 'high' ? '200%' : '150%',
        height: effectiveQuality === 'high' ? '200%' : '150%',
        x: effectiveQuality === 'high' ? '-50%' : '-25%',
        y: effectiveQuality === 'high' ? '-50%' : '-25%',
      }

      rendererSettings.className = 'lottie-svg-low-quality'
    }

    if (renderer === 'canvas') {
      rendererSettings.clearCanvas = effectiveQuality !== 'high'
      rendererSettings.context = container
      rendererSettings.preserveAspectRatio = 'xMidYMid meet'
    }

    const instance = lottie.loadAnimation({
      container,
      renderer,
      loop,
      autoplay: effectiveAutoplay && isVisible,
      path: animationPath,
      rendererSettings,
    })

    animationRef.current = instance

    // Настройка скорости в зависимости от производительности
    let effectiveSpeed = speed

    // Для устройств средней производительности замедляем
    if (effectiveQuality === 'medium') {
      effectiveSpeed = speed * 0.5
    }

    instance.setSpeed(effectiveSpeed)

    // Оптимизация subframe рендеринга
    // Для слабых устройств отключаем subframe для улучшения производительности
    if (effectiveQuality === 'low') {
      instance.setSubframe(false)
    }

    // Intersection Observer для паузы анимации когда не видна
    if (pauseOnHidden && typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              if (animationRef.current && effectiveAutoplay) {
                animationRef.current.play()
              }
            } else {
              setIsVisible(false)
              if (animationRef.current) {
                animationRef.current.pause()
              }
            }
          })
        },
        {
          threshold: 0.1, // Запускаем когда видно 10% элемента
          rootMargin: '50px', // Предзагрузка за 50px до появления
        }
      )

      if (container) {
        observerRef.current.observe(container)
      }
    }

    return () => {
      if (observerRef.current && container) {
        observerRef.current.unobserve(container)
        observerRef.current.disconnect()
      }
      instance.destroy()
      animationRef.current = null
    }
  }, [
    animationPath,
    loop,
    effectiveAutoplay,
    renderer,
    effectiveQuality,
    speed,
    pauseOnHidden,
    isVisible,
    disableAnimationSpeed,
  ])

  return (
    <div
      ref={containerRef}
      className={clsx(styles.lottieContainer, className)}
    />
  )
}

export const LottieAnimation = memo(LottieAnimationComponent)
