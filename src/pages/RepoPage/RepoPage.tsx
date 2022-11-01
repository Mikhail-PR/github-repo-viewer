import React from 'react'
import styles from './RepoPage.module.scss'
import {Button} from '../../components/ui/Button/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useCommits} from '../../hooks/useCommits'
import LoadingSpin from 'react-loading-spin'
import {Table} from '../../components/ui/Table/Table'

const COMMITS_COLUMNS = [
  {key: 'author', title: 'Автор'},
  {key: 'sha', title: 'Хэш коммита'},
  {key: 'date', title: 'Дата'},
]

export const RepoPage = () => {
  const navigate = useNavigate()
  const {userName, repoName} = useParams()
  const {commits, isLoadingCommits, errorCommits} = useCommits(userName as string, repoName as string)

  const renderCommits = React.useMemo(() => {
    if (!commits) return null
    if (!commits.length) return <div className={styles.alert}>Нет Коммитов</div>
    return <Table data={commits}
      columns={COMMITS_COLUMNS}/>
  }, [commits])

  return (
    <div className={styles.repoPage}>
      <Button className={styles.backBtn}
        onClick={() => navigate(`/github-repo-viewer/${userName}`)}>
        назад
      </Button>

      <h3 className={styles.title}>
        {repoName}
      </h3>

      {isLoadingCommits && <div className={styles.loader}><LoadingSpin/></div>}

      {!!errorCommits && <div className={styles.error}>{(errorCommits as any).message}</div>}

      {renderCommits}
    </div>
  )
}
