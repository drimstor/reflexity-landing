import React from 'react'
import styles from './FirstScreen.module.scss'
import logo from '../../../public/paikinsLogo.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'

interface FirstScreenProps {
  onScrollToScreenCallback: (screen: string) => void
}

const FirstScreen = ({ onScrollToScreenCallback }: FirstScreenProps) => {
  return (
    <div className={styles.contentBox}>
      <Image src={logo} width={440} alt='circle' />
      <span>Уникальное платежное решение для вашего бизнеса</span>
      <Button
        className={styles.connnectBtn}
        variant='contained'
        size='medium'
        onClick={() => onScrollToScreenCallback('7')}
      >
        Свяжитесь с нами
      </Button>
    </div>
  )
}

export default FirstScreen
