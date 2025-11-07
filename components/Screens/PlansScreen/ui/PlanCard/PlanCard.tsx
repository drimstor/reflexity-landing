import clsx from 'clsx'
import Button from 'components/UI-kit/Buttons/Button'
import { PlanConfig } from '../../const/plansConfig'
import styles from './PlanCard.module.scss'

interface PlanCardProps {
  plan: PlanConfig
  billingPeriod: string
  onButtonClick: () => void
}

const PlanCard = ({ plan, billingPeriod, onButtonClick }: PlanCardProps) => {
  const isPro = ['pro', 'yearlyPro'].includes(plan.id)
  const price =
    billingPeriod === 'monthly'
      ? plan.price.monthly
      : plan.price.yearly || plan.price.monthly
  const showYearlyPrice =
    billingPeriod === 'yearly' && plan.price.yearlyOriginal
  const periodText = billingPeriod === 'monthly' ? 'per month' : 'per year'

  return (
    <div className={clsx(styles.card, plan.isPopular && styles.proCard)}>
      {plan.isPopular && (
        <div className={styles.popularBadge}>Most Popular</div>
      )}

      <div className={styles.cardContent}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {plan.title}{' '}
            {plan.price.discount && (
              <span className={styles.discount}>
                Save {plan.price.discount}%
              </span>
            )}
          </h3>
          <div className={styles.priceSection}>
            {showYearlyPrice && (
              <span className={styles.originalPrice}>
                ${plan.price.yearlyOriginal}
              </span>
            )}
            <div className={styles.price}>
              {price === 0 ? 'Free' : `$${price}`}
              {price !== 0 && (
                <span className={styles.pricePeriod}>{periodText}</span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant='outlined'
          size='small'
          onClick={onButtonClick}
          className={styles.actionButton}
          fullWidth
        >
          {plan.buttonText}
        </Button>

        <div className={styles.featuresSection}>
          <h4 className={styles.featuresTitle}>FEATURES</h4>
          {plan.description && (
            <p className={styles.featuresIntro}>{plan.description}</p>
          )}
          <ul className={styles.featuresList}>
            {plan.features.map((feature) => {
              const value = isPro ? feature.proValue : feature.freeValue
              const isBoolean = feature.isBoolean
              const showCheckmark = isPro || (isBoolean && value === '✓')
              const showCross = !isPro && isBoolean && value === '✗'

              return (
                <li key={feature.key} className={styles.featureItem}>
                  <span
                    className={clsx(
                      styles.featureIcon,
                      isPro && styles.featureIconPro
                    )}
                  >
                    {showCheckmark ? (
                      <span className={styles.checkmark}>✓</span>
                    ) : showCross ? (
                      <span className={styles.cross}>✗</span>
                    ) : (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </span>
                  <span className={styles.featureText}>
                    {isBoolean ? feature.label : `${feature.label}: ${value}`}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
