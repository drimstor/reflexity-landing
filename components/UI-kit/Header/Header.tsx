import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../../public/logo.png'
import miniLogo from '../../../public/paikinsMiniLogo.svg'
import angleDownIcon from '../../../public/icons/angle-down.svg'
import globeIcon from '../../../public/icons/globe.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/UI-kit/Buttons/Button'
import useClickOutside from 'hooks/useClickOutside'
import { languages, navItems } from './constants'
import { useRouter } from 'next/router'

interface iHeader {
  onScrollToScreenCallback: any
  screenNumber: string
  isMobile: boolean
  isSidePage?: boolean
}

const Header = ({
  screenNumber,
  onScrollToScreenCallback,
  isMobile,
  isSidePage,
}: iHeader) => {
  const router = useRouter()
  const languageSelectRef = useRef(null)
  const languageSelectBoxRef = useRef(null)
  const [isShowLanguageSelect, setIsShowLanguageSelect] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(0)
  const [transitionOn, setTransitionOn] = useState(false)
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false)
  const [activeHeaderItem, setActiveHeaderItem] = useState<null | number>(null)

  const currentRef = isShowLanguageSelect
    ? languageSelectBoxRef
    : languageSelectRef

  useClickOutside(currentRef, () => setIsShowLanguageSelect(false))

  useEffect(() => {
    if (screenNumber.includes('2_')) {
      setActiveHeaderItem(0)
    } else if (
      screenNumber === '3' ||
      screenNumber === '4' ||
      screenNumber === '5'
    ) {
      setActiveHeaderItem(1)
    } else if (screenNumber === '6') {
      setActiveHeaderItem(2)
    } else if (screenNumber === '7') {
      setActiveHeaderItem(3)
    } else {
      setActiveHeaderItem(null)
    }
  }, [screenNumber])

  useEffect(() => {
    const html = document.querySelector('html')

    if (html) {
      if (isShowBurgerMenu) {
        document.body.classList.add('scrollLock')
        html.classList.add('scrollLock')
        document.ontouchmove = function (e) {
          e.preventDefault()
        }
      } else {
        document.body.classList.remove('scrollLock')
        html.classList.remove('scrollLock')
        document.ontouchmove = function () {
          return true
        }
      }
    }

    if (transitionOn === false) {
      setTimeout(() => setTransitionOn(true), 300)
    }

    return () => {
      document.body.classList.remove('scrollLock')
      if (html) html.classList.remove('scrollLock')
    }
  }, [isShowBurgerMenu])

  const clickOnHeaderItem = (screen: string) => {
    setIsShowBurgerMenu(false)
    onScrollToScreenCallback(screen)
  }

  const reloadPage = () => {
    if (router.pathname === '/') location.reload()
  }

  return (
    <header className={styles.header}>
      <div className={clsx('wrapper', styles.wrapper)}>
        <Link className={styles.logo} href='/' onClick={reloadPage}>
          <Image width={30} src={logo} alt='logo' />
          Reflexity
        </Link>
        <Link className={styles.miniLogo} href='/' onClick={reloadPage}>
          <Image width={30} src={logo} alt='logo' />
        </Link>
        <div className={styles.menu}>
          <nav className={clsx(styles.nav, isShowBurgerMenu && styles.show)}>
            <ul className={styles.navItems}>
              {navItems.map((item, index) => (
                <li key={index} onClick={() => clickOnHeaderItem(item.screen)}>
                  <Link
                    className={clsx(
                      activeHeaderItem === index && styles.active
                    )}
                    href={isSidePage ? '/' : isMobile ? `#${item.link}` : '#'}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              className={styles.signInMobile}
              variant='contained'
              size='small'
            >
              Войти в кабинет
            </Button>
          </nav>
          <div
            className={clsx(styles.languageSelectBox)}
            onClick={() => setIsShowLanguageSelect(!isShowLanguageSelect)}
            ref={languageSelectBoxRef}
          >
            <Image src={globeIcon} alt='globe' />
            <span>{languages[currentLanguage]}</span>
            <Image
              src={angleDownIcon}
              alt='angleDownIcon'
              className={clsx(isShowLanguageSelect && styles.rotate)}
            />

            <div
              className={clsx(
                styles.languageSelect,
                isShowLanguageSelect && styles.show,
                transitionOn && styles.transition
              )}
              ref={languageSelectRef}
            >
              {languages.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    styles.languageSelectItem,
                    currentLanguage === index && styles.active
                  )}
                  onClick={() => setCurrentLanguage(index)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className={styles.burgerBox}
            onClick={() => setIsShowBurgerMenu(!isShowBurgerMenu)}
          >
            <div
              className={clsx(
                styles.burgerButton,
                isShowBurgerMenu && styles.active
              )}
            >
              <span />
            </div>
          </div>
          <Button className={styles.signIn} variant='contained' size='small'>
            Войти в кабинет
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
