import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved Paykins 2023 (c)</span>
      <ul>
        <li>
          <a target='_blank' href='/terms'>
            Пользовательское соглашение
          </a>
        </li>
        <li>
          <a target='_blank' href='/privacy'>
            Политика конфиденциальности
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
