import React from 'react'
import styles from './UserPage.module.scss'
import {useRepos} from '../../hooks/useRepos'
import {useUser} from '../../hooks/useUser'
import {useNavigate, useParams} from 'react-router-dom'
import {UserCard} from '../../components/UserCard/UserCard'
import LoadingSpin from 'react-loading-spin'
import {Button} from '../../components/ui/Button/Button'
import {Table} from '../../components/ui/Table/Table'

const REPOS_COLUMNS = [
  {key: 'name', title: 'Имя'},
  {key: 'language', title: 'Язык'},
  {key: 'description', title: 'Описание'},
  {key: 'stargazers_count', title: 'Рейтинг'}
]

export const UserPage = () => {
  const navigate = useNavigate()
  const {userName} = useParams()
  const {refetchUser, userData, isLoadingUser, errorUser} = useUser(userName as string)
  const {refetchRepos, repos, isLoadingRepos} = useRepos(userName as string)

  React.useEffect(() => {
    refetchUser()
    refetchRepos()
  }, [])

  const isLoading = React.useMemo(() => {
    return isLoadingUser && isLoadingRepos && !repos
  }, [isLoadingUser, isLoadingRepos, repos])

  const renderRepos = React.useMemo(() => {
    if (!repos) return null
    if (!repos.length) return <div className={styles.alert}>Нет публичных репозиториев</div>
    return <Table data={repos}
      columns={REPOS_COLUMNS}
      onRowClick={({name}: any) => navigate(`${name}`)}/>
  }, [repos])

  return (
    <div className={styles.userPage}>
      <Button className={styles.backBtn}
        onClick={() => navigate('/github-repo-viewer')}>
        на главную
      </Button>

      {isLoading && <div className={styles.loader}><LoadingSpin/></div>}

      {!!errorUser && <div className={styles.error}>{(errorUser as any).message}</div>}

      {!!userData && <UserCard className={styles.userCard} userData={userData}/>}

      {renderRepos}
    </div>
  )
}
