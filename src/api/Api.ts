import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export class Api {
  private static errorHandler(err: AxiosError<IErrorResponse>) {
    let errMessage = err.message
    if (err.response) errMessage = err.response.data.message
    return Promise.reject(new Error(errMessage))
  }

  static async get<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.get(url, {...(options || {})}).catch(this.errorHandler)
  }
}

interface IErrorResponse {
  message: string
}
