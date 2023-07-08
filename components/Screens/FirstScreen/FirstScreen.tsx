import React from 'react'
import styles from './FirstScreen.module.scss'
import logo from '../../../public/bitconceLogo.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'

const FirstScreen = () => {
  return (
    <div className={styles.contentBox}>
      <Image src={logo} width={440} alt='circle' />
      <span>Уникальное платежное решение для вашего бизнеса</span>
      <Button className={styles.connnectBtn} variant='contained' size='medium'>
        Свяжитесь с нами
      </Button>
    </div>
  )
}

export default FirstScreen
