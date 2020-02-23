import React from 'react'
import './index.less'
import { CssTransition as T } from '../transition/css'

interface MaskProps {
  onMaskClick: () => void,
  children?: React.ReactNode,
  isShow?: boolean,
  name: string,
  timeout?: number,
  unmountOnExit?: boolean,
}

export class Mask extends React.Component<MaskProps, any> {
  classNames: Function = () => {}

  static defaultProps = {
    onMaskClick: () => {},
    isShow: true
  };

  constructor (props:MaskProps) {
    super(props)
    this.state = {}
  }

  handleMaskClick (e:React.MouseEvent) {
    const { onMaskClick } = this.props
    onMaskClick && onMaskClick()
  }

  render () {
    const { children, isShow = true, name = '', timeout = 100, unmountOnExit } = this.props
    return (
      <T
        show={isShow}
        name={name}
        unmountOnExit={unmountOnExit}
        timeout={timeout}
      >
        <div
          className={this.classNames(['x-mask-container'])}
          onClick={(e) => {
            this.handleMaskClick(e)
          }}>
          {children || <div className='x-mask-tips'>请添加组件</div>}
        </div>
      </T>
    )
  }
}
