import React, { useEffect, useState } from 'react'
import styles from './ThankYouSnackbar.module.scss'
import check from 'public/icons/greenCheck.svg'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

const ThankYouSnackbar = () => {
  const body = document.getElementById('body')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    setTimeout(() => setShow(false), 4000)
  }, [])

  if (body) {
    return createPortal(
      <div className={clsx(styles.snackbarBox, show && styles.show)}>
        <Image src={check} alt='check' />
        <p>Спасибо за обращение. Наши операторы скоро свяжутся с вами.</p>
      </div>,
      body
    )
  }

  return <></>
}

export default ThankYouSnackbar
