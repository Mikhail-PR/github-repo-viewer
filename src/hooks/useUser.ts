import {useQuery} from 'react-query'
import {User} from '../api/User'

export const useUser = (userName: string, onSuccess?: () => void) => {
  const {isLoading: isLoadingUser, data: userData, refetch: refetchUser, error: errorUser} = useQuery(
    ['user', userName],
    () => User.getData(userName), {
      select: ({data}) => data,
      enabled: false,
      onSuccess
    })
  return {isLoadingUser, userData, refetchUser, errorUser}
}
