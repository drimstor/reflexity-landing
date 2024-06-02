import Image from 'next/image'
import { StageProps } from '../PaymentMethods/PaymentMethods'
import styles from './PaymentSuccess.module.scss'
import checkIcon from 'public/icons/green-check-circle.svg'
import PaymentTable from '../PaymentConfirm/PaymentTable'
import Button from 'components/UI-kit/Buttons/Button'
import { constructorTableData } from '../PaymentForm/helpers/constructorTableData'
import useMediaQuery from 'hooks/useMediaQuery'
import { useRouter } from 'next/router'

const PaymentSuccess = ({ changeStage, paymentMethod }: StageProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const filteredTableData = constructorTableData(paymentMethod, true, isMobile)
  const router = useRouter()

  return (
    <div className={styles.globalBox}>
      <div className={styles.titleBox}>
        <Image src={checkIcon} alt='checkIcon' />
        <h2>Оплата успешно прошла</h2>
      </div>
      <PaymentTable tableData={filteredTableData} />
      <div className={styles.buttonsBox}>
        <Button
          variant='contained'
          size='small'
          fullWidth
          onClick={() => router.push('/')}
        >
          Вернуться на сайт
        </Button>
      </div>
    </div>
  )
}

export default PaymentSuccess
