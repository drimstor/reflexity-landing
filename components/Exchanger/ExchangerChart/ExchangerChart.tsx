import React from 'react'
import styles from './ExchangerChart.module.scss'
import calenderIcon from '../../../public/icons/calender.svg'
import Image from 'next/image'
import clsx from 'clsx'
import chartImage from '../../../public/chart.svg'

interface ExchangerChartProps {
  isActive?: boolean
}

const ExchangerChart = ({ isActive }: ExchangerChartProps) => {
  return (
    <div className={clsx(styles.globalBox, isActive && styles.active)}>
      <div className={styles.titleAndSelectBox}>
        <h3>Статистика за период</h3>
        <div className={styles.flexWrapper}>
          <div className={styles.selectBox}>
            <div className={styles.select}>
              <span>17 мая 2023</span>
              <Image src={calenderIcon} alt='calenderIcon' />
            </div>
            <span>-</span>
            <div className={styles.select}>
              <span>25 мая 2023</span>
              <Image src={calenderIcon} alt='calenderIcon' />
            </div>
          </div>
          <div className={styles.selectNav}>
            <span>За неделю</span>
            <span>За месяц</span>
            <span>За год</span>
          </div>
        </div>
      </div>

      <div className={styles.chartBox}>
        <div className={styles.tabsBox}>
          <div className={clsx(styles.tab, styles.active)}>Сумма заявок</div>
          <div className={clsx(styles.tab)}>Количество заявок</div>
        </div>
        <div className={styles.chartTitle}>
          <h4>Общая сумма заявок</h4> <span>999 999 999.00</span>
        </div>
        <Image
          loading='eager'
          className={styles.chart}
          src={chartImage}
          alt='chartImage'
        />
      </div>
    </div>
  )
}

export default ExchangerChart
