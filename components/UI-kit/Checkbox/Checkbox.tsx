import clsx from 'clsx'
import React, { FC, ReactNode, useState } from 'react'
import styles from './Checkbox.module.scss'

interface iCheckbox {
  title: ReactNode
  onChange: (isChecked: boolean) => void
  isChecked: boolean
}

const Checkbox: FC<iCheckbox> = ({ title, onChange, isChecked }) => {
  return (
    <label className={styles.label}>
      <input type='checkbox' onChange={() => onChange(!isChecked)} />
      <svg
        className={clsx(styles.checkbox, isChecked && styles.active)}
        aria-hidden='true'
        viewBox='0 0 15 11'
        fill='none'
        width='7.5'
        height='5.5'
      >
        <path
          d='M1 4.5L5 9L14 1'
          strokeWidth='2'
          stroke={isChecked ? '#fff' : 'transparent'}
        />
      </svg>
      <p className={styles.checkboxTitle}>{title}</p>
    </label>
  )
}

export default Checkbox
