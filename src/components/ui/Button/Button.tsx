import React from 'react'
import styles from './Button.module.scss'

export const Button = React.memo(({children, className, ...p}: IButton) => {
  return (
    <button className={`${styles.button} ${className || ''}`}
      {...p}>
      {children}
    </button>
  )
})

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}
