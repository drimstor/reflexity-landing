import clsx from 'clsx'
import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  title: string
  placeholder: string
  isTextArea?: boolean
  name: number
}

const Input = ({ title, placeholder, isTextArea, name }: InputProps) => {
  return (
    <div className={clsx(styles.inputBox, isTextArea && styles.textAreaBox)}>
      {isTextArea ? (
        <textarea name={String(name)} required />
      ) : (
        <input type='text' name={String(name)} required />
      )}
      <label>{title}</label>
    </div>
  )
}

export default Input
