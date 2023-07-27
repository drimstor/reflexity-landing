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
}

const FifthScreen = ({ screenNumber, isMobile }: FifthScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <div
      className={clsx(
        styles.contentBox,
        (screenNumber === '4' || inView) && styles.active
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
          isActive={screenNumber === '4' || inView}
          isAnotherTable
        >
          <ExchangerTable
            isActive={screenNumber === '4' || inView}
            control={secondTableControl}
            thData={secondTableTH}
            tdData={secondTableTD}
            isAnotherTable
          />
        </ExchangerLayout>
        <TableTransferModal isActive={screenNumber === '4' || inView} />
      </div>
    </div>
  )
}

export default FifthScreen
