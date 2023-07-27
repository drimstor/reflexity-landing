import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  title: string
  placeholder: string
  isTextArea?: boolean
}

const Input = ({ title, placeholder, isTextArea }: InputProps) => {
  return (
    <div className={styles.inputBox}>
      {isTextArea ? (
        <textarea required  />
      ) : (
        <input type='text' placeholder={placeholder} required />
      )}
      <label>{title}</label>
    </div>
  )
}

export default Input
