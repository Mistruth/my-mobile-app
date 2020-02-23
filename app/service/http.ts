import axios, { AxiosResponse } from 'axios'
import { Iresponse } from './types'

const http = axios.create({
  baseURL: '/'
})

function _http (url:string, params:any, option:any = {}):Promise<Iresponse> {
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'POST',
      data: params
    }).then((res: AxiosResponse<Iresponse>) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default _http
