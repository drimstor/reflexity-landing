import styles from './PaymentConfirm.module.scss'

interface PaymentTableProps {
  tableData: {
    title: string
    value?: JSX.Element | string
  }[]
}

const PaymentTable = ({ tableData }: PaymentTableProps) => {
  return (
    <div className={styles.tableBox}>
      {tableData.map((item, index) => (
        <div className={styles.tableRow} key={index}>
          <span className={styles.className}>{item.title}</span>
          <b className={styles.className}>{item.value}</b>
        </div>
      ))}
    </div>
  )
}

export default PaymentTable
