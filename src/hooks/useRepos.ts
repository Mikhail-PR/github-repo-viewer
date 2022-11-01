import {useQuery} from 'react-query'
import {User} from '../api/User'

export const useRepos = (userName: string) => {
  const {isLoading: isLoadingRepos, data: repos, refetch: refetchRepos, error: errorRepos} = useQuery(
    ['repo list', userName],
    () => User.getRepos(userName), {
      select: ({data}) => data,
      enabled: false
    })
  return {isLoadingRepos, repos, refetchRepos, errorRepos}
}
