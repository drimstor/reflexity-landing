import React from 'react'
import styles from './EighthScreen.module.scss'
import clsx from 'clsx'
import Button from 'components/UI-kit/Buttons/Button'
import telegram from '../../../public/icons/Telegram_logo.svg'
import ContactModal from 'components/Modals/ContactModal/ContactModal'
import Footer from 'components/UI-kit/Footer/Footer'
import { useInView } from 'react-intersection-observer'
import mobileCircle from '../../../public/mobilePlanet.svg'
import Image from 'next/image'

interface EighthScreenProps {
  screenNumber: string
}

const EighthScreen = ({ screenNumber }: EighthScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div
      id='contact'
      ref={ref}
      className={clsx(
        styles.contentBox,
        screenNumber === '7' && styles.active,
        inView && styles.mobileActive
      )}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <div className={styles.flexWrapper}>
        <div className={styles.textBox}>
          <h2>Свяжитесь с нами</h2>
          <p>
            Подайте заявку и мы вам ответим в течение 1 часа. Для интеграции
            достаточно ознакомить нас с вашим бизнесом, показать ваши ресурсы.
          </p>
          <Button variant='outlined' size='medium'>
            Наша служба поддержки:
            <Image src={telegram} alt='telegram' />
            @paykins
          </Button>
        </div>
        <div className={styles.modalBox}>
          <ContactModal />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EighthScreen
