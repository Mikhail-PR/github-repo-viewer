import React from 'react'
import styles from './Input.module.scss'

export const Input = React.memo(({inputRef, className, ...p}: IInput) => {
  return (
    <input className={`${styles.input} ${className || ''}`}
      {...p}
      ref={inputRef}/>
  )
})

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<any>
}
