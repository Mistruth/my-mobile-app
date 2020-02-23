import React from 'react'
import './index.less'
import Button from '../../button'

type ContentProps = {
  children: any
}

export default function Content (props:ContentProps) {
  const { children } = props
  return (
    <React.Fragment>
      <div className='x-scroll-content-btn'>
        <Button>
          取消
        </Button>
        <Button>
          完成
        </Button>
      </div>
      <div className='x-scroll-items'>
        {children}
      </div>
    </React.Fragment>
  )
}
