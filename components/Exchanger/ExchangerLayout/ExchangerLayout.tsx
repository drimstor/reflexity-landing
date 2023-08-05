import Image from 'next/image'
import React, { ReactNode } from 'react'
import styles from './ExchangerLayout.module.scss'
import miniLogo from '../../../public/paikinsMiniLogo.svg'
import { icons, summaryItems } from './constants'
import clsx from 'clsx'
import arrow from '../../../public/icons/arrow-right.svg'
import angleDownIcon from '../../../public/icons/angle-down.svg'
import globeIcon from '../../../public/icons/globe.svg'
import bellIcon from '../../../public/icons/bell.svg'
import exitIcon from '../../../public/icons/exit.svg'
import changeIcon from '../../../public/icons/change.svg'
import Button from 'components/UI-kit/Buttons/Button'
import checkIcon from '../../../public/icons/check.svg'

interface ExchangerLayoutProps {
  children: ReactNode
  isActive?: boolean
  isAnotherTable?: boolean
}

const ExchangerLayout = ({
  children,
  isActive,
  isAnotherTable,
}: ExchangerLayoutProps) => {
  return (
    <div
      className={clsx(
        styles.box,
        isActive && styles.active,
        isAnotherTable && styles.isAnotherTable
      )}
    >
      <div className={styles.sidebar}>
        <Image src={miniLogo} alt='logo' />
        <div className={styles.iconsBox}>
          {icons.map((icon, index) => (
            <div key={index}>
              <Image src={icon} alt='icon' />
              {index === 2 && <div className={styles.active}></div>}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.layoutBox}>
        <div className={styles.layoutHeader}>
          <div className={styles.title}>
            <span>Binancep2p USDT</span> <Image src={arrow} alt='arrow' />{' '}
            <span>RUB 79.30</span>
          </div>
          <div className={styles.control}>
            <div className={styles.controlBox}>
              <Image src={globeIcon} alt='globe' />
              <span>РУС</span>
              <Image src={angleDownIcon} alt='angleDownIcon' />
            </div>
            <Image src={bellIcon} alt='globe' />
            <div className={styles.controlBox}>
              <Image src={exitIcon} alt='globe' />
              <span>Выход</span>
            </div>
          </div>
        </div>
        <div className={styles.summaryBox}>
          {summaryItems.map((item, index) => (
            <div className={styles.summatyItem} key={index}>
              <h3>
                {item.title}
                {index === 0 && (
                  <div className={styles.switch}>
                    <span>
                      <Image src={checkIcon} alt='check' /> USDT
                    </span>
                    <span>RUB</span>
                  </div>
                )}
              </h3>
              <span>{item.value}</span>
              {index === 0 && (
                <Button
                  variant='outlined'
                  size='small'
                  fullWidth
                  icon={changeIcon}
                >
                  Перевести
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.leftCircles}>
          <div className={styles.circleBox}>
            {icons.slice(1).map((circle, index) => (
              <div
                className={clsx(styles['circle' + (index + 1)])}
                key={index}
              />
            ))}
          </div>
        </div>
        {children}
        <div className={styles.rightCircles}>
          <div className={styles.circleBox}>
            {icons.slice(1).map((circle, index) => (
              <div
                className={clsx(styles['circle' + (index + 1)])}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangerLayout
