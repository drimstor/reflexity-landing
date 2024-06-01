import { getPaymentData } from './getPaymentData'
import styles from '../../PaymentConfirm/PaymentConfirm.module.scss'
import CopyButton from 'components/UI-kit/CopyButton/CopyButton'
import Image from 'next/image'
import getShortString from './getShortString'

export const constructorTableData = (
  paymentMethod: string,
  lastStage?: boolean,
  isMobile?: boolean
) => {
  const { group, method } = getPaymentData(paymentMethod)

  const currencyValue =
    group?.id === 'rus'
      ? 'RUB'
      : group?.id === 'kz'
      ? 'KZT'
      : method?.value.split(' ')[0]

  const merchantTitle = group?.id === 'crypt' ? 'Валюта перевода' : 'Банк'

  const recipientTitle =
    group?.id === 'crypt' ? 'Адрес кошелька' : 'Номер карты'

  const recipientValue =
    group?.id === 'crypt' ? (
      isMobile ? (
        getShortString('98734698gdf7t28372gd3872978f')
      ) : (
        '98734698gdf7t28372gd3872978f'
      )
    ) : lastStage ? (
      '1234 1234 1234 1234'
    ) : (
      <div className={styles.merchantBox}>
        <CopyButton
          visibleText='1234 1234 1234 1234'
          value='1234 1234 1234 1234'
        />{' '}
      </div>
    )

  const tableData = [
    {
      title: recipientTitle,
      value: recipientValue,
    },
    {
      title: 'Сумма',
      value: (
        <div className={styles.merchantBox}>
          520 {currencyValue}{' '}
          {!lastStage && group?.id === 'crypt' && <CopyButton value='520' />}
        </div>
      ),
    },
    {
      title: merchantTitle,
      value: (
        <div className={styles.merchantBox}>
          <Image src={method?.icon} alt={method?.value ?? ''} /> {method?.label}
        </div>
      ),
    },
    {
      title: 'Номер заявки',
      value: '12345678',
    },
  ]

  return !lastStage && group?.id === 'crypt' ? tableData.slice(1) : tableData
}
