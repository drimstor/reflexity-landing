import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'
// import logo from '../../../public/bitconceLogo.svg'
import miniLogo from '../../../public/bitconceMiniLogo.svg'
import logo from '../../../public/paikinsLogo.svg'
import angleDownIcon from '../../../public/icons/angle-down.svg'
import globeIcon from '../../../public/icons/globe.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/UI-kit/Buttons/Button'
import useClickOutside from 'hooks/useClickOutside'
import { languages, navItems } from './constants'

interface iHeader {
  scrollToScreenCallback: any
  screenNumber: string
}

const Header = ({ screenNumber, scrollToScreenCallback }: iHeader) => {
  const languageSelectRef = useRef(null)
  const languageSelectBoxRef = useRef(null)
  const [isShowLanguageSelect, setIsShowLanguageSelect] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(0)

  const currentRef = isShowLanguageSelect
    ? languageSelectBoxRef
    : languageSelectRef

  useClickOutside(currentRef, () => setIsShowLanguageSelect(false))

  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false)

  const [activeHeaderItem, setActiveHeaderItem] = useState<null | number>(null)

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

  return (
    <header className={styles.header}>
      <div className={clsx('wrapper', styles.wrapper)}>
        <a href=''>
          <Image className={styles.logo} width={120} src={logo} alt='logo' />
        </a>
        <a href=''>
          <Image
            className={styles.miniLogo}
            width={48}
            src={miniLogo}
            alt='logo'
          />
        </a>
        <div className={styles.menu}>
          <nav className={clsx(styles.nav, isShowBurgerMenu && styles.show)}>
            <ul className={styles.navItems}>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className={clsx(
                      activeHeaderItem === index && styles.active
                    )}
                    href={'#'}
                    onClick={() => scrollToScreenCallback(item.link)}
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
            className={styles.languageSelectBox}
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
                isShowLanguageSelect && styles.show
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
            className={clsx(
              styles.burgerButton,
              isShowBurgerMenu && styles.active
            )}
            onClick={() => setIsShowBurgerMenu(!isShowBurgerMenu)}
          >
            <span />
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
