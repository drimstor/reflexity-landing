import React from 'react'
import styles from './TableRequestModal.module.scss'
import closeRedIcon from '../../../public/icons/close-red.svg'
import checkIcon from '../../../public/icons/check-circle.svg'
import arrowIcon from '../../../public/icons/arrow-circle-down.svg'
import closeIcon from '../../../public/icons/close.svg'
import Image from 'next/image'
import clsx from 'clsx'
import Button from 'components/UI-kit/Buttons/Button'
import { tableData } from './constants'

interface TableRequestModalProps {
  isActive?: boolean
}

const TableRequestModal = ({ isActive }: TableRequestModalProps) => {
  return (
    <div className={clsx(styles.modalBox, isActive && styles.active)}>
      <div className={styles.title}>
        <span>Заявка №203</span> <Image src={closeIcon} alt='closeIcon' />
      </div>
      <div className={styles.table}>
        {tableData.map((data, index) => (
          <div key={index} className={styles.tableRow}>
            <span>{data.name}</span>
            <p className={clsx(data.color === 'blue' && styles.blue)}>
              {data.value}
              {data.value === '1234 1234 1234 4588' && (
                <>
                  <br />
                  <span>Visa/MasterCard</span>
                </>
              )}
              {data.after && (
                <>
                  <br />
                  <span>{data.after}</span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.buttonsBox}>
        <Button variant='outlined' size='small' icon={checkIcon}>
          Я оплатил
        </Button>
        <Button variant='outlined' size='small' icon={arrowIcon}>
          Отправить на проверку
        </Button>
        <Button variant='outlined' size='small' icon={closeRedIcon}>
          Отменить заявку
        </Button>
      </div>
    </div>
  )
}

export default TableRequestModal
