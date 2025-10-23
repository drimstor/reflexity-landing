import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

type Props = {
  animationPath: string
  loop?: boolean
  autoplay?: boolean
  width?: number | string
  height?: number | string
  className?: string
}

export const LottieAnimation: React.FC<Props> = ({
  animationPath,
  loop = true,
  autoplay = true,
  width = 300,
  height = 300,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const instance = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: animationPath,
    })

    return () => instance.destroy() // очистка при размонтировании
  }, [animationPath, loop, autoplay])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}
