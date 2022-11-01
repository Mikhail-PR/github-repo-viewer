import {Api} from './Api'

export class Repo {
  static getCommits(userName: string, repoName: string) {
    return Api.get<ICommit[]>(`/repos/${userName}/${repoName}/commits`)
  }
}

export interface ICommit {
  sha: string
  author: {
    login: string | null
  } | null
  commit: {
    author: {
      name: string
      date: string
    }
  }
}
