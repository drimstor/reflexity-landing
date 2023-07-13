import Image from 'next/image'
import React from 'react'
import styles from './TableTransferModal.module.scss'
import closeIcon from '../../../public/icons/close.svg'
import infoIcon from '../../../public/icons/info-circle.svg'
import Button from 'components/UI-kit/Buttons/Button'

const inputData = [
  {
    title: 'Сумма USDT',
    input: 'Введите сумму USDT',
  },
  {
    title: 'Получатель (ID для переводов)',
    input: 'Введите ID получателя',
  },
]

const TableTransferModal = () => {
  return (
    <div className={styles.modalBox}>
      <div className={styles.title}>
        <span>Перевод</span> <Image src={closeIcon} alt='closeIcon' />
      </div>

      <div className={styles.inputsWrapper}>
        {inputData.map((input, index) => (
          <div key={index} className={styles.inputBox}>
            <h3>
              {input.title} <Image src={infoIcon} alt='info' />
            </h3>
            <div className={styles.input}>{input.input}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonsBox}>
        <Button variant='outlined' size='small'>
          Отмена
        </Button>
        <Button variant='contained' size='small'>
          Выполнить
        </Button>
      </div>
    </div>
  )
}

export default TableTransferModal
