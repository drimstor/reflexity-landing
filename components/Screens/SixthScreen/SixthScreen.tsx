import React from 'react'
import styles from './SixthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerChart from 'components/Exchanger/ExchangerChart/ExchangerChart'
import Button from 'components/UI-kit/Buttons/Button'

interface SixthScreenProps {
  screenNumber: string
}

const SixthScreen = ({ screenNumber }: SixthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '5' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout isActive={screenNumber === '5'}>
          <ExchangerChart isActive={screenNumber === '5'} />
        </ExchangerLayout>
        <div className={styles.textBox}>
          <h3>Статистика</h3>
          <p>
            Гарантируем быструю обработку ваших платежей, безопасность
            транзакций и высокую конвертацию из заявки в успешную оплату
          </p>
          <Button variant='contained' size='medium'>
            Присоединиться
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SixthScreen
