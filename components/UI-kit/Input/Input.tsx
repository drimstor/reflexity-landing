import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  title: string
  placeholder: string
}

const Input = ({ title, placeholder }: InputProps) => {
  return (
    <div className={styles.inputBox}>
      <span>{title}</span>
      <input type='text' placeholder={placeholder} />
    </div>
  )
}

export default Input
