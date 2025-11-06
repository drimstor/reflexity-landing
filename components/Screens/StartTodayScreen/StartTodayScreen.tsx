import clsx from 'clsx'
import Footer from 'components/UI-kit/Footer/Footer'
import Image from 'next/image'
import logo from 'public/logo.png'
import mobileCircle from 'public/mobilePlanet.svg'
import { useInView } from 'react-intersection-observer'
import styles from './StartTodayScreen.module.scss'

interface StartTodayScreenProps {
  screenNumber: string
}

const StartTodayScreen = ({ screenNumber }: StartTodayScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div
      id='contact'
      ref={ref}
      className={clsx(
        styles.contentBox,
        screenNumber === '8' && styles.active,
        inView && styles.mobileActive
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <div className={styles.textBox}>
        <Image width={100} src={logo} alt='logo' />
        <h2>
          Начните с <span>Reflexity</span> сегодня
        </h2>
        <p>
          Попробуйте бесплатно в течение 7 дней и почувствуйте, <br />
          как ясность становится ближе
        </p>
        <div className={styles.buttonsContainer}>
          <a
            href='https://apps.apple.com/app/id6749893609'
            target='_blank'
            draggable={false}
          >
            <Image
              src='/Download_on_the_App_Store.svg'
              alt='app-store'
              width={142}
              height={46}
              draggable={false}
            />
          </a>
          <a
            href='https://play.google.com/store/apps/details?id=com.reflexity.app'
            target='_blank'
            draggable={false}
          >
            <Image
              src='/Google_Play_Store_badge.svg'
              alt='google-play'
              width={154}
              height={48}
              draggable={false}
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default StartTodayScreen
