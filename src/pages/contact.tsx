import clsx from 'clsx'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import Head from 'next/head'
import styles from 'src/styles/contact.module.scss'
import LastPlanet from '../../components/Planet/LastPlanet'
import EighthScreen from '../../components/Screens/EighthScreen/EighthScreen'

function Contact() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <main className={clsx(styles.pageBox)}>
      <Head>
        <title>Contact Us| Reflexity</title>
      </Head>
      <Header
        screenNumber={'0'}
        isMobile={isMobile}
        onScrollToScreenCallback={() => console.log('')}
        isSidePage
      />
      <div className={styles.pageBox}>
        <EighthScreen screenNumber={'7'} />
      </div>
      <LastPlanet screenNumber={'8'} isPause={!isMobile} />
    </main>
  )
}

export default Contact
