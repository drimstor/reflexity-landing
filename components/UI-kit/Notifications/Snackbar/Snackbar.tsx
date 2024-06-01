import React, { useEffect, useState } from 'react'
import styles from './Snackbar.module.scss'
import check from 'public/icons/greenCheck.svg'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import closeRedIcon from 'public/icons/close-red.svg'

const Snackbar = ({
  value,
  isReject,
}: {
  value: string
  isReject?: string
}) => {
  const body = document.getElementById('body')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 300)
    setTimeout(() => setShow(false), 4000)
  }, [])

  if (body) {
    return createPortal(
      <div
        className={clsx(
          styles.snackbarBox,
          !!isReject && styles.reject,
          show && styles.show
        )}
      >
        <Image src={!!isReject ? closeRedIcon : check} alt='check' />
        <p>{!!isReject ? `Ошибка - ${isReject}` : value}</p>
      </div>,
      body
    )
  }

  return <></>
}

export default Snackbar
