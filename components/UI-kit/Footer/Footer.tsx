import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved Bitconce 2023 (c)</span>
      <ul>
        <li>
          <a href='#'>Пользовательское соглашение</a>
        </li>
        <li>
          <a href='#'>Политика конфиденциальности</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
