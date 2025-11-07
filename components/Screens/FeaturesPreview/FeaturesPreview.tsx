import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef } from 'react'
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

const FeaturesPreview = ({
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const activeScreenNumber = targetScreenNumber || screenNumber
  const noAnimation = isNoAnimation.includes(activeScreenNumber)
  const isShow = screenNumber === activeScreenNumber || inView || noAnimation
  const isActive = screenNumber === activeScreenNumber
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.play().catch(() => {})
    } else {
      setTimeout(() => {
        video.pause()
        video.currentTime = 0
      }, 1000)
    }
  }, [isActive])

  return (
    <div
      className={clsx(styles.contentBox, isShow && styles.active)}
      id={sectionId}
      ref={ref}
    >
      <Image
        className={clsx(
          reverseLayout ? styles.mobilePlanetReverse : styles.mobilePlanet
        )}
        src={mobilePlanetSrc}
        alt='circle'
      />
      <div
        className={clsx(
          styles.container,
          !isMobile && screenNumber !== activeScreenNumber && styles.hide,
          reverseLayout && styles.reverseLayout
        )}
      >
        <div className={styles.videoWrapper}>
          <Image
            className={styles.iphoneBorder}
            src={iphoneBorderSrc}
            alt='iPhone frame'
            width={360}
            height={640}
            priority
          />
          <video
            className={styles.video}
            loop
            muted
            playsInline
            poster={videoPoster}
            width={videoWidth}
            height={videoHeight}
            preload={isActive ? 'auto' : 'none'}
            ref={videoRef}
          >
            <source src={videoSrc} type='video/webm' />
          </video>
        </div>
        <div className={styles.textBox}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPreview
