import styles from './PaymentConfirm.module.scss'
import infoIcon from 'public/icons/info-circle-white.svg'
import Image from 'next/image'

interface PaymentInfoBlockProps {
  content: string
}

const PaymentInfoBlock = ({ content }: PaymentInfoBlockProps) => {
  return (
    <div className={styles.infoBlock}>
      <Image src={infoIcon} alt='info' />
      <p>{content}</p>
    </div>
  )
}

export default PaymentInfoBlock
