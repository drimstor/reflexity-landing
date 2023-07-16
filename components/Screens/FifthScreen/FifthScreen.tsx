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

interface FifthScreenProps {
  screenNumber: string
}

const FifthScreen = ({ screenNumber }: FifthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '4' && styles.active)}
    >
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h3>История баланса</h3>
          <p>
            Гарантируем быструю обработку ваших платежей, безопасность
            транзакций и высокую конвертацию из заявки в успешную оплату
          </p>
        </div>
        <ExchangerLayout isActive={screenNumber === '4'} isAnotherTable>
          <ExchangerTable
            isActive={screenNumber === '4'}
            control={secondTableControl}
            thData={secondTableTH}
            tdData={secondTableTD}
            isAnotherTable
          />
        </ExchangerLayout>
        <TableTransferModal isActive={screenNumber === '4'} />
      </div>
    </div>
  )
}

export default FifthScreen
