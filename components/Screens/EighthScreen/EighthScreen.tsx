import clsx from 'clsx'
import ContactModal from 'components/Modals/ContactModal/ContactModal'
import Button from 'components/UI-kit/Buttons/Button'
import Footer from 'components/UI-kit/Footer/Footer'
import Image from 'next/image'
import mobileCircle from 'public/mobilePlanet.svg'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Snackbar from '../../UI-kit/Notifications/Snackbar/Snackbar'
import styles from './EighthScreen.module.scss'

interface EighthScreenProps {
  screenNumber: string
}

const EighthScreen = ({ screenNumber }: EighthScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [showSnackbar, setShowSnackbar] = useState(false)

  const onClickHandler = () => {
    navigator.clipboard.writeText('reflexity.business@gmail.com')
    setShowSnackbar(true)
  }

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => setShowSnackbar(false), 5000)
    }
  }, [showSnackbar])

  return (
    <>
      {showSnackbar && <Snackbar value='Скопировано' />}
      <div
        id='contact'
        ref={ref}
        className={clsx(
          styles.contentBox,
          screenNumber === '7' && styles.active,
          inView && styles.mobileActive
        )}
      >
        <Image
          className={styles.mobilePlanet}
          src={mobileCircle}
          alt='circle'
        />
        <div className={styles.flexWrapper}>
          <div className={styles.textBox}>
            <h2>Свяжитесь с нами</h2>
            <p>
              Оставьте обратную связь, и мы ответим вам в ближайшее время. Мы
              будем рады услышать ваше мнение и ответить на ваши вопросы.
            </p>
            <Button variant='outlined' size='medium' onClick={onClickHandler}>
              Наша почта:
              <span>reflexity.business@gmail.com</span>
            </Button>
          </div>
          <div className={styles.modalBox}>
            <ContactModal />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default EighthScreen
