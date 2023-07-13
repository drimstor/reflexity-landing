import React from 'react'
import styles from './FourthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerTable from 'components/Exchanger/ExchangerTable/ExchangerTable'
import {
  firstTableControl,
  firstTableTabs,
  firstTableTD,
  firstTableTH,
} from 'components/Exchanger/ExchangerLayout/constants'
import TableRequestModal from 'components/Modals/TableRequestModal/TableRequestModal'

interface FourthScreenProps {
  screenNumber: string
}

const FourthScreen = ({ screenNumber }: FourthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '3' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout>
          <ExchangerTable
            tabs={firstTableTabs}
            control={firstTableControl}
            thData={firstTableTH}
            tdData={firstTableTD}
          />
        </ExchangerLayout>
        <TableRequestModal />
      </div>
    </div>
  )
}

export default FourthScreen
