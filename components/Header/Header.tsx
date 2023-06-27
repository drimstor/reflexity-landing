import clsx from 'clsx'
import React from 'react'
import styles from './Header.module.scss'
import logo from '../../public/bitconceLogo.svg'
import angleDownIcon from '../../public/icons/angle-down.svg'
import globeIcon from '../../public/icons/globe.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/UI-kit/Buttons/Button'

const navLinks = [
  { title: 'Почему мы?', link: '#' },
  { title: 'Как это работает?', link: '#' },
  { title: 'О компании', link: '#' },
  { title: 'Связаться', link: '#' },
]

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={clsx('wrapper', styles.wrapper)}>
        <Image width={120} src={logo} alt='logo' />
        <div className={styles.menu}>
          <ul className={styles.nav}>
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.languageSelect}>
            <Image src={globeIcon} alt='globe' />
            <span>RUS</span>
            <Image src={angleDownIcon} alt='angleDownIcon' />
          </div>
          <Button variant='contained' size='small'>
            Войти в кабинет
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
