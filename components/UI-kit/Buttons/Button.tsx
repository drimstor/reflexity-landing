import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode } from 'react'
import s from './Button.module.scss'

interface iButton {
  children: ReactNode
  variant: 'outlined' | 'contained'
  size: 'medium' | 'small' | 'large'
  onClick?: () => void
  typeSubmit?: boolean
  error?: boolean
  className?: string
  icon?: string
  reverseIcon?: string
  fullWidth?: boolean
  disabled?: boolean
}

function Button({
  children,
  variant,
  size,
  onClick,
  typeSubmit,
  error,
  className,
  icon,
  reverseIcon,
  fullWidth,
  disabled,
}: iButton) {
  return (
    <button
      onClick={onClick}
      type={typeSubmit ? 'submit' : 'button'}
      disabled={disabled}
      className={clsx(
        s.button,
        s[size],
        s[variant],
        error && s.error,
        fullWidth && s.fullWidth,
        disabled && s.disabled,
        className && className
      )}
    >
      {icon && <Image src={icon} alt='icon' />}
      {children}
      {reverseIcon && <Image src={reverseIcon} alt='icon' />}
    </button>
  )
}

export default Button
