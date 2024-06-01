import styles from './PaymentForm.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
import PaymentMethods from '../PaymentMethods/PaymentMethods'
import PaymentConfirm from '../PaymentConfirm/PaymentConfirm'
import PaymentWaiting from '../PaymentWaiting/PaymentWaiting'
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess'

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('')

  const [stage, setStage] = useState('PaymentMethods')
  const changeStage = (value: string) => {
    setStage(value)
  }

  return (
    <div
      className={clsx(
        styles.globalBox,
        stage === 'PaymentSuccess' && styles.bordered
      )}
    >
      {stage === 'PaymentMethods' && (
        <PaymentMethods
          changeStage={changeStage}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      )}
      {stage === 'PaymentConfirm' && (
        <PaymentConfirm
          changeStage={changeStage}
          paymentMethod={paymentMethod}
        />
      )}
      {stage === 'PaymentWaiting' && (
        <PaymentWaiting
          changeStage={changeStage}
          paymentMethod={paymentMethod}
        />
      )}
      {stage === 'PaymentSuccess' && (
        <PaymentSuccess
          changeStage={changeStage}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  )
}

export default PaymentForm
