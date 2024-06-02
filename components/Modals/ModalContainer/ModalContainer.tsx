import Button from 'components/UI-kit/Buttons/Button'
import styles from './ModalContainer.module.scss'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ModalContainerProps {
  title: string
  value: string
  buttons: ReactNode
  isShow: boolean
}

const ModalContainer = ({
  title,
  value,
  buttons,
  isShow,
}: ModalContainerProps) => {
  return (
    <div className={clsx(styles.globalBox, isShow && styles.isShow)}>
      <div className={styles.modalBox}>
        {title && <h3>{title}</h3>}
        {value && <p>{value}</p>}
        <div className={styles.buttonsBox}>{buttons}</div>
      </div>
    </div>
  )
}

export default ModalContainer
