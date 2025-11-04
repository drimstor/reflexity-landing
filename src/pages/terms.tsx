import clsx from 'clsx'
import Footer from 'components/UI-kit/Footer/Footer'
import Header from 'components/UI-kit/Header/Header'
import useMediaQuery from 'hooks/useMediaQuery'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from 'src/styles/policy.module.scss'

const navMenu = [
  {
    title: '1. Acceptance of Terms',
    link: '#acceptanceOfTerms',
    text: [
      'By downloading or using Reflexity, you agree to these Terms of Use and our Privacy Policy.',
    ],
  },
  {
    title: '2. Use of the App',
    link: '#useOfTheApp',
    text: [
      'Reflexity is designed for self-reflection, journaling, and personal growth.',
      'You agree to use the app only for lawful purposes and not to upload offensive, harmful, or illegal content.',
    ],
  },
  {
    title: '3. User Content',
    link: '#userContent',
    text: [
      'You retain ownership of the content you create (notes, messages, goals, etc.).',
      'By using Reflexity, you grant us a limited license to process this content solely to provide app functionality and AI-based insights.',
    ],
  },
  {
    title: '4. AI-Generated Content',
    link: '#aiGeneratedContent',
    text: [
      'AI-generated messages, summaries, and insights are provided “as is.”',
      'We do not guarantee the accuracy or completeness of AI outputs.',
      'You are solely responsible for decisions made based on AI content.',
    ],
  },
  {
    title: '5. Subscription and Payments',
    link: '#subscriptionAndPayments',
    text: [
      'Reflexity offers optional paid subscriptions.',
      'Payments are processed through App Store or Google Play under their respective terms.',
      'You may cancel your subscription anytime via your store account settings.',
    ],
  },
  {
    title: '6. Limitation of Liability',
    link: '#limitationOfLiability',
    text: [
      'We are not liable for any damages arising from the use or inability to use the app, including AI-generated advice or insights.',
    ],
  },
  {
    title: '7. Termination',
    link: '#termination',
    text: [
      'We reserve the right to suspend or terminate access to Reflexity in case of misuse or violation of these terms.',
    ],
  },
  {
    title: '8. Governing Law',
    link: '#governingLaw',
    text: [
      <>
        These Terms are governed by the laws of <b>Armenia</b>.
      </>,
    ],
  },
  {
    title: '9. Contact',
    link: '#contact',
    text: [
      <>
        For questions or support, contact{' '}
        <a href='mailto:reflexity.business@gmail.com'>
          reflexity.business@gmail.com
        </a>
        .
      </>,
    ],
  },
]

function Terms() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const html = typeof window !== 'undefined' && document.querySelector('html')
  const [activeItenIndex, setActiveItenIndex] = useState(0)
  const stickyBox = useRef<HTMLDivElement>(null)
  const [isStickedMenu, setIsStickedMenu] = useState(false)

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

    if (isMobile && stickyBox.current) {
      if (scrollPosition >= stickyBox.current?.offsetTop + 30) {
        setIsStickedMenu(true)
      } else {
        setIsStickedMenu(false)
      }
    }

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
    <main className={clsx(styles.pageBox)}>
      <Head>
        <title>Terms of Use | Reflexity</title>
      </Head>
      <Header
        screenNumber={'0'}
        isMobile={isMobile}
        onScrollToScreenCallback={() => console.log('')}
        isSidePage
      />
      <div className={clsx('wrapper', styles.wrapper)}>
        <h1>Terms of Use</h1>

        <div className={styles.textsBox}>
          <div className={styles.articlesBox}>
            {navMenu.map((item, index) => (
              <div
                key={index}
                id={item.link}
                className={clsx(styles.articleBox)}
              >
                <h2>{item.title}</h2>
                {item.text.map((text, index) =>
                  Array.isArray(text) ? (
                    <ul key={index}>
                      {text.map((li, key) => (
                        <li key={key}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={index}>{text}</p>
                  )
                )}
              </div>
            ))}
          </div>
          <div className={styles.stickyWrapper} ref={stickyBox}>
            <div
              className={clsx(
                styles.stickyBox,
                isStickedMenu && styles.stickedMenu
              )}
            >
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

export default Terms
