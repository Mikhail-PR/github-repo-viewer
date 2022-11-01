import {Api} from './Api'

export class User {
  static getData(userName: string) {
    return Api.get<IUser>(`/users/${userName}`)
  }

  static getRepos(userName: string) {
    return Api.get<IRepo[]>(`/users/${userName}/repos`)
  }
}

export interface IUser {
  avatar_url: string
  login: string
  name: string | null
}

export interface IRepo extends Object {
  id: number
  name: string
  language: string | null
  description: string | null
  stargazers_count: number
}
