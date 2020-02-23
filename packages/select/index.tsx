import React from 'react'
import { Mask } from '../mask'
import Item from './item'
import ScrollContent from './scrollContent'
import './index.less'

type ScrollboxProps = {
  isShow?: boolean,
  timeout?: number,
  onMaskClick?: () => void,
  unmountOnExit?: boolean
}

export class Select extends React.Component<ScrollboxProps, any> {
  static defaultProps = {
    timeout: 300,
    onMaskClick: () => {},
    unmountOnExit: true,
    isShow: false
  }

  handleScrollTapClick= (e:React.MouseEvent) => {
    e.stopPropagation()
  }

  render () {
    const { isShow, timeout, onMaskClick, unmountOnExit } = this.props
    return (
      <Mask
        isShow={isShow}
        name='x-scrollbar'
        timeout={timeout}
        unmountOnExit={unmountOnExit}
        onMaskClick={onMaskClick}
      >
        <div className='x-scroll-box-container'
          onClick={(e) => this.handleScrollTapClick(e)}
        >
          <ScrollContent>
            <Item />
            <Item />
            <Item />
          </ScrollContent>
        </div>
      </Mask>
    )
  }
}
