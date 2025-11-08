import Image from 'next/image'
import Button from '../../UI-kit/Buttons/Button'
import styles from './FirstScreen.module.scss'

const FirstScreen = () => {
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
      Journal your thoughts, set goals — and watch as <span>Reflexity</span>{' '}
      builds a map of your inner world.
    </>
  )
  const descriptionRu = (
    <>
      Записывайте мысли, ставьте цели — и наблюдайте, как <span>Reflexity</span>{' '}
      строит карту вашего внутреннего мира.
    </>
  )
  return (
    <div className={styles.contentBox}>
      <Button
        variant='outlined'
        className={styles.chipBtn}
        size='small'
        onClick={() => {}}
      >
        <Image
          src='/icons/star-diamong-icon.png'
          alt='credit'
          width={22}
          height={22}
        />
        New Generation AI
      </Button>
      <h1>{lang === 'ru' ? titleRu : titleEn}</h1>
      <p>{lang === 'ru' ? descriptionRu : descriptionEn}</p>
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
  )
}

export default FirstScreen
