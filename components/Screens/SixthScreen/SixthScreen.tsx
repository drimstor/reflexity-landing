import React from 'react'
import styles from './SixthScreen.module.scss'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'
import ExchangerChart from 'components/Exchanger/ExchangerChart/ExchangerChart'

interface SixthScreenProps {
  screenNumber: string 
}

const SixthScreen = ({ screenNumber }: SixthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '5' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout>
          <ExchangerChart />
        </ExchangerLayout>
      </div>
    </div>
  )
}

export default SixthScreen
