import React, { Component } from 'react'
import { Dialog } from '@pack/index.ts'
import './index.less'

export default class index extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = {
      showMessage: false
    }
  }

  handleToggleMessage = () => {
    this.setState({
      showMessage: !this.state.showMessage
    })
  }

  render () {
    const { showMessage } = this.state
    return (
      <div className='mask-container'>
        <div className='btn' onClick={this.handleToggleMessage}>
          launch
        </div>
        <Dialog isShow={showMessage} />
      </div>
    )
  }
}
