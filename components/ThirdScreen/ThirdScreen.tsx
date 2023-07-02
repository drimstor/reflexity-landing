import React, { useEffect, useState } from 'react'
import styles from './ThirdScreen.module.scss'
import circle from '../../public/icons/circle-vector.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import clsx from 'clsx'

interface ThirdScreenProps {
  screenNumber: string
  isScrollLock: boolean
}

const animateFramesConfig: animateFramesConfigType = {
  '2_1': {
    title: 'Гарантии',
    text1: 'Гарантируем быструю обработку ваших',
    text2: 'платежей, безопасность транзакций и высокую',
    text3: 'конвертацию из заявки в успешную оплату',
    reverse: false,
  },
  '2_2': {
    title: 'Оплата банковским переводом',
    text1: 'Под каждую заявку вашего клиента мы',
    text2: 'подберем и выдадим реквизит нужного банка',
    reverse: true,
  },
  '2_3': {
    title: 'Электронные кошельки',
    text1: 'Возможность оплат товаров и услуг при помощи',
    text2: 'электронных кошельков - Qiwi, YooMoney',
    reverse: false,
  },
  '2_4': {
    title: 'Платежи на сим-карты',
    text1: 'Самый простой способ оплаты для клиента - ',
    text2: 'пополнение мобильного счета',
    reverse: true,
  },
  '2_5': {
    title: 'Альтернативные возможности',
    text1: 'Мы можем подобрать индивидуальное',
    text2: 'оптимальное решение под любой бизнес',
    reverse: false,
    button: true,
  },
}

interface animateFramesConfigType {
  [key: string]: {
    title: string
    text1: string
    text2: string
    text3?: string
    reverse: boolean
    button?: boolean
  }
}

const ThirdScreen = ({ screenNumber, isScrollLock }: ThirdScreenProps) => {
  const [frameChanged, setFrameChanged] = useState(false)
  const [animateItem, setAnimateItem] = useState(animateFramesConfig['2_1'])

  useEffect(() => {
    setFrameChanged(true)
    const timer = setTimeout(() => setFrameChanged(false), 1000)

    const timer2 = setTimeout(
      () => setAnimateItem(animateFramesConfig[screenNumber]),
      500
    )
  }, [screenNumber])

  return (
    <div
      className={clsx(
        styles.contentBox,
        screenNumber.includes('2_') && styles.active
      )}
    >
      <h2>Почему мы</h2>
      {animateItem && (
        <div
          className={clsx(
            styles.textBox,
            frameChanged && styles.hide,
            animateItem.reverse && styles.reverse,
            styles['screen' + screenNumber]
          )}
        >
          <h3>{animateItem.title}</h3>
          <div className={styles.circle}>
            <Image src={circle} alt='circle' />
          </div>
          <ul>
            <li>{animateItem.text1}</li>
            <li>{animateItem.text2}</li>
            {animateItem.text3 && <li>{animateItem.text3}</li>}
          </ul>
          {animateItem.button && (
            <Button variant='contained' size='large'>
              Присоединиться
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ThirdScreen
