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
import { useInView } from 'react-intersection-observer'
import mobileCircle from '../../../public/mobilePlanet.svg'
import Image from 'next/image'

interface FourthScreenProps {
  screenNumber: string
  isMobile: boolean
  isNoAnimation: string[]
}

const FourthScreen = ({
  screenNumber,
  isMobile,
  isNoAnimation,
}: FourthScreenProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const noAnimation = isNoAnimation.includes('3')
  return (
    <div
      className={clsx(
        styles.contentBox,
        (screenNumber === '3' || inView || noAnimation) && styles.active
      )}
      id='about'
      ref={ref}
    >
      <Image className={styles.mobilePlanet} src={mobileCircle} alt='circle' />
      <div
        className={clsx(
          styles.container,
          !isMobile && screenNumber !== '3' && styles.hide
        )}
      >
        <ExchangerLayout
          isNoAnimation={noAnimation}
          isActive={screenNumber === '3' || inView}
        >
          <ExchangerTable
            isNoAnimation={noAnimation}
            isActive={screenNumber === '3' || inView}
            tabs={firstTableTabs}
            control={firstTableControl}
            thData={firstTableTH}
            tdData={firstTableTD}
          />
        </ExchangerLayout>
        <TableRequestModal
          isActive={screenNumber === '3' || inView}
          isNoAnimation={noAnimation}
        />
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
