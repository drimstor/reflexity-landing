import React, { useEffect, useState } from 'react'
import styles from './FourthScreen.module.scss'
import circle from '../../public/icons/circle-vector.svg'
import Image from 'next/image'
import Button from 'components/UI-kit/Buttons/Button'
import clsx from 'clsx'
import ExchangerLayout from 'components/Exchanger/ExchangerLayout/ExchangerLayout'

interface FourthScreenProps {
  screenNumber: string
  isScrollLock: boolean
}

const FourthScreen = ({ screenNumber, isScrollLock }: FourthScreenProps) => {
  return (
    <div
      className={clsx(styles.contentBox, screenNumber === '3' && styles.active)}
    >
      <div className={styles.container}>
        <ExchangerLayout>
          <></>
        </ExchangerLayout>
      </div>
    </div>
  )
}

export default FourthScreen
