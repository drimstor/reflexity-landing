import Header from 'components/UI-kit/Header/Header'
import Footer from 'components/UI-kit/Footer/Footer'
import styles from 'src/styles/404.module.scss'
import FourOhFourImg from 'public/404.svg'
import clsx from 'clsx'
import mainCircle from 'public/mainCircle.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import { useRouter } from 'next/router'
import useMediaQuery from 'hooks/useMediaQuery'

export default function FourOhFour() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <main className={clsx(styles.pageBox)}>
      <Header
        screenNumber={'0'}
        isMobile={isMobile}
        onScrollToScreenCallback={() => console.log('')}
        isSidePage
      />

      <div className={clsx(styles.shadowBox)}>
        <Image className={styles.planet} src={mainCircle} alt='circle' />
        <div className={clsx(styles.shadow)} />
      </div>

      <div className={styles.contentBox}>
        <Image src={FourOhFourImg} alt='404' />
        <span>Страница не найдена</span>
        <Button
          variant='contained'
          size='small'
          onClick={() => router.push('/')}
        >
          Вернуться на главную
        </Button>
      </div>

      <Footer />
    </main>
  )
}
