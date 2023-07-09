import React from 'react'
import styles from './FifthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerTable from 'components/Exchanger/ExchangerTable/ExchangerTable'
import {
  firstTableTD,
  firstTableTH,
  secondTableControl,
  secondTableTD,
  secondTableTH,
} from 'components/Exchanger/ExchangerLayout/constants'

interface FifthScreenProps {
  screenNumber: string
}

const FifthScreen = ({ screenNumber }: FifthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '4' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout>
          <ExchangerTable
            control={secondTableControl}
            thData={secondTableTH}
            tdData={secondTableTD}
          />
        </ExchangerLayout>
      </div>
    </div>
  )
}

export default FifthScreen
