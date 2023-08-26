import { Inter } from '@next/font/google'
import clsx from 'clsx'
import Footer from 'components/UI-kit/Footer/Footer'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from 'src/styles/policy.module.scss'
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
})

const navMenu = [
  {
    title: 'Введение',
    link: '#introduction',
  },
  {
    title: 'API токен',
    link: '#api',
  },
  {
    title: 'Общая информация',
    link: '#info',
  },
  {
    title: 'Покупка криптовалюты',
    link: '#buy',
  },
  {
    title: 'Выводы',
    link: '#conclusion',
  },
]

function Privacy() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const html = typeof window !== 'undefined' && document.querySelector('html')
  const [activeItenIndex, setActiveItenIndex] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.body.classList.add('canScroll')
    if (html) html.classList.add('canScroll')

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('canScroll')
      if (html) html.classList.remove('canScroll')
    }
  }, [])

  const onClickHandler = (anchor: string) => {
    const anchorElement = document.getElementById(anchor)
    scrollTo({
      top: (anchorElement?.offsetTop ?? 0) + (isMobile ? 30 : 80),
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    let activeBlockIndex = 0

    for (let i = navMenu.length - 1; i >= 0; i--) {
      const blockElement = document.getElementById(navMenu[i].link)
      if (blockElement && scrollPosition >= blockElement.offsetTop) {
        activeBlockIndex = i
        break
      }
    }

    setActiveItenIndex(activeBlockIndex)
  }

  return (
    <main id='body' className={clsx(inter.className, styles.pageBox)}>
      <Head>
        <title>Privacy policy</title>
      </Head>
      <Header
        screenNumber={'0'}
        isMobile={isMobile}
        onScrollToScreenCallback={() => console.log('')}
        isSidePage
      />
      <div className={clsx('wrapper', styles.wrapper)}>
        <h1>Политика конфиденциальности</h1>

        <div className={styles.textsBox}>
          <div className={styles.articlesBox}>
            {navMenu.map((item, index) => (
              <div key={index} id={item.link} className={styles.articleBox}>
                <h2>{item.title}</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Placeat asperiores facilis veniam quasi porro doloribus
                  reiciendis modi, quisquam blanditiis a inventore dicta vero
                  corporis nobis, voluptas labore facere fuga. Iure.Lorem ipsum
                  dolor sit, amet consectetur adipisicing elit. Placeat
                  asperiores facilis veniam quasi porro doloribus reiciendis
                  modi, quisquam blanditiis a inventore dicta vero corporis
                  nobis, voluptas labore facere fuga. Iure.Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit. Placeat asperiores
                  facilis veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure. Iure.Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Placeat asperiores facilis
                  veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Placeat asperiores facilis
                  veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure.Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Placeat asperiores facilis
                  veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure.Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Placeat asperiores facilis
                  veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure. Iure.Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Placeat asperiores facilis
                  veniam quasi porro doloribus reiciendis modi, quisquam
                  blanditiis a inventore dicta vero corporis nobis, voluptas
                  labore facere fuga. Iure.
                </p>
              </div>
            ))}
          </div>
          <div className={styles.stickyWrapper}>
            <div className={styles.stickyBox}>
              {navMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => onClickHandler(item.link)}
                  className={clsx(activeItenIndex === index && styles.active)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Privacy
