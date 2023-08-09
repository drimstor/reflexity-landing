import clsx from 'clsx'
import useHover from 'hooks/useHover'
import React, { LegacyRef, useEffect, useRef } from 'react'
import styles from './Input.module.scss'

interface InputProps {
  title: string
  isTextArea?: boolean
  name: number
}

const Input = ({ title, isTextArea, name }: InputProps) => {
  const carousel = document.getElementById('carousel')
  const textArea = useRef<HTMLTextAreaElement | any>()
  const isTextAreaHover = useHover(textArea)

  useEffect(() => {
    if (carousel) {
      if (isTextAreaHover) {
        carousel.dataset.scroll = 'disable'
      } else {
        carousel.dataset.scroll = 'enable'
      }
    }
  }, [isTextAreaHover])

  return (
    <div className={clsx(styles.inputBox, isTextArea && styles.textAreaBox)}>
      {isTextArea ? (
        <textarea ref={textArea} name={String(name)} required />
      ) : (
        <input type='text' name={String(name)} required />
      )}
      <label>{title}</label>
    </div>
  )
}

export default Input
