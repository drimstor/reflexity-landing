import clsx from 'clsx'
import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  title: string
  placeholder: string
  isTextArea?: boolean
}

const Input = ({ title, placeholder, isTextArea }: InputProps) => {
  return (
    <div className={clsx(styles.inputBox, isTextArea && styles.textAreaBox)}>
      {isTextArea ? <textarea required /> : <input type='text' required />}
      <label>{title}</label>
    </div>
  )
}

export default Input
