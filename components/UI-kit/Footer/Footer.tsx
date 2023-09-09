import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved Paykins 2023 (c)</span>
      <ul>
        <li>
          <a href='/terms'>Пользовательское соглашение</a>
        </li>
        <li>
          <Link href='/privacy'>Политика конфиденциальности</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
