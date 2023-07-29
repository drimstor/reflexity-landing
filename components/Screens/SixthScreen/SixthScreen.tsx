import React from 'react'
import styles from './SixthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerChart from 'components/Exchanger/ExchangerChart/ExchangerChart'
import Button from 'components/UI-kit/Buttons/Button'
import { InView, useInView } from 'react-intersection-observer'

interface SixthScreenProps {
  screenNumber: string
  isMobile: boolean
}

const SixthScreen = ({ screenNumber, isMobile }: SixthScreenProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <InView triggerOnce>
      <div
        ref={ref}
        className={clsx(
          styles.contentBox,
          (screenNumber === '5' || inView) && styles.active
        )}
      >
        <div
          className={clsx(
            styles.container,
            !isMobile && screenNumber !== '5' && styles.hide
          )}
        >
          <Button
            className={styles.mobileButton}
            variant='contained'
            size='medium'
          >
            Присоединиться
          </Button>
          <ExchangerLayout isActive={screenNumber === '5' || inView}>
            <ExchangerChart isActive={screenNumber === '5' || inView} />
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
    </InView>
  )
}

export default SixthScreen
