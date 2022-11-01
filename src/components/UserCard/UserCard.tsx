import React from 'react'
import styles from './UserCard.module.scss'
import {IUser} from '../../api/User'

export const UserCard = React.memo((p: IUserCard) => {
  const {avatar_url, login, name} = p.userData
  return (
    <div className={`${styles.userCard} ${p.className || ''}`}>
      <img className={styles.image}
        src={avatar_url}
        alt={login}/>
      <div className={styles.title}>{login}</div>
      {!!name && <div className={styles.title}>{name}</div>}
    </div>
  )
})

export interface IUserCard {
  className?: string
  userData: IUser
}
