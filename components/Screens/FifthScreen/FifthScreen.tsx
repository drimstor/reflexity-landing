import React from 'react'
import styles from './FifthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerTable from 'components/Exchanger/ExchangerTable/ExchangerTable'
import {
  secondTableControl,
  secondTableTD,
  secondTableTH,
} from 'components/Exchanger/ExchangerLayout/constants'
import TableTransferModal from 'components/Modals/TableTransferModal/TableTransferModal'
import { useInView } from 'react-intersection-observer'

interface FifthScreenProps {
  screenNumber: string
  isMobile: boolean
  isNoAnimation: string[]
}

const FifthScreen = ({
  screenNumber,
  isMobile,
  isNoAnimation,
}: FifthScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const noAnimation = isNoAnimation.includes('3')
  return (
    <div
      className={clsx(
        styles.contentBox,
        (screenNumber === '4' || inView || noAnimation) && styles.active
      )}
      ref={ref}
    >
      <div
        className={clsx(
          styles.container,
          !isMobile && screenNumber !== '4' && styles.hide
        )}
      >
        <div className={styles.textBox}>
          <h3>История баланса</h3>
          <p>
            Гарантируем быструю обработку ваших платежей, безопасность
            транзакций и высокую конвертацию из заявки в успешную оплату
          </p>
        </div>
        <ExchangerLayout
          isActive={screenNumber === '4' || inView || noAnimation}
          isAnotherTable
          isNoAnimation={noAnimation}
        >
          <ExchangerTable
            isActive={screenNumber === '4' || inView || noAnimation}
            control={secondTableControl}
            thData={secondTableTH}
            tdData={secondTableTD}
            isAnotherTable
            isNoAnimation={noAnimation}
          />
        </ExchangerLayout>
        <TableTransferModal
          isActive={screenNumber === '4' || inView || noAnimation}
          isNoAnimation={noAnimation}
        />
      </div>
    </div>
  )
}

export default FifthScreen
