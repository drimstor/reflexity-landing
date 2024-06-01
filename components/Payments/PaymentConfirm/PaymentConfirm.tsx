import Button from 'components/UI-kit/Buttons/Button'
import styles from './PaymentConfirm.module.scss'
import PaymentInfoBlock from './PaymentInfoBlock'
import PaymentTable from './PaymentTable'
import { StageProps } from '../PaymentMethods/PaymentMethods'
import { getPaymentData } from '../PaymentForm/helpers/getPaymentData'
import Image from 'next/image'
import qrIcon from 'public/QR Code.svg'
import CopyButton from 'components/UI-kit/CopyButton/CopyButton'
import { constructorTableData } from '../PaymentForm/helpers/constructorTableData'

const PaymentConfirm = ({ changeStage, paymentMethod }: StageProps) => {
  const { group } = getPaymentData(paymentMethod)
  const filteredTableData = constructorTableData(paymentMethod)

  return (
    <div className={styles.globalBox}>
      <h2>Подтверждение оплаты</h2>
      <div className={styles.titleBox}>
        <PaymentInfoBlock content='Для того, чтобы завершить покупку, переведите необходимую сумму на карту и нажмите “Я оплатил”' />
      </div>
      {group?.id === 'crypt' && (
        <div className={styles.qrBox}>
          <Image src={qrIcon} alt='qr' />
          <div className={styles.adressBox}>
            <span>Адрес кошелька</span>
            <CopyButton
              visibleText='98734698gdf7t28372gd3872978f'
              value='98734698gdf7t28372gd3872978f'
            />
          </div>
        </div>
      )}
      <PaymentTable tableData={filteredTableData} />
      <div className={styles.buttonsBox}>
        <Button
          size='small'
          variant='outlined'
          fullWidth
          onClick={() => changeStage('PaymentMethods')}
        >
          Отменить
        </Button>
        <Button
          size='small'
          variant='contained'
          fullWidth
          onClick={() => changeStage('PaymentWaiting')}
        >
          Я оплатил
        </Button>
      </div>
    </div>
  )
}

export default PaymentConfirm
