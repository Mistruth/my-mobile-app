import React from 'react'
import { Mask } from '../mask'
import './index.less'

interface DialogProps {
  isShow?: boolean,
  message?: string,
  btn?:string,
  onBtnClick?:Function
}

export class Dialog extends React.Component<DialogProps, any> {
  constructor (props:DialogProps) {
    super(props)
    this.state = {

    }
  }

  render () {
    const { isShow = false, message = '-', btn = '知道了', onBtnClick } = this.props
    return (
      <Mask isShow={isShow} name='x-dialog'>
        <div className='x-dialog-content'>
          <div className='x-core-content'>
            {message}
          </div>
          <div className='x-dialog-btns' onClick={() => {
            onBtnClick && onBtnClick()
          }}>
            {btn}
          </div>
        </div>
      </Mask>
    )
  }
}
