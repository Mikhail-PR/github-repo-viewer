import {useQuery} from 'react-query'
import dateFormat from 'dateformat'
import {Repo} from '../api/Repo'

export const useCommits = (userName: string, repoName: string) => {
  const {isLoading: isLoadingCommits, data: commits, refetch: refetchCommits, error: errorCommits} = useQuery(
    ['commit list', userName, repoName],
    () => Repo.getCommits(userName, repoName), {
      select: ({data}): ICommit[] => (data.map((item) => ({
        author: item.author?.login || item.commit.author.name,
        date: dateFormat(item.commit.author.date, 'yyyy-mm-dd'),
        sha: item.sha
      })))
    })
  return {isLoadingCommits, commits, refetchCommits, errorCommits}
}

export interface ICommit {
  author: string | null
  date: string
  sha: string
}
