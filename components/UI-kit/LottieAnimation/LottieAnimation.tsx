import lottie, { AnimationItem, RendererType } from 'lottie-web'
import { useEffect, useRef } from 'react'

type Props = {
  animationPath: string
  loop?: boolean
  autoplay?: boolean
  width?: number | string
  height?: number | string
  className?: string
  // Настройки оптимизации
  renderer?: RendererType // 'svg' | 'canvas' | 'html'
  quality?: 'high' | 'medium' | 'low' // влияет на rendererSettings
  pauseOnHidden?: boolean // останавливать анимацию когда не видна
  speed?: number // скорость анимации (1 = нормальная, 0.5 = медленнее, 2 = быстрее)
}

export const LottieAnimation: React.FC<Props> = ({
  animationPath,
  loop = true,
  autoplay = true,
  width = 300,
  height = 300,
  className,
  renderer = 'svg',
  quality = 'high',
  speed = 0.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Настройки рендерера в зависимости от quality
    const rendererSettings: Record<string, any> = {
      preserveAspectRatio: 'xMidYMid meet',
      progressiveLoad: true, // загрузка по частям
      hideOnTransparent: true,
    }

    if (renderer === 'canvas') {
      rendererSettings.clearCanvas = quality === 'low' // очищать canvas для экономии памяти
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

    // Отключаем subframe для лучшей производительности на слабых устройствах
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
