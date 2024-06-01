import clsx from 'clsx'
import { icons } from 'components/Exchanger/ExchangerLayout/constants'
import PaymentForm from 'components/Payments/PaymentForm/PaymentForm'
import Head from 'next/head'
import styles from 'src/styles/payment.module.scss'

const PaymentPage = () => {
  return (
    <main className={styles.background}>
      <Head>
        <title>Выбор способа оплаты</title>
      </Head>
      <div className={styles.leftCircles}>
        <div className={styles.circleBox}>
          {icons.slice(1).map((circle, index) => (
            <div className={clsx(styles['circle' + (index + 1)])} key={index} />
          ))}
        </div>
      </div>
      <PaymentForm />
      <div className={styles.rightCircles}>
        <div className={styles.circleBox}>
          {icons.slice(1).map((circle, index) => (
            <div className={clsx(styles['circle' + (index + 1)])} key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default PaymentPage
