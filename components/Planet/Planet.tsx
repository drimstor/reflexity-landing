import clsx from 'clsx'
import { LottieAnimation } from 'components/UI-kit/LottieAnimation/LottieAnimation'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import styles from './Planet.module.scss'

interface PlanetProps {
  screenNumber: string
  isPause?: boolean
}

// Начальное состояние
const INITIAL_STATE = {
  scale: 0.9,
  translateY: 45,
  opacity: 0.6,
  rotate: 0,
} as const

// Fullscreen состояние
const FULLSCREEN_STATE = {
  scale: 1.2,
  translateY: 0,
  opacity: 0.6,
  rotate: 40,
} as const

// Параметры анимации
const ANIMATION_CONFIG = {
  ACCELERATION_FACTOR: 3.6,
  FULLSCREEN_THRESHOLD: 0.79,
  PULSE_PERIOD: 2000,
  PULSE_AMPLITUDE: 0.05,
  ROTATION_SPEED: 0.05,
  EASING_POWER: 3,
  INIT_DELAY: 100,
  TRANSITION_DELAY: 300,
} as const

// Вспомогательные функции
const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t

const easeOutCubic = (
  t: number,
  power: number = ANIMATION_CONFIG.EASING_POWER
): number => 1 - Math.pow(1 - t, power)

const Planet = ({ screenNumber, isPause }: PlanetProps) => {
  const [transitionOn, setTransitionOn] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const animationRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    setTimeout(() => setTransitionOn(true), ANIMATION_CONFIG.TRANSITION_DELAY)
  }, [])

  // Параллакс с привязкой к прогрессу скролла
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile || !animationRef.current)
      return

    const element = animationRef.current
    const { scale, translateY, opacity, rotate } = INITIAL_STATE

    // Устанавливаем начальное состояние сразу
    element.style.transform = `translate3d(0,${translateY}%,0) scale(${scale}) rotate(${rotate}deg)`
    element.style.opacity = opacity.toString()

    // Кэшируем константы для оптимизации
    const {
      ACCELERATION_FACTOR,
      FULLSCREEN_THRESHOLD,
      PULSE_PERIOD,
      PULSE_AMPLITUDE,
      ROTATION_SPEED,
    } = ANIMATION_CONFIG

    const pulsePhaseMultiplier = (Math.PI * 2) / PULSE_PERIOD
    const fullscreenThresholdRatio = FULLSCREEN_THRESHOLD / ACCELERATION_FACTOR

    const updateParallax = () => {
      const carousel = document.getElementById('carousel')
      if (!carousel || !element) return

      const totalHeight = carousel.offsetHeight
      if (totalHeight === 0) return

      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY || window.pageYOffset
      const scrollableHeight = Math.max(0, totalHeight - viewportHeight)

      // Вычисляем прогресс скролла с оптимизацией
      const rawProgress =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollableHeight))
          : 0

      // Ускоряем прогресс и применяем easing
      const acceleratedProgress = Math.min(1, rawProgress * ACCELERATION_FACTOR)
      const easedProgress = easeOutCubic(acceleratedProgress)

      // Проверяем достижение fullscreen
      const isFullscreen = easedProgress >= FULLSCREEN_THRESHOLD

      // Интерполяция базовых значений
      const baseScale = lerp(
        INITIAL_STATE.scale,
        FULLSCREEN_STATE.scale,
        easedProgress
      )
      const translateY = lerp(
        INITIAL_STATE.translateY,
        FULLSCREEN_STATE.translateY,
        easedProgress
      )
      const opacity = lerp(
        INITIAL_STATE.opacity,
        FULLSCREEN_STATE.opacity,
        easedProgress
      )
      let rotate = lerp(
        INITIAL_STATE.rotate,
        FULLSCREEN_STATE.rotate,
        easedProgress
      )

      // Применяем пульсацию и дополнительное вращение после fullscreen
      let scale = baseScale
      if (isFullscreen) {
        // Вычисляем скролл после достижения fullscreen
        const fullscreenScrollTop =
          scrollableHeight > 0
            ? scrollableHeight * fullscreenThresholdRatio
            : scrollTop
        const scrollAfterFullscreen = Math.max(
          0,
          scrollTop - fullscreenScrollTop
        )

        // Пульсация scale
        const pulseOffset =
          Math.sin(scrollAfterFullscreen * pulsePhaseMultiplier) *
          PULSE_AMPLITUDE
        scale = baseScale + pulseOffset

        // Непрерывное вращение
        rotate += scrollAfterFullscreen * ROTATION_SPEED
      }

      // Применяем стили одним обновлением
      element.style.transform = `translate3d(0,${translateY}%,0) scale(${scale}) rotate(${rotate}deg)`
      element.style.opacity = opacity.toString()
    }

    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      rafId.current = requestAnimationFrame(updateParallax)
    }

    // Инициализация с задержкой
    const initTimeout = setTimeout(() => {
      updateParallax()
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, ANIMATION_CONFIG.INIT_DELAY)

    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isMobile])

  // Проверяем, нужно ли применять улет (на седьмом экране или после)
  const shouldExit = useMemo(() => Number(screenNumber) >= 7, [screenNumber])

  const animationClassName = useMemo(
    () => clsx(styles.lottieAnimation, transitionOn && styles.transition),
    [transitionOn]
  )

  const circleBoxClassName = useMemo(
    () => clsx(styles.circleBox, shouldExit && styles.exitLeft),
    [shouldExit]
  )

  return (
    <div className={circleBoxClassName}>
      <div ref={animationRef} className={animationClassName}>
        <LottieAnimation animationPath='/slow-spinner.json' pause={isPause} />
      </div>
    </div>
  )
}

export default memo(Planet)
