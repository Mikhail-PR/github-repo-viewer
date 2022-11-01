import React from 'react'
import styles from './HomePage.module.scss'
import {useNavigate} from 'react-router-dom'
import {useUser} from '../../hooks/useUser'
import {Input} from '../../components/ui/Input/Input'
import {Button} from '../../components/ui/Button/Button'
import {useForm} from 'react-hook-form'
import LoadingSpin from 'react-loading-spin'

export const HomePage = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const {ref: userNameRef, ...userNameRegister} = register('userName')
  const [userName, setUserName] = React.useState('')
  const {isLoadingUser, refetchUser, errorUser} = useUser(userName, () => navigate(`/github-repo-viewer/${userName}`))

  React.useEffect(() => {
    if (userName) refetchUser()
  }, [userName])

  const onSubmit = (e: React.SyntheticEvent) => {
    handleSubmit(data => setUserName(data.userName))(e)
  }

  return (
    <div className={styles.homePage}>
      <form className={styles.form}
        onSubmit={onSubmit}>
        <Input {...userNameRegister}
          inputRef={userNameRef}
          disabled={isLoadingUser}
          placeholder="Введите имя пользователя"/>
        <Button type="submit"
          disabled={isLoadingUser}>
          Найти
        </Button>
      </form>

      {isLoadingUser && <div className={styles.loader}><LoadingSpin/></div>}

      {!!errorUser && <div className={styles.error}>{(errorUser as any).message}</div>}
    </div>
  )
}
