import styles from './PaymentMethods.module.scss'
import PaymentMethodsItem from '../PaymentMethods/PaymentMethodsItem'
import { listItems } from '../PaymentForm/const/static'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Button from 'components/UI-kit/Buttons/Button'

export interface StageProps {
  changeStage: (value: string) => void
  paymentMethod: string
  setPaymentMethod?: Dispatch<SetStateAction<string>>
}

const PaymentMethods = ({
  changeStage,
  setPaymentMethod,
  paymentMethod,
}: StageProps) => {
  const [activeGroup, setActiveGroup] = useState('')
  const changeActiveGroup = (value: string) => {
    setActiveGroup(value)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setPaymentMethod) setPaymentMethod(event.target.value)
  }

  const onSubmitHandler = () => {
    changeStage('PaymentConfirm')
  }

  return (
    <>
      <h2>Выберите способ оплаты</h2>
      <div className={styles.infoTable}>
        <span>Номер заявки:</span>
        <b>12345678</b>
        <span>Сумма:</span>
        <b>500 RUB</b>
      </div>
      <div className={styles.accordionBox}>
        {listItems.map((item, index) => (
          <PaymentMethodsItem
            key={index}
            item={item}
            activeGroup={activeGroup}
            changeActiveGroup={changeActiveGroup}
            selectedMethod={paymentMethod}
            handleChangeMethod={handleChange}
          />
        ))}
      </div>
      <div className={styles.buttonBox}>
        <Button
          variant='contained'
          size='small-medium'
          fullWidth
          disabled={!paymentMethod}
          onClick={onSubmitHandler}
        >
          Продолжить
        </Button>
      </div>
    </>
  )
}

export default PaymentMethods
