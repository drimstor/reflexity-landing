import React, { useEffect, useState } from 'react'
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
  // const [animateBlock, setAnimateBlock] = useState<number[]>([])

  // useEffect(() => {
  //   if (screenNumber === '1') {
  //     setTimeout(() => {
  //       blockTextContent.forEach((item, index) => {
  //         addAnimateBlock(index)
  //       })
  //     }, 1000)
  //   } else {
  //     setAnimateBlock([])
  //   }
  // }, [screenNumber])

  // const addAnimateBlock = (number: number) => {
  //   setTimeout(() => {
  //     setAnimateBlock((prev) => [...prev, number])
  //   }, 1000 * number)
  // }

  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '3' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout isActive={screenNumber === '3'}>
          <ExchangerTable
            isActive={screenNumber === '3'}
            tabs={firstTableTabs}
            control={firstTableControl}
            thData={firstTableTH}
            tdData={firstTableTD}
          />
        </ExchangerLayout>
        <TableRequestModal isActive={screenNumber === '3'} />
        <div className={styles.textBox}>
          <h3>Покупка USDT</h3>
          <p>
            Гарантируем быструю обработку ваших платежей, безопасность
            транзакций и высокую конвертацию из заявки в успешную оплату
          </p>
        </div>
      </div>
    </div>
  )
}

export default FourthScreen
