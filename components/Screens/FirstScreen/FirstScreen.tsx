import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './FirstScreen.module.scss'

interface FirstScreenProps {
  onScrollToScreenCallback: (screen: string) => void
  isMobile: boolean
}

const FirstScreen = ({
  onScrollToScreenCallback,
  isMobile,
}: FirstScreenProps) => {
  const router = useRouter()
  const scrollToForm = () => {
    onScrollToScreenCallback('7')
    if (isMobile) router.push('#contact')
  }

  const lang = 'ru'

  const titleEn = (
    <>
      Your personal <br /> <span>AI Life Manager</span>
    </>
  )
  const titleRu = (
    <>
      Ваш личный <br /> <span>ИИ-лайф-менеджер</span>
    </>
  )
  const descriptionEn = (
    <>
      Journal your thoughts, set goals, find patterns — and watch as{' '}
      <span>Reflexity</span> builds a map of your inner world.
    </>
  )
  const descriptionRu = (
    <>
      Записывайте мысли, ставьте цели, находите закономерности — и наблюдайте,
      как <span>Reflexity</span> строит карту вашего внутреннего мира.
    </>
  )
  return (
    <>
      <div className={styles.contentBox}>
        <h1>{lang === 'ru' ? titleRu : titleEn}</h1>
        <p>{lang === 'ru' ? descriptionRu : descriptionEn}</p>
        {/* <Image
          className={styles.screenshot}
          src='/Screenshot.png'
          alt='screenshot'
          width={480}
          height={1000}
        /> */}
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
    </>
  )
}

export default FirstScreen
