import React, { ChangeEvent } from 'react'
import styles from './RadioButton.module.scss'
import Image from 'next/image'

interface RadioButtonProps {
  label: string
  icon: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const RadioButton = ({
  label,
  icon,
  checked,
  onChange,
  value,
}: RadioButtonProps) => {
  return (
    <label className={styles.radioContainer}>
      <input
        type='radio'
        checked={checked}
        onChange={onChange}
        value={value}
        className={styles.hiddenRadio}
      />
      <span className={styles.styledRadio} />
      <Image src={icon} alt='bankIcon' />
      <p>{label}</p>
    </label>
  )
}

export default RadioButton
