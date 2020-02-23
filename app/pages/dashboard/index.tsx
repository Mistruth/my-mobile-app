import React, { Component } from 'react'
import { queryAccount } from '@app/service'

export default class Index extends Component<any, any> {
  componentDidMount () {
    queryAccount({ id: 1 }).then(res => {
      console.log(res.data.name)
    })
  }

  render () {
    return <div>1</div>
  }
}
