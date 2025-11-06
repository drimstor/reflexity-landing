import clsx from 'clsx'
import { BillingPeriod } from '../../const/plansConfig'
import styles from './BillingToggle.module.scss'

interface BillingToggleProps {
  value: BillingPeriod
  onChange: (period: BillingPeriod) => void
}

const BillingToggle = ({ value, onChange }: BillingToggleProps) => {
  return (
    <div className={styles.toggleContainer}>
      <button
        type='button'
        className={clsx(styles.toggleOption, value === 'monthly' && styles.active)}
        onClick={() => onChange('monthly')}
      >
        Ежемесячно
      </button>
      <button
        type='button'
        className={clsx(styles.toggleOption, value === 'yearly' && styles.active)}
        onClick={() => onChange('yearly')}
      >
        Ежегодно
        <span className={styles.discount}>Скидка 30%</span>
      </button>
    </div>
  )
}

export default BillingToggle

