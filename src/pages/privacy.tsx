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
    title: '1. Introduction',
    link: '#introduction',
    text: [
      'Reflexity (“we,” “our,” “us”) provides a mobile application designed to help users record thoughts, set goals, and receive AI-based insights. This Privacy Policy explains how we collect, use, and protect your personal data.',
    ],
  },
  {
    title: '2. Data We Collect',
    link: '#dataWeCollect',
    text: [
      'We collect the following categories of information:',
      <>
        <ul>
          <li>
            <b>Personal Information:</b> name, email, profile photo, age,
            gender, country.
          </li>
          <li>
            <b>App Content:</b> journal entries, chat messages, goals,
            summaries, test results, and other generated content.
          </li>
          <li>
            <b>Device &amp; Analytics Data:</b> device information, usage
            statistics, and event data collected through <b>Amplitude</b>.
          </li>
          <li>
            <b>Login Data:</b> if you sign in with Google or Apple, we receive
            authentication information provided by these services.
          </li>
        </ul>
      </>,
    ],
  },
  {
    title: '3. How We Use Your Data',
    link: '#howWeUseYourData',
    text: [
      'Your data is used to:',
      <>
        <ul>
          <li>Personalize your experience and app content.</li>
          <li>Generate AI responses and summaries using OpenAI API.</li>
          <li>Analyze app usage to improve performance and user experience.</li>
          <li>Provide user insights and visualized analytics.</li>
        </ul>
      </>,
    ],
  },
  {
    title: '4. Data Sharing',
    link: '#dataSharing',
    text: [
      'We only share limited data with trusted third-party services:',
      <>
        <ul>
          <li>
            <b>Amplitude</b> &mdash; analytics and usage tracking.
          </li>
          <li>
            <b>OpenAI API</b> &mdash; used temporarily to generate AI-based
            content.
          </li>
        </ul>
        <p>We do not sell or disclose your data to any other third parties.</p>
      </>,
    ],
  },
  {
    title: '5. Data Storage and Deletion',
    link: '#dataStorageAndDeletion',
    text: [
      <>
        You can request to delete your account and all associated data at any
        time via app settings or by contacting us at{' '}
        <a href='mailto:reflexity.business@gmail.com'>
          reflexity.business@gmail.com
        </a>
        .
      </>,
      'We store your information securely and only for as long as necessary to provide our services.',
    ],
  },
  {
    title: '6. Legal Basis and Jurisdiction',
    link: '#legalBasisAndJurisdiction',
    text: [
      <>
        This Privacy Policy is governed by the laws of <b>Armenia</b>.
      </>,
    ],
  },
  {
    title: '7. Children’s Privacy',
    link: '#childrensPrivacy',
    text: ['Reflexity is not intended for individuals under the age of 13.'],
  },
  {
    title: '8. Updates to This Policy',
    link: '#updatesToThisPolicy',
    text: [
      'We may update this Privacy Policy from time to time. Continued use of the app means you accept the updated version.',
    ],
  },
]

function Privacy() {
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
        <title>Privacy Policy | Reflexity</title>
      </Head>
      <Header
        screenNumber={'0'}
        isMobile={isMobile}
        onScrollToScreenCallback={() => console.log('')}
        isSidePage
      />
      <div className={clsx('wrapper', styles.wrapper)}>
        <h1>Privacy Policy</h1>

        <div className={styles.textsBox}>
          <div className={styles.articlesBox}>
            {navMenu.map((item, index) => (
              <div
                key={index}
                id={item.link}
                className={clsx(index === 5 && styles.six, styles.articleBox)}
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
                    <div key={index}>{text}</div>
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

export default Privacy
