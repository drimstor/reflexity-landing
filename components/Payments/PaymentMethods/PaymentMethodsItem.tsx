import styles from './PaymentMethods.module.scss'
import arrowDown from '../../../public/icons/angle-down.svg'
import Image from 'next/image'
import RadioButton from 'components/UI-kit/RadioButton/RadioButton'
import { ChangeEvent, useState } from 'react'
import { PaymentsListItem } from '../PaymentForm/const/static'
import clsx from 'clsx'

interface PaymentMethodsItemProps {
  item: PaymentsListItem
  activeGroup: string
  changeActiveGroup: (value: string) => void
  selectedMethod: string
  handleChangeMethod: (event: ChangeEvent<HTMLInputElement>) => void
}

const PaymentMethodsItem = ({
  item,
  activeGroup,
  changeActiveGroup,
  selectedMethod,
  handleChangeMethod,
}: PaymentMethodsItemProps) => {
  const isActiveGroup = activeGroup === item.id
  const openCurrentItem = () => changeActiveGroup(isActiveGroup ? '' : item.id)

  return (
    <div className={styles.accordionItemBox}>
      <div className={styles.accordionItem} onClick={openCurrentItem}>
        <div className={styles.iconBox}>
          <Image src={item.icon} alt='arrow' />
        </div>
        <span>{item.label}</span>
        <Image
          src={arrowDown}
          alt='arrow'
          className={clsx(isActiveGroup && styles.rotate)}
        />
      </div>
      <div
        className={clsx(styles.accordionList)}
        style={{
          height: isActiveGroup ? `${item.list.length * 56}px` : 0,
        }}
      >
        {item.list.map((listItem, index) => (
          <div className={styles.accordionListItem} key={index}>
            <RadioButton
              label={listItem.label}
              icon={listItem.icon}
              checked={selectedMethod === listItem.value}
              onChange={handleChangeMethod}
              value={listItem.value}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethodsItem
