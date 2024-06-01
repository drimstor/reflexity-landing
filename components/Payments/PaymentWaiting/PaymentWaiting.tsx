import { useEffect } from 'react'
import PaymentInfoBlock from '../PaymentConfirm/PaymentInfoBlock'
import { StageProps } from '../PaymentMethods/PaymentMethods'
import styles from './PaymentWaiting.module.scss'
import Loader from 'components/UI-kit/Loaders/Loader'

const PaymentWaiting = ({ changeStage }: StageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => changeStage('PaymentSuccess'), 5000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className={styles.globalBox}>
      <h2>Подтверждение оплаты</h2>
      <div className={styles.titleBox}>
        <PaymentInfoBlock content='На подтверждение оплаты нам потребуется 60 секунд' />
      </div>
      <div className={styles.loaderBox}>
        <Loader />
      </div>
    </div>
  )
}

export default PaymentWaiting
