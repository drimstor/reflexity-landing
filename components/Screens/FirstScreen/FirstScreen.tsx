import React from 'react'
import styles from './FirstScreen.module.scss'
import logo from '../../../public/paikinsLogo.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import { useRouter } from 'next/router'

interface FirstScreenProps {
  onScrollToScreenCallback: (screen: string) => void
  isMobile: boolean
}

const FirstScreen = ({
  onScrollToScreenCallback,
  isMobile,
}: FirstScreenProps) => {
  const router = useRouter()
  const scrollToForm = () => {
    onScrollToScreenCallback('7')
    if (isMobile) router.push('#contact')
  }
  return (
    <div className={styles.contentBox}>
      <Image src={logo} width={440} alt='circle' />
      <span>Уникальное платежное решение для вашего бизнеса</span>
      <Button
        className={styles.connnectBtn}
        variant='contained'
        size='medium'
        onClick={scrollToForm}
      >
        Свяжитесь с нами
      </Button>
    </div>
  )
}

export default FirstScreen
