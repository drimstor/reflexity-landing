import Image from 'next/image'
import React, { ReactNode } from 'react'
import styles from './ExchangerLayout.module.scss'
import miniLogo from '../../../public/bitconceMiniLogo.svg'
import { icons } from './constants'
import clsx from 'clsx'

interface ExchangerLayoutProps {
  children: ReactNode
}

const ExchangerLayout = ({ children }: ExchangerLayoutProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.sidebar}>
        <Image src={miniLogo} alt='logo' />
        <div className={styles.iconsBox}>
          {icons.map((icon, index) => (
            <Image src={icon} key={index} alt='icon' />
          ))}
        </div>
      </div>
      <div className={styles.layoutBox}>
        <div className={styles.layoutHeader}></div>
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
