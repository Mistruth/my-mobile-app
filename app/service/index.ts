import http from './http'
import { Iresponse } from './types'

interface userMessage {
  id:number
}

interface accountRepsonse {
  id: number,
  name: string
}

export function queryAccount (params:userMessage):Promise<Iresponse<accountRepsonse>> {
  return new Promise((resolve) => {
    http('/user_message', params).then(res => {
      resolve(res)
    })
  })
}
