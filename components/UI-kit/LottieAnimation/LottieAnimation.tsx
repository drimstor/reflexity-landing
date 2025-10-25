import lottie, { AnimationItem, RendererType } from 'lottie-web'
import { memo, useEffect, useRef } from 'react'

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
}

const LottieAnimationComponent: React.FC<Props> = ({
  animationPath,
  loop = true,
  autoplay = true,
  className,
  renderer = 'svg',
  quality = 'high',
  speed = 0.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Настройки рендерера для оптимизации
    const rendererSettings: Record<string, any> = {
      preserveAspectRatio: 'xMidYMid meet',
      progressiveLoad: true, // загрузка по частям
      hideOnTransparent: true,
      // Оптимизация для SVG - улучшенная область фильтрации
      filterSize: {
        width: '200%',
        height: '200%',
        x: '-50%',
        y: '-50%',
      },
    }

    if (renderer === 'canvas') {
      rendererSettings.clearCanvas = quality === 'low'
    }

    const instance = lottie.loadAnimation({
      container: containerRef.current,
      renderer,
      loop,
      autoplay,
      path: animationPath,
      rendererSettings,
    })

    animationRef.current = instance

    // Устанавливаем скорость
    if (speed !== 1) {
      instance.setSpeed(speed)
    }

    // Настройки для плавности
    // Для high quality оставляем subframe включенным для более плавной анимации
    if (quality === 'low' || quality === 'medium') {
      instance.setSubframe(false)
    }

    return () => {
      instance.destroy()
      animationRef.current = null
    }
  }, [animationPath, loop, autoplay, renderer, quality, speed])

  return <div ref={containerRef} className={className} />
}

export const LottieAnimation = memo(LottieAnimationComponent)
